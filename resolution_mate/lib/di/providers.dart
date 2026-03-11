import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../features/auth/data/datasources/auth_remote_data_source.dart';
import '../features/auth/data/repositories/auth_repository_impl.dart';
import '../features/auth/domain/repositories/auth_repository.dart';
import '../features/auth/domain/usecases/register_email.dart';
import '../features/auth/domain/usecases/send_password_reset.dart';
import '../features/auth/domain/usecases/sign_in_email.dart';
import '../features/auth/domain/usecases/sign_in_google.dart';
import '../features/auth/domain/usecases/sign_out.dart';
import '../features/goals/data/datasources/goals_remote_data_source.dart';
import '../features/goals/data/repositories/goals_repository_impl.dart';
import '../features/goals/domain/repositories/goals_repository.dart';
import '../features/goals/domain/usecases/clear_progress_status.dart';
import '../features/goals/domain/usecases/create_goal.dart';
import '../features/goals/domain/usecases/fetch_group_progress.dart';
import '../features/goals/domain/usecases/resolve_participant_ids.dart';
import '../features/goals/domain/usecases/set_progress_status.dart';
import '../features/goals/domain/usecases/watch_goals.dart';
import '../features/goals/domain/usecases/watch_user_progress.dart';

part 'providers.g.dart';

@riverpod
FirebaseAuth firebaseAuth(Ref ref) => FirebaseAuth.instance;

@riverpod
FirebaseFirestore firestore(Ref ref) => FirebaseFirestore.instance;

@riverpod
GoogleSignIn googleSignIn(Ref ref) => GoogleSignIn.instance;

@riverpod
AuthRemoteDataSource authRemoteDataSource(Ref ref) {
  return AuthRemoteDataSourceImpl(
    firebaseAuth: ref.watch(firebaseAuthProvider),
    firestore: ref.watch(firestoreProvider),
    googleSignIn: ref.watch(googleSignInProvider),
  );
}

@riverpod
AuthRepository authRepository(Ref ref) {
  return AuthRepositoryImpl(
    remote: ref.watch(authRemoteDataSourceProvider),
  );
}

@riverpod
SignInWithEmail signInWithEmail(Ref ref) {
  return SignInWithEmail(ref.watch(authRepositoryProvider));
}

@riverpod
RegisterWithEmail registerWithEmail(Ref ref) {
  return RegisterWithEmail(ref.watch(authRepositoryProvider));
}

@riverpod
SignInWithGoogle signInWithGoogle(Ref ref) {
  return SignInWithGoogle(ref.watch(authRepositoryProvider));
}

@riverpod
SendPasswordReset sendPasswordReset(Ref ref) {
  return SendPasswordReset(ref.watch(authRepositoryProvider));
}

@riverpod
SignOut signOut(Ref ref) {
  return SignOut(ref.watch(authRepositoryProvider));
}

@riverpod
GoalsRemoteDataSource goalsRemoteDataSource(Ref ref) {
  return GoalsRemoteDataSourceImpl(
    firestore: ref.watch(firestoreProvider),
  );
}

@riverpod
GoalsRepository goalsRepository(Ref ref) {
  return GoalsRepositoryImpl(
    remote: ref.watch(goalsRemoteDataSourceProvider),
  );
}

@riverpod
CreateGoal createGoal(Ref ref) {
  return CreateGoal(ref.watch(goalsRepositoryProvider));
}

@riverpod
WatchGoals watchGoals(Ref ref) {
  return WatchGoals(ref.watch(goalsRepositoryProvider));
}

@riverpod
WatchUserProgress watchUserProgress(Ref ref) {
  return WatchUserProgress(ref.watch(goalsRepositoryProvider));
}

@riverpod
SetProgressStatus setProgressStatus(Ref ref) {
  return SetProgressStatus(ref.watch(goalsRepositoryProvider));
}

@riverpod
ClearProgressStatus clearProgressStatus(Ref ref) {
  return ClearProgressStatus(ref.watch(goalsRepositoryProvider));
}

@riverpod
FetchGroupProgress fetchGroupProgress(Ref ref) {
  return FetchGroupProgress(ref.watch(goalsRepositoryProvider));
}

@riverpod
ResolveParticipantIds resolveParticipantIds(Ref ref) {
  return ResolveParticipantIds(ref.watch(goalsRepositoryProvider));
}
