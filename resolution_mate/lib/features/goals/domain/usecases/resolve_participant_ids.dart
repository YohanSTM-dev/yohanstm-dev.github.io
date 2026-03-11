import '../repositories/goals_repository.dart';

class ResolveParticipantIds {
  final GoalsRepository repository;
  const ResolveParticipantIds(this.repository);

  Future<List<String>> call(List<String> emails) {
    return repository.resolveParticipantIdsByEmails(emails);
  }
}
