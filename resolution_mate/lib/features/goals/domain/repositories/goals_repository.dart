import '../entities/goal_entity.dart';
import '../entities/group_progress_entry.dart';
import '../entities/progress_log_entity.dart';

abstract class GoalsRepository {
  Stream<List<GoalEntity>> watchGoals(String userId, {GoalType? type});
  Future<void> createGoal(GoalEntity goal);

  Stream<ProgressLogEntity?> watchUserProgressForDate({
    required String goalId,
    required String userId,
    required DateTime date,
    required GoalFrequency frequency,
  });

  Future<void> setProgressStatus({
    required GoalEntity goal,
    required String userId,
    required ProgressStatus status,
    required DateTime date,
  });

  Future<void> clearProgressStatus({
    required GoalEntity goal,
    required String userId,
    required DateTime date,
  });

  Future<List<GroupProgressEntry>> fetchGroupProgress({
    required GoalEntity goal,
    required DateTime date,
  });

  Future<List<String>> resolveParticipantIdsByEmails(List<String> emails);
}
