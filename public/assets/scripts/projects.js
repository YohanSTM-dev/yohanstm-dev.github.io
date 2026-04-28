/**
 * Lightbox — agrandit les images au clic sur les pages projet
 */
(function () {
    // Crée l'overlay lightbox une seule fois
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image agrandie');

    const img = document.createElement('img');
    img.alt = '';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Fermer');
    closeBtn.innerHTML = '&times;';

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    function openLightbox(src, alt) {
        img.src = src;
        img.alt = alt || '';
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    // Rendre toutes les images cliquables
    document.querySelectorAll('img').forEach(function (el) {
        el.classList.add('zoomable-img');
        el.addEventListener('click', function () {
            openLightbox(el.src, el.alt);
        });
    });

    // Fermeture
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });
})();
