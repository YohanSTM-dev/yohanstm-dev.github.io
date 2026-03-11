const projectsData = [
    {
        title: 'FC Fulbert',
        summary: 'Exercice SEO pour le site d un club de football amateur.',
        details: 'Travail oriente SEO avec structure HTML propre, performances et contenu optimise.',
        image: 'images/logoFCFulbert.png',
        preview: 'fc-fulbert',
        github: '',
        tech: ['HTML', 'CSS', 'JavaScript', 'SEO']
    },
    {
        title: 'Cluedo',
        summary: 'Jeu de deduction realise avec logique serveur et persistance.',
        details: 'Jeu complet avec mecanique d indices, logique de deduction et stockage de donnees.',
        image: 'images/imgCluedo.jpeg',
        preview: 'cluedo',
        github: '',
        tech: ['PHP', 'SQLite', 'JavaScript']
    },
    {
        title: 'CV en ligne',
        summary: 'Presentation professionnelle responsive orientee lisibilite.',
        details: 'CV web clair et structure, avec une mise en page adaptee mobile.',
        image: 'images/neural-network.jpg',
        preview: 'cv-yohanStm',
        github: '',
        tech: ['HTML', 'CSS', 'UI']
    },
    {
        title: 'AppAction',
        summary: 'Application de gestion (en cours). Demo statique avec donnees JSON.',
        details: 'Simulation complete basee sur le schema SQL, avec donnees mock et tableaux de bord.',
        image: 'images/neural-network.jpg',
        preview: 'app-action',
        github: '',
        tech: ['Mock Data', 'JavaScript', 'UI']
    },
    {
        title: 'IronPulse',
        summary: 'Suivi sportif et nutritionnel. Interface mobile adaptee en demo web.',
        details: 'Dashboard d entrainement et records personnels, avec planning et heatmap.',
        image: 'images/neural-network.jpg',
        preview: 'ironpulse',
        github: '',
        tech: ['HTML', 'CSS', 'JS']
    },
    {
        title: 'Resolution Mate',
        summary: 'Outil d aide a la resolution de problemes. Demo interactive.',
        details: 'Gestion d objectifs personnels et de groupe, filtrage et detail d action.',
        image: 'images/neural-network.jpg',
        preview: 'resolution-mate',
        github: '',
        tech: ['HTML', 'CSS', 'JS']
    }
];

const skillsData = [
    { name: 'React.js', type: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Vite', type: 'Tooling', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    { name: 'Node.js', type: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'JavaScript', type: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', type: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'HTML5', type: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', type: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Flutter', type: 'Mobile', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { name: 'C# / .NET', type: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
    { name: 'PHP', type: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'Symfony', type: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg' },
    { name: 'Python', type: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'SQLite', type: 'Data', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
    { name: 'Firebase', type: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Supabase', type: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    { name: 'Git', type: 'Outils', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Docker', type: 'Outils', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Bash', type: 'Outils', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' }
];

let isProjectsDragging = false;
let projectModalState = null;

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function openProject(slug) {
    if (!slug) {
        return;
    }

    // Cas 1: Le slug est une URL externe (pour Symfony, Heroku, etc.)
    if (slug.startsWith('http')) {
        window.open(slug, '_blank');
    }
    // Cas 2: Le slug est un dossier (pour un build React qui a un index.html)
    else if (slug.endsWith('/')) {
        window.location.href = `projets/${slug}index.html`;
    }
    // Cas 3: Le slug pointe deja vers un fichier .html
    else if (slug.endsWith('.html')) {
        window.location.href = `projets/${slug}`;
    }
    // Cas 4: Le slug est un simple fichier .html
    else {
        window.location.href = `projets/${slug}.html`;
    }
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
        github: document.getElementById('projectModalGithub'),
        closeBtn: modal.querySelector('[data-modal-close]'),
        backdrop: modal.querySelector('[data-modal-backdrop]')
    };

    const closeModal = () => {
        state.modal.classList.remove('active');
        state.modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    if (state.closeBtn) {
        state.closeBtn.addEventListener('click', closeModal);
    }

    if (state.backdrop) {
        state.backdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && state.modal.classList.contains('active')) {
            closeModal();
        }
    });

    state.close = closeModal;
    return state;
}

function openProjectModal(project) {
    if (!projectModalState) {
        if (project.preview) {
            openProject(project.preview);
        }
        return;
    }

    const summary = project.details || project.description || project.summary || '';
    const techBadges = (project.tech || [])
        .map((tech) => `<span>${escapeHtml(tech)}</span>`)
        .join('');

    projectModalState.title.textContent = project.title;
    projectModalState.description.textContent = summary;
    projectModalState.tech.innerHTML = techBadges;

    if (projectModalState.image) {
        projectModalState.image.src = project.image;
        projectModalState.image.alt = `Apercu du projet ${project.title}`;
    }

    if (project.preview) {
        projectModalState.preview.classList.remove('is-hidden');
        projectModalState.preview.onclick = () => openProject(project.preview);
    } else {
        projectModalState.preview.classList.add('is-hidden');
        projectModalState.preview.onclick = null;
    }

    if (project.github) {
        projectModalState.github.classList.remove('is-hidden');
        projectModalState.github.href = project.github;
    } else {
        projectModalState.github.classList.add('is-hidden');
        projectModalState.github.removeAttribute('href');
    }

    projectModalState.modal.classList.add('active');
    projectModalState.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';

    const summary = project.summary || project.description || '';
    const techBadges = (project.tech || [])
        .map((tech) => `<span>${escapeHtml(tech)}</span>`)
        .join('');

    card.innerHTML = `
        <div class="project-content">
            <div class="project-head">
                <img class="project-logo" src="${escapeHtml(project.image)}" alt="Logo du projet ${escapeHtml(project.title)}" loading="lazy">
                <div class="project-head-text">
                    <h3>${escapeHtml(project.title)}</h3>
                    <p>${escapeHtml(summary)}</p>
                </div>
            </div>
            <div class="project-tech">${techBadges}</div>
            <button class="btn btn-ghost" type="button">Voir le projet</button>
        </div>
    `;

    const button = card.querySelector('button');
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        openProjectModal(project);
    });
    card.addEventListener('click', () => {
        if (isProjectsDragging) {
            return;
        }
        openProjectModal(project);
    });

    return card;
}

function renderProjects() {
    const track = document.getElementById('projectsTrack');
    if (!track) {
        return;
    }

    projectsData.forEach((project) => {
        track.appendChild(createProjectCard(project));
    });
}

function setupProjectsSlider() {
    const track = document.getElementById('projectsTrack');
    const prev = document.getElementById('projectsPrev');
    const next = document.getElementById('projectsNext');

    if (!track || !prev || !next) {
        return;
    }

    const getStep = () => {
        const firstCard = track.querySelector('.project-card');
        if (!firstCard) {
            return 320;
        }

        const styles = window.getComputedStyle(track);
        const gap = Number.parseInt(styles.columnGap || styles.gap || '0', 10);
        return firstCard.clientWidth + (Number.isNaN(gap) ? 0 : gap);
    };

    prev.addEventListener('click', () => {
        track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
        track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    track.addEventListener(
        'wheel',
        (event) => {
            if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
                return;
            }

            event.preventDefault();
            track.scrollBy({ left: event.deltaY, behavior: 'smooth' });
        },
        { passive: false }
    );

    let isPointerDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let hasDragged = false;

    const shouldIgnoreDrag = (target) =>
        Boolean(target.closest('button') || target.closest('a') || target.closest('input'));

    const beginDrag = (clientX) => {
        isPointerDown = true;
        hasDragged = false;
        isProjectsDragging = false;
        startX = clientX;
        startScrollLeft = track.scrollLeft;
        track.classList.add('dragging');
    };

    const moveDrag = (clientX) => {
        if (!isPointerDown) {
            return;
        }

        const delta = clientX - startX;
        if (Math.abs(delta) > 6) {
            hasDragged = true;
            isProjectsDragging = true;
        }
        track.scrollLeft = startScrollLeft - delta;
    };

    const stopDrag = () => {
        if (!isPointerDown) {
            return;
        }
        isPointerDown = false;
        track.classList.remove('dragging');
        if (hasDragged) {
            setTimeout(() => {
                isProjectsDragging = false;
            }, 0);
        }
    };

    track.addEventListener(
        'click',
        (event) => {
            if (isProjectsDragging) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        true
    );

    if (window.PointerEvent) {
        track.addEventListener('pointerdown', (event) => {
            if (event.button !== undefined && event.button !== 0) {
                return;
            }
            if (shouldIgnoreDrag(event.target)) {
                return;
            }
            event.preventDefault();
            beginDrag(event.clientX);
        });

        track.addEventListener('pointermove', (event) => {
            moveDrag(event.clientX);
        });

        track.addEventListener('pointerup', stopDrag);
        track.addEventListener('pointercancel', stopDrag);
        track.addEventListener('pointerleave', stopDrag);
    } else {
        track.addEventListener('mousedown', (event) => {
            if (event.button !== 0) {
                return;
            }
            if (shouldIgnoreDrag(event.target)) {
                return;
            }
            event.preventDefault();
            beginDrag(event.clientX);
        });

        window.addEventListener('mousemove', (event) => {
            moveDrag(event.clientX);
        });

        window.addEventListener('mouseup', stopDrag);

        track.addEventListener(
            'touchstart',
            (event) => {
                if (event.touches.length > 0) {
                    if (shouldIgnoreDrag(event.target)) {
                        return;
                    }
                    beginDrag(event.touches[0].clientX);
                }
            },
            { passive: true }
        );

        track.addEventListener(
            'touchmove',
            (event) => {
                if (event.touches.length > 0) {
                    moveDrag(event.touches[0].clientX);
                }
            },
            { passive: true }
        );

        track.addEventListener('touchend', stopDrag);
        track.addEventListener('touchcancel', stopDrag);
    }
}

function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) {
        return;
    }

    const fragment = document.createDocumentFragment();

    skillsData.forEach((skill) => {
        const card = document.createElement('article');
        card.className = 'skill-card';

        card.innerHTML = `
            <img class="skill-logo" src="${escapeHtml(skill.icon)}" alt="Logo ${escapeHtml(skill.name)}" loading="lazy">
            <div>
                <p class="skill-title">${escapeHtml(skill.name)}</p>
                <p class="skill-type">${escapeHtml(skill.type)}</p>
            </div>
        `;

        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

function setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    if (!menuToggle || !navMenu || !header) {
        return;
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    const closeMenu = () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    const scrollToTarget = (id) => {
        const target = document.getElementById(id);
        if (!target) {
            return;
        }

        const offset = header.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    };

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href')?.replace('#', '');
            if (targetId) {
                scrollToTarget(targetId);
                closeMenu();
            }
        });
    });

    const actionButtons = document.querySelectorAll('[data-scroll]');
    actionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-scroll');
            if (targetId) {
                scrollToTarget(targetId);
            }
        });
    });

    const sections = Array.from(document.querySelectorAll('section[id]'));

    const updateActiveLink = () => {
        const scrollPosition = window.scrollY + header.offsetHeight + 140;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < bottom) {
                navLinks.forEach((link) => {
                    const isActive = link.getAttribute('href') === `#${id}`;
                    link.classList.toggle('active', isActive);
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const message = document.getElementById('formMessage');

    if (!form || !message) {
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = form.querySelector('.submit-btn');
        const defaultText = submitButton ? submitButton.textContent : 'Envoyer';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi...';
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
                throw new Error('Erreur reseau');
            }

            message.textContent = 'Message envoye. Je te reponds rapidement.';
            message.classList.add('success');
            form.reset();
        } catch (error) {
            message.textContent = 'Envoi impossible pour le moment. Reessaie dans quelques instants.';
            message.classList.add('error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = defaultText || 'Envoyer';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    projectModalState = initProjectModal();
    renderProjects();
    setupProjectsSlider();
    renderSkills();
    setupNavigation();
    setupContactForm();
});
