// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'goals_controller.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$goalsStreamHash() => r'ef25567ab74ce9831ff98bb31f9eb5b00a1306c7';

/// Copied from Dart SDK
class _SystemHash {
  _SystemHash._();

  static int combine(int hash, int value) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + value);
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
    return hash ^ (hash >> 6);
  }

  static int finish(int hash) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
    // ignore: parameter_assignments
    hash = hash ^ (hash >> 11);
    return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
  }
}

/// See also [goalsStream].
@ProviderFor(goalsStream)
const goalsStreamProvider = GoalsStreamFamily();

/// See also [goalsStream].
class GoalsStreamFamily extends Family<AsyncValue<List<GoalEntity>>> {
  /// See also [goalsStream].
  const GoalsStreamFamily();

  /// See also [goalsStream].
  GoalsStreamProvider call({GoalType? type}) {
    return GoalsStreamProvider(type: type);
  }

  @override
  GoalsStreamProvider getProviderOverride(
    covariant GoalsStreamProvider provider,
  ) {
    return call(type: provider.type);
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'goalsStreamProvider';
}

/// See also [goalsStream].
class GoalsStreamProvider extends AutoDisposeStreamProvider<List<GoalEntity>> {
  /// See also [goalsStream].
  GoalsStreamProvider({GoalType? type})
    : this._internal(
        (ref) => goalsStream(ref as GoalsStreamRef, type: type),
        from: goalsStreamProvider,
        name: r'goalsStreamProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$goalsStreamHash,
        dependencies: GoalsStreamFamily._dependencies,
        allTransitiveDependencies: GoalsStreamFamily._allTransitiveDependencies,
        type: type,
      );

  GoalsStreamProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.type,
  }) : super.internal();

  final GoalType? type;

  @override
  Override overrideWith(
    Stream<List<GoalEntity>> Function(GoalsStreamRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: GoalsStreamProvider._internal(
        (ref) => create(ref as GoalsStreamRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        type: type,
      ),
    );
  }

  @override
  AutoDisposeStreamProviderElement<List<GoalEntity>> createElement() {
    return _GoalsStreamProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is GoalsStreamProvider && other.type == type;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, type.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin GoalsStreamRef on AutoDisposeStreamProviderRef<List<GoalEntity>> {
  /// The parameter `type` of this provider.
  GoalType? get type;
}

class _GoalsStreamProviderElement
    extends AutoDisposeStreamProviderElement<List<GoalEntity>>
    with GoalsStreamRef {
  _GoalsStreamProviderElement(super.provider);

  @override
  GoalType? get type => (origin as GoalsStreamProvider).type;
}

String _$userProgressForDateHash() =>
    r'c01da493479876387fa80250ce29ed1d71609d98';

/// See also [userProgressForDate].
@ProviderFor(userProgressForDate)
const userProgressForDateProvider = UserProgressForDateFamily();

/// See also [userProgressForDate].
class UserProgressForDateFamily extends Family<AsyncValue<ProgressLogEntity?>> {
  /// See also [userProgressForDate].
  const UserProgressForDateFamily();

  /// See also [userProgressForDate].
  UserProgressForDateProvider call({
    required GoalEntity goal,
    required DateTime date,
  }) {
    return UserProgressForDateProvider(goal: goal, date: date);
  }

  @override
  UserProgressForDateProvider getProviderOverride(
    covariant UserProgressForDateProvider provider,
  ) {
    return call(goal: provider.goal, date: provider.date);
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'userProgressForDateProvider';
}

/// See also [userProgressForDate].
class UserProgressForDateProvider
    extends AutoDisposeStreamProvider<ProgressLogEntity?> {
  /// See also [userProgressForDate].
  UserProgressForDateProvider({
    required GoalEntity goal,
    required DateTime date,
  }) : this._internal(
         (ref) => userProgressForDate(
           ref as UserProgressForDateRef,
           goal: goal,
           date: date,
         ),
         from: userProgressForDateProvider,
         name: r'userProgressForDateProvider',
         debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
             ? null
             : _$userProgressForDateHash,
         dependencies: UserProgressForDateFamily._dependencies,
         allTransitiveDependencies:
             UserProgressForDateFamily._allTransitiveDependencies,
         goal: goal,
         date: date,
       );

  UserProgressForDateProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.goal,
    required this.date,
  }) : super.internal();

  final GoalEntity goal;
  final DateTime date;

  @override
  Override overrideWith(
    Stream<ProgressLogEntity?> Function(UserProgressForDateRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: UserProgressForDateProvider._internal(
        (ref) => create(ref as UserProgressForDateRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        goal: goal,
        date: date,
      ),
    );
  }

  @override
  AutoDisposeStreamProviderElement<ProgressLogEntity?> createElement() {
    return _UserProgressForDateProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is UserProgressForDateProvider &&
        other.goal == goal &&
        other.date == date;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, goal.hashCode);
    hash = _SystemHash.combine(hash, date.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin UserProgressForDateRef
    on AutoDisposeStreamProviderRef<ProgressLogEntity?> {
  /// The parameter `goal` of this provider.
  GoalEntity get goal;

  /// The parameter `date` of this provider.
  DateTime get date;
}

class _UserProgressForDateProviderElement
    extends AutoDisposeStreamProviderElement<ProgressLogEntity?>
    with UserProgressForDateRef {
  _UserProgressForDateProviderElement(super.provider);

  @override
  GoalEntity get goal => (origin as UserProgressForDateProvider).goal;
  @override
  DateTime get date => (origin as UserProgressForDateProvider).date;
}

String _$groupProgressHash() => r'b0989948b6a1dec51e91eacadd8a4245d4013738';

/// See also [groupProgress].
@ProviderFor(groupProgress)
const groupProgressProvider = GroupProgressFamily();

/// See also [groupProgress].
class GroupProgressFamily extends Family<AsyncValue<List<GroupProgressEntry>>> {
  /// See also [groupProgress].
  const GroupProgressFamily();

  /// See also [groupProgress].
  GroupProgressProvider call({
    required GoalEntity goal,
    required DateTime date,
  }) {
    return GroupProgressProvider(goal: goal, date: date);
  }

  @override
  GroupProgressProvider getProviderOverride(
    covariant GroupProgressProvider provider,
  ) {
    return call(goal: provider.goal, date: provider.date);
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'groupProgressProvider';
}

/// See also [groupProgress].
class GroupProgressProvider
    extends AutoDisposeFutureProvider<List<GroupProgressEntry>> {
  /// See also [groupProgress].
  GroupProgressProvider({required GoalEntity goal, required DateTime date})
    : this._internal(
        (ref) => groupProgress(ref as GroupProgressRef, goal: goal, date: date),
        from: groupProgressProvider,
        name: r'groupProgressProvider',
        debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
            ? null
            : _$groupProgressHash,
        dependencies: GroupProgressFamily._dependencies,
        allTransitiveDependencies:
            GroupProgressFamily._allTransitiveDependencies,
        goal: goal,
        date: date,
      );

  GroupProgressProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.goal,
    required this.date,
  }) : super.internal();

  final GoalEntity goal;
  final DateTime date;

  @override
  Override overrideWith(
    FutureOr<List<GroupProgressEntry>> Function(GroupProgressRef provider)
    create,
  ) {
    return ProviderOverride(
      origin: this,
      override: GroupProgressProvider._internal(
        (ref) => create(ref as GroupProgressRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        goal: goal,
        date: date,
      ),
    );
  }

  @override
  AutoDisposeFutureProviderElement<List<GroupProgressEntry>> createElement() {
    return _GroupProgressProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is GroupProgressProvider &&
        other.goal == goal &&
        other.date == date;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, goal.hashCode);
    hash = _SystemHash.combine(hash, date.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin GroupProgressRef
    on AutoDisposeFutureProviderRef<List<GroupProgressEntry>> {
  /// The parameter `goal` of this provider.
  GoalEntity get goal;

  /// The parameter `date` of this provider.
  DateTime get date;
}

class _GroupProgressProviderElement
    extends AutoDisposeFutureProviderElement<List<GroupProgressEntry>>
    with GroupProgressRef {
  _GroupProgressProviderElement(super.provider);

  @override
  GoalEntity get goal => (origin as GroupProgressProvider).goal;
  @override
  DateTime get date => (origin as GroupProgressProvider).date;
}

String _$goalsControllerHash() => r'70d8e4d2d028fce17888a24967e9e7113f40f523';

/// See also [GoalsController].
@ProviderFor(GoalsController)
final goalsControllerProvider =
    AutoDisposeAsyncNotifierProvider<GoalsController, void>.internal(
      GoalsController.new,
      name: r'goalsControllerProvider',
      debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
          ? null
          : _$goalsControllerHash,
      dependencies: null,
      allTransitiveDependencies: null,
    );

typedef _$GoalsController = AutoDisposeAsyncNotifier<void>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
