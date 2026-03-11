import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../di/providers.dart';
import '../../domain/entities/user_entity.dart';

part 'auth_controller.g.dart';

@riverpod
Stream<UserEntity?> authStateChanges(Ref ref) {
  return ref.watch(authRepositoryProvider).authStateChanges();
}

@riverpod
class AuthController extends _$AuthController {
  @override
  FutureOr<void> build() {}

  Future<void> signInWithEmail({
    required String email,
    required String password,
  }) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await ref.read(signInWithEmailProvider).call(
            email: email,
            password: password,
          );
    });
  }

  Future<void> registerWithEmail({
    required String email,
    required String password,
    String? displayName,
  }) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await ref.read(registerWithEmailProvider).call(
            email: email,
            password: password,
            displayName: displayName,
          );
    });
  }

  Future<void> signInWithGoogle() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await ref.read(signInWithGoogleProvider).call();
    });
  }

  Future<void> sendPasswordReset({required String email}) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await ref.read(sendPasswordResetProvider).call(email);
    });
  }

  Future<void> signOut() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await ref.read(signOutProvider).call();
    });
  }
}
