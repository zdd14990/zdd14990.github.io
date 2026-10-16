"""Validate generated public navigation, search locations, assets and metadata."""

import argparse
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from xml.etree import ElementTree


VOID_TAGS = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
GENERATED_LINKS = {'zdd-header-nav', 'zdd-blog-catalog', 'zdd-tag-cloud', 'zdd-article-taxonomy', 'zdd-course-navigation'}
PRIVATE_FILES = {'private-search-index.json', 'import-manifest.jsonl', 'import-summary.json', 'extraction-cache.jsonl', 'review-queue.json'}


class PageInfo(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.resources = []
        self.links = []
        self.metadata = {}
        self.canonical = ''
        self.structured = []
        self.stack = []
        self.json_text = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        classes = set(attrs.get('class', '').split())
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'meta':
            self.metadata[attrs.get('property') or attrs.get('name')] = attrs.get('content', '')
        if tag == 'link' and 'canonical' in attrs.get('rel', '').split():
            self.canonical = attrs.get('href', '')
        elif tag == 'link' and attrs.get('href'):
            self.resources.append(attrs['href'])
        if tag in {'script', 'img', 'embed', 'source'} and attrs.get('src'):
            self.resources.append(attrs['src'])
        if tag == 'a' and attrs.get('href') and (classes & GENERATED_LINKS or any(item[1] & GENERATED_LINKS for item in self.stack)):
            self.links.append(attrs['href'])
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.json_text = ''
        if tag not in VOID_TAGS:
            self.stack.append((tag, classes))

    def handle_endtag(self, tag):
        if tag == 'script' and self.json_text is not None:
            self.structured.append(json.loads(self.json_text))
            self.json_text = None
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        if self.json_text is not None:
            self.json_text += data


def local_target(root, source, link, site_url):
    target = urlsplit(urljoin(urljoin(site_url, source), link))
    origin = urlsplit(site_url)
    if target.scheme not in {'http', 'https'} or target.netloc != origin.netloc:
        return None
    prefix = origin.path.rstrip('/') + '/'
    if not target.path.startswith(prefix):
        raise ValueError(f'URL is outside the configured site path: {link}')
    relative = unquote(target.path[len(prefix):])
    path = (root / relative).resolve()
    if not path.is_relative_to(root):
        raise ValueError(f'URL escapes the public output: {link}')
    if target.path.endswith('/') or path.is_dir():
        path = path / 'index.html'
    return path, unquote(target.fragment)


def check_site(site_dir, site_url='https://zdd14990.github.io/'):
    root = Path(site_dir).resolve()
    if not root.is_dir():
        raise ValueError(f'Site output does not exist: {root}')
    pages = {}
    errors = []
    checked = 0

    def require(condition, message):
        if not condition:
            errors.append(message)

    def page(path):
        if path not in pages:
            pages[path] = PageInfo(path.read_text(encoding='utf-8'))
        return pages[path]

    def check_link(source, link, anchors=True):
        nonlocal checked
        try:
            target = local_target(root, source, link, site_url)
        except ValueError as exc:
            errors.append(f'{source}: {exc}')
            return None
        if target is None:
            return None
        checked += 1
        path, anchor = target
        if not path.is_file():
            errors.append(f'{source}: missing target {link}')
            return None
        if anchors and anchor and path.suffix == '.html':
            require(anchor in page(path).ids, f'{source}: missing anchor {link}')
        return path

    for path in root.rglob('*'):
        require(path.name not in PRIVATE_FILES, f'Private data was published: {path.relative_to(root)}')

    index = json.loads((root / 'assets/zdd-public-search-index.json').read_text(encoding='utf-8'))
    catalog = json.loads((root / 'assets/zdd-content-catalog.json').read_text(encoding='utf-8'))
    require(index.get('scope') == 'public' and index.get('version') == 2, 'Invalid public search scope or version')
    require(catalog.get('scope') == 'public' and catalog.get('version') == 1, 'Invalid content catalog scope or version')
    documents, passages = index['documents'], index['passages']
    payload = json.dumps({'documents': documents, 'passages': passages}, ensure_ascii=False, sort_keys=True, separators=(',', ':'))
    expected_hash = hashlib.sha256(payload.encode('utf-8')).hexdigest()
    require(index.get('contentHash') == expected_hash, 'Public search content hash does not match its contents')
    require(catalog.get('contentHash') == expected_hash, 'Catalog and search versions do not match')
    require(catalog['documents'] == documents, 'Catalog and search documents differ')
    require(index.get('documentCount') == len(documents) and index.get('passageCount') == len(passages), 'Public search counts do not match')
    require(len({item['id'] for item in documents}) == len(documents), 'Duplicate public document IDs')
    require(len({item['id'] for item in passages}) == len(passages), 'Duplicate public passage IDs')
    document_ids = {item['id'] for item in documents}
    for document in documents:
        require(document.get('visibility') == 'public', f'Private document in public catalog: {document["id"]}')
        require(not ({'content', 'source', 'sourceRoot', 'absolutePath', 'path', 'sourceFilenames'} & document.keys()), f'Unexpected source data in public catalog: {document["id"]}')
        path = check_link('assets/zdd-content-catalog.json', document['url'])
        for field in ('prev_url', 'next_url'):
            if document.get(field):
                check_link('assets/zdd-content-catalog.json', document[field])
        if path and document.get('type') == 'post':
            info = page(path)
            expected_url = urljoin(site_url, document['url'].lstrip('/'))
            require(info.canonical == expected_url, f'{document["id"]}: canonical URL differs from the catalog')
            require(bool(info.metadata.get('description')) and bool(info.metadata.get('og:description')), f'{document["id"]}: missing description')
            require(info.metadata.get('og:url') == expected_url, f'{document["id"]}: Open Graph URL differs from canonical')
            posting = next((item for item in info.structured if item.get('@type') == 'BlogPosting'), {})
            require(posting.get('headline') == document['title'], f'{document["id"]}: structured title differs from the catalog')
            require(posting.get('url') == expected_url, f'{document["id"]}: invalid structured URL')
            require(posting.get('datePublished', '') == document.get('date', ''), f'{document["id"]}: publication dates differ')
            require(posting.get('keywords', []) == document.get('tags', []), f'{document["id"]}: structured tags differ from the catalog')
            share_image = info.metadata.get('og:image')
            require(bool(share_image) and info.metadata.get('twitter:image') == share_image and posting.get('image') == share_image,
                    f'{document["id"]}: sharing images are missing or inconsistent')
            if info.metadata.get('og:image'):
                check_link(path.relative_to(root).as_posix(), info.metadata['og:image'], anchors=False)
    for passage in passages:
        require(passage['documentId'] in document_ids, f'Orphan search passage: {passage["id"]}')
        require(urlsplit(passage['url']).fragment == passage.get('location', {}).get('anchor', ''), f'Passage location differs from URL: {passage["id"]}')
        check_link('assets/zdd-public-search-index.json', passage['url'])

    for path in root.rglob('*.html'):
        info = page(path)
        source = path.relative_to(root).as_posix()
        for resource in info.resources:
            check_link(source, resource, anchors=False)
        for link in info.links:
            check_link(source, link)
    os_page = root / 'os/index.html'
    if os_page.is_file():
        require('noindex' in page(os_page).metadata.get('robots', ''), 'Local library shell must be noindex')
    sitemap_path = root / 'sitemap.xml'
    if sitemap_path.is_file():
        locations = [node.text for node in ElementTree.parse(sitemap_path).iter() if node.tag.endswith('}loc')]
        require(urljoin(site_url, 'os/') not in locations, 'Local library shell is present in the sitemap')
    native_index = root / 'search/search_index.json'
    if native_index.is_file():
        native = json.loads(native_index.read_text(encoding='utf-8'))
        require(not any(item.get('location', '').startswith('os/') for item in native.get('docs', [])), 'Local library shell is present in native search')
    manifest_path = root / 'assets/isaac-runtime.json'
    if manifest_path.is_file():
        manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
        wheel = check_link('assets/isaac-runtime.json', manifest['wheel'], anchors=False)
        if wheel:
            require(hashlib.sha256(wheel.read_bytes()).hexdigest() == manifest['wheel_sha256'], 'Isaac runtime integrity check failed')
    if errors:
        raise ValueError(f'{len(errors)} site check(s) failed:\n' + '\n'.join(errors[:40]))
    return {'pages': len(pages), 'documents': len(documents), 'passages': len(passages), 'links_and_resources': checked}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site-dir', type=Path, default=Path('site'))
    parser.add_argument('--site-url', default='https://zdd14990.github.io/')
    args = parser.parse_args()
    try:
        result = check_site(args.site_dir, args.site_url)
    except (OSError, ValueError, KeyError) as exc:
        parser.exit(1, str(exc) + '\n')
    print(json.dumps(result))


if __name__ == '__main__':
    main()
