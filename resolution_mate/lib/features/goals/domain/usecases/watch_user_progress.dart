import '../entities/goal_entity.dart';
import '../entities/progress_log_entity.dart';
import '../repositories/goals_repository.dart';

class WatchUserProgress {
  final GoalsRepository repository;
  const WatchUserProgress(this.repository);

  Stream<ProgressLogEntity?> call({
    required String goalId,
    required String userId,
    required DateTime date,
    required GoalFrequency frequency,
  }) {
    return repository.watchUserProgressForDate(
      goalId: goalId,
      userId: userId,
      date: date,
      frequency: frequency,
    );
  }
}
