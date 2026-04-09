BASE = 'https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/'

ICONS = {
    'finder':   BASE + 'affa0e0afa873832cc6fe6550f3917c4_sjoWvWxlwy.png',
    'launchpad':BASE + '580889ee3811c11886dc163ee59b9d92_V7Od0GfbVh.png',
    'safari':   BASE + 'e2d2e2d42ca206b72230a1fdb4b60099_f36wSCWrM0.png',
    'cv':       BASE + 'e9751fba27b497cf50e9285ae6aa43b6_XVYkORoX9d.png',
    'settings': BASE + '9b23bcaafd4c81fa40685736c9d2cac1_2DLff7nlvI.png',
    'projets':  BASE + 'c474e38c20b3a554977f24c74a4c1613_c59GvntZQa.png',
    'contact':  BASE + 'f96b1cc92517d1953f61134dc73835b5_RWCZAgggeR.png',
    'trash':    BASE + '28498413ab4a2cc710cc6750b7ac24d0_n13LwuIChY.png',
}

def dock_item(window_trigger, aria_label, dock_label, icon_key, extra=''):
    url = ICONS[icon_key]
    trigger_attr = f'data-window-trigger="{window_trigger}"' if window_trigger else ''
    return f'''        <button class="dock__item" type="button" {trigger_attr} aria-label="{aria_label}" data-dock-label="{dock_label}"{extra}>
            <span class="dock__img" style="background-image:url('{url}')" aria-hidden="true"></span>
            <span class="dock__indicator" aria-hidden="true"></span>
        </button>'''

new_dock = (
    '    <nav class="dock" id="macDock" aria-label="Dock MacOS">\n\n'
    + dock_item('window-projects', 'Finder', 'Finder', 'finder') + '\n\n'
    + dock_item('window-launchpad', 'Launchpad', 'Launchpad', 'launchpad') + '\n\n'
    + dock_item('window-home', 'Safari', 'Safari', 'safari') + '\n\n'
    + '        <span class="dock__separator" aria-hidden="true"></span>\n\n'
    + dock_item('window-cv', 'CV', 'CV', 'cv') + '\n\n'
    + dock_item('window-settings', 'R\u00e9glages', 'R\u00e9glages', 'settings') + '\n\n'
    + dock_item('window-projects', 'Projets', 'Projets', 'projets') + '\n\n'
    + dock_item('window-contact', 'Contact', 'Contact', 'contact') + '\n\n'
    + '        <span class="dock__separator" aria-hidden="true"></span>\n\n'
    + dock_item('', 'Corbeille', 'Corbeille', 'trash', ' style="cursor:default"') + '\n\n'
    + '    </nav>'
)

with open('C:/Users/yohan/yohanstm-dev.github.io/index.html', encoding='utf-8') as f:
    content = f.read()

dock_start = content.find('    <nav class="dock" id="macDock"')
dock_end   = content.find('</nav>', dock_start) + len('</nav>')
print('Dock bounds:', dock_start, '→', dock_end)

result = content[:dock_start] + new_dock + content[dock_end:]

with open('C:/Users/yohan/yohanstm-dev.github.io/index.html', 'w', encoding='utf-8') as f:
    f.write(result)

print('Done. File size:', len(result))


# ── Re-read file pour insertion de la fenêtre Settings ──────────────
with open('C:/Users/yohan/yohanstm-dev.github.io/index.html', encoding='utf-8') as f:
    content = f.read()

dock_idx = content.find('    <nav class="dock" id="macDock"')
if dock_idx == -1:
    raise RuntimeError('Dock nav introuvable après remplacement !')

settings_window = '''
    <section
        class="mac-window"
        id="window-settings"
        role="dialog"
        aria-labelledby="windowSettingsTitle"
        aria-hidden="true"
        hidden
    >
        <div class="mac-window__shell mac-window__shell--settings">
            <header class="mac-window__toolbar">
                <div class="traffic-lights" aria-hidden="true">
                    <button class="traffic-lights__button traffic-lights__button--close" type="button" data-close-window></button>
                    <button class="traffic-lights__button traffic-lights__button--minimize" type="button"></button>
                    <button class="traffic-lights__button traffic-lights__button--maximize" type="button" data-center-window></button>
                </div>
                <p class="mac-window__title" id="windowSettingsTitle">R\u00e9glages Syst\u00e8me</p>
                <span class="mac-window__meta">Personnalisation</span>
            </header>

            <div class="settings-window">
                <aside class="settings-sidebar" aria-label="Cat\u00e9gories des r\u00e9glages">
                    <div class="settings-sidebar__section">
                        <p class="settings-sidebar__label">Bureau</p>
                        <button class="settings-sidebar__item is-active" type="button" data-settings-panel="wallpaper">
                            <span class="settings-sidebar__icon" style="background:linear-gradient(135deg,#007AFF,#5AC8FA)" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="15" rx="2" stroke="currentColor" stroke-width="2"/><path d="M2 14l5-4 4 3 4-5 7 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </span>
                            Fond d\u2019\u00e9cran
                        </button>
                        <button class="settings-sidebar__item" type="button" data-settings-panel="appearance">
                            <span class="settings-sidebar__icon" style="background:linear-gradient(135deg,#8B8B8B,#464650)" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                            </span>
                            Apparence
                        </button>
                    </div>
                    <div class="settings-sidebar__section">
                        <p class="settings-sidebar__label">G\u00e9n\u00e9ral</p>
                        <button class="settings-sidebar__item" type="button" data-settings-panel="dock">
                            <span class="settings-sidebar__icon" style="background:linear-gradient(135deg,#34C759,#007AFF)" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="15" width="20" height="7" rx="3" stroke="currentColor" stroke-width="2"/><rect x="6" y="2" width="4" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="2" width="4" height="10" rx="2" stroke="currentColor" stroke-width="1.6"/></svg>
                            </span>
                            Dock &amp; Barre
                        </button>
                    </div>
                </aside>

                <main class="settings-main" id="settingsMain">
                    <!-- Panel: Fond d'écran -->
                    <div class="settings-panel" id="panel-wallpaper">
                        <p class="settings-section__title">Fond d\u2019\u00e9cran</p>
                        <div class="wallpaper-grid" id="wallpaperGrid">
                            <!-- Injected by JS -->
                        </div>
                    </div>

                    <!-- Panel: Apparence (hidden by default) -->
                    <div class="settings-panel" id="panel-appearance" hidden>
                        <p class="settings-section__title">Apparence</p>
                        <div class="cv-bento-card" style="max-width:400px">
                            <p class="cv-bento-card__eyebrow">Th\u00e8me</p>
                            <p class="cv-bento-card__text">Utilisez le bouton Clair / Sombre dans la barre de menu pour changer de th\u00e8me.</p>
                        </div>
                    </div>

                    <!-- Panel: Dock (hidden by default) -->
                    <div class="settings-panel" id="panel-dock" hidden>
                        <p class="settings-section__title">Dock &amp; Barre de menus</p>
                        <div class="cv-bento-card" style="max-width:400px">
                            <p class="cv-bento-card__eyebrow">Dock</p>
                            <p class="cv-bento-card__text">Le Dock se trouve en bas de l\u2019\u00e9cran. Survolez les ic\u00f4nes pour les agrandir.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </section>
'''

content = content[:dock_idx] + settings_window + content[dock_idx:]
print('Added settings window.')

# ── 2. Update dock Skills gear → window-settings / Réglages ────────
old_dock_skills = 'data-window-trigger="window-skills" aria-label="Skills" data-dock-label="Skills"'
new_dock_skills = 'data-window-trigger="window-settings" aria-label="R\u00e9glages" data-dock-label="R\u00e9glages"'
if old_dock_skills in content:
    content = content.replace(old_dock_skills, new_dock_skills, 1)
    print('Updated dock Skills -> Reglages.')
else:
    print('WARNING: dock skills trigger not found!')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done! File size:', len(content))
