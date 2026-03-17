# 📚 Documentation

Bienvenue dans la section documentation du portfolio. Tous les guides et ressources pour comprendre et modifier le projet.

## 📖 Fichiers disponibles

### [README.md](../README.md)
**Documentation générale du projet**
- Vue d'ensemble
- Architecture
- Stack technique
- Quick start
- Contact

### [STRUCTURE.md](./STRUCTURE.md)
**Guide détaillé de l'architecture**
- Hiérarchie complète des fichiers
- Règles de chemins relatifs
- Conventions de nommage (CSS, JS, images, HTML)
- Architecture CSS et JS
- Comment ajouter un nouveau projet
- Performance et SEO
- Troubleshooting

## 🎯 Guides rapides

### Pour les bases
1. Lire [README.md](../README.md) complètement
2. Lancer localement : `python -m http.server 8000`
3. Explorer `public/` et `public/assets/`

### Pour modifier/ajouter
1. Consulter [STRUCTURE.md](./STRUCTURE.md) - section "Ajouter un nouveau projet"
2. Suivre les chemins relatifs correctement
3. Tester localement avant de commit

### Pour optimiser
1. Compress les images : https://tinypng.com
2. Vérifier Lighthouse : DevTools → Lighthouse
3. Tester responsive : F12 → Device toolbar

## 📁 Structure

```
docs/
├── README.md              # Ce fichier
├── STRUCTURE.md          # Documentation architecture
└── data/                 # (Optionnel) Exemples, schemas
```

## 🔍 Index des chemins importants

**Page d'accueil :** `public/index.html`  
**CV :** `public/pages/cv.html`  
**Projets :** `public/pages/projects/*.html`  
**Styles :** `public/assets/styles/`  
**Images :** `public/assets/images/`  
**Scripts :** `public/assets/scripts/`  

## ✅ Checklist déploiement

Avant de pusher :
- [ ] Tous les chemins testés localement
- [ ] Pas d'erreurs console (F12)
- [ ] Images optimisées
- [ ] Lighthouse score acceptable
- [ ] Responsive testé sur mobile
- [ ] Tous les liens externes vérifiés

## 💡 Tips & Tricks

### Debug rapide
```bash
# Serveur avec hot-reload
python -m http.server 8000 --bind 127.0.0.1

# Vérifier images manquantes
grep -r "assets/images" public/ | grep https://
```

### Performance
- Limiter CSS en haut du HTML
- Defer JavaScript en bas
- Lazy load les images si besoin
- Minify CSS/JS en production

### Maintenance
- Tester tous les liens chaque trimestre
- Audit Lighthouse mensuel
- Backup des projets importants
- Keep CHANGELOG.md à jour

## 📞 Questions?

Voir [contact dans README](../README.md#-contact)

---

**Dernière mise à jour :** Mars 2026  
**Pour explorer le code :** Ouvrir `public/` avec VS Code
