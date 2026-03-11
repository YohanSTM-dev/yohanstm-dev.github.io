// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_controller.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$authStateChangesHash() => r'2d7276e579fd41b37376687daa7f5ca1366075c5';

/// See also [authStateChanges].
@ProviderFor(authStateChanges)
final authStateChangesProvider =
    AutoDisposeStreamProvider<UserEntity?>.internal(
      authStateChanges,
      name: r'authStateChangesProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$authStateChangesHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef AuthStateChangesRef = AutoDisposeStreamProviderRef<UserEntity?>;
String _$authControllerHash() => r'5e340beecb4eba0b2d6b3748954966a4163c5514';

/// See also [AuthController].
@ProviderFor(AuthController)
final authControllerProvider =
    AutoDisposeAsyncNotifierProvider<AuthController, void>.internal(
      AuthController.new,
      name: r'authControllerProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$authControllerHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

typedef _$AuthController = AutoDisposeAsyncNotifier<void>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
