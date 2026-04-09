const projectsData = [
    {
        title: 'FC Fulbert',
        badge: 'SEO case',
        year: '2025',
        summary: 'Refonte SEO et structure de contenu pour donner a un club amateur une base plus claire, plus rapide et plus lisible.',
        details: 'Case study centree sur le referencement naturel : hierarchie HTML, travail editorial, optimisation on-page et meilleure lisibilite globale pour renforcer la presence du site dans Google.',
        image: 'images/logoFCFulbert.png',
        preview: 'fc-fulbert.html',
        tech: ['SEO', 'HTML', 'CSS', 'JavaScript'],
        highlights: ['Structure', 'Performance'],
        layout: 'wide'
    },
    {
        title: 'AppAction',
        badge: 'Product demo',
        year: '2026',
        summary: 'Simulation de gestion avec dashboards, donnees mock et parcours d administration pour tester des usages metier concrets.',
        details: 'Projet de pilotage d activite construit comme une demo produit : tableaux de bord, visualisation des donnees, parcours internes et scenario de consultation pour valider une future application.',
        image: 'images/neural-network.jpg',
        preview: 'app-action.html',
        secondaryLink: 'projets/appAction/index.html',
        secondaryLabel: 'Voir la demo',
        tech: ['JavaScript', 'JSON', 'UI'],
        highlights: ['Dashboard', 'Data mock'],
        layout: 'tall'
    },
    {
        title: 'IronPulse',
        badge: 'Sport tech',
        year: '2025',
        summary: 'Dashboard sport et nutrition avec routines hebdomadaires, suivi des progres et logique de consultation mobile.',
        details: 'Interface de suivi sportif en demo web, pensee autour des records personnels, du rythme d entrainement et d une lecture rapide des performances dans un univers visuel energie.',
        image: 'images/blockchain-vault.jpg',
        preview: 'ironpulse.html',
        secondaryLink: 'projets/IronPulse/index.html',
        secondaryLabel: 'Voir la demo',
        tech: ['HTML', 'CSS', 'JavaScript'],
        highlights: ['Tracking', 'Mobile-first']
    },
    {
        title: 'Resolution Mate',
        badge: 'Problem solving',
        year: '2025',
        summary: 'Outil de suivi d objectifs et de resolutions avec filtres, detail des actions et progression personnelle ou collective.',
        details: 'Produit de suivi oriente organisation : listes d objectifs, filtres de priorites et detail des actions pour rendre une resolution plus concrete, mesurable et suivie dans le temps.',
        image: 'images/data-nexus.jpg',
        preview: 'resolution-mate.html',
        secondaryLink: 'projets/resolution_mate/index.html',
        secondaryLabel: 'Voir la demo',
        tech: ['HTML', 'CSS', 'JavaScript'],
        highlights: ['Organisation', 'Product thinking']
    },
    {
        title: 'Cluedo',
        badge: 'Back-end logic',
        year: '2024',
        summary: 'Jeu de deduction en PHP avec logique serveur, etat de partie et persistance SQLite dans une interface web complete.',
        details: 'Projet BTS centre sur la logique applicative : regles de jeu, navigation entre pieces, hypotheses, donnees SQLite et enchainement des etats pour creer une vraie experience jouable.',
        image: 'images/imgCluedo.jpeg',
        preview: 'cluedo.html',
        tech: ['PHP', 'SQLite', 'JavaScript'],
        highlights: ['Game logic', 'Persistence']
    }
];

const skillsData = [
    {
        name: 'React.js',
        type: 'Frontend',
        iconText: 'RE',
        summary: 'Composants propres, interfaces dynamiques et experiences fluides.',
        tags: ['UI', 'State']
    },
    {
        name: 'TypeScript',
        type: 'Frontend',
        iconText: 'TS',
        summary: 'Typage solide pour garder des bases lisibles et evolutives.',
        tags: ['Typing', 'Safety']
    },
    {
        name: 'JavaScript',
        type: 'Frontend',
        iconText: 'JS',
        summary: 'Animations, logique de page et interactions sur mesure.',
        tags: ['DOM', 'UX']
    },
    {
        name: 'Flutter',
        type: 'Mobile',
        iconText: 'FL',
        summary: 'Interfaces mobiles coherentes et rapides a iterer.',
        tags: ['Cross-platform', 'UI']
    },
    {
        name: 'Node.js',
        type: 'Backend',
        iconText: 'ND',
        summary: 'Services legers, APIs et logique serveur moderne.',
        tags: ['API', 'Runtime']
    },
    {
        name: 'PHP',
        type: 'Backend',
        iconText: 'PHP',
        summary: 'Back-end pragmatique pour projets web et logique metier.',
        tags: ['Server', 'CRUD']
    },
    {
        name: 'Symfony',
        type: 'Framework',
        iconText: 'SY',
        summary: 'Architecture plus cadre, routing clair et separation des responsabilites.',
        tags: ['MVC', 'Structure']
    },
    {
        name: 'C# / .NET',
        type: 'Backend',
        iconText: 'C#',
        summary: 'Bases solides pour applications structurees et robustes.',
        tags: ['Logic', 'OOP']
    },
    {
        name: 'Firebase',
        type: 'BaaS',
        iconText: 'FB',
        summary: 'Auth, stockage et base cloud pour prototyper vite.',
        tags: ['Auth', 'Cloud']
    },
    {
        name: 'SQLite',
        type: 'Data',
        iconText: 'DB',
        summary: 'Persistance simple et efficace pour demos et outils metier.',
        tags: ['SQL', 'Persistence']
    },
    {
        name: 'Docker',
        type: 'Ops',
        iconText: 'DK',
        summary: 'Environnements reproductibles pour travailler plus proprement.',
        tags: ['Containers', 'Deploy']
    },
    {
        name: 'Git',
        type: 'Workflow',
        iconText: 'GT',
        summary: 'Versioning clair, iterations rapides et historique propre.',
        tags: ['Branches', 'Collab']
    }
];

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

let projectModalState = null;

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function prefersReducedMotion() {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function resolveProjectPath(path) {
    if (!path) {
        return '';
    }

    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    if (path.startsWith('projets/') || path.startsWith('./') || path.startsWith('../')) {
        return path;
    }

    if (path.endsWith('.html')) {
        return `projets/${path}`;
    }

    return `projets/${path}.html`;
}

function openProject(destination) {
    const path = resolveProjectPath(destination);
    if (!path) {
        return;
    }

    if (/^https?:\/\//i.test(path)) {
        window.open(path, '_blank', 'noopener');
        return;
    }

    window.location.href = path;
}

function closeDetailsOutside() {
    const dropdowns = Array.from(document.querySelectorAll('.download-dropdown'));

    if (dropdowns.length === 0) {
        return { closeAll: () => {} };
    }

    const closeAll = (exception) => {
        dropdowns.forEach((dropdown) => {
            if (dropdown !== exception) {
                dropdown.removeAttribute('open');
            }
        });
    };

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('toggle', () => {
            if (dropdown.open) {
                closeAll(dropdown);
            }
        });

        dropdown.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                dropdown.removeAttribute('open');
            });
        });
    });

    document.addEventListener('click', (event) => {
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(event.target)) {
                dropdown.removeAttribute('open');
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAll();
        }
    });

    return { closeAll };
}

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) {
        return null;
    }

    const state = {
        modal,
        title: document.getElementById('projectModalTitle'),
        description: document.getElementById('projectModalDesc'),
        tech: document.getElementById('projectModalTech'),
        image: document.getElementById('projectModalImage'),
        preview: document.getElementById('projectModalPreview'),
        secondary: document.getElementById('projectModalGithub'),
        availability: document.getElementById('projectAvailability'),
        closeBtn: modal.querySelector('[data-modal-close]'),
        backdrop: modal.querySelector('[data-modal-backdrop]'),
        lastFocusedElement: null
    };

    const close = () => {
        state.modal.classList.remove('active');
        state.modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        if (state.preview) {
            state.preview.onclick = null;
        }

        if (state.secondary) {
            state.secondary.removeAttribute('href');
            state.secondary.textContent = '';
        }

        if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
            state.lastFocusedElement.focus();
        }
    };

    const trapFocus = (event) => {
        if (event.key !== 'Tab' || !state.modal.classList.contains('active')) {
            return;
        }

        const focusables = Array.from(state.modal.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
            return !element.classList.contains('is-hidden');
        });

        if (focusables.length === 0) {
            return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    if (state.closeBtn) {
        state.closeBtn.addEventListener('click', close);
    }

    if (state.backdrop) {
        state.backdrop.addEventListener('click', close);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && state.modal.classList.contains('active')) {
            close();
        }

        trapFocus(event);
    });

    state.close = close;
    return state;
}

function openProjectModal(project) {
    if (!projectModalState) {
        openProject(project.preview);
        return;
    }

    const techBadges = (project.tech || [])
        .map((tech) => `<span>${escapeHtml(tech)}</span>`)
        .join('');
    const description = project.details || project.summary || '';
    const hasPreview = Boolean(project.preview);
    const hasSecondary = Boolean(project.secondaryLink);

    projectModalState.title.textContent = project.title;
    projectModalState.description.textContent = description;
    projectModalState.tech.innerHTML = techBadges;

    if (projectModalState.image) {
        projectModalState.image.src = project.image;
        projectModalState.image.alt = `Apercu du projet ${project.title}`;
    }

    if (projectModalState.preview) {
        if (hasPreview) {
            projectModalState.preview.classList.remove('is-hidden');
            projectModalState.preview.textContent = 'Voir la fiche';
            projectModalState.preview.onclick = () => {
                projectModalState.close();
                openProject(project.preview);
            };
        } else {
            projectModalState.preview.classList.add('is-hidden');
            projectModalState.preview.onclick = null;
        }
    }

    if (projectModalState.secondary) {
        if (hasSecondary) {
            projectModalState.secondary.classList.remove('is-hidden');
            projectModalState.secondary.href = resolveProjectPath(project.secondaryLink);
            projectModalState.secondary.textContent = project.secondaryLabel || 'Voir la demo';
        } else {
            projectModalState.secondary.classList.add('is-hidden');
            projectModalState.secondary.removeAttribute('href');
            projectModalState.secondary.textContent = '';
        }
    }

    if (projectModalState.availability) {
        if (hasPreview || hasSecondary) {
            projectModalState.availability.textContent = '';
            projectModalState.availability.classList.add('is-hidden');
        } else {
            projectModalState.availability.textContent = 'Ce projet est encore en preparation. Une version publique arrivera bientot.';
            projectModalState.availability.classList.remove('is-hidden');
        }
    }

    projectModalState.lastFocusedElement = document.activeElement;
    projectModalState.modal.classList.add('active');
    projectModalState.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    if (projectModalState.closeBtn) {
        projectModalState.closeBtn.focus();
    }
}

function createProjectCard(project) {
    const card = document.createElement('article');
    const layoutClass = project.layout ? ` project-card--${project.layout}` : '';
    const highlightBadges = (project.highlights || [])
        .map((item) => `<span>${escapeHtml(item)}</span>`)
        .join('');
    const techBadges = (project.tech || [])
        .map((item) => `<span>${escapeHtml(item)}</span>`)
        .join('');

    card.className = `project-card reveal-item${layoutClass}`;
    card.innerHTML = `
        <div class="project-card__media">
            <img src="${escapeHtml(project.image)}" alt="Apercu du projet ${escapeHtml(project.title)}" loading="lazy">
        </div>
        <div class="project-card__content">
            <span class="project-card__badge">${escapeHtml(project.badge || 'Projet')}</span>
            <div>
                <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
                <p class="project-card__text">${escapeHtml(project.summary || '')}</p>
            </div>
            <div class="project-card__meta">
                <span>${escapeHtml(project.year || '2026')}</span>
                ${highlightBadges}
            </div>
            <div class="project-tech">${techBadges}</div>
            <div class="project-card__footer">
                <button class="btn btn-primary" type="button" aria-label="Ouvrir la fiche du projet ${escapeHtml(project.title)}">
                    Voir la fiche
                </button>
            </div>
        </div>
    `;

    const button = card.querySelector('button');
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        openProjectModal(project);
    });

    card.addEventListener('click', () => {
        openProjectModal(project);
    });

    return card;
}

function renderProjects() {
    const container = document.getElementById('projectsTrack');
    if (!container) {
        return;
    }

    const fragment = document.createDocumentFragment();
    projectsData.forEach((project) => {
        fragment.appendChild(createProjectCard(project));
    });

    container.innerHTML = '';
    container.appendChild(fragment);
}

function createSkillCard(skill) {
    const card = document.createElement('article');
    const tags = (skill.tags || [])
        .map((tag) => `<span>${escapeHtml(tag)}</span>`)
        .join('');

    card.className = 'skill-card reveal-item';
    card.innerHTML = `
        <span class="skill-logo skill-logo--text" aria-hidden="true">${escapeHtml(skill.iconText || skill.name.slice(0, 2).toUpperCase())}</span>
        <div>
            <p class="skill-title">${escapeHtml(skill.name)}</p>
            <p class="skill-type">${escapeHtml(skill.type)}</p>
        </div>
        <p class="skill-copy">${escapeHtml(skill.summary || '')}</p>
        <div class="project-tech">${tags}</div>
    `;

    return card;
}

function renderSkills() {
    const container = document.getElementById('skillsGrid');
    if (!container) {
        return;
    }

    const fragment = document.createDocumentFragment();
    skillsData.forEach((skill) => {
        fragment.appendChild(createSkillCard(skill));
    });

    container.innerHTML = '';
    container.appendChild(fragment);
}

function setupNavigation(dropdownControls) {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = Array.from(document.querySelectorAll('section[id]'));

    if (!header || !menuToggle || !navMenu) {
        return;
    }

    const closeMenu = () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        if (dropdownControls) {
            dropdownControls.closeAll();
        }
    };

    const openMenu = () => {
        navMenu.classList.add('active');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    };

    const toggleMenu = () => {
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const getScrollOffset = () => header.offsetHeight + 18;

    const scrollToTarget = (id) => {
        const target = document.getElementById(id);
        if (!target) {
            return;
        }

        const top = target.getBoundingClientRect().top + window.scrollY - getScrollOffset();
        window.scrollTo({
            top,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
    };

    const setActiveLink = () => {
        const cursor = window.scrollY + getScrollOffset() + 160;
        let activeId = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (cursor >= sectionTop && cursor < sectionBottom) {
                activeId = section.id;
            }
        });

        if (!activeId && sections.length > 0) {
            activeId = sections[0].id;
        }

        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${activeId}`;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const updateHeaderState = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    menuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href') || '';
            if (!href.startsWith('#')) {
                return;
            }

            event.preventDefault();
            scrollToTarget(href.slice(1));
            closeMenu();
        });
    });

    document.querySelectorAll('[data-scroll]').forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-scroll');
            if (targetId) {
                scrollToTarget(targetId);
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.classList.contains('active')) {
            return;
        }

        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 780) {
            closeMenu();
        }
    });

    window.addEventListener('scroll', () => {
        updateHeaderState();
        setActiveLink();
    }, { passive: true });

    updateHeaderState();
    setActiveLink();
}

function setupRevealAnimations() {
    const revealElements = Array.from(document.querySelectorAll('.reveal, .reveal-item'));
    if (revealElements.length === 0) {
        return;
    }

    revealElements.forEach((element) => {
        const siblings = Array.from(element.parentElement?.children || []);
        const revealIndex = siblings.filter((node) => node.classList?.contains('reveal-item')).indexOf(element);
        if (element.classList.contains('reveal-item') && revealIndex >= 0) {
            element.style.setProperty('--delay', `${revealIndex * 70}ms`);
        }
    });

    if (prefersReducedMotion()) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
    });

    revealElements.forEach((element) => observer.observe(element));
}

function animateCounter(element) {
    const target = Number.parseInt(element.dataset.target || '0', 10);
    if (Number.isNaN(target)) {
        return;
    }

    if (prefersReducedMotion()) {
        element.textContent = String(target);
        return;
    }

    const duration = 1200;
    const start = performance.now();

    const step = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        element.textContent = String(value);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

function initCounters() {
    const counters = Array.from(document.querySelectorAll('.impact-number[data-target]'));
    if (counters.length === 0) {
        return;
    }

    if (prefersReducedMotion()) {
        counters.forEach((counter) => {
            counter.textContent = counter.dataset.target || '0';
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || entry.target.dataset.animated === 'true') {
                return;
            }

            entry.target.dataset.animated = 'true';
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.5
    });

    counters.forEach((counter) => observer.observe(counter));
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const message = document.getElementById('formMessage');

    if (!form || !message) {
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const honeypot = document.getElementById('company');
        if (honeypot && honeypot.value.trim() !== '') {
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitButton = form.querySelector('.submit-btn');
        const defaultLabel = submitButton ? submitButton.textContent : 'Envoyer le message';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            submitButton.setAttribute('aria-busy', 'true');
        }

        message.textContent = '';
        message.classList.remove('success', 'error');

        try {
            const response = await fetch('https://formspree.io/f/mnnopoon', {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network error');
            }

            form.reset();
            message.textContent = 'Message envoye. Je reviens vers toi rapidement.';
            message.classList.add('success');
        } catch (error) {
            message.textContent = 'L envoi a echoue pour le moment. Tu peux reessayer dans quelques instants.';
            message.classList.add('error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = defaultLabel || 'Envoyer le message';
                submitButton.removeAttribute('aria-busy');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdownControls = closeDetailsOutside();
    projectModalState = initProjectModal();
    renderProjects();
    renderSkills();
    setupNavigation(dropdownControls);
    initCounters();
    setupRevealAnimations();
    setupContactForm();
});
