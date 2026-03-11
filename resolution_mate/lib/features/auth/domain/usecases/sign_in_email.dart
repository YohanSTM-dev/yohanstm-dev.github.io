import '../entities/user_entity.dart';
import '../repositories/auth_repository.dart';

class SignInWithEmail {
  final AuthRepository repository;
  const SignInWithEmail(this.repository);

  Future<UserEntity> call({
    required String email,
    required String password,
  }) {
    return repository.signInWithEmail(email, password);
  }
}
