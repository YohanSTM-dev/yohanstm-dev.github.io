import '../entities/goal_entity.dart';
import '../entities/group_progress_entry.dart';
import '../repositories/goals_repository.dart';

class FetchGroupProgress {
  final GoalsRepository repository;
  const FetchGroupProgress(this.repository);

  Future<List<GroupProgressEntry>> call({
    required GoalEntity goal,
    required DateTime date,
  }) {
    return repository.fetchGroupProgress(goal: goal, date: date);
  }
}
