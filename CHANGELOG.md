# Changelog

Toutes les modifications notables du projet sont documentées dans ce fichier.

## [2.0.0] - Mars 2026 - Architecture Refactor

### 🏗️ Changements majeurs

#### Nouvelle structure organisée
- ✅ Création de `public/` comme racine servable
- ✅ Organisation des assets : `public/assets/{images,styles,scripts}`
- ✅ Pages dans `public/pages/` avec sous-dossier `projects/`
- ✅ Documentation centralisée dans `docs/`
- ✅ Projets dans dossier dédié `projects/`

#### Renommage des fichiers
```
templatemo-prism-flux.css   → public/assets/styles/main.css
style.css                   → public/assets/styles/theme.css
projects-theme.css         → public/assets/styles/projects.css
templatemo-prism-scripts.js → public/assets/scripts/main.js
index.html                  → public/index.html
```

#### Mise à jour des chemins
- Tous les chemins CSS/JS/images mis à jour dans les fichiers HTML
- Navigation relative corrigée pour la nouvelle structure
- Accès PDF documenté : `../../documents/`

### 📚 Documentation nouvelle

- ✅ [README.md](README.md) - Vue d'ensemble et quick start
- ✅ [docs/STRUCTURE.md](docs/STRUCTURE.md) - Architecture détaillée
- ✅ [docs/README.md](docs/README.md) - Guide de documentation
- ✅ [.gitignore](.gitignore) - Fichiers à ignorer

### 🎨 Aucun changement visuel
- Design, couleurs et interactions inchangés
- Tous les assets et styles préservés
- Fonctionnalité identique

### 🔧 Maintenance facilitée
- Structure claire et scalable
- Conventions de nommage documentées
- Chemins relatifs expliqués
- Processus d'ajout de projets simplifié

---

## [1.0.0] - Avant Mars 2026

### Ancienne structure
- Fichiers CSS en racine
- Fichiers JS en racine
- Images en dossier `images/`
- Pages de projets dans `projets/`
- Architecture mélangée

---

## 🔙 Migration depuis v1.0

### Avant
```
/
├── index.html
├── templatemo-prism-flux.css
├── templatemo-prism-scripts.js
├── style.css
├── images/
└── projets/
    ├── cv-yohanStm.html
    ├── app-action.html
    └── ...
```

### Après
```
/
├── public/
│   ├── index.html
│   ├── assets/
│   │   ├── styles/
│   │   ├── scripts/
│   │   └── images/
│   └── pages/
│       ├── cv.html
│       └── projects/
├── projects/
├── docs/
└── README.md
```

### Checklist migration
- ✅ Tous les fichiers migré
- ✅ Chemins relatifs corrigés
- ✅ CSS/JS/Images en place
- ✅ Pages HTML réorganisées
- ✅ Documentation créée
- ✅ .gitignore configuré

---

## 🚀 Prochaines étapes (v2.1+)

### À considérer
- [ ] Build system (Vite) pour minification
- [ ] Image optimization pipeline
- [ ] Automated testing
- [ ] CI/CD avec GitHub Actions
- [ ] Dark mode support
- [ ] i18n (multilingue)
- [ ] Sitemap.xml généré automatiquement

---

## 📝 Notes de version

### v2.0 (Current)
- **Date** : Mars 2026
- **Auteur** : Yohan Saint Marc
- **Raison** : Professionnalisation de l'architecture
- **Breaking Changes** : Non (juste réorganisation)
- **Status** : ✅ Stable

---

## 🔗 Liens associés

- [README.md](README.md) - Documentation générale
- [docs/STRUCTURE.md](docs/STRUCTURE.md) - Architecture détaillée
- [.gitignore](.gitignore) - Fichiers ignorés
- [GitHub](https://github.com/yohanstm-dev)

---

**Mainteneur :** Yohan Saint Marc  
**Dernière mise à jour :** 15 Mars 2026
