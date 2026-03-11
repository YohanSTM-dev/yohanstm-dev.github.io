import 'package:cloud_firestore/cloud_firestore.dart';

import '../../domain/entities/user_entity.dart';

class UserModel extends UserEntity {
  const UserModel({
    required super.uid,
    required super.email,
    required super.displayName,
    required super.photoUrl,
    required super.createdAt,
  });

  factory UserModel.fromMap(Map<String, dynamic> map) {
    final rawCreatedAt = map['createdAt'];
    final createdAt = switch (rawCreatedAt) {
      Timestamp t => t.toDate(),
      DateTime d => d,
      String s => DateTime.parse(s),
      _ => DateTime.fromMillisecondsSinceEpoch(0),
    };

    return UserModel(
      uid: (map['uid'] as String?) ?? '',
      email: (map['email'] as String?) ?? '',
      displayName: (map['displayName'] as String?) ?? '',
      photoUrl: (map['photoUrl'] as String?) ?? '',
      createdAt: createdAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'uid': uid,
      'email': email,
      'displayName': displayName,
      'photoUrl': photoUrl,
      'createdAt': Timestamp.fromDate(createdAt),
    };
  }
}
