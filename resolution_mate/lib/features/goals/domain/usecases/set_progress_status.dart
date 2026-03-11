import '../entities/goal_entity.dart';
import '../entities/progress_log_entity.dart';
import '../repositories/goals_repository.dart';

class SetProgressStatus {
  final GoalsRepository repository;
  const SetProgressStatus(this.repository);

  Future<void> call({
    required GoalEntity goal,
    required String userId,
    required ProgressStatus status,
    required DateTime date,
  }) {
    return repository.setProgressStatus(
      goal: goal,
      userId: userId,
      status: status,
      date: date,
    );
  }
}
