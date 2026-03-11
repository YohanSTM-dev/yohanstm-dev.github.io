class AppException implements Exception {
  final String message;
  final String? code;

  const AppException(this.message, {this.code});

  @override
  String toString() {
    if (code == null) return message;
    return '$message (code: $code)';
  }
}

class AuthException extends AppException {
  const AuthException(super.message, {super.code});
}

class FirestoreException extends AppException {
  const FirestoreException(super.message, {super.code});
}
