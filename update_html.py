#FOR CLARITY SAKE
#THIS FILE IMPORTS THE KHMER UNICODE LAYOUT FROM APP.JS AND IMPORT IT TO INDEX.HTML


import json
import re
import ast

with open('e:/khmer-typing/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('const KHMER_KEYMAP = {')
end_idx = content.find('};', start_idx) + 1
map_text = content[start_idx:end_idx+1]

lines = map_text.split('\n')[1:-1]
mapping = {}
for line in lines:
    line = line.strip().rstrip(',')
    if not line: continue
    if '\"\\\\\":' in line:
        mapping['\\\\'] = {'normal': 'ឮ', 'shift': 'ឭ', 'altGr': '\\\\'}
    else:
        try:
            d = ast.literal_eval('{' + line + '}')
            mapping.update(d)
        except Exception as e:
            pass

with open('e:/khmer-typing/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def process_key(match):
    full_str = match.group(0)
    key_char = match.group(1).lower()
    if key_char == 'space':
        return full_str
    if key_char not in mapping:
        return full_str

    m = mapping[key_char]
    norm = m.get('normal', '')
    shift = m.get('shift', '')
    alt = m.get('altGr', '')

    def add_circle(c):
        if not c: return c
        if len(c) == 1 and 0x17B4 <= ord(c[0]) <= 0x17D3:
            return '◌' + c
        if len(c) == 2 and ord(c[0]) == 0x17D2:
            return '◌' + c
        return c

    norm = add_circle(norm)
    shift = add_circle(shift)
    alt = add_circle(alt)

    full_str = re.sub(r'<div class="key-bottom-right purple">.*?</div>', f'<div class="key-bottom-right purple">{norm}</div>', full_str)
    full_str = re.sub(r'<div class="key-top-right purple">.*?</div>', f'<div class="key-top-right purple">{shift}</div>', full_str)
    
    if alt:
        full_str = re.sub(r'<div class="key-top-left.*?">.*?</div>', f'<div class="key-top-left purple">{alt}</div>', full_str)
    else:
        full_str = re.sub(r'<div class="key-top-left.*?">.*?</div>', f'<div class="key-top-left"></div>', full_str)

    return full_str

html = re.sub(r'<div class="key"[^>]*data-key="([^"]+)">.*?</div>\s*</div>', lambda m: m.group(0) if 'keyboard-row' in m.group(0) else process_key(m), html, flags=re.DOTALL)
html = re.sub(r'<div class="key"[^>]*data-key="([^"]+)">.*?</div>\s*(?=<div)', process_key, html, flags=re.DOTALL)
html = re.sub(r'<div class="key"[^>]*data-key="([^"]+)">.*?</div>\s*(?=</div>)', process_key, html, flags=re.DOTALL)

with open('e:/khmer-typing/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
