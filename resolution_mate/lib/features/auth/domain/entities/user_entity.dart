class UserEntity {
  final String uid;
  final String email;
  final String displayName;
  final String photoUrl;
  final DateTime createdAt;

  const UserEntity({
    required this.uid,
    required this.email,
    required this.displayName,
    required this.photoUrl,
    required this.createdAt,
  });
}
