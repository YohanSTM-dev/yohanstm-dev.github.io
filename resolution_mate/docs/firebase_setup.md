# Firebase Setup

**1. Creer le projet**
- Firebase Console > Add project
- Nom du projet: `resolutionmate` (ou celui utilise par FlutterFire)

**2. Ajouter les apps**
- Android: telecharge `google-services.json` et place-le dans `android/app/`
- iOS: telecharge `GoogleService-Info.plist` et place-le dans `ios/Runner/`
- Web: ajoute la config si besoin

**3. Activer Auth**
- Authentication > Sign-in method
- Active `Email/Password`
- Active `Google` si tu utilises le web ou mobile

**4. Regles Firestore**
Copie les regles depuis `docs/firestore.rules` dans Firestore > Rules, puis Publish.

**5. Indexes Firestore**
Les indexes recommandés sont dans `docs/firestore.indexes.json`.
Tu peux:
- les creer via Firebase Console > Firestore > Indexes
- ou utiliser Firebase CLI avec `firebase deploy --only firestore:indexes`

**6. Lancer l'app**
- `flutter pub get`
- `flutter run`

Note: Google Sign-In n'est pas supporte sur Windows desktop. Utilise le web
ou mobile pour tester cette methode.
