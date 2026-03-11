import '../../../../core/utils/date_utils.dart';
import '../../domain/entities/goal_entity.dart';
import '../../domain/entities/group_progress_entry.dart';
import '../../domain/entities/progress_log_entity.dart';
import '../../domain/repositories/goals_repository.dart';
import '../datasources/goals_remote_data_source.dart';
import '../models/goal_model.dart';
import '../models/progress_log_model.dart';

class GoalsRepositoryImpl implements GoalsRepository {
  GoalsRepositoryImpl({required GoalsRemoteDataSource remote}) : _remote = remote;

  final GoalsRemoteDataSource _remote;

  @override
  Stream<List<GoalEntity>> watchGoals(String userId, {GoalType? type}) {
    return _remote.watchGoals(userId, type: type);
  }

  @override
  Future<void> createGoal(GoalEntity goal) {
    return _remote.createGoal(_toModel(goal));
  }

  @override
  Stream<ProgressLogEntity?> watchUserProgressForDate({
    required String goalId,
    required String userId,
    required DateTime date,
    required GoalFrequency frequency,
  }) {
    final logId = _progressLogId(
      userId: userId,
      date: date,
      frequency: frequency,
    );

    return _remote.watchUserProgress(
      goalId: goalId,
      logId: logId,
    );
  }

  @override
  Future<void> setProgressStatus({
    required GoalEntity goal,
    required String userId,
    required ProgressStatus status,
    required DateTime date,
  }) async {
    final logId = _progressLogId(
      userId: userId,
      date: date,
      frequency: goal.frequency,
    );
    final log = ProgressLogModel(
      goalId: goal.id,
      userId: userId,
      date: _progressLogDate(date, goal.frequency),
      status: status,
    );

    await _remote.setProgressLog(
      goalId: goal.id,
      logId: logId,
      log: log,
    );

  }

  @override
  Future<void> clearProgressStatus({
    required GoalEntity goal,
    required String userId,
    required DateTime date,
  }) async {
    final logId = _progressLogId(
      userId: userId,
      date: date,
      frequency: goal.frequency,
    );
    await _remote.deleteProgressLog(goalId: goal.id, logId: logId);
  }

  @override
  Future<List<GroupProgressEntry>> fetchGroupProgress({
    required GoalEntity goal,
    required DateTime date,
  }) {
    return _remote.fetchGroupProgress(
      goal: _toModel(goal),
      date: date,
    );
  }

  @override
  Future<List<String>> resolveParticipantIdsByEmails(List<String> emails) {
    return _remote.resolveParticipantIdsByEmails(emails);
  }

  GoalModel _toModel(GoalEntity goal) {
    return GoalModel(
      id: goal.id,
      title: goal.title,
      description: goal.description,
      type: goal.type,
      creatorId: goal.creatorId,
      participantIds: goal.participantIds,
      frequency: goal.frequency,
      deadline: goal.deadline,
      isCompleted: goal.isCompleted,
    );
  }

  String _progressLogId({
    required String userId,
    required DateTime date,
    required GoalFrequency frequency,
  }) {
    switch (frequency) {
      case GoalFrequency.daily:
        return AppDateUtils.progressLogId(userId, date);
      case GoalFrequency.weekly:
        final weekStart = AppDateUtils.startOfWeek(date);
        return '${userId}_w${AppDateUtils.dateKey(weekStart)}';
      case GoalFrequency.once:
        return '${userId}_once';
    }
  }

  DateTime _progressLogDate(DateTime date, GoalFrequency frequency) {
    switch (frequency) {
      case GoalFrequency.daily:
        return AppDateUtils.startOfDay(date);
      case GoalFrequency.weekly:
        return AppDateUtils.startOfWeek(date);
      case GoalFrequency.once:
        return AppDateUtils.startOfDay(date);
    }
  }
}
