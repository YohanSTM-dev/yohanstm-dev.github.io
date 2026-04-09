path = 'components/apps/app-skills.tsx'
with open(path, 'r', encoding='latin-1') as f:
    c = f.read()

# Fix Windows-1252 special chars that latin-1 misread
# 0x9c in CP1252 = oe ligature (oe)
c = c.replace('\x9c', '\u0153')  # oe -> oe

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('Done - converted app-skills.tsx to UTF-8')
