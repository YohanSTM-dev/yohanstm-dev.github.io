import '../entities/user_entity.dart';

abstract class AuthRepository {
  Stream<UserEntity?> authStateChanges();
  Future<UserEntity?> currentUser();

  Future<UserEntity> signInWithEmail(String email, String password);
  Future<UserEntity> registerWithEmail(
    String email,
    String password, {
    String? displayName,
  });
  Future<UserEntity> signInWithGoogle();
  Future<void> sendPasswordResetEmail(String email);
  Future<void> signOut();
}
