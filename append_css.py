css = """
/* ==========================================================
   SPLINE BACKGROUND CANVAS
========================================================== */
.background-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
}

/* ==========================================================
   DESKTOP FOLDER
========================================================== */
.desktop-folder {
    position: absolute;
    top: 5.5rem;
    right: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    padding: 0.6rem;
    border-radius: 1rem;
    cursor: pointer;
    background: transparent;
    border: 1.5px solid transparent;
    transition: background 0.22s ease, border-color 0.22s ease, transform 0.22s ease;
}
.desktop-folder:hover,
.desktop-folder:focus-visible {
    background: rgba(167, 139, 250, 0.12);
    border-color: rgba(167, 139, 250, 0.3);
    transform: translateY(-3px);
}
.desktop-folder__icon {
    width: 4rem;
    height: auto;
    display: block;
    filter: drop-shadow(0 8px 18px rgba(124, 58, 237, 0.45));
    transition: filter 0.22s ease;
}
.desktop-folder:hover .desktop-folder__icon {
    filter: drop-shadow(0 12px 24px rgba(167, 139, 250, 0.65));
}
.desktop-folder__label {
    font-size: 0.74rem;
    color: var(--text);
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.8);
    white-space: nowrap;
    text-align: center;
}

/* ==========================================================
   DOCK FOLDER ICON VARIANT
========================================================== */
.dock-item__icon--folder {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
    padding: 0.3rem;
}
.dock-item__icon--folder svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.3));
}

/* ==========================================================
   CV — DNA HELIX
========================================================== */
.dna-body {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scroll-behavior: smooth;
    padding: 0;
    gap: 0;
}
.dna-canvas {
    display: block;
    width: 100%;
    height: 18rem;
    flex-shrink: 0;
    background: transparent;
}
.dna-timeline {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.4rem 1.4rem 2rem;
}
.dna-period {
    padding: 1.35rem;
    border-radius: var(--radius-xl);
    background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.02)), var(--surface);
    border: 1px solid var(--border);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.dna-period.is-visible {
    opacity: 1;
    transform: translateY(0);
}
.dna-period__year {
    display: inline-block;
    margin-bottom: 0.5rem;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    background: linear-gradient(135deg, rgba(255,114,210,.85), rgba(133,91,255,.85));
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #fff;
}
.dna-period__title {
    margin: 0 0 0.55rem;
    font-family: "Syne", sans-serif;
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    color: var(--text);
}
.dna-period__desc {
    margin: 0 0 0.9rem;
    color: var(--muted);
    line-height: 1.7;
    font-size: 0.92rem;
}
.dna-period__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.dna-period__tags span {
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.12);
    font-size: 0.78rem;
    color: var(--text);
}
.dna-cv-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    padding: 1rem 0 0;
}

/* ==========================================================
   SKILLS — MECHANICAL KEYBOARD
========================================================== */
.keyboard-body {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    padding: 1.4rem;
    overflow-y: auto;
}
.keyboard-legend {
    flex-shrink: 0;
}
.keyboard-legend__desc {
    margin: 0.35rem 0 0.8rem;
    color: var(--muted);
    font-size: 0.88rem;
}
.keyboard-legend__swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.legend-swatch {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
    font-size: 0.75rem;
    color: var(--text);
    border: 1px solid rgba(255,255,255,.12);
}
.legend-swatch__dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    flex-shrink: 0;
}
.keyboard-wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 1.1rem;
    border-radius: 1.2rem;
    background: rgba(10, 7, 20, 0.55);
    border: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    overflow-x: auto;
    min-width: 0;
}
.keyboard-row {
    display: flex;
    gap: 5px;
    flex-shrink: 0;
}
.key {
    --key-color: rgba(255,255,255,.08);
    --key-text: var(--text);
    position: relative;
    height: 3.1rem;
    min-width: 3.1rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    background: var(--key-color);
    border: 1px solid rgba(255,255,255,.14);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 3px 8px rgba(0,0,0,.35), 0 1px 2px rgba(0,0,0,.5);
    color: var(--key-text);
    font-family: "Sora", sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1.2;
    transition: transform 0.18s cubic-bezier(0.22,1,0.36,1), box-shadow 0.18s ease, filter 0.18s ease;
    flex-shrink: 0;
    white-space: nowrap;
}
.key:hover {
    transform: translateY(-4px) scale(1.12);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 8px 22px rgba(0,0,0,.5), 0 0 14px var(--key-color);
    filter: brightness(1.25);
    z-index: 10;
}
.key__sub {
    font-size: 0.58rem;
    opacity: 0.65;
    font-weight: 400;
}
.key--1-5  { min-width: 4.7rem; }
.key--2    { min-width: 6.3rem; }
.key--2-25 { min-width: 7rem; }
.key--2-75 { min-width: 8.6rem; }
.key--space { flex: 1; min-width: 10rem; }
.key--full  { flex: 1; }

/* ==========================================================
   STAGES — PDF GRID
========================================================== */
.stages-header {
    margin-bottom: 1.4rem;
}
.stages-title {
    margin: 0.3rem 0 0.5rem;
    font-family: "Syne", sans-serif;
    font-size: clamp(1.3rem, 2.5vw, 1.8rem);
}
.stages-desc {
    margin: 0;
    color: var(--muted);
    font-size: 0.88rem;
}
.stages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
}
.stage-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.65rem;
    padding: 1.2rem 0.8rem;
    border-radius: 1.1rem;
    background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.02)), var(--surface);
    border: 1px solid var(--border);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    text-align: center;
    color: var(--text);
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
}
.stage-tile:hover,
.stage-tile:focus-visible {
    transform: translateY(-4px);
    border-color: rgba(52, 211, 153, 0.5);
    background: linear-gradient(180deg, rgba(52,211,153,.08), rgba(52,211,153,.02)), var(--surface);
}
.stage-tile__icon {
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
}
.stage-tile__icon svg { width: 100%; height: 100%; }
.stage-tile__name {
    font-size: 0.82rem;
    font-weight: 600;
    line-height: 1.4;
}
.stage-tile__meta {
    font-size: 0.73rem;
    color: var(--muted);
}

/* ==========================================================
   CONTACT — FORM
========================================================== */
.contact-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr 1fr;
    gap: 1rem;
}
.contact-grid .glass-card--intro {
    grid-column: 1 / 3;
}
.contact-form-card {
    grid-column: 3 / 5;
}
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    margin-top: 0.8rem;
}
.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}
.form-field label {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
}
.form-field input,
.form-field textarea {
    padding: 0.65rem 0.9rem;
    border-radius: 0.7rem;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.14);
    color: var(--text);
    font: inherit;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s ease, background 0.2s ease;
    resize: vertical;
}
.form-field input:focus,
.form-field textarea:focus {
    border-color: rgba(255,114,210,.6);
    background: rgba(255,255,255,.09);
}
.form-field input::placeholder,
.form-field textarea::placeholder {
    color: rgba(216,202,238,.4);
}
.contact-form__feedback {
    margin: 0;
    font-size: 0.82rem;
    min-height: 1.2rem;
    color: #34d399;
}
.contact-form__feedback.is-error {
    color: #ff5f57;
}
@media (max-width: 1080px) {
    .contact-grid { grid-template-columns: 1fr 1fr; }
    .contact-grid .glass-card--intro, .contact-form-card { grid-column: span 2; }
}
@media (max-width: 767px) {
    .contact-grid { grid-template-columns: 1fr; }
    .contact-grid .glass-card--intro, .contact-form-card { grid-column: auto; }
    .desktop-folder { top: auto; bottom: 7rem; right: 1.2rem; }
    .keyboard-body { padding: 0.9rem; }
    .keyboard-wrap { padding: 0.7rem; gap: 4px; }
    .key { height: 2.6rem; min-width: 2.6rem; font-size: 0.64rem; }
    .dna-canvas { height: 12rem; }
    .stages-grid { grid-template-columns: repeat(2, 1fr); }
}
"""

with open("style.css", "a", encoding="utf-8") as f:
    f.write(css)

print("CSS appended successfully")
