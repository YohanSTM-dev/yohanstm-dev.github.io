import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

import '../../../../core/errors/exceptions.dart';
import '../models/user_model.dart';

abstract class AuthRemoteDataSource {
  Stream<UserModel?> authStateChanges();
  Future<UserModel?> currentUser();

  Future<UserModel> signInWithEmail(String email, String password);
  Future<UserModel> registerWithEmail(
    String email,
    String password, {
    String? displayName,
  });
  Future<UserModel> signInWithGoogle();
  Future<void> sendPasswordResetEmail(String email);
  Future<void> signOut();
}

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  AuthRemoteDataSourceImpl({
    required FirebaseAuth firebaseAuth,
    required FirebaseFirestore firestore,
    required GoogleSignIn googleSignIn,
  })  : _auth = firebaseAuth,
        _firestore = firestore,
        _googleSignIn = googleSignIn;

  final FirebaseAuth _auth;
  final FirebaseFirestore _firestore;
  final GoogleSignIn _googleSignIn;
  bool _googleInitialized = false;

  @override
  Stream<UserModel?> authStateChanges() {
    return _auth.authStateChanges().asyncMap((user) async {
      if (user == null) return null;
      return _getOrCreateUser(user);
    });
  }

  @override
  Future<UserModel?> currentUser() async {
    final user = _auth.currentUser;
    if (user == null) return null;
    return _getOrCreateUser(user);
  }

  @override
  Future<UserModel> signInWithEmail(String email, String password) async {
    try {
      final creds = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      final user = creds.user;
      if (user == null) {
        throw const AuthException('Missing user after sign-in');
      }

      return _getOrCreateUser(user);
    } on FirebaseAuthException catch (e) {
      throw AuthException(_mapAuthError(e), code: e.code);
    }
  }

  @override
  Future<UserModel> registerWithEmail(
    String email,
    String password, {
    String? displayName,
  }) async {
    try {
      final creds = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      final user = creds.user;
      if (user == null) {
        throw const AuthException('Missing user after registration');
      }

      if (displayName != null && displayName.trim().isNotEmpty) {
        await user.updateDisplayName(displayName.trim());
      }

      return _getOrCreateUser(user, displayNameOverride: displayName);
    } on FirebaseAuthException catch (e) {
      throw AuthException(_mapAuthError(e), code: e.code);
    }
  }

  @override
  Future<UserModel> signInWithGoogle() async {
    try {
      await _ensureGoogleInitialized();

      if (!_googleSignIn.supportsAuthenticate()) {
        throw const AuthException(
          'Google Sign-In not supported on this platform',
          code: 'unsupported',
        );
      }

      final googleUser = await _googleSignIn.authenticate();
      final googleAuth = googleUser.authentication;
      final idToken = googleAuth.idToken;
      if (idToken == null || idToken.isEmpty) {
        throw const AuthException(
          'Missing Google ID token',
          code: 'missing-id-token',
        );
      }

      final credential = GoogleAuthProvider.credential(
        idToken: idToken,
      );

      final creds = await _auth.signInWithCredential(credential);
      final user = creds.user;
      if (user == null) {
        throw const AuthException('Missing user after Google sign-in');
      }

      return _getOrCreateUser(user);
    } on FirebaseAuthException catch (e) {
      throw AuthException(_mapAuthError(e), code: e.code);
    }
  }

  @override
  Future<void> sendPasswordResetEmail(String email) async {
    try {
      await _auth.sendPasswordResetEmail(email: email);
    } on FirebaseAuthException catch (e) {
      throw AuthException(_mapAuthError(e), code: e.code);
    }
  }

  @override
  Future<void> signOut() async {
    await _ensureGoogleInitialized();
    await _googleSignIn.signOut();
    await _auth.signOut();
  }

  Future<void> _ensureGoogleInitialized() async {
    if (_googleInitialized) return;
    await _googleSignIn.initialize();
    _googleInitialized = true;
  }

  Future<UserModel> _getOrCreateUser(
    User user, {
    String? displayNameOverride,
  }) async {
    try {
      final docRef = _firestore.collection('users').doc(user.uid);
      final snapshot = await docRef.get();

      final effectiveDisplayName =
          (displayNameOverride != null && displayNameOverride.trim().isNotEmpty)
              ? displayNameOverride.trim()
              : (user.displayName ?? '');
      final normalizedEmail = (user.email ?? '').trim().toLowerCase();

      final baseData = <String, dynamic>{
        'uid': user.uid,
        'email': normalizedEmail,
        'displayName': effectiveDisplayName,
        'photoUrl': user.photoURL ?? '',
      };

      if (!snapshot.exists) {
        final data = {
          ...baseData,
          'createdAt': Timestamp.now(),
        };
        await docRef.set(data);
        return UserModel.fromMap(data);
      }

      final existing = snapshot.data() ?? {};
      if (!existing.containsKey('createdAt')) {
        existing['createdAt'] = Timestamp.now();
        await docRef.set(
          {'createdAt': existing['createdAt']},
          SetOptions(merge: true),
        );
      }

      await docRef.set(baseData, SetOptions(merge: true));
      final merged = {...existing, ...baseData};
      return UserModel.fromMap(merged);
    } on FirebaseException catch (e) {
      throw FirestoreException(e.message ?? 'Firestore error', code: e.code);
    }
  }

  String _mapAuthError(FirebaseAuthException e) {
    switch (e.code) {
      case 'invalid-email':
        return 'Email invalide.';
      case 'user-disabled':
        return 'Compte desactive.';
      case 'user-not-found':
      case 'wrong-password':
      case 'invalid-credential':
        return 'Email ou mot de passe incorrect.';
      case 'email-already-in-use':
        return 'Cet email est deja utilise.';
      case 'weak-password':
        return 'Mot de passe trop faible (min 6 caracteres).';
      case 'operation-not-allowed':
        return 'Ce mode de connexion est desactive.';
      case 'too-many-requests':
        return 'Trop de tentatives. Reessaie plus tard.';
      case 'account-exists-with-different-credential':
      case 'credential-already-in-use':
        return 'Compte deja associe a une autre connexion.';
      default:
        return e.message ?? 'Erreur de connexion.';
    }
  }
}
