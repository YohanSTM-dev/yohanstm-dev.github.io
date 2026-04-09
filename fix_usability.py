"""Fix usability issues in index.html:
1. Remove duplicate window-settings section
2. Change 'Projets' dock button to open window-skills instead of window-projects
"""
import re

with open('index.html', encoding='utf-8') as f:
    content = f.read()

original_len = len(content)

# ── 1. Remove duplicate window-settings ──────────────────────────────────────
# The first settings window ends with </section>, then there's a blank line,
# then the duplicate starts: <section class="mac-window" id="window-settings"
# We find it by locating the second occurrence of id="window-settings"

pattern = r'\n\n\n    <section\n        class="mac-window"\n        id="window-settings".*?</section>(\s*\n    <nav )'
match = re.search(pattern, content, re.DOTALL)
if match:
    content = content[:match.start()] + match.group(1) + content[match.end():]
    print("✅ Duplicate window-settings removed")
else:
    print("❌ Duplicate window-settings pattern NOT found")

# ── 2. Fix dock 'Projets' to open window-skills instead of window-projects ───
old_projets = 'data-window-trigger="window-projects" aria-label="Projets" data-dock-label="Projets"'
new_projets = 'data-window-trigger="window-skills" aria-label="Compétences" data-dock-label="Compétences"'
if old_projets in content:
    content = content.replace(old_projets, new_projets, 1)
    print("✅ Dock 'Projets' → window-skills")
else:
    print("❌ Dock Projets trigger NOT found")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Done. {original_len} → {len(content)} bytes")
