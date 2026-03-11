import 'package:cloud_firestore/cloud_firestore.dart';

import '../../../../core/models/user_summary.dart';
import '../../../../core/utils/collection_utils.dart';
import '../../../../core/utils/date_utils.dart';
import '../models/goal_model.dart';
import '../models/progress_log_model.dart';
import '../../domain/entities/goal_entity.dart';
import '../../domain/entities/group_progress_entry.dart';

abstract class GoalsRemoteDataSource {
  Stream<List<GoalModel>> watchGoals(String userId, {GoalType? type});
  Future<void> createGoal(GoalModel goal);
  Future<void> updateGoalCompletion(String goalId, bool isCompleted);

  Stream<ProgressLogModel?> watchUserProgress({
    required String goalId,
    required String logId,
  });

  Future<void> setProgressLog({
    required String goalId,
    required String logId,
    required ProgressLogModel log,
  });

  Future<void> deleteProgressLog({
    required String goalId,
    required String logId,
  });

  Future<List<GroupProgressEntry>> fetchGroupProgress({
    required GoalModel goal,
    required DateTime date,
  });

  Future<List<String>> resolveParticipantIdsByEmails(List<String> emails);
}

class GoalsRemoteDataSourceImpl implements GoalsRemoteDataSource {
  GoalsRemoteDataSourceImpl({required FirebaseFirestore firestore})
      : _firestore = firestore;

  final FirebaseFirestore _firestore;

  CollectionReference<Map<String, dynamic>> get _goals =>
      _firestore.collection('goals');

  CollectionReference<Map<String, dynamic>> get _users =>
      _firestore.collection('users');

  @override
  Stream<List<GoalModel>> watchGoals(String userId, {GoalType? type}) {
    Query<Map<String, dynamic>> query =
        _goals.where('participantIds', arrayContains: userId);

    if (type != null) {
      query = query.where('type', isEqualTo: type.value);
    }

    query = query.orderBy('deadline');

    return query.snapshots().map(
          (snap) => snap.docs.map(_goalFromDoc).toList(),
        );
  }

  @override
  Future<void> createGoal(GoalModel goal) async {
    final docRef = goal.id.isEmpty ? _goals.doc() : _goals.doc(goal.id);
    final data = goal.toMap();
    data['id'] = docRef.id;
    await docRef.set(data);
  }

  @override
  Future<void> updateGoalCompletion(String goalId, bool isCompleted) async {
    await _goals.doc(goalId).set(
      {'isCompleted': isCompleted},
      SetOptions(merge: true),
    );
  }

  @override
  Stream<ProgressLogModel?> watchUserProgress({
    required String goalId,
    required String logId,
  }) {
    return _goals
        .doc(goalId)
        .collection('progress_logs')
        .doc(logId)
        .snapshots()
        .map((snap) {
      final data = snap.data();
      if (data == null) return null;
      return ProgressLogModel.fromMap(data);
    });
  }

  @override
  Future<void> setProgressLog({
    required String goalId,
    required String logId,
    required ProgressLogModel log,
  }) async {
    await _goals
        .doc(goalId)
        .collection('progress_logs')
        .doc(logId)
        .set(log.toMap());
  }

  @override
  Future<void> deleteProgressLog({
    required String goalId,
    required String logId,
  }) async {
    await _goals.doc(goalId).collection('progress_logs').doc(logId).delete();
  }

  @override
  Future<List<GroupProgressEntry>> fetchGroupProgress({
    required GoalModel goal,
    required DateTime date,
  }) async {
    DateTime? start;
    DateTime? end;

    switch (goal.frequency) {
      case GoalFrequency.daily:
        start = AppDateUtils.startOfDay(date);
        end = AppDateUtils.nextDay(date);
        break;
      case GoalFrequency.weekly:
        start = AppDateUtils.startOfWeek(date);
        end = AppDateUtils.nextWeek(date);
        break;
      case GoalFrequency.once:
        break;
    }

    Query<Map<String, dynamic>> query =
        _goals.doc(goal.id).collection('progress_logs');
    if (start != null && end != null) {
      query = query
          .where('date', isGreaterThanOrEqualTo: Timestamp.fromDate(start))
          .where('date', isLessThan: Timestamp.fromDate(end));
    }

    final logsSnap = await query.get();

    final logsByUser = <String, ProgressLogModel>{};
    for (final doc in logsSnap.docs) {
      final log = ProgressLogModel.fromMap(doc.data());
      final existing = logsByUser[log.userId];
      if (existing == null || log.date.isAfter(existing.date)) {
        logsByUser[log.userId] = log;
      }
    }

    final users = await _getUsersByIds(goal.participantIds);
    final usersById = {for (final u in users) u.uid: u};

    return goal.participantIds.map((uid) {
      final user = usersById[uid] ??
          UserSummary(uid: uid, displayName: uid, photoUrl: '');
      return GroupProgressEntry(
        user: user,
        status: logsByUser[uid]?.status,
      );
    }).toList();
  }

  @override
  Future<List<String>> resolveParticipantIdsByEmails(
      List<String> emails) async {
    if (emails.isEmpty) return [];

    final result = <String>[];
    for (final chunk in chunkList(emails, 10)) {
      final snap = await _users.where('email', whereIn: chunk).get();
      for (final doc in snap.docs) {
        final data = doc.data();
        final uid = data['uid'] as String?;
        if (uid != null && uid.isNotEmpty) result.add(uid);
      }
    }

    return result.toSet().toList();
  }

  Future<List<UserSummary>> _getUsersByIds(List<String> ids) async {
    if (ids.isEmpty) return [];

    final result = <UserSummary>[];
    for (final chunk in chunkList(ids, 10)) {
      final snap = await _users.where('uid', whereIn: chunk).get();
      result.addAll(snap.docs.map((d) => UserSummary.fromMap(d.data())));
    }
    return result;
  }

  GoalModel _goalFromDoc(DocumentSnapshot<Map<String, dynamic>> doc) {
    final data = doc.data() ?? {};
    data['id'] = data['id'] ?? doc.id;
    return GoalModel.fromMap(data);
  }
}
