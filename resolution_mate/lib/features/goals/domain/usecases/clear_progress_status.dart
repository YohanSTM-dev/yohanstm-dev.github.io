import '../entities/goal_entity.dart';
import '../repositories/goals_repository.dart';

class ClearProgressStatus {
  final GoalsRepository repository;
  const ClearProgressStatus(this.repository);

  Future<void> call({
    required GoalEntity goal,
    required String userId,
    required DateTime date,
  }) {
    return repository.clearProgressStatus(
      goal: goal,
      userId: userId,
      date: date,
    );
  }
}
