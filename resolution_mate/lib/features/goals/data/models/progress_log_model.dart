import 'package:cloud_firestore/cloud_firestore.dart';

import '../../domain/entities/progress_log_entity.dart';

class ProgressLogModel extends ProgressLogEntity {
  const ProgressLogModel({
    required super.goalId,
    required super.userId,
    required super.date,
    required super.status,
  });

  factory ProgressLogModel.fromMap(Map<String, dynamic> map) {
    final rawDate = map['date'];
    final date = switch (rawDate) {
      Timestamp t => t.toDate(),
      DateTime d => d,
      String s => DateTime.parse(s),
      _ => DateTime.fromMillisecondsSinceEpoch(0),
    };

    return ProgressLogModel(
      goalId: (map['goalId'] as String?) ?? '',
      userId: (map['userId'] as String?) ?? '',
      date: date,
      status: ProgressStatusX.from((map['status'] as String?) ?? 'done'),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'goalId': goalId,
      'userId': userId,
      'date': Timestamp.fromDate(date),
      'status': status.value,
    };
  }
}
