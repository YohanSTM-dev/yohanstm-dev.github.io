import 'package:cloud_firestore/cloud_firestore.dart';

import '../../domain/entities/goal_entity.dart';

class GoalModel extends GoalEntity {
  const GoalModel({
    required super.id,
    required super.title,
    required super.description,
    required super.type,
    required super.creatorId,
    required super.participantIds,
    required super.frequency,
    required super.deadline,
    required super.isCompleted,
  });

  factory GoalModel.fromMap(Map<String, dynamic> map) {
    final rawDeadline = map['deadline'];
    final deadline = switch (rawDeadline) {
      Timestamp t => t.toDate(),
      DateTime d => d,
      String s => DateTime.parse(s),
      _ => DateTime.fromMillisecondsSinceEpoch(0),
    };

    return GoalModel(
      id: (map['id'] as String?) ?? '',
      title: (map['title'] as String?) ?? '',
      description: (map['description'] as String?) ?? '',
      type: GoalTypeX.from((map['type'] as String?) ?? 'personal'),
      creatorId: (map['creatorId'] as String?) ?? '',
      participantIds:
          (map['participantIds'] as List<dynamic>? ?? []).cast<String>(),
      frequency: GoalFrequencyX.from((map['frequency'] as String?) ?? 'daily'),
      deadline: deadline,
      isCompleted: (map['isCompleted'] as bool?) ?? false,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'type': type.value,
      'creatorId': creatorId,
      'participantIds': participantIds,
      'frequency': frequency.value,
      'deadline': Timestamp.fromDate(deadline),
      'isCompleted': isCompleted,
    };
  }
}
