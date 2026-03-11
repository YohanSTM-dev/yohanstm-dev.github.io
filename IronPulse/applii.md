# IronPulse — Aperçu applicatif

Application mobile (Expo/React Native) pour suivre ses séances, visualiser l’activité et gérer l’authentification via Supabase.

## Architecture front
- **Stack** : Expo + React Native, expo-router (navigation), Zustand (state), Supabase JS.
- **Dossiers clés**
  - `app/` : routes expo-router (`(auth)`, `(tabs)`, `index.tsx`, `_layout.tsx`).
  - `src/store/` : stores Zustand (`authStore`, `workoutStore`).
  - `src/lib/` : client Supabase (`supabase.ts`).
  - `src/components/` : UI et dashboard (heatmap, streak card, etc.).

## Fonctionnalités principales
- Authentification e-mail/mot de passe Supabase (inscription, connexion, déconnexion), profil auto-créé.
- Tableau de bord : accueil, streak, heatmap d’activité (12 semaines), résumé du jour, dernières séances.
- Séances :
  - Création d’une nouvelle séance nommée.
  - Ajout / suppression d’exercices, ajout / retrait de sets, saisie reps/poids, marquage complété.
  - Fin de séance → enregistrement des logs d’exercice, mise à jour des stats, statut “completed”.
  - Annulation de séance avec confirmation.
- Journal d’activité : alimentation de la heatmap par date/intensité.

## Variables d’environnement (placer dans `frontend/.env` et redémarrer Metro)
```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```
Ces clés sont lues dans `src/lib/supabase.ts`; l’app lève une erreur si absentes.

## Base de données (Supabase / PostgreSQL)
Tables principales :
- **profiles** : profil utilisateur (id = auth.users.id), streaks, totaux.
- **workouts** : séances (nom, statut planned/in_progress/completed, date, durée, calories, timestamps).
- **workout_logs** : sets par exercice (reps, poids, unité kg/lbs, complété, notes).
- **activity_log** : activité quotidienne (compte séances, sets, reps, poids total, intensité 1‑5) pour la heatmap.
- **groups / group_members** : groupes sociaux et membres (rôles owner/admin/member, code d’invitation).

Sécurité :
- RLS activé sur toutes les tables.
- Politiques “l’utilisateur ne voit/crée/met à jour que ses données” (workouts, logs, activity, profil).
- Groupes : visibilité pour groupes publics ou membres/owner ; seuls owners modifient/suppriment le groupe.

Triggers / fonctions notables :
- `handle_new_user` : crée automatiquement le profil à l’inscription.
- `update_activity_on_workout` : quand une séance passe en `completed`, calcule volume et met à jour `activity_log` + `profiles.total_workouts`.
- `calculate_streak` : calcule le streak en se basant sur l’activité quotidienne (limite de sécurité à 365 jours).
- `generate_invite_code` : génère un code d’invitation unique (8 caractères).

## Flux utilisateur
1. Connexion/inscription → redirection vers `(tabs)` après succès.
2. Onglet Accueil : chargement profil + séances + activité (`fetchProfile`, `fetchWorkouts`, `fetchActivityLog`).
3. Démarrage séance : modal “Nouvelle séance” → création Supabase → passage en “En cours”.
4. Pendant la séance : ajout d’exercices/sets, suivi des poids/reps, marquage complété.
5. Fin séance : confirmation → insertion des logs, mise à jour stats et activity_log, statut `completed`.
6. Heatmap et streak se mettent à jour au prochain chargement ou via `fetchActivityLog`.

## Commandes utiles
- Démarrer en dev : `cd frontend && npx expo start`
- Lint : `cd frontend && npm run lint`
- Rebuild cache Metro : `cd frontend && npx expo start -c`

## Notes i18n
Les libellés principaux de l’app et du schéma sont en français. Si besoin de multi-langues, prévoir une couche i18n (p. ex. i18next) et externaliser les chaînes.
