import '../entities/goal_entity.dart';
import '../repositories/goals_repository.dart';

class CreateGoal {
  final GoalsRepository repository;
  const CreateGoal(this.repository);

  Future<void> call(GoalEntity goal) => repository.createGoal(goal);
}
