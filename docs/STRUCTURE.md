# Structure du Projet Portfolio

## Guide détaillé de l'architecture

### 📂 Hiérarchie complète

```
yohanstm-dev.github.io/
├── public/                                 # 🌐 ROOT - Fichiers servables
│   ├── index.html                         # Page d'accueil principale
│   ├── assets/
│   │   ├── images/
│   │   │   ├── cyber-defense.jpg          # Portrait professionnel
│   │   │   ├── neural-network.jpg         # AppAction preview
│   │   │   ├── blockchain-vault.jpg       # IronPulse preview
│   │   │   ├── logoFCFulbert.png          # FC Fulbert
│   │   │   └── ... (autres images)
│   │   ├── styles/
│   │   │   ├── main.css                   # CSS principal (Tailwind + custom)
│   │   │   ├── theme.css                  # Variables CSS, thème global
│   │   │   └── projects.css               # Styles des pages de détail
│   │   └── scripts/
│   │       ├── main.js                    # JS principal (sliders, form, modals)
│   │       └── projects.js                # (Optionnel) interactions projets
│   └── pages/
│       ├── cv.html                        # CV Professionnel avec timeline
│       └── projects/
│           ├── app-action.html
│           ├── ironpulse.html
│           ├── resolution-mate.html
│           ├── cluedo.html
│           ├── fc-fulbert.html
│           └── cv-yohanStm.html           # (Legacy, à fusionner avec cv.html)
│
├── projects/                              # 📦 Contenu des projets
│   ├── app-action/                        # Démos, sources des projets
│   │   ├── frontend/
│   │   └── backend/
│   ├── ironpulse/
│   │   ├── README.md
│   │   └── ...
│   ├── resolution-mate/
│   │   ├── lib/
│   │   └── ... (Flutter)
│   └── ...
│
├── docs/                                  # 📚 Documentation
│   ├── README.md
│   ├── STRUCTURE.md                       # Ce fichier
│   └── API.md                             # (Optionnel) docs API
│
├── documents/                             # 📋 Ressources
│   └── cv-yohan-saint-marc.pdf
│
├── .git/                                  # Version control
├── .gitignore                             # Fichiers ignorés
├── README.md                              # Documentation générale
└── STRUCTURE.md                           # Documentation structure
```

---

## 🔄 Chemins relatifs - Règles importantes

### Depuis `public/index.html` (racine)
```
Ressource              → Chemin
images/*              → assets/images/*
styles                → assets/styles/*
scripts               → assets/scripts/*
pdf                   → documents/*
CV page               → pages/cv.html
Project pages         → pages/projects/*.html
```

### Depuis `public/pages/cv.html`
```
Ressource              → Chemin
index.html            → ../index.html
images/*              → ../assets/images/*
styles                → ../assets/styles/*
pdf                   → ../../documents/*
```

### Depuis `public/pages/projects/*.html`
```
Ressource              → Chemin
index.html            → ../../index.html
images/*              → ../../assets/images/*
styles                → ../../assets/styles/*
projects folder       → ../../../projects/*
```

---

## 🎯 Conventions de nommage

### CSS
- Classes : `kebab-case` → `.project-card`, `.timeline-item`, `.btn-primary`
- IDs : `camelCase` → `#projectModal`, `#contactForm`
- BEM when applicable → `.block__element--modifier`

### JavaScript
- Variables/Functions : `camelCase` → `openProjectModal()`, `projectsData`
- Constants : `UPPER_SNAKE_CASE` → `MAX_PROJECTS`, `API_URL`
- Classes : `PascalCase` → `ProjectCard`, `FormValidator`

### Images
- Format : `kebab-case-descriptor.ext` → `cyber-defense.jpg`, `profile-portrait.png`
- Keep size < 500KB (compress avec TinyPNG/Squoosh)
- Use JPG for photos, PNG for graphics/logos

### HTML Files
- Lowercase avec tirets → `project-detail.html`
- Index files pour rooting → `index.html`
- Ne pas utiliser d'espaces ou caractères spéciaux

---

## 📊 CSS Architecture

### Hiérarchie et cascade

**main.css** (Tailwind + overrides)
```
1. Imports (Tailwind)
2. CSS Variables :root
3. Base / Reset
4. Typography
5. Layout (Grid, Flexbox)
6. Components (Forms, Buttons)
7. Utilities
```

**theme.css** (Variables et thème)
```css
:root {
    /* Colors */
    --primary-color: #e61c3c;
    --secondary-color: #a855f7;
    --bg-900: #0f1217;
    --text-100: #f5f7fa;
    
    /* Spacing */
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
    
    /* Typography */
    --font-sans: 'Manrope', sans-serif;
    --font-display: 'Sora', sans-serif;
    
    /* Gradients */
    --gradient-normal: linear-gradient(135deg, #e61c3c, #a855f7);
}
```

**projects.css** (Pages détail projets)
```
1. Hero section styles
2. Timeline styles
3. Project specific components
4. Responsive overrides
```

---

## 🎬 JavaScript architecture

### main.js Structure

```javascript
// 1. Configuration data
const projectsData = [...]
const skillsData = [...]

// 2. DOM utilities
const DOM = { ... }

// 3. Component functions
function createProjectCard() { ... }
function openProjectModal() { ... }

// 4. Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialization
})

// 5. Form handling
document.getElementById('contactForm').addEventListener('submit', () => { ... })
```

### Module separation (optionnel future)
```
assets/scripts/
├── main.js                 # Point d'entrée
├── modules/
│   ├── projects.js        # Logique projets
│   ├── skills.js          # Logique compétences
│   ├── form.js            # Gestion formulaire
│   └── utils.js           # Utilitaires
```

---

## 🔧 Ajouter un nouveau projet

### Step 1 : Créer la page HTML
```bash
# Copier depuis template
cp public/pages/projects/app-action.html public/pages/projects/mon-projet.html
```

### Step 2 : Éditer le contenu
- Mise à jour title, descriptions
- Ajouter images (dans assets/images/)
- Mettre à jour les métadonnées

### Step 3 : Ajouter dans projectsData
```javascript
// public/assets/scripts/main.js
const projectsData = [
    {
        id: 'mon-projet',
        title: 'Mon Projet',
        summary: 'Description courte',
        details: 'Description longue',
        image: 'assets/images/mon-projet.jpg',
        preview: 'pages/projects/mon-projet.html',
        github: 'https://github.com/...',
        tech: ['React', 'Node.js', 'MongoDB']
    },
    // ... autres projets
]
```

### Step 4 : Optimiser images
```bash
# Utiliser TinyPNG ou
npx squoosh-cli --webp assets/images/mon-projet.jpg
```

---

## 🚀 Build & Deployment

### Local Development
```bash
python -m http.server 8000
# Navigate to http://localhost:8000
```

### GitHub Pages Deployment
```bash
# Automatic via branch main
# Files served from public/ root
```

### Checklist avant déploiement
- [ ] Tous les chemins relatifs corrects
- [ ] Images optimisées < 500KB
- [ ] Liens externes vérifiés
- [ ] Mobile responsive testé
- [ ] Lighthouse score > 90
- [ ] Pas de console errors

---

## 📈 Performance

### Optimisations en place
- ✅ Images optimisées (JPG progressive, PNG avec Zopfli)
- ✅ CSS minifié via Tailwind
- ✅ JavaScript vanilla (0 dépendances)
- ✅ Lazy loading pour images (optionnel)
- ✅ Caching headers configurés

### Metrics cibles
- **Lighthouse** : > 90/100
- **PageSpeed** : > 85/100
- **LCP** : < 2.5s
- **CLS** : < 0.1
- **TTL** : < 3s

---

## 🔐 Sécurité & SEO

### SEO
- [ ] Meta tags (OG, Twitter, etc)
- [ ] Schema.org JSON-LD
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Semantic HTML

### Sécurité
- [ ] HTTPS enabled (GitHub Pages)
- [ ] CSP headers
- [ ] No inline scripts (optionnel)
- [ ] XSS protection via sanitization

---

## 📝 Maintenance

### Tâches régulières
- [ ] Mettre à jour projets (description, images)
- [ ] Vérifier liens externes
- [ ] Audit Lighthouse mensuel
- [ ] Vérifier compatibilité navigateurs
- [ ] Meter à jour dépendances (si applicable)

### Monitoring
- Google Analytics pour traffic
- GitHub Issues pour bugs
- Pull requests pour improvements

---

## 🆘 Troubleshooting

### Chemins cassés
→ Vérifier la profondeur : combien de `../` faut-il ?

### Images ne s'affichent pas
→ Vérifier que l'image existe dans `assets/images/`
→ Vérifier le chemin relatif depuis le fichier HTML

### Styles ne s'appliquent pas
→ Vérifier cache navigateur (Ctrl+Shift+Del)
→ Vérifier la spécificité CSS

### JavaScript ne fonctionne pas
→ Vérifier console (F12 > Console)
→ Vérifier que main.js est chargé
→ Vérifier que DOM est prêt avant script

---

**Dernière mise à jour :** Mars 2026  
**Version architecture :** 2.0 (refactored structure)
**Mainteneur :** Yohan Saint Marc
