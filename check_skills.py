import sys

path = 'components/apps/app-skills.tsx'
with open(path, 'r', encoding='latin-1') as f:
    c = f.read()

# Show lines 40-55 (around the heading)
for i, line in enumerate(c.splitlines(), 1):
    if 40 <= i <= 55:
        print(f'{i}: {repr(line)}')
