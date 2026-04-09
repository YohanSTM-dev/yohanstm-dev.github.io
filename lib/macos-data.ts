export type WindowId = "cv" | "skills" | "finder" | "contact" | "settings";

export type MacWindowDefinition = {
  id: WindowId;
  title: string;
  subtitle: string;
};

export const macWindows: Record<WindowId, MacWindowDefinition> = {
  cv: {
    id: "cv",
    title: "CV",
    subtitle: "Timeline"
  },
  skills: {
    id: "skills",
    title: "Skills",
    subtitle: "Ortholinear Macropad"
  },
  finder: {
    id: "finder",
    title: "Finder",
    subtitle: "Projets"
  },
  contact: {
    id: "contact",
    title: "Contact",
    subtitle: "Bento Grid"
  },
  settings: {
    id: "settings",
    title: "Réglages",
    subtitle: "Système"
  }
};

export const dockApps: Array<{
  id: WindowId;
  label: string;
  icon: "finder" | "cv" | "skills" | "contact" | "settings";
}> = [
  { id: "finder",   label: "Finder",   icon: "finder"   },
  { id: "cv",       label: "CV",       icon: "cv"       },
  { id: "skills",   label: "Skills",   icon: "skills"   },
  { id: "contact",  label: "Contact",  icon: "contact"  },
  { id: "settings", label: "Réglages", icon: "settings" }
];

export const experiences = [
  {
    period: "2019 — 2022",
    title: "Terminale STI2D, option SIN",
    description:
      "Premiers repères en algorithmie, en logique système et en culture du projet numérique.",
    image: "/assets/images/logoSansTitre.jpg"
  },
  {
    period: "2022 — 2023",
    title: "BUT MMI, année 1",
    description:
      "Consolidation des bases HTML, CSS, JavaScript, design d’interface et expérience utilisateur.",
    image: "/assets/images/neural-network.jpg"
  },
  {
    period: "2023 — 2024",
    title: "Projets clients et motion",
    description:
      "Montée en intensité sur GSAP, logique applicative et qualité de rendu dans des contextes réels.",
    image: "/assets/images/cyber-defense.jpg"
  },
  {
    period: "2024 — 2025",
    title: "Front-end avancé et 3D",
    description:
      "Spécialisation autour de CSS 3D, Spline, Three.js et accessibilité avec une approche UI exigeante.",
    image: "/assets/images/ar-interface.jpg"
  },
  {
    period: "Aujourd’hui",
    title: "Portfolio orienté produit",
    description:
      "Construction d’interfaces immersives, cohérentes et lisibles, avec une vraie sensibilité Apple-like.",
    image: "/assets/images/data-nexus.jpg"
  }
] as const;

export const skillKeys = [
  { label: "HTML", icon: "html" },
  { label: "CSS", icon: "css" },
  { label: "JavaScript", icon: "javascript" },
  { label: "GSAP", icon: "gsap" },
  { label: "React", icon: "react" },
  { label: "Next.js", icon: "next" },
  { label: "Tailwind", icon: "tailwind" },
  { label: "Zustand", icon: "zustand" },
  { label: "Three", icon: "three" },
  { label: "R3F", icon: "r3f" },
  { label: "TypeScript", icon: "typescript" },
  { label: "Git", icon: "git" },
  { label: "Figma", icon: "figma" },
  { label: "UX", icon: "ux" },
  { label: "A11y", icon: "a11y" },
  { label: "API", icon: "api" },
  { label: "Node", icon: "node" },
  { label: "SQL", icon: "sql" }
] as const;

export const finderCategories = [
  { id: "web",    label: "Projets web",   icon: "globe" },
  { id: "apps",   label: "Applications",  icon: "grid"  },
  { id: "future", label: "À venir",        icon: "clock" }
] as const;

export type FinderCategoryId = (typeof finderCategories)[number]["id"];

export const finderProjects: Record<
  FinderCategoryId,
  Array<{
    name: string;
    year: string;
    summary: string;
    href: string;
    accentFrom: string;
    accentTo: string;
  }>
> = {
  web: [
    {
      name: "FC Fulbert",
      year: "2025",
      summary: "Refonte SEO et hiérarchie de contenu pour un site plus lisible.",
      href: "/pages/projects/fc-fulbert.html",
      accentFrom: "#8EDFFF",
      accentTo: "#2A73FF"
    },
    {
      name: "Zoo Fulbert",
      year: "2025",
      summary: "Site vitrine fictif illustrant la taxonomy et l'architecture CMS.",
      href: "#",
      accentFrom: "#A8F5D0",
      accentTo: "#0D9355"
    },
    {
      name: "Portfolio macOS",
      year: "2025",
      summary: "Simulation bureau Apple : fenêtres drag, traffic lights et GSAP.",
      href: "#",
      accentFrom: "#F5B7FF",
      accentTo: "#FF6464"
    }
  ],
  apps: [
    {
      name: "IronPulse",
      year: "2025",
      summary: "Dashboard sport et nutrition pensé comme une app produit.",
      href: "/pages/projects/ironpulse.html",
      accentFrom: "#9EF0C5",
      accentTo: "#31B66F"
    },
    {
      name: "App Action",
      year: "2025",
      summary: "Démo produit avec dashboards et parcours d'administration.",
      href: "/pages/projects/app-action.html",
      accentFrom: "#A3D7FF",
      accentTo: "#566BFF"
    },
    {
      name: "Resolution Mate",
      year: "2025",
      summary: "Suivi d'objectifs avec filtres, progression et pilotage personnel.",
      href: "/pages/projects/resolution-mate.html",
      accentFrom: "#C7D2FF",
      accentTo: "#6981FF"
    },
    {
      name: "Mini Wiki PHP",
      year: "2024",
      summary: "Wiki minimaliste en PHP avec CRUD et rendu côté serveur.",
      href: "#",
      accentFrom: "#FFD0A0",
      accentTo: "#C05500"
    }
  ],
  future: [
    {
      name: "Projet Rust",
      year: "Soon",
      summary: "Exploration Rust et WebAssembly pour des rendus interactifs hautes performances.",
      href: "#",
      accentFrom: "#FFAB70",
      accentTo: "#D64D00"
    }
  ]
};
export const socialLinks = [
  {
    id: "github",
    label: "Mon GitHub",
    href: "https://github.com/yohanstm-dev"
  },
  {
    id: "linkedin",
    label: "Mon LinkedIn",
    href: "https://www.linkedin.com/in/yohan-saint-marc"
  }
] as const;
