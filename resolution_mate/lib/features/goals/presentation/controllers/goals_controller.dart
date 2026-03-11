import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../core/utils/date_utils.dart';
import '../../../../di/providers.dart';
import '../../../auth/presentation/controllers/auth_controller.dart';
import '../../domain/entities/goal_entity.dart';
import '../../domain/entities/group_progress_entry.dart';
import '../../domain/entities/progress_log_entity.dart';

part 'goals_controller.g.dart';

@riverpod
Stream<List<GoalEntity>> goalsStream(Ref ref, {GoalType? type}) {
  final auth = ref.watch(authStateChangesProvider);

  return auth.maybeWhen(
    data: (user) {
      if (user == null) return Stream<List<GoalEntity>>.value([]);
      return ref.watch(watchGoalsProvider).call(user.uid, type: type);
    },
    orElse: () => Stream<List<GoalEntity>>.value([]),
  );
}

@riverpod
Stream<ProgressLogEntity?> userProgressForDate(
  Ref ref, {
  required GoalEntity goal,
  required DateTime date,
}) {
  final auth = ref.watch(authStateChangesProvider);

  return auth.maybeWhen(
    data: (user) {
      if (user == null) return Stream<ProgressLogEntity?>.value(null);
      return ref.watch(watchUserProgressProvider).call(
            goalId: goal.id,
            userId: user.uid,
            date: date,
            frequency: goal.frequency,
          );
    },
    orElse: () => Stream<ProgressLogEntity?>.value(null),
  );
}

@riverpod
Future<List<GroupProgressEntry>> groupProgress(
  Ref ref, {
  required GoalEntity goal,
  required DateTime date,
}) async {
  return ref.watch(fetchGroupProgressProvider).call(goal: goal, date: date);
}

@riverpod
class GoalsController extends _$GoalsController {
  @override
  FutureOr<void> build() {}

  Future<void> createGoal({
    required String title,
    required String description,
    required GoalType type,
    required GoalFrequency frequency,
    required DateTime deadline,
    required List<String> inviteEmails,
  }) async {
    state = const AsyncLoading();

    state = await AsyncValue.guard(() async {
      final authRepo = ref.read(authRepositoryProvider);
      final user = await authRepo.currentUser();
      if (user == null) throw Exception('Not signed in');

      final participantIds = <String>{user.uid};

      if (type == GoalType.group && inviteEmails.isNotEmpty) {
        final resolved =
            await ref.read(resolveParticipantIdsProvider).call(inviteEmails);
        participantIds.addAll(resolved);
      }

      final goal = GoalEntity(
        id: '',
        title: title.trim(),
        description: description.trim(),
        type: type,
        creatorId: user.uid,
        participantIds: participantIds.toList(),
        frequency: frequency,
        deadline: AppDateUtils.startOfDay(deadline),
        isCompleted: false,
      );

      await ref.read(createGoalProvider).call(goal);
    });
  }

  Future<void> setProgressStatus({
    required GoalEntity goal,
    required ProgressStatus status,
    required DateTime date,
  }) async {
    state = const AsyncLoading();

    state = await AsyncValue.guard(() async {
      final authRepo = ref.read(authRepositoryProvider);
      final user = await authRepo.currentUser();
      if (user == null) throw Exception('Not signed in');

      await ref.read(setProgressStatusProvider).call(
            goal: goal,
            userId: user.uid,
            status: status,
            date: date,
          );
    });
  }

  Future<void> clearProgressStatus({
    required GoalEntity goal,
    required DateTime date,
  }) async {
    state = const AsyncLoading();

    state = await AsyncValue.guard(() async {
      final authRepo = ref.read(authRepositoryProvider);
      final user = await authRepo.currentUser();
      if (user == null) throw Exception('Not signed in');

      await ref.read(clearProgressStatusProvider).call(
            goal: goal,
            userId: user.uid,
            date: date,
          );
    });
  }
}
