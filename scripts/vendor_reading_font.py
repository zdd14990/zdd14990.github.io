"""Vendor the pinned upstream, unicode-range WOFF2 font without build-time network."""
import base64
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parent.parent
VERSION = '1.522.0'
PACKAGE = f'lxgw-wenkai-screen-web@{VERSION}'
BASE = f'https://cdn.jsdelivr.net/npm/{PACKAGE}'
DEST = ROOT / 'docs/assets/fonts/wenkai'


def fetch(url):
    with urlopen(url, timeout=60) as response:
        return response.read()


if __name__ == '__main__':
    manifest = json.loads(fetch(f'https://data.jsdelivr.com/v1/package/npm/{PACKAGE}/flat'))
    files = [f for f in manifest['files'] if f['name'].startswith('/lxgwwenkaiscreen/') and f['name'].endswith(('.woff2', '/result.css'))]
    DEST.mkdir(parents=True, exist_ok=True)
    def download(item):
        target = DEST / Path(item['name']).name
        raw = target.read_bytes() if target.exists() else fetch(BASE + item['name'])
        assert base64.b64encode(hashlib.sha256(raw).digest()).decode() == item['hash'], item['name']
        if not target.exists():
            target.write_bytes(raw)
        return {'name': target.name, 'sha256': hashlib.sha256(raw).hexdigest(), 'bytes': len(raw)}
    with ThreadPoolExecutor(max_workers=6) as pool:
        downloaded = list(pool.map(download, files))
    license_url = 'https://raw.githubusercontent.com/lxgw/LxgwWenKai-Screen/main/OFL.txt'
    (DEST / 'OFL.txt').write_bytes(fetch(license_url))
    (DEST / 'manifest.json').write_text(json.dumps({'package': PACKAGE, 'source': BASE, 'license': license_url, 'files': downloaded}, indent=2) + '\n', encoding='utf-8')
    print(f'Vendored {len(downloaded)} font resources, {sum(f["bytes"] for f in downloaded)} bytes')
