'use strict';

const THEME_STORAGE_KEY = 'yohan-portfolio-theme';
const mobileLayoutQuery = window.matchMedia('(max-width: 960px), (hover: none) and (pointer: coarse)');

const finderCategoryLabels = {
    web:    'Sites web',
    apps:   'Applications',
    future: 'À venir'
};

const finderProjects = {
    web: [
        {
            title: 'FC Fulbert',
            status: 'live',
            statusLabel: 'En ligne',
            year: '2025',
            stack: ['HTML', 'CSS', 'SEO'],
            summary: "Projet de référencement SEO autour du mot-clé « FC Fulbert », réalisé durant le BTS SIO avec <a href='https://mesangeantoine.fr/' target='_blank' rel='noopener'>Antoine Mesange</a>.",
            href: 'https://fcfulbertchartres.github.io/',
            accent: ['#1D4ED8', '#1e3a8a'],
            logo: 'images/logoFCFulbert.webp',
            screenshots: [
                { src: 'images/fcfulbert1.webp', label: 'Page d’accueil' },
            ],

        },
        {
            title: 'Zoo Fulbert',
            status: 'live',
            statusLabel: 'En ligne',
            year: '2025',
            stack: ['HTML', 'CSS', 'JavaScript'],
            summary: 'Site vitrine pour un zoo fictif. Galerie interactive et fiches animaux.',
            href: 'https://zoofulbert.com/',
            accent: ['#15803D', '#14532d'],
            screenshots: [
                { src: 'images/zoofulbert1.webp', label: 'Page d’accueil' },
            ],

        },
        {
            title: 'Site BND',
            status: 'En cours',
            statusLabel: 'En cours',
            year: '2025',
            stack: ['HTML', 'CSS', 'JavaScript'],
            summary: 'Site vitrine pour une entreprise événementielle. Design soigné, responsive.',
            description: `J'ai réalisé un site web fictif pour BND, une entreprise spécialisée dans l'accompagnement de prestataires dans la création d'événements d'entreprise.<br><br>L'objectif du projet était de concevoir une plateforme mettant en avant les services proposés et facilitant la compréhension de l'activité de l'entreprise.<br><br>Ce travail m'a permis de :<br><br>• Structurer un site vitrine professionnel<br>• Mettre en valeur une activité de services événementiels<br>• Améliorer mes compétences en design et développement web`,
            href: '#',
            accent: ['#0E7490', '#164e63']
        },
        {
            title: 'Site Photizo Agency',
            status: 'En cours',
            statusLabel: 'En cours',
            year: '2025',
            stack: ['HTML', 'CSS', 'JavaScript'],
            summary: `Site vitrine pour une agence de photographie fictive. Galerie immersive.`,
            description: `J'ai conçu un site web pour Phorizo Agency, une entreprise fictive de photographie.<br><br>L'objectif était de créer une vitrine en ligne présentant les services photographiques et les réalisations de l'entreprise.<br><br>Ce projet m'a permis de :<br><br>• Travailler sur l'identité visuelle d'une agence créative<br>• Mettre en avant un portfolio d'images et de services<br>• Développer mes compétences en conception de site vitrine`,
            href: '#',
            accent: ['#92400E', '#451a03']
        },
        {
            title: 'Présentation BTS',
            status: 'live',
            statusLabel: 'Terminé',
            year: '2025',
            stack: ['Reveal.js', 'HTML', 'CSS'],
            summary: 'Présentation interactive du BTS SIO avec Reveal.js. Slides dynamiques.',
            description: `J'ai réalisé une présentation interactive du BTS SIO en utilisant Reveal.js. L'objectif était de présenter le domaine de l'informatique ainsi que les compétences que j'ai acquises et que je suis capable de mettre en œuvre.<br><br>Ce projet m'a permis de :<br><br>• Découvrir et utiliser Reveal.js pour créer une présentation web dynamique<br>• Structurer un contenu clair et professionnel autour du BTS SIO<br>• Mettre en avant mes compétences en développement et en informatique`,
            logo: 'images/logoSansTitre.jpg',
            href: 'https://yohanstm-dev.github.io/PresentationBTS/#/home',
            accent: ['#1D4ED8', '#1e3a8a'],
            screenshots: [
                { src: 'images/capPresentationBts.webp', label: 'Page d’accueil' },
            ],
        },
        {
            title: 'Portfolio macOS',
            status: 'live',
            statusLabel: 'Ce site',
            year: '2026',
            stack: ['HTML', 'CSS', 'GSAP', 'Vanilla JS'],
            summary: 'Portfolio macOS — dock magnétique, glassmorphism, thèmes et GSAP.',
            href: 'index.html',
            accent: ['#4F46E5', '#312e81'],
            logo: 'images/logoSansTitre.jpg',
            screenshots: [
                { src: 'images/capPresentationBts.webp', label: 'Page d’accueil' },
            ]
        }
    ],
    apps: [
        {
            title: 'IronPulse',
            status: 'wip',
            statusLabel: 'En cours',
            year: '2025',
            stack: ['React Native', 'Expo', 'Python', 'FastAPI'],
            summary: 'App mobile fitness. Entraînements, journaux et API Python.',
            href: 'projets/ironpulse.html',
            accent: ['#16A34A', '#14532d'],
            screenshots: [
            { src: 'images/ironpulse1.png',   label: 'Accueil' },
            { src: 'images/ironpulse2.png',  label: 'Services' },
            { src: 'images/ironpulse3.png',   label: 'Contact' },
        ],

        },
        {
            title: 'App Action',
            status: 'wip',
            statusLabel: 'En cours',
            year: '2026',
            stack: ['React', 'API REST', 'Sequelize', 'Docker'],
            summary: 'Application de gestion de magasin : plannings, conges, paie et taches par role.',
            description: `Cahier des charges de l'application AppAction pour centraliser la gestion d'un magasin : planning, conges, paie et taches.<br><br>Utilisateurs cibles : Employe, Manager, RH et Administrateur.<br><br>Fonctionnalites : authentification securisee, gestion des roles, planning, conges, fiches de paie et taches.<br><br>Ressource base de donnees (Looping) : <a href="images/appAction/ActionBdd (1).jpeg" target="_blank" rel="noopener">ouvrir le fichier .loo</a>.`,
            href: 'https://github.com/YohanSTM-dev/appAction',
            accent: ['#2563EB', '#1e3a8a'],
            logo: 'images/appAction/GestionMagasinAppAction.jpeg',
            screenshots: [
                { src: 'images/appAction/GestionMagasinAppAction.jpeg', label: 'Interface AppAction' }
            ]
        },
        {
            title: 'Resolution Mate - App de gestion',
            status: 'En cours',
            statusLabel: 'En cours',
            year: '2025',
            stack: ['Flutter', 'Dart', 'Firebase'],
            summary: 'App mobile d’objectifs. Suivi quotidien, progression et rappels.',
            href: 'projets/resolution-mate.html',
            accent: ['#7C3AED', '#4c1d95'],
            screenshots: [
                { src: 'images/resolutionmate1.png',   label: 'Accueil' },
                { src: 'images/resolutionmate2.png',  label: 'Services' },
                { src: 'images/resolutionmate3.png',   label: 'Contact' },

            ]
        },
        {
            title: 'Mini Wiki PHP',
            status: 'live',
            statusLabel: 'Terminé',
            year: '2025',
            stack: ['PHP', 'MySQL', 'HTML', 'CSS'],
            summary: `Wiki auto-hébergé. Articles, catégories et recherche en PHP/MySQL.`,
            href: '#',
            accent: ['#B45309', '#78350f'],
            screenshots: [
            { src: 'images/MiniWiki.jpeg',   label: 'Accueil' },
            { src: 'images/miniwiki2.png',  label: 'Services' },
            { src: 'images/miniwiki3.png',   label: 'Contact' },
        ],
        },
        {
            title: 'AppGestionWiki',
            status: 'wip',
            statusLabel: 'En cours',
            year: '2026',
            stack: ['.NET', 'C#', 'SQL Server'],
            summary: 'Application de gestion interne. CRUD complet, authentification et reporting.',
            href: '#',
            accent: ['#6D28D9', '#3b0764']
        },
        {
            title: 'App Grand Monarque',
            status: 'wip',
            statusLabel: 'En cours',
            year: '2026',
            stack: ['React', 'Vite', 'Node.js', 'CSS'],
            summary: `Application web pour l'hôtel Grand Monarque. Réservations et gestion.`,
            href: 'https://github.com/PaulRedler/GestionVin',
            accent: ['#B45309', '#431407']
        }
    ],
    future: [
        {
            title: 'Projet Rust',
            status: 'upcoming',
            statusLabel: 'À venir',
            year: '2026',
            stack: ['Rust', 'WebAssembly'],
            summary: 'App système en WebAssembly. Performance native et interface minimaliste.',
            href: '#',
            accent: ['#C2410C', '#7c2d12']
        }
    ]
};

const skillCategories = [
    {
        name: 'Front-end',
        skills: [
            { label: 'HTML5',        icon: 'html' },
            { label: 'CSS3',         icon: 'css' },
            { label: 'JavaScript',   icon: 'javascript' },
            { label: 'TypeScript',   icon: 'typescript' },
            { label: 'React',        icon: 'react' },
            { label: 'React Native', icon: 'react' },
            { label: 'Next.js',      icon: 'nextjs' },
            { label: 'Vite',         icon: 'vite' },
        ]
    },
    {
        name: 'Back-end',
        skills: [
            { label: 'Node.js',  icon: 'node' },
            { label: 'Express',  icon: 'express' },
            { label: 'PHP',      icon: 'php' },
            { label: 'Symfony',  icon: 'symfony' },
            { label: 'C#',       icon: 'csharp' },
            { label: '.NET',     icon: 'dotnet' },
            { label: 'Blazor',   icon: 'blazor' },
            { label: 'Prisma',   icon: 'prisma' },
            { label: 'Python (bases)', icon: 'python' },
        ]
    },
    {
        name: 'Bases de données',
        skills: [
            { label: 'PostgreSQL', icon: 'postgresql' },
            { label: 'SQL Server', icon: 'sqlserver' },
            { label: 'MySQL',      icon: 'mysql' },
            { label: 'Supabase',   icon: 'supabase' },
        ]
    },
    {
        name: 'Outils',
        skills: [
            { label: 'Git',    icon: 'git' },
            { label: 'GitHub', icon: 'github' },
            { label: 'Docker', icon: 'docker' },
            { label: 'Nginx',  icon: 'nginx' },
            { label: 'Linux',  icon: 'linux' },
        ]
    }
];

const state = {
    activeWindows: new Set(),
    minimizedWindows: new Set(),
    zIndex: 120,
    timelineInitialized: false,
    currentFinderCategory: 'web'
};

const _projectMap = {};

// ── Wallpaper definitions ─────────────────────────────────────────
const WALLPAPER_KEY = 'yohan-wallpaper-id';
const wallpapers = [
    { id: 'macfond1', type: 'image', src: 'images/macFond1.webp',                                    label: 'Mac Fond 1' },
    { id: 'macfond2', type: 'image', src: 'images/macFond2.jpg',                                    label: 'Mac Fond 2' },
    { id: 'magenta',  type: 'image', src: 'images/magenta-nature.webp',      label: 'Magenta Nature' },
    { id: 'fond',     type: 'image', src: 'images/fond.webp',                                        label: 'Fond Violet' },
    { id: 'aurora',  type: 'gradient', value: 'radial-gradient(ellipse at 20% 10%,#0d1b44 0%,#1a0533 40%,#0a0118 100%) center/cover', label: 'Aurora' },
    { id: 'sunset',  type: 'gradient', value: 'radial-gradient(ellipse at 70% 20%,#ff6b35 0%,#ff1493 40%,#1a0533 100%) center/cover', label: 'Coucher de soleil' },
    { id: 'ocean',   type: 'gradient', value: 'linear-gradient(160deg,#0a0e2e 0%,#0d3b5e 40%,#1a0533 100%) center/cover', label: 'Océan Profond' },
    { id: 'void',    type: 'gradient', value: 'linear-gradient(160deg,#0a0a0a 0%,#1a1a2e 50%,#0d0d0d 100%) center/cover', label: 'Vide Noir' },
];

function applyWallpaper(wallpaperObj) {
    const val = wallpaperObj.type === 'image'
        ? `url('${wallpaperObj.src}') center/cover no-repeat`
        : wallpaperObj.value;
    document.documentElement.style.setProperty('--wallpaper-bg', val);
}

function folderIcon(topColor, bottomColor) {
    return `
        <svg class="finder-card__icon" viewBox="0 0 96 72" aria-hidden="true">
            <path d="M10 18.8A8.8 8.8 0 0 1 18.8 10h21.3c2.3 0 4.5.94 6.12 2.6l4.23 4.2H76a10 10 0 0 1 10 10V50A10 10 0 0 1 76 60H20A10 10 0 0 1 10 50V18.8Z" fill="${topColor}"/>
            <path d="M10 25a8.3 8.3 0 0 1 8.3-8.3H46l4.8 4.9H76a10 10 0 0 1 10 10v18.1A10.3 10.3 0 0 1 75.7 60H20.3A10.3 10.3 0 0 1 10 49.7V25Z" fill="${bottomColor}"/>
            <path d="M18 26h60" stroke="rgba(255,255,255,.44)" stroke-linecap="round" stroke-width="1.2"/>
        </svg>
    `;
}

function updateThemeMeta() {
    const metaTheme = document.getElementById('themeColorMeta');
    if (!metaTheme) {
        return;
    }

    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim();
    if (themeColor) {
        metaTheme.setAttribute('content', themeColor);
    }
}

function applyTheme(theme, persist = true) {
    document.documentElement.dataset.theme = theme;

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.setAttribute('aria-pressed', String(theme === 'light'));
    }

    if (persist) {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }

    window.requestAnimationFrame(updateThemeMeta);
}

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    applyTheme(savedTheme, false);

    const toggle = document.getElementById('themeToggle');
    if (!toggle) {
        return;
    }

    toggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
    });
}

function initClock() {
    const timeNode = document.getElementById('menuTime');
    if (!timeNode) {
        return;
    }

    const formatter = new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const update = () => {
        timeNode.textContent = formatter.format(new Date());
    };

    update();
    window.setInterval(update, 1000);
}

function renderSkillsCategory(catIdx) {
    const grid    = document.getElementById('skillsFinderGrid');
    const pathEl  = document.getElementById('skillsFinderPath');
    const countEl = document.getElementById('skillsFinderCount');
    if (!grid || !pathEl || !countEl) { return; }

    const cat = skillCategories[catIdx];
    if (!cat) { return; }

    grid.innerHTML = '';

    cat.skills.forEach(function(skill) {
        const tile = document.createElement('div');
        tile.className = 'skill-tile';
        tile.innerHTML =
            '<span class="skill-tile__icon"' + (skill.bg ? ' style="background:' + skill.bg + '"' : '') + '>' +
                '<img src="images/skills/' + skill.icon + '.svg" alt="" width="44" height="44" decoding="async">' +
            '</span>' +
            '<span class="skill-tile__label">' + skill.label + '</span>';
        grid.appendChild(tile);
    });

    pathEl.textContent  = 'Skills / ' + cat.name;
    countEl.textContent = cat.skills.length + ' élément' + (cat.skills.length > 1 ? 's' : '');
}

function renderSkills() {
    const grid = document.getElementById('skillsFinderGrid');
    if (!grid) { return; }

    const buttons = Array.from(document.querySelectorAll('.finder__category[data-skill-cat]'));
    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            buttons.forEach(function(b) { b.classList.remove('is-active'); });
            btn.classList.add('is-active');
            renderSkillsCategory(Number(btn.dataset.skillCat));
        });
    });

    renderSkillsCategory(0);
}


function makeFinderCard(project, category, idx) {
    const key = `${category}:${idx}`;
    _projectMap[key] = project;

    const statusClass = {
        live: 'finder-card__status--live',
        wip: 'finder-card__status--wip',
        upcoming: 'finder-card__status--upcoming'
    }[project.status] || '';

    const stackHtml = project.stack
        .map(t => `<span class="finder-card__tag">${t}</span>`)
        .join('');

    return `
        <div class="finder-card" data-project-key="${key}" role="button" tabindex="0" style="--card-a:${project.accent[0]};--card-b:${project.accent[1]}" aria-label="${project.title}">
            <div class="finder-card__stripe"></div>
            <div class="finder-card__hero">
                <span class="finder-card__status ${statusClass}">${project.statusLabel}</span>
            </div>
            <div class="finder-card__body">
                <div class="finder-card__meta-row">
                    <strong class="finder-card__title">${project.title}</strong>
                    <span class="finder-card__year">${project.year}</span>
                </div>
                <p class="finder-card__text">${project.summary}</p>
                <div class="finder-card__stack">${stackHtml}</div>
            </div>
        </div>
    `;
}

function renderFinder(category) {
    state.currentFinderCategory = category;

    const grid = document.getElementById('finderGrid');
    const path = document.getElementById('finderPath');
    const count = document.getElementById('finderCount');
    if (!grid || !path || !count) {
        return;
    }

    const projects = finderProjects[category] || [];
    grid.innerHTML = projects.map((p, i) => makeFinderCard(p, category, i)).join('');
    path.textContent = `Portfolio / ${finderCategoryLabels[category] || 'Projets'}`;
    count.textContent = `${projects.length} élément${projects.length > 1 ? 's' : ''}`;
}

function initFinder() {
    const buttons = Array.from(document.querySelectorAll('.finder__category[data-category]'));
    if (!buttons.length) {
        return;
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((item) => item.classList.remove('is-active'));
            button.classList.add('is-active');
            renderFinder(button.dataset.category);
        });
    });

    renderFinder(state.currentFinderCategory);

    const finderGrid = document.getElementById('finderGrid');
    if (finderGrid) {
        finderGrid.addEventListener('click', (e) => {
            const card = e.target.closest('[data-project-key]');
            if (!card) return;
            const project = _projectMap[card.dataset.projectKey];
            if (project) openProjectModal(project);
        });
        finderGrid.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const card = e.target.closest('[data-project-key]');
            if (!card) return;
            const project = _projectMap[card.dataset.projectKey];
            if (project) { e.preventDefault(); openProjectModal(project); }
        });
    }
}

function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('projectModalContent');
    if (!modal || !content) return;

    const badgeClass = {
        live: 'pm-badge--live',
        wip: 'pm-badge--wip',
        upcoming: 'pm-badge--upcoming'
    }[project.status] || 'pm-badge--live';

    const a1 = project.accent[0];
    const a2 = project.accent[1];
    const letter = project.title.charAt(0).toUpperCase();
    const hasHref = project.href && project.href !== '#' && project.href !== 'index.html';

    const iconHtml = project.logo
        ? `<div class="pm-hero__icon pm-hero__icon--img" style="box-shadow:0 8px 24px ${a1}66"><img src="${project.logo}" alt="${project.title}"></div>`
        : `<div class="pm-hero__icon" style="background:linear-gradient(135deg,${a1},${a2});box-shadow:0 8px 24px ${a1}66">${letter}</div>`;

    const scOpacity = ['55', '30', '40', '20', '35'];
    const screenshots = (project.screenshots && project.screenshots.length)
        ? project.screenshots.map(s => {
            const src   = typeof s === 'string' ? s : s.src;
            const label = typeof s === 'string' ? '' : (s.label || '');
            return `<div class="pm-screenshot pm-screenshot--img"><img src="${src}" alt="${label}" loading="lazy"><span>${label}</span></div>`;
        }).join('')
        : ['Apercu', 'Interface', 'Details', 'Fonctions', 'Extras'].map((label, i) =>
            `<div class="pm-screenshot" style="background:linear-gradient(135deg,${a2} 0%,${a1}${scOpacity[i]} 100%)"><span>${label}</span></div>`
        ).join('');

    const stackHtml = project.stack.map(t => `<span class="pm-tag">${t}</span>`).join('');
    const ctaHtml = hasHref
        ? `<a class="pm-btn pm-btn--accent" href="${project.href}" target="_blank" rel="noopener" style="background:${a1}">Voir le projet ↗</a>`
        : '';
    const desc = project.description || project.summary;

    content.innerHTML = `
        <div class="pm-hero">
            <div class="pm-hero__bg" style="background:radial-gradient(ellipse at 30% 60%,${a1}66 0%,${a2} 55%,#0a0a0a 100%)"></div>
            <div class="pm-hero__overlay"></div>
            <div class="pm-hero__content">
                ${iconHtml}
                <div class="pm-hero__info">
                    <h2 class="pm-hero__title">${project.title}</h2>
                    <p class="pm-hero__year">${project.year}</p>
                </div>
            </div>
        </div>
        <div class="pm-action-bar">
            <span class="pm-badge ${badgeClass}">${project.statusLabel}</span>
            <div style="display:flex;gap:8px">
                ${ctaHtml}
                <button class="pm-btn pm-btn--ghost" id="pmCloseBtn" type="button">Fermer ✕</button>
            </div>
        </div>
        <div class="pm-screenshots-outer" id="pmScreenshots">
            <div class="pm-screenshots-row">${screenshots}</div>
        </div>
        <div class="pm-content">
            <div class="pm-section">
                <p class="pm-section-title">A propos</p>
                <p class="pm-desc">${desc}</p>
            </div>
            <div class="pm-section">
                <p class="pm-section-title">Technologies</p>
                <div class="pm-stack">${stackHtml}</div>
            </div>
            <dl class="pm-info-sheet">
                <div class="pm-info-row"><dt>Annee</dt><dd>${project.year}</dd></div>
                <div class="pm-info-row"><dt>Statut</dt><dd>${project.statusLabel}</dd></div>
                <div class="pm-info-row"><dt>Stack</dt><dd>${project.stack.slice(0, 3).join(', ')}</dd></div>
            </dl>
        </div>
    `;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    document.getElementById('pmCloseBtn').addEventListener('click', closeProjectModal);

    // Lightbox sur les screenshots
    document.querySelectorAll('#pmScreenshots .pm-screenshot--img img').forEach(img => {
        img.addEventListener('click', () => openScrLightbox(img.src, img.alt));
    });

    const strip = document.getElementById('pmScreenshots');
    let isDrag = false, sx = 0, sl = 0;
    strip.addEventListener('mousedown', e => { isDrag = true; strip.classList.add('is-dragging'); sx = e.pageX - strip.offsetLeft; sl = strip.scrollLeft; });
    window.addEventListener('mouseup', () => { isDrag = false; strip.classList.remove('is-dragging'); }, { once: false });
    strip.addEventListener('mousemove', e => { if (!isDrag) return; e.preventDefault(); strip.scrollLeft = sl - (e.pageX - strip.offsetLeft - sx) * 1.4; });
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    const sheet = document.getElementById('projectModalSheet');
    if (sheet) sheet.scrollTop = 0;
}

function initProjectModal() {
    const backdrop = document.getElementById('projectModalBackdrop');
    if (backdrop) backdrop.addEventListener('click', closeProjectModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const lb = document.getElementById('screenshotLightbox');
            if (lb && lb.classList.contains('is-open')) { closeScrLightbox(); return; }
            closeProjectModal();
        }
    });
}

/* ---- Screenshot lightbox ---- */
function openScrLightbox(src, alt) {
    const lb  = document.getElementById('screenshotLightbox');
    const img = document.getElementById('scrLightboxImg');
    if (!lb || !img) return;
    img.src = src;
    img.alt = alt || '';
    lb.classList.add('is-open');
}
function closeScrLightbox() {
    const lb = document.getElementById('screenshotLightbox');
    if (lb) lb.classList.remove('is-open');
}
function initScrLightbox() {
    const close = document.getElementById('scrLightboxClose');
    const lb    = document.getElementById('screenshotLightbox');
    if (close) close.addEventListener('click', closeScrLightbox);
    if (lb)    lb.addEventListener('click', e => { if (e.target === lb) closeScrLightbox(); });
}

function centerWindow(windowNode) {
    if (!windowNode) {
        return;
    }

    const shell = windowNode.querySelector('.mac-window__shell');
    const shellW = shell ? shell.offsetWidth : 0;
    const shellH = shell ? shell.offsetHeight : 0;
    const desktopH = window.innerHeight - (30 + 14 + 110); // menuHeight + dockBottom + dockHeight
    const desktopTop = 30;

    const left = Math.max(8, (window.innerWidth - shellW) / 2);
    const top = Math.max(desktopTop + 8, desktopTop + (desktopH - shellH) / 2);

    windowNode.style.left = left + 'px';
    windowNode.style.top = top + 'px';
    windowNode.style.transform = 'none';
}

function revealWindow(windowNode) {
    if (!windowNode) {
        return;
    }

    windowNode.hidden = false;
    windowNode.setAttribute('aria-hidden', 'false');
    windowNode.classList.add('is-open');
}

function hideWindow(windowNode) {
    if (!windowNode) {
        return;
    }

    windowNode.classList.remove('is-open');
    windowNode.hidden = true;
    windowNode.setAttribute('aria-hidden', 'true');
}

function bringToFront(windowNode) {
    state.zIndex += 1;
    windowNode.style.zIndex = String(state.zIndex);
}

function updateDockIndicators() {
    const items = Array.from(document.querySelectorAll('.dock__item[data-window-trigger]'));

    items.forEach((item) => {
        const targetId = item.dataset.windowTrigger;
        const isActive = state.activeWindows.has(targetId);
        item.classList.toggle('is-active', isActive && !mobileLayoutQuery.matches);
    });
}

function openWindow(windowId) {
    const windowNode = document.getElementById(windowId);
    if (!windowNode) {
        return;
    }

    if (state.activeWindows.has(windowId) && !mobileLayoutQuery.matches) {
        bringToFront(windowNode);
        return;
    }

    if (mobileLayoutQuery.matches) {
        if (windowId !== 'window-launchpad') {
            windowNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (windowId === 'window-cv') {
            initTimeline();
        }
        return;
    }

    state.activeWindows.add(windowId);
    windowNode.hidden = false;
    windowNode.setAttribute('aria-hidden', 'false');
    // Reset position so centering is accurate
    windowNode.style.left = '';
    windowNode.style.top = '';
    windowNode.style.transform = '';
    windowNode.classList.remove('is-open');
    void windowNode.offsetWidth;
    window.requestAnimationFrame(() => {
        centerWindow(windowNode);
        windowNode.classList.add('is-open');
    });
    bringToFront(windowNode);
    updateDockIndicators();

    if (windowId === 'window-cv') {
        window.setTimeout(initTimeline, 80);
    }
}

function closeWindow(windowId) {
    const windowNode = document.getElementById(windowId);
    if (!windowNode) {
        return;
    }

    if (mobileLayoutQuery.matches) {
        return;
    }

    state.activeWindows.delete(windowId);
    windowNode.classList.remove('is-open');
    windowNode.setAttribute('aria-hidden', 'true');

    const finishClose = () => {
        if (!state.activeWindows.has(windowId)) {
            windowNode.hidden = true;
        }
        windowNode.removeEventListener('transitionend', finishClose);
    };

    windowNode.addEventListener('transitionend', finishClose);
    window.setTimeout(finishClose, 420);
    updateDockIndicators();
}

function closeAllWindows() {
    if (mobileLayoutQuery.matches) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    Array.from(state.activeWindows).forEach(closeWindow);
}

function toggleWindow(windowId) {
    if (state.activeWindows.has(windowId) && !mobileLayoutQuery.matches) {
        const windowNode = document.getElementById(windowId);
        if (windowNode) {
            bringToFront(windowNode);
        }
        return;
    }

    openWindow(windowId);
}

function syncResponsiveLayout() {
    const stackWindows = Array.from(document.querySelectorAll('[data-mobile-stack="true"]'));
    const launchpadWindow = document.getElementById('window-launchpad');

    if (mobileLayoutQuery.matches) {
        stackWindows.forEach(revealWindow);
        if (launchpadWindow) {
            hideWindow(launchpadWindow);
            state.activeWindows.delete('window-launchpad');
        }
        initTimeline();
    } else {
        stackWindows.forEach((windowNode) => {
            if (state.activeWindows.has(windowNode.id)) {
                revealWindow(windowNode);
                bringToFront(windowNode);
            } else {
                hideWindow(windowNode);
            }
        });

        if (launchpadWindow) {
            if (state.activeWindows.has('window-launchpad')) {
                revealWindow(launchpadWindow);
                bringToFront(launchpadWindow);
            } else {
                hideWindow(launchpadWindow);
            }
        }
    }

    if (typeof window.ScrollTrigger !== 'undefined') {
        window.setTimeout(() => window.ScrollTrigger.refresh(), 120);
    }

    updateDockIndicators();
}

function initDockMagnify() {
    // Magnification is handled purely by CSS (scale + sibling selectors).
    // No JS needed for hover scaling.
}

function initWindowDrag(windowNode) {
    const toolbar = windowNode.querySelector('.mac-window__toolbar');
    if (!toolbar) {
        return;
    }

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let origLeft = 0;
    let origTop = 0;
    let shellW = 0;
    let shellH = 0;
    let rafId = null;
    let lastDx = 0;
    let lastDy = 0;

    toolbar.addEventListener('pointerdown', (e) => {
        if (e.target.closest('button')) {
            return;
        }
        if (mobileLayoutQuery.matches) {
            return;
        }

        dragging = true;
        const rect = windowNode.getBoundingClientRect();
        origLeft = rect.left;
        origTop = rect.top;
        startX = e.clientX;
        startY = e.clientY;

        // Cache shell dimensions once (doesn't change during drag)
        const shell = windowNode.querySelector('.mac-window__shell');
        shellW = shell ? shell.offsetWidth : windowNode.offsetWidth;
        shellH = shell ? shell.offsetHeight : windowNode.offsetHeight;

        // Freeze position in left/top, clear any open-animation transform
        windowNode.style.left = origLeft + 'px';
        windowNode.style.top = origTop + 'px';
        windowNode.style.transform = 'none';

        toolbar.setPointerCapture(e.pointerId);
        document.body.classList.add('is-dragging-window');
        bringToFront(windowNode);
    });

    toolbar.addEventListener('pointermove', (e) => {
        if (!dragging) {
            return;
        }
        lastDx = e.clientX - startX;
        lastDy = e.clientY - startY;

        // Throttle to one layout write per animation frame
        if (rafId) { return; }
        rafId = window.requestAnimationFrame(() => {
            rafId = null;
            const minLeft = 0;
            const maxLeft = window.innerWidth - shellW;
            const minTop = 30;
            const maxTop = window.innerHeight - 40;

            const clampedDx = Math.min(maxLeft - origLeft, Math.max(minLeft - origLeft, lastDx));
            const clampedDy = Math.min(maxTop - origTop, Math.max(minTop - origTop, lastDy));

            // Move only via transform — pure compositor layer, zero layout cost
            windowNode.style.transform = 'translate(' + clampedDx + 'px,' + clampedDy + 'px)';
        });
    });

    const endDrag = (e) => {
        if (!dragging) {
            return;
        }
        dragging = false;
        if (rafId) {
            window.cancelAnimationFrame(rafId);
            rafId = null;
        }

        // Commit final position to left/top, reset transform
        if (e) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const finalLeft = Math.min(window.innerWidth - shellW, Math.max(0, origLeft + dx));
            const finalTop = Math.min(window.innerHeight - 40, Math.max(30, origTop + dy));
            windowNode.style.left = finalLeft + 'px';
            windowNode.style.top = finalTop + 'px';
        }
        windowNode.style.transform = 'none';
        document.body.classList.remove('is-dragging-window');
    };

    toolbar.addEventListener('pointerup', endDrag);
    toolbar.addEventListener('pointercancel', endDrag);
}

function minimizeWindow(windowId) {
    const windowNode = document.getElementById(windowId);
    if (!windowNode || !windowNode.classList.contains('is-open')) return;
    if (mobileLayoutQuery.matches) return;

    const dockItem = document.querySelector(`.dock__item[data-window-trigger="${windowId}"]`);
    let tx = 0, ty = 0;
    if (dockItem) {
        const dockRect = dockItem.getBoundingClientRect();
        const winRect  = windowNode.getBoundingClientRect();
        tx = (dockRect.left + dockRect.width  / 2) - (winRect.left + winRect.width  / 2);
        ty = (dockRect.top  + dockRect.height / 2) - (winRect.top  + winRect.height / 2);
    }
    windowNode.style.setProperty('--minimize-tx', tx + 'px');
    windowNode.style.setProperty('--minimize-ty', ty + 'px');
    windowNode.classList.add('is-minimizing');

    state.activeWindows.delete(windowId);
    state.minimizedWindows.add(windowId);
    if (dockItem) dockItem.classList.add('has-minimized');

    const finish = () => {
        windowNode.classList.remove('is-minimizing', 'is-open');
        windowNode.hidden = true;
        windowNode.setAttribute('aria-hidden', 'true');
        windowNode.removeEventListener('animationend', finish);
    };
    windowNode.addEventListener('animationend', finish);
    updateDockIndicators();
}

function initWindowControls() {
    const triggerButtons  = Array.from(document.querySelectorAll('[data-window-trigger]'));
    const launchButtons   = Array.from(document.querySelectorAll('[data-launch-open]'));
    const closeButtons    = Array.from(document.querySelectorAll('[data-close-window]'));
    const centerButtons   = Array.from(document.querySelectorAll('[data-center-window]'));
    const minimizeButtons = Array.from(document.querySelectorAll('.traffic-lights__button--minimize'));
    const windows         = Array.from(document.querySelectorAll('.mac-window'));

    triggerButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.windowTrigger;
            // Restore from minimized state instead of toggling
            if (state.minimizedWindows.has(targetId)) {
                state.minimizedWindows.delete(targetId);
                button.classList.remove('has-minimized');
                openWindow(targetId);
            } else {
                toggleWindow(targetId);
            }
        });
    });

    launchButtons.forEach((button) => {
        button.addEventListener('click', () => {
            openWindow(button.dataset.launchOpen);
            closeWindow('window-launchpad');
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const parentWindow = button.closest('.mac-window');
            if (parentWindow) {
                closeWindow(parentWindow.id);
            }
        });
    });

    centerButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const parentWindow = button.closest('.mac-window');
            if (parentWindow) {
                centerWindow(parentWindow);
            }
        });
    });

    minimizeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const parentWindow = button.closest('.mac-window');
            if (parentWindow) minimizeWindow(parentWindow.id);
        });
    });

    windows.forEach((windowNode) => {
        windowNode.addEventListener('pointerdown', () => {
            if (!mobileLayoutQuery.matches && windowNode.classList.contains('is-open')) {
                bringToFront(windowNode);
            }
        });
        initWindowDrag(windowNode);
    });

    const closeAllButton = document.getElementById('closeAllWindows');
    if (closeAllButton) {
        closeAllButton.addEventListener('click', closeAllWindows);
    }
}

function updateThemePickerState(settingsWindow) {
    const current = document.documentElement.dataset.theme || 'dark';
    settingsWindow.querySelectorAll('[data-theme-set]').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.themeSet === current));
        btn.classList.toggle('is-active', btn.dataset.themeSet === current);
    });
}

function initWallpaperPicker() {
    const grid = document.getElementById('wallpaperGrid');
    if (!grid) return;

    const savedId = localStorage.getItem(WALLPAPER_KEY) || 'macfond1';

    const currentPreview = document.getElementById('wallpaperCurrentPreview');
    const currentName = document.getElementById('wallpaperCurrentName');
    const showCurrent = (wp) => {
        if (currentPreview) {
            currentPreview.style.background = wp.type === 'image'
                ? `url('${wp.src}') center/cover no-repeat`
                : wp.value;
        }
        if (currentName) { currentName.textContent = wp.label; }
    };
    showCurrent(wallpapers.find((wp) => wp.id === savedId) || wallpapers[0]);

    wallpapers.forEach((wp) => {
        const thumb = document.createElement('button');
        thumb.className = 'wallpaper-thumb' + (wp.id === savedId ? ' is-active' : '');
        thumb.type = 'button';
        thumb.setAttribute('aria-label', wp.label);
        thumb.setAttribute('title', wp.label);

        // Preview background
        const preview = document.createElement('span');
        preview.className = 'wallpaper-thumb__preview';
        preview.style.background = wp.type === 'image'
            ? `url('${wp.src}') center/cover no-repeat`
            : wp.value;

        const check = document.createElement('span');
        check.className = 'wallpaper-thumb__check';
        check.setAttribute('aria-hidden', 'true');
        check.innerHTML = `<svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

        const label = document.createElement('span');
        label.className = 'wallpaper-thumb__label';
        label.textContent = wp.label;

        thumb.appendChild(preview);
        thumb.appendChild(check);
        thumb.appendChild(label);

        thumb.addEventListener('click', () => {
            applyWallpaper(wp);
            showCurrent(wp);
            localStorage.setItem(WALLPAPER_KEY, wp.id);
            grid.querySelectorAll('.wallpaper-thumb').forEach((t) => t.classList.remove('is-active'));
            thumb.classList.add('is-active');
        });

        grid.appendChild(thumb);
    });

    // Wire sidebar panel switching
    const settingsWindow = document.getElementById('window-settings');
    if (settingsWindow) {
        settingsWindow.querySelectorAll('[data-settings-panel]').forEach((btn) => {
            btn.addEventListener('click', () => {
                settingsWindow.querySelectorAll('[data-settings-panel]').forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');
                settingsWindow.querySelectorAll('.settings-panel').forEach((p) => p.hidden = true);
                const panel = settingsWindow.querySelector(`#panel-${btn.dataset.settingsPanel}`);
                if (panel) panel.hidden = false;
                const settingsTitle = document.getElementById('windowSettingsTitle');
                if (settingsTitle) { settingsTitle.textContent = btn.textContent.trim(); }
            });
        });

        // Wire theme toggle buttons in Apparence panel
        settingsWindow.querySelectorAll('[data-theme-set]').forEach((btn) => {
            btn.addEventListener('click', () => {
                applyTheme(btn.dataset.themeSet);
                updateThemePickerState(settingsWindow);
            });
        });
        updateThemePickerState(settingsWindow);
    }
}

function initTimeline() {
    if (state.timelineInitialized) {
        if (typeof window.ScrollTrigger !== 'undefined') {
            window.ScrollTrigger.refresh();
        }
        return;
    }

    if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
        return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    const scroller = document.getElementById('cvScrollArea');
    const timeline = document.getElementById('timelineExperience');
    const progressPath = document.getElementById('timelineProgressPath');
    const cards = window.gsap.utils.toArray('.timeline-card');

    if (!scroller || !timeline || !progressPath || !cards.length) {
        return;
    }

    const length = progressPath.getTotalLength();
    progressPath.style.strokeDasharray = `${length}`;
    progressPath.style.strokeDashoffset = `${length}`;

    window.gsap.set(cards, { autoAlpha: 0, y: 46 });

    cards.forEach((card) => {
        window.gsap.to(card, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                scroller,
                start: 'top 78%',
                end: 'top 54%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    window.gsap.to(progressPath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: timeline,
            scroller,
            start: 'top 18%',
            end: 'bottom bottom',
            scrub: 0.35
        }
    });

    state.timelineInitialized = true;
    window.ScrollTrigger.refresh();
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('contactFeedback');
    if (!form || !feedback) {
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            feedback.textContent = 'Merci de compléter les champs requis avant l’envoi.';
            form.reportValidity();
            return;
        }

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        const subject = encodeURIComponent(`Portfolio MacOS - ${name}`);
        const body = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`);
        const mailtoHref = `mailto:yohan.saint-marc@hotmail.com?subject=${subject}&body=${body}`;

        feedback.textContent = 'Votre client mail va s’ouvrir avec le message prérempli.';
        window.location.href = mailtoHref;
    });
}

function initProjectBrowser() {
    const browserWindow = document.getElementById('window-browser');
    const browserIframe = document.getElementById('browserIframe');
    const browserTitle = document.getElementById('browserTitle');
    const browserUrl = document.getElementById('browserUrl');
    const browserExternal = document.getElementById('browserExternal');
    const browserBack = document.getElementById('browserBack');
    const browserClose = browserWindow ? browserWindow.querySelector('[data-close-window]') : null;

    if (!browserWindow || !browserIframe) {
        return;
    }

    document.addEventListener('click', (e) => {
        const card = e.target.closest('[data-open-project]');
        if (!card) {
            return;
        }
        const href = card.dataset.openProject;
        const title = card.dataset.projectTitle || 'Projet';

        browserIframe.src = href;
        if (browserTitle) {
            browserTitle.textContent = title;
        }
        if (browserUrl) {
            browserUrl.textContent = href;
        }
        if (browserExternal) {
            browserExternal.href = href;
        }

        openWindow('window-browser');
    });

    if (browserBack) {
        browserBack.addEventListener('click', () => {
            try {
                browserIframe.contentWindow.history.back();
            } catch (err) {
                /* cross-origin, ignore */
            }
        });
    }

    if (browserClose) {
        browserClose.addEventListener('click', () => {
            browserIframe.src = 'about:blank';
        });
    }
}


initTheme();
initClock();
renderSkills();
initFinder();
initProjectModal();
initScrLightbox();
initProjectBrowser();
initWindowControls();
initDockMagnify();
initContactForm();
initWallpaperPicker();

// Restore saved wallpaper on load
(function applyStoredWallpaper() {
    const savedId = localStorage.getItem(WALLPAPER_KEY) || 'macfond1';
    const wp = wallpapers.find((w) => w.id === savedId);
    if (wp) applyWallpaper(wp);
})();

syncResponsiveLayout();

// Auto-open welcome window on first desktop visit
if (!mobileLayoutQuery.matches && !localStorage.getItem('portfolio-visited')) {
    localStorage.setItem('portfolio-visited', '1');
    window.setTimeout(() => openWindow('window-home'), 350);
}

// Escape key closes the topmost open window
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    let topId = null;
    let topZ = -1;
    state.activeWindows.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
            const z = parseInt(el.style.zIndex || '0', 10);
            if (z > topZ) { topZ = z; topId = id; }
        }
    });
    if (topId) closeWindow(topId);
});

mobileLayoutQuery.addEventListener('change', syncResponsiveLayout);

// Debounce resize avec rAF
var _resizeRafId = null;
window.addEventListener('resize', () => {
    if (_resizeRafId) { window.cancelAnimationFrame(_resizeRafId); }
    _resizeRafId = window.requestAnimationFrame(() => {
        _resizeRafId = null;
        if (typeof window.ScrollTrigger !== 'undefined') {
            window.ScrollTrigger.refresh();
        }
    });
});

// Pause les animations de fond quand l'onglet est caché (économise CPU/GPU)
document.addEventListener('visibilitychange', function() {
    const playState = document.hidden ? 'paused' : 'running';
    const bg = document.getElementById('bg-3d');
    if (bg) { bg.style.animationPlayState = playState; }
    document.querySelectorAll('.bg-3d__halo').forEach(function(el) {
        el.style.animationPlayState = playState;
    });
});
