# Yohan Saint Marc — Portfolio

Portfolio d'un développeur étudiant en **BTS SIO (option SLAM)**, présenté sous la forme d'un **bureau macOS** : barre de menu, fenêtres déplaçables, Finder, dock, thème clair/sombre et fonds d'écran au choix.

🌐 **Site en ligne :** [yohanstm-dev.github.io](https://yohanstm-dev.github.io)

---

## Sommaire

- [Aperçu](#aperçu)
- [Stack technique](#stack-technique)
- [Lancer le projet](#lancer-le-projet)
- [Structure du dépôt](#structure-du-dépôt)
- [Projets présentés](#projets-présentés)
- [Points d'attention](#points-dattention)
- [Contact](#contact)

---

## Aperçu

| Fenêtre | Contenu |
| --- | --- |
Chaque fenêtre reprend le design de l'application dont elle porte l'icône dans le dock.

| Icône du dock | Fenêtre | Contenu |
| --- | --- | --- |
| App Store | **Aide** | Page « Aujourd'hui » : mode d'emploi et liste des fenêtres avec bouton Ouvrir |
| Safari | **CV** | Parcours, formation, expériences, projets techniques, compétences |
| Chrome | **Compétences** | Logos par catégorie ; les catégories sont les dossiers de la barre de favoris |
| Finder | **Projets** | Catégories (web, applications, à venir) et fiches détaillées |
| Pages | **Contact** | Formulaire (ouvre la messagerie), e-mail, GitHub, LinkedIn |
| Launchpad | **Launchpad** | Raccourcis vers les fenêtres |
| Réglages Système | **Réglages** | Fond d'écran, apparence clair/sombre, à propos |
| (aucune) | **Navigateur** | Aperçu intégré d'un projet en ligne |

Fonctionnalités : thème clair/sombre mémorisé, fond d'écran au choix, fenêtres déplaçables, animations GSAP, réduction des animations via `prefers-reduced-motion`.

---

## Stack technique

Le site en ligne est du **HTML/CSS/JavaScript « vanilla »**, sans étape de build.

- **HTML5** et **CSS3** (variables CSS, thèmes, glassmorphism)
- **JavaScript ES6+** (aucun framework)
- **[GSAP 3.12.5](https://gsap.com/)** et ScrollTrigger, chargés depuis cdnjs
- **Hébergement :** GitHub Pages

> Le dépôt contient aussi un prototype **Next.js / React / Three.js** (`app/`, `components/`, `stores/`, `lib/`). Il n'est **pas** utilisé par le site en ligne.

---

## Lancer le projet

Aucune installation n'est nécessaire pour le site en ligne : il suffit de le servir en statique.

```bash
git clone https://github.com/YohanSTM-dev/yohanstm-dev.github.io.git
cd yohanstm-dev.github.io

# au choix
python -m http.server 8000
npx http-server .
```

Puis ouvrir <http://localhost:8000>.

Pour le prototype Next.js (facultatif) :

```bash
npm install
npm run dev
```

---

## Structure du dépôt

Fichiers qui font fonctionner le site en ligne :

```text
.
├── index.html            # Page unique (bureau macOS)
├── portfolio-new.css     # Styles principaux
├── portfolio-new.js      # Logique : fenêtres, Finder, thèmes, données des projets
├── images/               # Captures, logos et fonds d'écran (WebP)
│   ├── dock/             # Icônes du dock et du Launchpad (copies locales)
│   └── skills/           # Logos des technologies (SVG)
├── documents/            # CV au format PDF
└── projets/              # Pages de détail de chaque projet
    ├── app-action.html
    ├── ironpulse.html
    ├── resolution-mate.html
    └── ...
```

Autres dossiers présents dans le dépôt :

| Dossier | Rôle | Statut |
| --- | --- | --- |
| `app/`, `components/`, `stores/`, `lib/` | Prototype Next.js | Non utilisé en production |
| `public/` | Ancienne organisation du site (v2.0.0) | Obsolète, doublon |
| `IronPulse/`, `appAction--/`, `resolution_mate/` | Code source des projets | À terme, un dépôt par projet |
| `docs/` | Documentation interne | Voir [STRUCTURE.md](docs/STRUCTURE.md) |

---

## Projets présentés

| Projet | Technologies | Type |
| --- | --- | --- |
| FC Fulbert | HTML, CSS, SEO | Site web |
| Zoo Fulbert | HTML, CSS, JavaScript | Site web |
| Site BND | HTML, CSS, JavaScript | Site web |
| Site Photizo Agency | HTML, CSS, JavaScript | Site web |
| Présentation BTS | Reveal.js, HTML, CSS | Site web |
| Portfolio macOS | HTML, CSS, GSAP, Vanilla JS | Site web |
| IronPulse | React Native, Expo, Python, FastAPI | Application mobile |
| App Action | React, API REST, Sequelize, Docker | Application |
| Resolution Mate | Flutter, Dart, Firebase | Application mobile |
| Mini Wiki PHP | PHP, MySQL | Application |
| AppGestionWiki | .NET, C#, SQL Server | Application |
| App Grand Monarque | React, Vite, Node.js | Application |
| Projet Rust | Rust, WebAssembly | Application |

---

## Points d'attention

- Les noms de fichiers sont **sensibles à la casse** sur GitHub Pages (Linux), contrairement à Windows : `ironpulse2.png` et `ironPulse2.png` sont deux fichiers différents.
- Les images lourdes (fonds d'écran, captures) existent en version `.webp`, utilisée par le site. Les anciens `.jpg` et `.png` d'origine sont encore dans `images/` et ne sont plus référencés.
- La page principale n'utilise aucune ressource hébergée chez un tiers, hormis GSAP chargé depuis cdnjs. Les pages de détail des projets (`projets/`) chargent encore des polices Google Fonts.

---

## Crédits

- Logos des technologies : [Devicon](https://devicon.dev/) (licence MIT) et [Simple Icons](https://simpleicons.org/) (licence CC0, logo GSAP). Les logos restent la propriété de leurs marques respectives.
- Fonds d'écran : certains sont des images de macOS (propriété d'Apple), utilisées ici à titre d'illustration. La provenance des autres images n'est pas documentée.
- Icônes du dock : icônes d'applications macOS (Apple) et Chrome (Google), propriétés de leurs auteurs et utilisées ici à titre d'illustration. L'icône Finder est une version personnalisée.

---

## Contact

- 📧 [yohan.saint-marc@hotmail.com](mailto:yohan.saint-marc@hotmail.com)
- 🐙 [github.com/yohanstm-dev](https://github.com/yohanstm-dev)
- 💼 [linkedin.com/in/yohan-saint-marc](https://www.linkedin.com/in/yohan-saint-marc)
- 📍 Chartres, France

© 2026 Yohan Saint Marc
