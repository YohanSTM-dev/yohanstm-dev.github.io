# GoalMate Docs

**Overview**
GoalMate est une application de suivi d'objectifs personnels et collectifs.  
Elle permet de creer des objectifs, suivre la progression quotidienne, et
voir l'etat du groupe pour les objectifs partages.

**Stack**
- Flutter (Material 3)
- Firebase Auth + Firestore
- Riverpod (code generation)
- Clean Architecture (Data, Domain, Presentation)

**Architecture**
- Data: acces Firebase, models, repositories
- Domain: entities + usecases
- Presentation: pages + controllers Riverpod

**Structure**
- `lib/core`: theme, widgets, utilitaires
- `lib/di`: providers Riverpod
- `lib/features/auth`: authentification
- `lib/features/goals`: objectifs + progression
- `lib/features/social`: vue groupe

**Firebase**
Consulte `docs/firebase_setup.md` pour les etapes de configuration,
les regles Firestore et les indexes.

**Data model**
Voir `docs/data_model.md` pour les collections et champs.

**Run**
1. `flutter pub get`
2. `flutter run`
