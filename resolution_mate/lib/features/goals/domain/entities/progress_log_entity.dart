enum ProgressStatus { done, skipped }

extension ProgressStatusX on ProgressStatus {
  String get value => switch (this) {
        ProgressStatus.done => 'done',
        ProgressStatus.skipped => 'skipped',
      };

  static ProgressStatus from(String value) {
    return value == 'skipped' ? ProgressStatus.skipped : ProgressStatus.done;
  }
}

class ProgressLogEntity {
  final String goalId;
  final String userId;
  final DateTime date;
  final ProgressStatus status;

  const ProgressLogEntity({
    required this.goalId,
    required this.userId,
    required this.date,
    required this.status,
  });
}
