import '../entities/goal_entity.dart';
import '../repositories/goals_repository.dart';

class WatchGoals {
  final GoalsRepository repository;
  const WatchGoals(this.repository);

  Stream<List<GoalEntity>> call(String userId, {GoalType? type}) {
    return repository.watchGoals(userId, type: type);
  }
}
