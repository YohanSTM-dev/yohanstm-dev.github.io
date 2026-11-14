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
| **Accueil** | Présentation et accès rapide aux sections |
| **CV** | Parcours, formation, expériences, lien vers le PDF |
| **Skills** | Compétences par catégorie : Front-end, Back-end, Ops & Outils |
| **Projets** | Finder avec catégories (web, applications, à venir) et fiches détaillées |
| **Contact** | E-mail, GitHub, LinkedIn |
| **Launchpad** | Grille de lancement des applications |
| **Navigateur** | Navigateur intégré pour ouvrir les projets en ligne |
| **Réglages** | Thème et fond d'écran |

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
├── images/               # Captures, logos et fonds d'écran
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
- Plusieurs images dans `images/` dépassent 1 Mo. Une conversion en WebP est prévue.

---

## Contact

- 📧 [yohan.saint-marc@hotmail.com](mailto:yohan.saint-marc@hotmail.com)
- 🐙 [github.com/yohanstm-dev](https://github.com/yohanstm-dev)
- 💼 [linkedin.com/in/yohan-saint-marc](https://www.linkedin.com/in/yohan-saint-marc)
- 📍 Chartres, France

© 2026 Yohan Saint Marc
