class UserSummary {
  final String uid;
  final String displayName;
  final String photoUrl;

  const UserSummary({
    required this.uid,
    required this.displayName,
    required this.photoUrl,
  });

  factory UserSummary.fromMap(Map<String, dynamic> map) {
    return UserSummary(
      uid: (map['uid'] as String?) ?? '',
      displayName: (map['displayName'] as String?) ?? '',
      photoUrl: (map['photoUrl'] as String?) ?? '',
    );
  }
}
