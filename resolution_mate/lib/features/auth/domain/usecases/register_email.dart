import '../entities/user_entity.dart';
import '../repositories/auth_repository.dart';

class RegisterWithEmail {
  final AuthRepository repository;
  const RegisterWithEmail(this.repository);

  Future<UserEntity> call({
    required String email,
    required String password,
    String? displayName,
  }) {
    return repository.registerWithEmail(
      email,
      password,
      displayName: displayName,
    );
  }
}
