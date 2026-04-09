import re

with open('index.html', encoding='utf-8') as f:
    txt = f.read()

# Find all window-settings occurrences
for m in re.finditer('window-settings', txt):
    line = txt[:m.start()].count('\n') + 1
    print(f'pos={m.start()} line={line}: ...{txt[m.start()-20:m.start()+35]}...')

print(f'\nTotal length: {len(txt)}')

# Find and report all mac-window sections
sections = list(re.finditer(r'<section[^>]+class="mac-window"[^>]*>', txt))
print(f'\nTotal mac-window sections: {len(sections)}')
for s in sections:
    line = txt[:s.start()].count('\n') + 1
    id_m = re.search(r'id="([^"]+)"', txt[s.start():s.start()+300])
    wid = id_m.group(1) if id_m else '???'
    print(f'  line {line}: id={wid}')
