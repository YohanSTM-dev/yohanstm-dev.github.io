enum GoalType { personal, group }

extension GoalTypeX on GoalType {
  String get value => switch (this) {
        GoalType.personal => 'personal',
        GoalType.group => 'group',
      };

  static GoalType from(String value) {
    return value == 'group' ? GoalType.group : GoalType.personal;
  }

  String get label => switch (this) {
        GoalType.personal => 'Moi',
        GoalType.group => 'Groupe',
      };
}

enum GoalFrequency { daily, weekly, once }

extension GoalFrequencyX on GoalFrequency {
  String get value => switch (this) {
        GoalFrequency.daily => 'daily',
        GoalFrequency.weekly => 'weekly',
        GoalFrequency.once => 'once',
      };

  static GoalFrequency from(String value) {
    return switch (value) {
      'weekly' => GoalFrequency.weekly,
      'once' => GoalFrequency.once,
      _ => GoalFrequency.daily,
    };
  }

  String get label => switch (this) {
        GoalFrequency.daily => 'Quotidien',
        GoalFrequency.weekly => 'Hebdo',
        GoalFrequency.once => 'Unique',
      };
}

class GoalEntity {
  final String id;
  final String title;
  final String description;
  final GoalType type;
  final String creatorId;
  final List<String> participantIds;
  final GoalFrequency frequency;
  final DateTime deadline;
  final bool isCompleted;

  const GoalEntity({
    required this.id,
    required this.title,
    required this.description,
    required this.type,
    required this.creatorId,
    required this.participantIds,
    required this.frequency,
    required this.deadline,
    required this.isCompleted,
  });
}
