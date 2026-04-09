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
            summary: 'Refonte du site officiel d’un club de foot. SEO optimisé, mobile-first.',
            href: 'projets/fc-fulbert.html',
            accent: ['#1D4ED8', '#1e3a8a']

        },
        {
            title: 'Zoo Fulbert',
            status: 'live',
            statusLabel: 'En ligne',
            year: '2025',
            stack: ['HTML', 'CSS', 'JavaScript'],
            summary: 'Site vitrine pour un zoo fictif. Galerie interactive et fiches animaux.',
            href: 'projets/fc-fulbert.html',
            accent: ['#15803D', '#14532d']

        },
        {
            title: 'Portfolio macOS',
            status: 'live',
            statusLabel: 'Ce site',
            year: '2026',
            stack: ['HTML', 'CSS', 'GSAP', 'Vanilla JS'],
            summary: 'Portfolio macOS — dock magnétique, glassmorphism, thèmes et GSAP.',
            href: 'index.html',
            accent: ['#4F46E5', '#312e81']

        }
    ],
    apps: [
        {
            title: 'IronPulse',
            status: 'wip',
            statusLabel: 'En cours',
            year: '2025',
            stack: ['React Native', 'Expo', 'Python', 'FastAPI'],
            summary: 'App mobile fitness & nutrition. Entraînements, journaux et API Python.',
            href: 'projets/ironpulse.html',
            accent: ['#16A34A', '#14532d'],

        },
        {
            title: 'App Action',
            status: 'wip',
            statusLabel: 'En cours',
            year: '2026',
            stack: ['React', 'Vite', 'Node.js', 'CSS'],
            summary: 'Outil de gestion avec dashboards et suivi de tâches par priorité.',
            href: 'projets/app-action.html',
            accent: ['#2563EB', '#1e3a8a']
        },
        {
            title: 'Resolution Mate',
            status: 'live',
            statusLabel: 'Déployé',
            year: '2025',
            stack: ['Flutter', 'Dart', 'Firebase'],
            summary: 'App mobile d’objectifs. Suivi quotidien, progression et rappels.',
            href: 'projets/resolution-mate.html',
            accent: ['#7C3AED', '#4c1d95']
        },
        {
            title: 'Mini Wiki PHP',
            status: 'live',
            statusLabel: 'Terminé',
            year: '2025',
            stack: ['PHP', 'MySQL', 'HTML', 'CSS'],
            summary: 'Wiki auto-hébergé. Articles, catégories et recherche en PHP/MySQL.',
            href: '#',
            accent: ['#B45309', '#78350f']
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
            { label: 'HTML5',      icon: 'html',       color: '#E44D26', level: 3 },
            { label: 'CSS3',       icon: 'css',        color: '#2965F1', level: 3 },
            { label: 'JavaScript', icon: 'javascript', color: '#F7DF1E', level: 3 },
            { label: 'React',      icon: 'react',      color: '#61DAFB', level: 3 },
            { label: 'TypeScript', icon: 'typescript', color: '#3178C6', level: 3 },
            { label: 'Tailwind',   icon: 'tailwind',   color: '#06B6D4', level: 3 },
            { label: 'GSAP',       icon: 'gsap',       color: '#88CE02', level: 3 },
        ]
    },
    {
        name: 'Back-end',
        skills: [
            { label: 'PHP',     icon: 'php',     color: '#777BB4', level: 3 },
            { label: 'Symfony', icon: 'symfony', color: '#1A171B', level: 3 },
            { label: '.NET',    icon: 'dotnet',  color: '#512BD4', level: 3 },
            { label: 'Node.js', icon: 'node',    color: '#68A063', level: 3 },
            { label: 'MySQL',   icon: 'mysql',   color: '#F59E0B', level: 3 },
        ]
    },
    {
        name: 'Ops & Outils',
        skills: [
            { label: 'Docker',    icon: 'docker',    color: '#2496ED', level: 3 },
            { label: 'Git',       icon: 'git',       color: '#F05133', level: 3 },
            { label: 'WordPress', icon: 'wordpress', color: '#21759B', level: 3 },
            { label: 'Figma',     icon: 'figma',     color: '#A259FF', level: 3 },
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

// ── Wallpaper definitions ─────────────────────────────────────────
const WALLPAPER_KEY = 'yohan-wallpaper-id';
const wallpapers = [
    { id: 'macfond1', type: 'image', src: 'images/macFond1.jpg',                                    label: 'Mac Fond 1' },
    { id: 'macfond2', type: 'image', src: 'images/macFond2.jpg',                                    label: 'Mac Fond 2' },
    { id: 'magenta',  type: 'image', src: 'images/magenta-nature-fantasy-landscape%20(1).jpg',      label: 'Magenta Nature' },
    { id: 'fond',     type: 'image', src: 'images/fond.jpg',                                        label: 'Fond Violet' },
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

function getSkillIcon(type) {
    const icons = {
        html: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>',
        css: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z"/></svg>',
        javascript: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>',
        typescript: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>',
        react: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.143.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.562-1.premises5 3.018-2.29 4.104-2.29zM5.117 14.333c.204.498.437.978.69 1.434-1.516-.47-2.49-1.1-2.49-1.763 0-.687 1.044-1.347 2.63-1.813.08.7.19 1.417.344 2.142zm2.168 2.39a17.3 17.3 0 0 1-1.073-2.177 19.44 19.44 0 0 1-.655-2.435 21.13 21.13 0 0 1 3.07-.17c-.01.115-.022.228-.022.345 0 .657.113 1.295.327 1.894a21.26 21.26 0 0 1-1.647 2.543zm2.908 3.45c-.63-.665-1.258-1.438-1.866-2.3.47.04.962.063 1.466.063.53 0 1.047-.026 1.546-.074-.617.87-1.24 1.645-1.146 2.311zM12 21.27c-.225 0-.406-.044-.558-.127-.666-.383-.957-1.835-.73-3.704.054-.46.144-.945.25-1.44.96.236 2.006.416 3.107.534.66.906 1.345 1.727 2.035 2.446-1.562 1.48-3.018 2.29-4.104 2.29zm5.893-6.937c-.08-.7-.19-1.418-.344-2.143a19.44 19.44 0 0 1-2.63 1.812c-.204-.497-.437-.977-.69-1.433 1.516.47 2.49 1.1 2.49 1.763l-.001.001c0 .687-1.044 1.347-2.63 1.813zm-1.273-2.89a17.78 17.78 0 0 1-1.073-2.177 19.44 19.44 0 0 1-.655-2.434 21.13 21.13 0 0 1 3.07.17c-.01.115-.022.228-.022.345 0 .657.113 1.295.327 1.894a21.26 21.26 0 0 1-1.647 2.202z"/></svg>',
        nextjs: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.132-.054.5-.054z"/></svg>',
        vue: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/></svg>',
        tailwind: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>',
        sass: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.14 19.952c-1.563.062-2.927-.336-3.447-.863a4.55 4.55 0 0 0 .138-.68c.132-.88-.044-1.374-.44-1.613.6-.71.952-1.617.718-2.638-.28-1.222-1.386-1.71-2.384-1.71-.53 0-.96.138-1.214.255-.215.1-.45.21-.687.343-.244-1.55.327-3.505 1.87-4.88 1.42-1.27 3.35-1.722 5.108-1.2 1.12.33 1.853 1.048 2.1 2.022.372 1.47-.317 2.986-.917 3.69.71.26 1.44.83 1.557 2.05.065.693-.082 1.37-.39 1.963.15.118.297.247.44.39.86.858 1.303 2.01 1.234 3.103-.038.622-.222 1.16-.528 1.606a5.07 5.07 0 0 1-.38.43c-.46.47-1.11.793-1.778.932z"/></svg>',
        gsap: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-.42 4.8c3.542 0 6.42 2.878 6.42 6.42 0 .486-.054.96-.156 1.416h-2.016a4.68 4.68 0 0 0 .132-.84H9.96a4.683 4.683 0 0 0 4.26 3.888v2.04a6.726 6.726 0 0 1-6.24-6.504C7.98 7.678 10.458 4.8 11.58 4.8z"/></svg>',
        three: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0l4 22.4L24 8.533 18.222 0zm7.111 4.444l8 1.778-5.333 3.111zm-.888 1.334L9.778 16l-5.334-8.89zM10.667 6.4l8 1.778-5.334 3.11zm-.89 1.334L13.334 17.6l-5.778-7.112zm4.445.622 5.333-3.112 1.334 8.89z"/></svg>',
        vite: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.47 2.93 12.67 23.26c-.21.38-.76.38-.97 0L.53 2.93c-.22-.42.13-.9.6-.82L12 4.17l10.87-2.06c.47-.08.82.4.6.82z"/></svg>',
        figma: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 19a4 4 0 0 0 4 4l2-8H5v4zm-.5-8H11V3H5a4 4 0 0 0 0 8zm0 2a4 4 0 0 0 0 8h.5V13H4.5zm14-2a4 4 0 0 0-4-4H13v8h1.5a4 4 0 0 0 4-4zm-4-8H9v8h5.5a4 4 0 0 0 0-8H14.5z"/></svg>',
        git: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.6 0 1.846 1.846 0 0 1-.404-1.996L12.86 8.955v6.525c.176.086.342.203.48.34a1.848 1.848 0 0 1 0 2.6 1.844 1.844 0 0 1-2.6 0 1.846 1.846 0 0 1 0-2.601c.172-.172.369-.299.57-.374V8.91a1.837 1.837 0 0 1-.57-.374A1.846 1.846 0 0 1 10.36 6.5L7.64 3.78 .45 10.949a1.55 1.55 0 0 0 0 2.188l10.48 10.477a1.55 1.55 0 0 0 2.187 0l10.43-10.428a1.55 1.55 0 0 0 0-2.145"/></svg>',
        spline: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
        symfony: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.984 0C5.36 0 0 5.36 0 11.984c0 6.624 5.36 12.016 11.984 12.016 6.624 0 12.016-5.36 12.016-12.016C24 5.36 18.608 0 11.984 0zm5.136 7.312c-.544 0-.976.288-1.04.816-.256 1.968 3.12 2.064 2.88 5.12a4.016 4.016 0 0 1-4.16 3.6 5.6 5.6 0 0 1-3.28-1.04l.48-1.136a4.4 4.4 0 0 0 2.72.976c1.12 0 1.808-.576 1.872-1.28.288-2.256-3.12-2.208-2.88-5.12a3.584 3.584 0 0 1 3.712-3.232 5.2 5.2 0 0 1 2.496.576l-.48 1.104a4.08 4.08 0 0 0-2.32-.384zm-6.72 0c-.512 0-.944.256-.992.736-.256 2 2.832 2.16 2.608 5.168a3.984 3.984 0 0 1-4.128 3.568 5.28 5.28 0 0 1-3.04-.976l.448-1.088a4.64 4.64 0 0 0 2.624.944c1.072 0 1.776-.576 1.84-1.264.256-2.208-2.832-2.24-2.576-5.12a3.552 3.552 0 0 1 3.648-3.2c.896 0 1.696.256 2.416.624l-.432 1.056a3.872 3.872 0 0 0-2.416-.448z"/></svg>',
        dotnet: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L4.78 9.863a3 3 0 0 1-.255-.51h-.036c.031.189.047.592.047 1.21v5.772H3.166V7.53h1.6l3.936 6.336c.167.261.274.442.323.542h.024c-.036-.234-.054-.637-.054-1.208V7.53h1.445zm-9.262-.06a.856.856 0 0 1-.61-.24A.78.78 0 0 1 .313 15.5a.76.76 0 0 1 .255-.59.886.886 0 0 1 .61-.228.9.9 0 0 1 .618.228.756.756 0 0 1 .255.59.778.778 0 0 1-.255.536.9.9 0 0 1-.618.24z"/></svg>',
        docker: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/></svg>',
        wordpress: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.9 0 0-1.746.15-2.874.15-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.822-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.021.053.045.104.071.152a10.803 10.803 0 0 1-3.575.604M1.211 12c0-1.24.177-2.438.492-3.566l5.41 14.835C4.22 21.041 1.211 16.893 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/></svg>',
        symfony: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.984 0C5.36 0 0 5.36 0 11.984c0 6.624 5.36 12.016 11.984 12.016 6.624 0 12.016-5.36 12.016-12.016C24 5.36 18.608 0 11.984 0zm5.136 7.312c-.544 0-.976.288-1.04.816-.256 1.968 3.12 2.064 2.88 5.12a4.016 4.016 0 0 1-4.16 3.6 5.6 5.6 0 0 1-3.28-1.04l.48-1.136a4.4 4.4 0 0 0 2.72.976c1.12 0 1.808-.576 1.872-1.28.288-2.256-3.12-2.208-2.88-5.12a3.584 3.584 0 0 1 3.712-3.232 5.2 5.2 0 0 1 2.496.576l-.48 1.104a4.08 4.08 0 0 0-2.32-.384zm-6.72 0c-.512 0-.944.256-.992.736-.256 2 2.832 2.16 2.608 5.168a3.984 3.984 0 0 1-4.128 3.568 5.28 5.28 0 0 1-3.04-.976l.448-1.088a4.64 4.64 0 0 0 2.624.944c1.072 0 1.776-.576 1.84-1.264.256-2.208-2.832-2.24-2.576-5.12a3.552 3.552 0 0 1 3.648-3.2c.896 0 1.696.256 2.416.624l-.432 1.056a3.872 3.872 0 0 0-2.416-.448z"/></svg>',
        dotnet: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L4.78 9.863a3 3 0 0 1-.255-.51h-.036c.031.189.047.592.047 1.21v5.772H3.166V7.53h1.6l3.936 6.336c.167.261.274.442.323.542h.024c-.036-.234-.054-.637-.054-1.208V7.53h1.445zm-9.262-.06a.856.856 0 0 1-.61-.24A.78.78 0 0 1 .313 15.5a.76.76 0 0 1 .255-.59.886.886 0 0 1 .61-.228.9.9 0 0 1 .618.228.756.756 0 0 1 .255.59.778.778 0 0 1-.255.536.9.9 0 0 1-.618.24z"/></svg>',
        docker: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/></svg>',
        wordpress: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.9 0 0-1.746.15-2.874.15-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.822-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.021.053.045.104.071.152a10.803 10.803 0 0 1-3.575.604M1.211 12c0-1.24.177-2.438.492-3.566l5.41 14.835C4.22 21.041 1.211 16.893 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/></svg>',
        node: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998 24a1.734 1.734 0 0 1-.864-.23l-2.753-1.631c-.411-.23-.21-.312-.075-.36.55-.191.66-.234 1.24-.567.061-.035.142-.021.205.015l2.115 1.257a.275.275 0 0 0 .255 0l8.246-4.761a.261.261 0 0 0 .128-.226V7.49a.264.264 0 0 0-.13-.226l-8.244-4.756a.26.26 0 0 0-.253 0L3.625 7.264a.262.262 0 0 0-.13.228v9.518c0 .093.049.18.128.226l2.26 1.304c1.226.613 1.977-.109 1.977-.835V8.33c0-.134.105-.237.239-.237h1.043c.131 0 .238.103.238.237v9.375c0 1.633-.889 2.573-2.436 2.573-.476 0-.85 0-1.898-.517l-2.164-1.244A1.735 1.735 0 0 1 2 17.006V7.489c0-.617.328-1.19.863-1.498l8.246-4.764a1.793 1.793 0 0 1 1.778 0l8.245 4.764c.534.308.863.882.863 1.498v9.518c0 .617-.329 1.19-.863 1.498l-8.245 4.761A1.737 1.737 0 0 1 11.998 24zm2.546-6.543c-3.612 0-4.368-1.658-4.368-3.049 0-.131.105-.238.238-.238h1.065c.117 0 .217.086.235.202.161 1.083.638 1.628 2.83 1.628 1.742 0 2.484-.394 2.484-1.317 0-.533-.21-.927-2.914-1.193-2.258-.223-3.654-.72-3.654-2.524 0-1.664 1.402-2.655 3.751-2.655 2.639 0 3.945.915 4.111 2.882a.24.24 0 0 1-.063.182.232.232 0 0 1-.174.073h-1.068a.236.236 0 0 1-.23-.179c-.257-1.137-.884-1.502-2.576-1.502-1.897 0-2.118.661-2.118 1.157 0 .601.261.777 2.826 1.117 2.537.336 3.739.813 3.739 2.59-.003 1.8-1.5 2.834-4.114 2.834z"/></svg>',
        php: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.805-.124-1.006-.174-.2-.483-.279-.904-.279zm9.423 0h-.944l-.515 2.648h.838c.557 0 .97-.105 1.242-.314.273-.21.455-.559.55-1.049.092-.47.051-.805-.123-1.006-.174-.2-.484-.279-.905-.279zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.97 14.764H7.006L8.41 7.234h4.104a3.26 3.26 0 0 1 1.358.275c.389.18.67.458.842.83.218.47.271 1.003.18 1.495-.09.536-.303 1.025-.625 1.449a3.44 3.44 0 0 1-1.285 1.049 3.91 3.91 0 0 1-1.63.315H9.94l-.43 2.117zm9.42 0H16.43l1.404-7.53h4.104a3.26 3.26 0 0 1 1.358.275c.389.18.67.458.842.83.218.47.271 1.003.18 1.495-.09.536-.303 1.025-.625 1.449a3.44 3.44 0 0 1-1.285 1.049 3.91 3.91 0 0 1-1.63.315H19.36l-.43 2.117zm-4.78-4.558 1.028-5.538 2.066 5.538h-3.094z"/></svg>',
        mysql: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.134-.04-.053-.108-.08-.182-.158zM5.77 18.695h-.927a50.854 50.854 0 0 0-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 0 0-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.534-1.492 4.47-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135c-.591 0-1.053-.16-1.385-.48-.332-.32-.498-.767-.498-1.34 0-.608.17-1.082.508-1.424.337-.34.807-.51 1.411-.51.54 0 .964.156 1.275.47.31.316.466.755.466 1.317 0 .635-.17 1.13-.513 1.48-.342.35-.81.487-1.264.487zm.045-2.982c-.296 0-.528.1-.696.3-.168.2-.252.484-.252.854 0 .364.085.646.256.848.17.2.4.3.69.3.282 0 .503-.095.664-.285.162-.19.243-.47.243-.84 0-.375-.08-.66-.24-.858-.16-.197-.38-.296-.665-.296zM24 10.45c0 1.15-.228 1.972-.683 2.47-.455.498-1.18.747-2.174.747h-.012c-.2 0-.4-.007-.6-.019L24 10.45zm-6.95 5.98c-.31.22-.737.33-1.285.33-.405 0-.796-.074-1.173-.22v-.498c.282.14.59.21.927.21.27 0 .48-.057.632-.17.144-.115.218-.27.218-.47 0-.16-.052-.295-.155-.407-.1-.112-.33-.228-.69-.348-.618-.21-.99-.517-.99-1.052 0-.34.129-.618.387-.832.258-.215.59-.322 1-.322.33 0 .644.06.94.178v.49c-.3-.138-.596-.207-.89-.207-.215 0-.38.045-.5.133a.433.433 0 0 0-.182.357c0 .143.052.265.157.368.105.103.31.21.616.322.512.194.852.42 1.02.68.168.255.253.547.253.876 0 .364-.12.658-.356.882zM13.79 9.42c-.39.024-.757.083-1.1.174v.014c.057.026.107.064.154.11l.017-.015c.15.116.267.268.332.46l.013-.015c.163-.12.306-.262.41-.43zm4.73 3.55c-.2 0-.39.01-.567.025v-.015c-.03.016-.062.03-.093.044v.013c.13.072.244.166.338.28.03.037.053.08.08.12.012-.003.025-.003.04-.003.086 0 .16.014.22.045.012-.006.027-.01.04-.015 0-.006 0-.01-.002-.016-.04-.113-.11-.2-.21-.272zm-.75-.43c-.015.01-.03.018-.048.025-.12.056-.24.12-.36.188v-.015c-.05.023-.1.047-.15.073v.015a.926.926 0 0 1 .143.093c.05.04.097.085.143.132l.014-.015a.97.97 0 0 1 .355-.353l.015-.014a.41.41 0 0 0-.112-.13zm.855-.04c-.013.002-.026.004-.04.007a1.133 1.133 0 0 0-.215.067l-.018.015c.073.093.122.2.146.318.015-.003.027-.003.04-.003.063 0 .12.01.167.033l.018-.015c-.028-.145-.07-.28-.14-.404z"/></svg>',
        spline_simple: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c4.142 0 7.5 3.358 7.5 7.5S16.142 19.5 12 19.5 4.5 16.142 4.5 12 7.858 4.5 12 4.5z"/></svg>',
    };
    return icons[type] || `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="4" opacity=".2"/><text x="12" y="16" text-anchor="middle" font-size="8" font-weight="bold">${type.toUpperCase().slice(0,2)}</text></svg>`;
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

    const levelColors = ['#22c55e', '#84cc16', '#fbbf24', '#f97316', '#ef4444'];
    const levelLabels = ['Débutant', 'Notions', 'Pratique', 'Avancé', 'Expert'];

    const techAccents = {
        html:       { ca: '#E34F26', cb: '#7a1d06' },
        css:        { ca: '#2164AD', cb: '#0D3F7A' },
        javascript: { ca: '#c9a000', cb: '#7a5e00' },
        react:      { ca: '#23C8F5', cb: '#0895BA' },
        typescript: { ca: '#3178C6', cb: '#173C88' },
        tailwind:   { ca: '#38BDF8', cb: '#0268A1' },
        gsap:       { ca: '#88CE02', cb: '#3a5e00' },
        php:        { ca: '#777BB4', cb: '#3e4178' },
        symfony:    { ca: '#555', cb: '#1a1a1a' },
        dotnet:     { ca: '#512BD4', cb: '#2D1580' },
        node:       { ca: '#6DBE4B', cb: '#2D6A1A' },
        mysql:      { ca: '#F59E0B', cb: '#B45309' },
        docker:     { ca: '#2496ED', cb: '#0D5FA0' },
        git:        { ca: '#F05032', cb: '#A01A0A' },
        wordpress:  { ca: '#21759B', cb: '#0D4A60' },
        figma:      { ca: '#A259FF', cb: '#6B21A8' },
    };

    const cat = skillCategories[catIdx];
    if (!cat) { return; }

    const noteHtml = '<div class="skills-notice"><span class="skills-notice__emoji" aria-hidden="true">✨</span><span>Ces points, c’est juste pour le style — pas un baromètre officiel !</span></div>';

    grid.innerHTML = '';
    grid.insertAdjacentHTML('beforeend', noteHtml);

    cat.skills.forEach(function(skill) {
        const acc  = techAccents[skill.icon] || { ca: '#444', cb: '#222' };
        const lvl  = Math.max(1, Math.min(5, skill.level || 1));
        const c1   = levelColors[lvl - 1];

        const dotsHtml = Array.from({ length: 5 }, function(_, i) {
            return i < lvl
                ? `<span class="holo-card__dot holo-card__dot--on" style="--dc:${c1}"></span>`
                : `<span class="holo-card__dot"></span>`;
        }).join('');

        const card = document.createElement('div');
        card.className = 'holo-card';
        card.setAttribute('aria-label', skill.label + ' — ' + levelLabels[lvl - 1]);
        card.style.cssText = `--ca:${acc.ca};--cb:${acc.cb};--c1:${c1};`;
        card.innerHTML =
            '<div class="holo-card__bg"></div>' +
            '<div class="holo-card__lines"></div>' +
            '<div class="holo-card__circles"></div>' +
            '<div class="holo-card__face">' +
                '<div class="holo-card__icon">' + getSkillIcon(skill.icon) + '</div>' +
                '<span class="holo-card__label">' + skill.label + '</span>' +
                '<div class="holo-card__dots">' + dotsHtml + '</div>' +
            '</div>';

        card.addEventListener('pointermove', function(e) {
            var rect = card.getBoundingClientRect();
            card.style.setProperty('--ratio-x', ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)).toFixed(3));
            card.style.setProperty('--ratio-y', ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)).toFixed(3));
        });
        card.addEventListener('pointerleave', function() {
            card.style.setProperty('--ratio-x', '0');
            card.style.setProperty('--ratio-y', '0');
        });

        grid.appendChild(card);
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


function makeFinderCard(project) {
    const statusClass = {
        live: 'finder-card__status--live',
        wip: 'finder-card__status--wip',
        upcoming: 'finder-card__status--upcoming'
    }[project.status] || '';

    const stackHtml = project.stack
        .map(t => `<span class="finder-card__tag">${t}</span>`)
        .join('');

    return `
        <div class="finder-card finder-card--locked" style="--card-a:${project.accent[0]};--card-b:${project.accent[1]}" aria-label="${project.title}">
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
    const noticeHtml = `
        <div class="finder-notice">
            <span class="finder-notice__icon" aria-hidden="true"></span>
            <div class="finder-notice__text">
                <strong>Portfolio en cours de mise à jour</strong>
                <span>Je n'ai pas encore eu le temps de mettre à jour les fiches projets — elles arrivent bientôt !</span>
            </div>
        </div>
    `;
    grid.innerHTML = noticeHtml + projects.map(makeFinderCard).join('');
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
window.addEventListener('resize', () => {
    if (typeof window.ScrollTrigger !== 'undefined') {
        window.ScrollTrigger.refresh();
    }
});
