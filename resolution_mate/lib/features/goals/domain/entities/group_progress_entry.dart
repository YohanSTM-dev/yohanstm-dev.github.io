import '../../../../core/models/user_summary.dart';
import 'progress_log_entity.dart';

class GroupProgressEntry {
  final UserSummary user;
  final ProgressStatus? status;

  const GroupProgressEntry({
    required this.user,
    required this.status,
  });

  bool get isDone => status == ProgressStatus.done;
  bool get isSkipped => status == ProgressStatus.skipped;
}
