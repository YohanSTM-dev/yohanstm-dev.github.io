import '../entities/user_entity.dart';
import '../repositories/auth_repository.dart';

class SignInWithGoogle {
  final AuthRepository repository;
  const SignInWithGoogle(this.repository);

  Future<UserEntity> call() => repository.signInWithGoogle();
}
