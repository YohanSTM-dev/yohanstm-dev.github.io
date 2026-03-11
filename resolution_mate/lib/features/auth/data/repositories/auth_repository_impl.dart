import '../../domain/entities/user_entity.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_data_source.dart';

class AuthRepositoryImpl implements AuthRepository {
  AuthRepositoryImpl({required AuthRemoteDataSource remote}) : _remote = remote;

  final AuthRemoteDataSource _remote;

  @override
  Stream<UserEntity?> authStateChanges() => _remote.authStateChanges();

  @override
  Future<UserEntity?> currentUser() => _remote.currentUser();

  @override
  Future<UserEntity> registerWithEmail(
    String email,
    String password, {
    String? displayName,
  }) {
    return _remote.registerWithEmail(
      email,
      password,
      displayName: displayName,
    );
  }

  @override
  Future<UserEntity> signInWithEmail(String email, String password) {
    return _remote.signInWithEmail(email, password);
  }

  @override
  Future<UserEntity> signInWithGoogle() => _remote.signInWithGoogle();

  @override
  Future<void> sendPasswordResetEmail(String email) {
    return _remote.sendPasswordResetEmail(email);
  }

  @override
  Future<void> signOut() => _remote.signOut();
}
