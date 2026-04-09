/* ============================================================
   SCRIPT.JS — MacOS Portfolio "Graphite"
   Yohan Saint-Marc
============================================================ */

/* ─────────────── DATA ────────────────────────────────────── */

const projectsData = [
    {
        title: "FC Fulbert",
        badge: "SEO case",
        year: "2025",
        summary: "Refonte SEO et structure de contenu pour donner à un club amateur une base plus claire et lisible.",
        details: "Case study centrée sur le référencement naturel, la hiérarchie HTML et la lisibilité éditoriale pour mieux positionner le site.",
        image: "images/logoFCFulbert.png",
        preview: "projets/fc-fulbert.html",
        tech: ["SEO", "HTML", "CSS", "JavaScript"]
    },
    {
        title: "AppAction",
        badge: "Product demo",
        year: "2026",
        summary: "Simulation de gestion avec dashboards, données mock et parcours d'administration.",
        details: "Projet de pilotage d'activité construit comme une démo produit avec tableaux de bord, visualisation de données et parcours internes.",
        image: "images/neural-network.jpg",
        preview: "projets/app-action.html",
        secondaryLink: "projets/appAction/index.html",
        secondaryLabel: "Voir la démo",
        tech: ["JavaScript", "JSON", "UI"]
    },
    {
        title: "IronPulse",
        badge: "Sport tech",
        year: "2025",
        summary: "Dashboard sport et nutrition avec routines hebdomadaires et suivi des progrès.",
        details: "Interface de suivi sportif pensée autour des records personnels, du rythme d'entraînement et d'une lecture rapide des performances.",
        image: "images/blockchain-vault.jpg",
        preview: "projets/ironpulse.html",
        secondaryLink: "projets/IronPulse/index.html",
        secondaryLabel: "Voir la démo",
        tech: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Resolution Mate",
        badge: "Problem solving",
        year: "2025",
        summary: "Outil de suivi d'objectifs et de résolutions avec filtres et progression personnelle.",
        details: "Produit de suivi orienté organisation, avec listes d'objectifs, filtres de priorités et détail d'actions pour un pilotage plus concret.",
        image: "images/data-nexus.jpg",
        preview: "projets/resolution-mate.html",
        secondaryLink: "projets/resolution_mate/index.html",
        secondaryLabel: "Voir la démo",
        tech: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Cluedo",
        badge: "Back-end logic",
        year: "2024",
        summary: "Jeu de déduction en PHP avec logique serveur, état de partie et persistance SQLite.",
        details: "Projet centré sur la logique applicative, les règles de jeu, les hypothèses, les données SQLite et la navigation entre différents états.",
        image: "images/imgCluedo.jpeg",
        preview: "projets/cluedo.html",
        tech: ["PHP", "SQLite", "JavaScript"]
    }
];

const accentPalette = ["#ff72d2", "#855bff", "#88c7ff", "#d98fff", "#ffa8e9"];

/* ─────────────── KEYBOARD DATA ──────────────────────────── */

const keyboardCategories = [
    { label: "Langages", color: "#f7df1e", textColor: "#1a1a1a" },
    { label: "Frameworks", color: "#61dafb", textColor: "#1a1a1a" },
    { label: "Design / Motion", color: "#ff72d2", textColor: "#fff" },
    { label: "Tools", color: "#34d399", textColor: "#1a1a1a" },
    { label: "Back-end", color: "#fdba74", textColor: "#1a1a1a" }
];

// Each key: { label, sub?, color, textColor, width? }
const keyboardRows = [
    // Row 1 — function row
    [
        { label: "esc",     color: "rgba(255,255,255,.1)", textColor: "#d8caee", width: "key--1-5" },
        { label: "HTML",    color: "#e34c26", textColor: "#fff" },
        { label: "CSS",     color: "#2965f1", textColor: "#fff" },
        { label: "SCSS",    color: "#cd6799", textColor: "#fff" },
        { label: "JS",      color: "#f7df1e", textColor: "#1a1a1a" },
        { label: "TS",      color: "#3178c6", textColor: "#fff" },
        { label: "PHP",     color: "#777bb4", textColor: "#fff" },
        { label: "SQL",     color: "#e38c00", textColor: "#fff" },
        { label: "Python",  color: "#3572A5", textColor: "#fff" },
        { label: "Git",     color: "#f05032", textColor: "#fff" },
        { label: "Figma",   color: "#a259ff", textColor: "#fff" },
        { label: "⌽",      color: "rgba(255,255,255,.07)", textColor: "#d8caee" }
    ],
    // Row 2 — numbers
    [
        { label: "React",   color: "#61dafb", textColor: "#1a1a1a" },
        { label: "Next",    color: "#fff",    textColor: "#1a1a1a" },
        { label: "Vue",     color: "#42b883", textColor: "#fff" },
        { label: "Sym",     sub: "Symfony", color: "#1a1a2e", textColor: "#fff", border: "rgba(255,255,255,.3)" },
        { label: "Node",    color: "#68a063", textColor: "#fff" },
        { label: "GSAP",    color: "#88ce02", textColor: "#1a1a1a" },
        { label: "Three",   sub: "Three.js",  color: "#049ef4", textColor: "#fff" },
        { label: "Spline",  color: "#855bff", textColor: "#fff" },
        { label: "Vite",    color: "#646cff", textColor: "#fff" },
        { label: "npm",     color: "#cb3837", textColor: "#fff" },
        { label: "↵", width: "key--2", color: "rgba(255,255,255,.07)", textColor: "#d8caee" }
    ],
    // Row 3 — QWERTY
    [
        { label: "⇪", width: "key--1-5", color: "rgba(255,255,255,.07)", textColor: "#d8caee" },
        { label: "UX",      color: "#ff72d2", textColor: "#fff" },
        { label: "UI",      color: "#ff72d2", textColor: "#fff" },
        { label: "A11y",    color: "#f97316", textColor: "#fff" },
        { label: "SEO",     color: "#fbbf24", textColor: "#1a1a1a" },
        { label: "Perf",    sub: "Perf.",    color: "#4ade80", textColor: "#1a1a1a" },
        { label: "REST",    color: "#34d399", textColor: "#1a1a1a" },
        { label: "JSON",    color: "#34d399", textColor: "#1a1a1a" },
        { label: "API",     color: "#10b981", textColor: "#fff" },
        { label: "Bash",    color: "#4d5566", textColor: "#fff" },
        { label: "WSL",     color: "#4d5566", textColor: "#fff" },
        { label: "⇧", width: "key--1-5", color: "rgba(255,255,255,.07)", textColor: "#d8caee" }
    ],
    // Row 4 — bottom
    [
        { label: "fn",   width: "key--1-5",  color: "rgba(255,255,255,.07)", textColor: "#d8caee" },
        { label: "⌃", color: "rgba(255,255,255,.07)", textColor: "#d8caee" },
        { label: "⌥", color: "rgba(255,255,255,.07)", textColor: "#d8caee" },
        { label: "⌘", color: "rgba(255,255,255,.07)", textColor: "#d8caee" },
        { label: "Design & Code", width: "key--space", color: "rgba(133, 91, 255, 0.25)", textColor: "#c4b5fd" },
        { label: "⌘", color: "rgba(255,255,255,.07)", textColor: "#d8caee" },
        { label: "⌥", color: "rgba(255,255,255,.07)", textColor: "#d8caee" },
        { label: "◀", color: "rgba(255,255,255,.07)", textColor: "#d8caee" },
        { label: "▼", color: "rgba(255,255,255,.07)", textColor: "#d8caee" },
        { label: "▶", color: "rgba(255,255,255,.07)", textColor: "#d8caee" }
    ]
];

/* ─────────────── STAGES DATA ────────────────────────────── */

const stagesData = [
    { name: "Convention de stage\nSession été 2024", meta: "PDF · 120 ko", href: "documents/stage-ete-2024.pdf" },
    { name: "Rapport de stage\nCommunication", meta: "PDF · 850 ko", href: "documents/rapport-stage-communication.pdf" },
    { name: "Convention de stage\nAlternance 2025", meta: "PDF · 115 ko", href: "documents/convention-alternance-2025.pdf" },
    { name: "Rapport de stage\nDéveloppement", meta: "PDF · 1.2 Mo", href: "documents/rapport-stage-dev-2025.pdf" },
    { name: "Attestation de stage\n2024", meta: "PDF · 90 ko", href: "documents/attestation-2024.pdf" },
    { name: "Portfolio\nPDF export", meta: "PDF · 2.4 Mo", href: "documents/portfolio-yohan-stm.pdf" }
];

/* ──────────────── SPLINE BACKGROUND ───────────────── */
/* Référencé dans DOMContentLoaded — devient no-op car gym-bg.js gère l'arrière-plan 3D */
function initSplineBackground() {
    /* No-op: 3D background handled by gym-bg.js (Three.js) */
}

/* ─────────────── DNA HELIX (Canvas) ─────────────────────── */

function initDnaCanvas() {
    const canvas = document.getElementById("dna-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
    }

    function drawHelix(timestamp) {
        const w = canvas.getBoundingClientRect().width;
        const h = canvas.getBoundingClientRect().height;

        ctx.clearRect(0, 0, w, h);
        t = timestamp * 0.0008;

        const cx = w / 2;
        const amplitude = Math.min(w, 220) * 0.28;
        const step = 12;
        const totalPoints = Math.floor(h / step) + 4;

        // Draw backbone connecting lines
        ctx.lineWidth = 1;

        const pointsA = [];
        const pointsB = [];

        for (let i = 0; i < totalPoints; i++) {
            const y = -step * 2 + i * step;
            const phase = (i / totalPoints) * Math.PI * 6 + t;
            const xA = cx + Math.sin(phase) * amplitude;
            const xB = cx + Math.sin(phase + Math.PI) * amplitude;
            pointsA.push({ x: xA, y });
            pointsB.push({ x: xB, y });
        }

        // Strand A
        ctx.beginPath();
        ctx.moveTo(pointsA[0].x, pointsA[0].y);
        for (let i = 1; i < pointsA.length; i++) {
            ctx.lineTo(pointsA[i].x, pointsA[i].y);
        }
        ctx.strokeStyle = "rgba(255, 114, 210, 0.45)";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Strand B
        ctx.beginPath();
        ctx.moveTo(pointsB[0].x, pointsB[0].y);
        for (let i = 1; i < pointsB.length; i++) {
            ctx.lineTo(pointsB[i].x, pointsB[i].y);
        }
        ctx.strokeStyle = "rgba(136, 199, 255, 0.45)";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Base pairs (rungs)
        const pairColors = [
            ["rgba(255,114,210,0.7)", "rgba(133,91,255,0.7)"],
            ["rgba(136,199,255,0.7)", "rgba(52,211,153,0.7)"]
        ];

        for (let i = 2; i < totalPoints - 2; i += 2) {
            const pA = pointsA[i];
            const pB = pointsB[i];
            const mid = { x: (pA.x + pB.x) / 2, y: (pA.y + pB.y) / 2 };
            const pair = pairColors[Math.floor(i / 2) % pairColors.length];

            const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
            grad.addColorStop(0, pair[0]);
            grad.addColorStop(1, pair[1]);

            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Node dots
            [pA, pB].forEach((pt, di) => {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
                const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 7);
                glow.addColorStop(0, pair[di]);
                glow.addColorStop(1, "transparent");
                ctx.fillStyle = glow;
                ctx.fill();
            });

            // Center node
            ctx.beginPath();
            ctx.arc(mid.x, mid.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.35)";
            ctx.fill();
        }

        raf = requestAnimationFrame(drawHelix);
    }

    resize();
    raf = requestAnimationFrame(drawHelix);

    // Pause when window-cv is closed
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.__dnaStop = () => { cancelAnimationFrame(raf); ro.disconnect(); };
    window.__dnaStart = () => { raf = requestAnimationFrame(drawHelix); ro.observe(canvas); };
}

/* ─────────────── DNA TIMELINE SCROLL OBSERVER ───────────── */

function initDnaObserver() {
    const body = document.getElementById("dnaBody");
    const periods = document.querySelectorAll(".dna-period");
    if (!body || !periods.length) return;

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = Number(entry.target.dataset.period) * 120;
                    setTimeout(() => entry.target.classList.add("is-visible"), delay);
                }
            });
        },
        { root: body, threshold: 0.15 }
    );

    periods.forEach((p) => io.observe(p));
}

/* ─────────────── KEYBOARD ───────────────────────────────── */

function initKeyboard() {
    const wrap = document.getElementById("keyboardWrap");
    const legend = document.getElementById("keyboardLegend");
    if (!wrap) return;

    // Render legend swatches
    if (legend) {
        keyboardCategories.forEach((cat) => {
            const swatch = document.createElement("span");
            swatch.className = "legend-swatch";
            swatch.innerHTML = `<span class="legend-swatch__dot" style="background:${cat.color}"></span>${cat.label}`;
            legend.appendChild(swatch);
        });
    }

    // Render keyboard rows
    keyboardRows.forEach((row) => {
        const rowEl = document.createElement("div");
        rowEl.className = "keyboard-row";

        row.forEach((keyData) => {
            const key = document.createElement("div");
            key.className = "key" + (keyData.width ? ` ${keyData.width}` : "");
            key.setAttribute("role", "img");
            key.setAttribute("aria-label", keyData.label + (keyData.sub ? " — " + keyData.sub : ""));

            key.style.setProperty("--key-color", keyData.color);
            key.style.setProperty("--key-text", keyData.textColor || "var(--text)");

            if (keyData.border) {
                key.style.borderColor = keyData.border;
            }

            key.innerHTML = `${keyData.label}${keyData.sub ? `<span class="key__sub">${keyData.sub}</span>` : ""}`;

            // GSAP hover if available
            key.addEventListener("mouseenter", () => {
                if (window.gsap) {
                    window.gsap.to(key, {
                        y: -5,
                        scale: 1.14,
                        duration: 0.18,
                        ease: "power2.out"
                    });
                }
            });
            key.addEventListener("mouseleave", () => {
                if (window.gsap) {
                    window.gsap.to(key, {
                        y: 0,
                        scale: 1,
                        duration: 0.28,
                        ease: "power3.out"
                    });
                }
            });

            rowEl.appendChild(key);
        });

        wrap.appendChild(rowEl);
    });
}

/* ─────────────── STAGES ─────────────────────────────────── */

const PDF_ICON = `
<svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="48" height="56" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)"/>
  <path d="M10 0 L38 0 L48 10 L48 56 L0 56 L0 0 Z" fill="rgba(52,211,153,0.12)"/>
  <path d="M38 0 L38 10 L48 10 Z" fill="rgba(52,211,153,0.35)"/>
  <text x="24" y="37" text-anchor="middle" font-family="Sora,sans-serif" font-size="10" font-weight="700" fill="#34d399">PDF</text>
</svg>`;

function initStages() {
    const grid = document.getElementById("stagesGrid");
    if (!grid) return;

    stagesData.forEach((stage) => {
        const tile = document.createElement("a");
        tile.className = "stage-tile";
        tile.href = stage.href;
        tile.target = "_blank";
        tile.rel = "noopener";
        tile.innerHTML = `
            <span class="stage-tile__icon">${PDF_ICON}</span>
            <span class="stage-tile__name">${stage.name.replace("\n", "<br>")}</span>
            <span class="stage-tile__meta">${stage.meta}</span>
        `;
        grid.appendChild(tile);
    });
}

/* ─────────────── CONTACT FORM ───────────────────────────── */

function initContactForm() {
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("contactFeedback");
    const submitLabel = document.getElementById("contactSubmitLabel");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name    = form.name.value.trim();
        const email   = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            feedback.textContent = "Merci de remplir tous les champs.";
            feedback.classList.add("is-error");
            return;
        }

        feedback.textContent = "Envoi en cours…";
        feedback.classList.remove("is-error");
        submitLabel.textContent = "Envoi…";

        // Simulated send (replace with real endpoint or Formspree)
        await new Promise((r) => setTimeout(r, 1200));

        feedback.textContent = "Message envoyé ! Je vous réponds très vite.";
        feedback.classList.remove("is-error");
        submitLabel.textContent = "Envoyer";
        form.reset();

        setTimeout(() => {
            feedback.textContent = "";
        }, 5000);
    });
}

/* ─────────────── MAIN APP ───────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
    const gsapApi = window.gsap || null;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const elements = {
        greeting: document.getElementById("desktopGreeting"),
        menuTime:  document.getElementById("menuTime"),
        dock:      document.getElementById("macDock"),
        /* Dock slots (parent of btn) qui ont un data-window-target */
        dockSlots:    Array.from(document.querySelectorAll(".dock-slot[data-window-target]")),
        allDockSlots: Array.from(document.querySelectorAll(".dock-slot")),
        homeSlot:     document.getElementById("slotHome"),
        homeButton:   document.getElementById("dockHome"),
        /* All clickable elements that open a window */
        windowButtons: Array.from(document.querySelectorAll("[data-window-target]")),
        closeButtons:  Array.from(document.querySelectorAll("[data-close-window]")),
        windows:       Array.from(document.querySelectorAll(".mac-window")),
        // Projects
        cardsList:          document.getElementById("projectCards"),
        projectMeta:        document.getElementById("projectMeta"),
        projectTitle:       document.getElementById("projectTitle"),
        projectDescription: document.getElementById("projectDescription"),
        projectTags:        document.getElementById("projectTags"),
        projectPreviewLink:   document.getElementById("projectPreviewLink"),
        projectSecondaryLink: document.getElementById("projectSecondaryLink"),
        prevButton: document.querySelector(".prev"),
        nextButton: document.querySelector(".next"),
        gallery:    document.getElementById("projectsGallery")
    };

    const state = {
        activeWindowId: null,
        activeProjectIndex: 0,
        cards: [],
        returnFocusElement: null,
        hideTimers: new WeakMap(),
        wheelLocked: false,
        mobileObserver: null,
        dnaInitialised: false,
        skillsInitialised: false,
        stagesInitialised: false
    };

    const windowTransitionDelay = reducedMotionQuery.matches ? 0 : 280;
    const wrapIndex = (value, total) => ((value % total) + total) % total;

    /* ── Clock — WeekDay + Date + Time ── */
    const updateClock = () => {
        const now = new Date();
        const time = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        const day = now.toLocaleDateString("fr-FR", { weekday: "short" });
        const date = now.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
        const dayCap = day.charAt(0).toUpperCase() + day.slice(1);
        elements.menuTime.textContent = `${dayCap} ${date}  ${time}`;
        elements.menuTime.dateTime = now.toISOString();
    };
    updateClock();
    window.setInterval(updateClock, 1000);

    /* ── Window management ── */
    const clearHideTimer = (el) => {
        const t = state.hideTimers.get(el);
        if (t) { clearTimeout(t); state.hideTimers.delete(el); }
    };

    const showWindow = (el) => {
        clearHideTimer(el);
        el.hidden = false;
        el.setAttribute("aria-hidden", "false");
        requestAnimationFrame(() => el.classList.add("is-open"));
    };

    const hideWindow = (el, immediate = false) => {
        clearHideTimer(el);
        el.classList.remove("is-open");
        el.setAttribute("aria-hidden", "true");
        if (immediate || windowTransitionDelay === 0) { el.hidden = true; return; }
        const t = setTimeout(() => { el.hidden = true; }, windowTransitionDelay);
        state.hideTimers.set(el, t);
    };

    const setHeroVisibility = () => {
        if (elements.greeting) {
            elements.greeting.classList.toggle("is-hidden", Boolean(state.activeWindowId));
        }
    };

    const setDockState = () => {
        elements.allDockSlots.forEach((slot) => {
            const tgt = slot.getAttribute("data-window-target");
            const isActive = tgt && tgt === state.activeWindowId;
            slot.classList.toggle("is-active", isActive);
            const btn = slot.querySelector(".dock-btn");
            if (btn) btn.setAttribute("aria-pressed", String(isActive));
        });
    };

    const closeAllWindows = () => {
        state.activeWindowId = null;
        elements.windows.forEach((w) => hideWindow(w));
        setHeroVisibility();
        setDockState();
    };

    const openWindow = (windowId, triggerBtn) => {
        if (!windowId) return;
        const target = document.getElementById(windowId);
        if (!target) return;

        state.returnFocusElement = triggerBtn || document.activeElement;
        state.activeWindowId = windowId;

        elements.windows.forEach((w) => {
            if (w.id === windowId) showWindow(w);
            else hideWindow(w, true);
        });

        setHeroVisibility();
        setDockState();

        /* Lazy-init modules */
        if (windowId === "window-cv" && !state.dnaInitialised) {
            state.dnaInitialised = true;
            initDnaCanvas();
            initDnaObserver();
        }

        if (windowId === "window-skills" && !state.skillsInitialised) {
            state.skillsInitialised = true;
            initKeyboard();
        }

        if (windowId === "window-stages" && !state.stagesInitialised) {
            state.stagesInitialised = true;
            initStages();
        }

        if (windowId === "window-projects") {
            syncProjectLayout();
        }

        setTimeout(() => {
            target.querySelector("[data-close-window]")?.focus();
        }, windowTransitionDelay);
    };

    const closeCurrentWindow = () => {
        closeAllWindows();
    };

    /* ── Carousel ── */
    const getCircularOffset = (index, current, total) => {
        let offset = index - current;
        const mid = Math.floor(total / 2);
        if (offset > mid) offset -= total;
        else if (offset < -mid) offset += total;
        return offset;
    };

    const getCardState = (offset) => {
        const d = Math.abs(offset);
        if (d === 0)
            return { x: 0, y: -8, z: 0, scale: 1, opacity: 1, rotationX: 0, rotationY: 0, zIndex: 40, filter: "blur(0px)" };
        if (d === 1)
            return { x: offset * 290, y: 14, z: -180, scale: 0.82, opacity: 0.74, rotationX: 3, rotationY: offset > 0 ? -24 : 24, zIndex: 24, filter: "blur(0.4px)" };
        if (d === 2)
            return { x: offset * 520, y: 30, z: -340, scale: 0.62, opacity: 0.24, rotationX: 6, rotationY: offset > 0 ? -34 : 34, zIndex: 12, filter: "blur(1.2px)" };
        return { x: offset > 0 ? 740 : -740, y: 42, z: -480, scale: 0.48, opacity: 0, rotationX: 7, rotationY: offset > 0 ? -40 : 40, zIndex: 1, filter: "blur(2px)" };
    };

    const decorateCard = (card, index) => {
        const accent = accentPalette[(index + Math.floor(Math.random() * accentPalette.length)) % accentPalette.length];
        card.style.setProperty("--card-accent", `${accent}66`);
        card.style.setProperty("--card-shift-x", `${40 + Math.round(Math.random() * 20)}%`);
        card.style.setProperty("--card-shift-y", `${36 + Math.round(Math.random() * 26)}%`);
    };

    const renderCards = () => {
        elements.cardsList.innerHTML = projectsData.map((project, index) => `
            <li class="card" data-index="${index}" style="--card-image: url('${project.image}')">
                <button class="card__button" type="button" aria-label="Afficher ${project.title}">
                    <div class="card__content">
                        <span class="card__badge">${project.badge}</span>
                        <h3 class="card__title">${project.title}</h3>
                        <p class="card__year">${project.year}</p>
                    </div>
                </button>
            </li>
        `).join("");
        state.cards = Array.from(elements.cardsList.querySelectorAll(".card"));
        state.cards.forEach(decorateCard);
    };

    const updateProjectFocus = (index) => {
        const p = projectsData[index];
        elements.projectMeta.textContent = `${p.badge} / ${p.year}`;
        elements.projectTitle.textContent = p.title;
        elements.projectDescription.textContent = p.details || p.summary;
        elements.projectPreviewLink.href = p.preview;
        elements.projectTags.innerHTML = p.tech.map((t) => `<span>${t}</span>`).join("");

        if (p.secondaryLink) {
            elements.projectSecondaryLink.href = p.secondaryLink;
            elements.projectSecondaryLink.textContent = p.secondaryLabel || "Voir la démo";
            elements.projectSecondaryLink.classList.remove("is-hidden");
        } else {
            elements.projectSecondaryLink.removeAttribute("href");
            elements.projectSecondaryLink.classList.add("is-hidden");
        }
    };

    const clearDesktopTransform = (card) => {
        if (gsapApi) gsapApi.killTweensOf(card);
        card.style.transform = card.style.opacity = card.style.filter = card.style.zIndex = "";
    };

    const applyCardTransform = (card, cardState, immediate = false) => {
        if (mobileQuery.matches) return;
        if (gsapApi) {
            gsapApi.to(card, {
                duration: immediate || reducedMotionQuery.matches ? 0 : 0.72,
                ease: "power3.out",
                overwrite: true,
                xPercent: -50,
                yPercent: -50,
                ...cardState
            });
            return;
        }
        card.style.opacity = String(cardState.opacity);
        card.style.filter = cardState.filter;
        card.style.zIndex = String(cardState.zIndex);
        card.style.transform =
            `translate(-50%,-50%) translate3d(${cardState.x}px,${cardState.y}px,${cardState.z}px)` +
            ` scale(${cardState.scale}) rotateX(${cardState.rotationX}deg) rotateY(${cardState.rotationY}deg)`;
    };

    const syncDesktopCarousel = (immediate = false) => {
        if (mobileQuery.matches) return;
        state.cards.forEach((card, index) => {
            const offset = getCircularOffset(index, state.activeProjectIndex, state.cards.length);
            const cardState = getCardState(offset);
            const isActive = offset === 0;
            card.classList.toggle("is-active", isActive);
            card.setAttribute("aria-current", String(isActive));
            applyCardTransform(card, cardState, immediate);
        });
        updateProjectFocus(state.activeProjectIndex);
    };

    const disconnectMobileObserver = () => {
        if (state.mobileObserver) { state.mobileObserver.disconnect(); state.mobileObserver = null; }
    };

    const syncMobileList = (shouldScroll = false) => {
        state.cards.forEach((card, i) => {
            const isActive = i === state.activeProjectIndex;
            card.classList.toggle("is-active", isActive);
            card.setAttribute("aria-current", String(isActive));
        });
        updateProjectFocus(state.activeProjectIndex);
        if (shouldScroll) {
            state.cards[state.activeProjectIndex]?.scrollIntoView({
                behavior: reducedMotionQuery.matches ? "auto" : "smooth",
                block: "nearest"
            });
        }
    };

    const setupMobileObserver = () => {
        disconnectMobileObserver();
        if (!mobileQuery.matches || !("IntersectionObserver" in window)) return;
        state.mobileObserver = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (!visible) return;
                const next = Number(visible.target.dataset.index);
                if (Number.isNaN(next) || next === state.activeProjectIndex) return;
                state.activeProjectIndex = next;
                syncMobileList(false);
            },
            { threshold: [0.45, 0.7, 0.9] }
        );
        state.cards.forEach((c) => state.mobileObserver.observe(c));
    };

    const syncProjectLayout = () => {
        if (!state.cards.length) return;
        if (mobileQuery.matches) {
            state.cards.forEach(clearDesktopTransform);
            syncMobileList(false);
            setupMobileObserver();
        } else {
            disconnectMobileObserver();
            syncDesktopCarousel(true);
        }
    };

    const goToProject = (index, options = {}) => {
        const { immediate = false, shouldScroll = false } = options;
        state.activeProjectIndex = wrapIndex(index, state.cards.length);
        mobileQuery.matches ? syncMobileList(shouldScroll) : syncDesktopCarousel(immediate);
    };

    /* ── Dock magnify — smooth Apple-style ── */
    const resetDockMagnify = () => {
        elements.allDockSlots.forEach((slot) => {
            const btn = slot.querySelector(".dock-btn");
            if (btn) { btn.style.removeProperty("--ms"); btn.style.removeProperty("--lift"); }
        });
    };

    const handleDockMagnify = (event) => {
        if (mobileQuery.matches || reducedMotionQuery.matches) { resetDockMagnify(); return; }
        elements.allDockSlots.forEach((slot) => {
            const btn = slot.querySelector(".dock-btn");
            if (!btn) return;
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const distance = Math.abs(event.clientX - centerX);
            const scale = Math.max(1, 1.55 - distance / 120);
            const lift = Math.max(0, 14 - distance / 6);
            btn.style.setProperty("--ms", scale.toFixed(2));
            btn.style.setProperty("--lift", `${lift.toFixed(1)}px`);
        });
    };

    /* ── Init ── */
    renderCards();
    goToProject(0, { immediate: true });
    syncProjectLayout();
    setHeroVisibility();
    setDockState();
    initSplineBackground();
    initContactForm();

    /* ── Events ── */
    /* ── Window button events — dock slots and desktop folder ── */
    elements.windowButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-window-target");
            openWindow(targetId, btn);
            /* Bounce animation on the dock-btn */
            if (gsapApi && !reducedMotionQuery.matches) {
                const slot = btn.closest(".dock-slot");
                const dockBtn = slot ? slot.querySelector(".dock-btn") : btn.querySelector(".dock-btn");
                if (dockBtn) {
                    gsapApi.fromTo(dockBtn,
                        { scale: 0.88 },
                        { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" }
                    );
                }
            }
        });
    });

    elements.closeButtons.forEach((btn) => {
        btn.addEventListener("click", closeCurrentWindow);
    });

    /* Home button */
    elements.homeButton?.addEventListener("click", () => {
        closeAllWindows();
        if (gsapApi && !reducedMotionQuery.matches) {
            gsapApi.fromTo("#desktopGreeting",
                { y: 10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
            );
        }
    });

    /* ── Dossier bureau Stages ── */
    document.getElementById("folderStages")?.addEventListener("click", () => {
        openWindow("window-stages", document.getElementById("folderStages"));
    });

    elements.prevButton?.addEventListener("click", () => goToProject(state.activeProjectIndex - 1));
    elements.nextButton?.addEventListener("click", () => goToProject(state.activeProjectIndex + 1));

    elements.cardsList.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;
        goToProject(Number(card.dataset.index), { shouldScroll: mobileQuery.matches });
    });

    elements.gallery?.addEventListener(
        "wheel",
        (e) => {
            if (mobileQuery.matches || state.activeWindowId !== "window-projects") return;
            e.preventDefault();
            if (state.wheelLocked) return;
            state.wheelLocked = true;
            e.deltaY > 0 ? goToProject(state.activeProjectIndex + 1) : goToProject(state.activeProjectIndex - 1);
            setTimeout(() => { state.wheelLocked = false; }, 320);
        },
        { passive: false }
    );

    elements.dock?.addEventListener("pointermove", handleDockMagnify);
    elements.dock?.addEventListener("pointerleave", resetDockMagnify);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeCurrentWindow();
        if (state.activeWindowId !== "window-projects" || mobileQuery.matches) return;
        if (e.key === "ArrowRight") goToProject(state.activeProjectIndex + 1);
        if (e.key === "ArrowLeft")  goToProject(state.activeProjectIndex - 1);
    });

    mobileQuery.addEventListener("change", () => {
        resetDockMagnify();
        syncProjectLayout();
    });

    window.addEventListener("resize", () => {
        if (!mobileQuery.matches) syncDesktopCarousel(true);
    });

    /* ── GSAP entrance ── */
    if (gsapApi && !reducedMotionQuery.matches) {
        gsapApi.from([".menu-bar", ".desktop-hero", ".dock"], {
            y: 22,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "opacity"
        });

        gsapApi.from(".desktop-folder", {
            y: -18,
            opacity: 0,
            duration: 0.9,
            delay: 0.4,
            ease: "back.out(1.4)",
            clearProps: "opacity"
        });
    }
});
