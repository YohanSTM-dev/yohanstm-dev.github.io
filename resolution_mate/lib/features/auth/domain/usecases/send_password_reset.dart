import '../repositories/auth_repository.dart';

class SendPasswordReset {
  final AuthRepository _repository;

  SendPasswordReset(this._repository);

  Future<void> call(String email) {
    return _repository.sendPasswordResetEmail(email);
  }
}
