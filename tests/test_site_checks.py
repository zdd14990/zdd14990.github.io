import hashlib
import json
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from scripts.check_site import check_site, local_target


class SiteChecksTests(unittest.TestCase):
    def fixture(self, root, anchor='details'):
        article = root / 'blog/one/index.html'
        article.parent.mkdir(parents=True)
        posting = {'@type': 'BlogPosting', 'headline': 'One', 'url': 'https://zdd14990.github.io/blog/one/',
                   'datePublished': '2026-09-01', 'keywords': ['math'], 'image': 'https://example.test/cover.jpg'}
        article.write_text('<link rel="canonical" href="https://zdd14990.github.io/blog/one/">'
                           '<meta name="description" content="Content"><meta property="og:description" content="Content">'
                           '<meta property="og:url" content="https://zdd14990.github.io/blog/one/">'
                           '<meta property="og:image" content="https://example.test/cover.jpg">'
                           '<meta name="twitter:image" content="https://example.test/cover.jpg">'
                           f'<script type="application/ld+json">{json.dumps(posting)}</script>'
                           '<h2 id="details">Details</h2>', encoding='utf-8')
        assets = root / 'assets'
        assets.mkdir()
        documents = [{'id': 'one', 'type': 'post', 'visibility': 'public', 'title': 'One', 'url': '/blog/one/', 'date': '2026-09-01', 'tags': ['math']}]
        passages = [{'id': 'one:0', 'documentId': 'one', 'url': f'/blog/one/#{anchor}', 'location': {'anchor': anchor}}]
        payload = json.dumps({'documents': documents, 'passages': passages}, ensure_ascii=False, sort_keys=True, separators=(',', ':'))
        checksum = hashlib.sha256(payload.encode()).hexdigest()
        index = {'scope': 'public', 'version': 2, 'documents': documents, 'passages': passages, 'contentHash': checksum, 'documentCount': 1, 'passageCount': 1}
        (assets / 'zdd-public-search-index.json').write_text(json.dumps(index), encoding='utf-8')
        (assets / 'zdd-content-catalog.json').write_text(json.dumps({'scope': 'public', 'version': 1, 'documents': documents, 'contentHash': checksum}), encoding='utf-8')
        return article

    def test_valid_site_and_missing_search_anchor(self):
        for anchor, succeeds in [('details', True), ('missing', False)]:
            with TemporaryDirectory() as temporary:
                root = Path(temporary)
                self.fixture(root, anchor)
                if succeeds:
                    self.assertEqual(check_site(root)['documents'], 1)
                else:
                    with self.assertRaisesRegex(ValueError, 'missing anchor'):
                        check_site(root)

    def test_private_output_and_missing_assets_are_rejected(self):
        with TemporaryDirectory() as temporary:
            root = Path(temporary)
            article = self.fixture(root)
            with article.open('a', encoding='utf-8') as target:
                target.write('<script src="../../javascripts/missing.js"></script>')
            (root / 'private-search-index.json').write_text('{}', encoding='utf-8')
            with self.assertRaisesRegex(ValueError, 'Private data was published'):
                check_site(root)
            with self.assertRaisesRegex(ValueError, 'missing.js'):
                check_site(root)

    def test_version_mismatch_and_seo_inconsistency_are_rejected(self):
        with TemporaryDirectory() as temporary:
            root = Path(temporary)
            article = self.fixture(root)
            catalog_path = root / 'assets/zdd-content-catalog.json'
            catalog = json.loads(catalog_path.read_text(encoding='utf-8'))
            catalog['contentHash'] = 'older'
            catalog_path.write_text(json.dumps(catalog), encoding='utf-8')
            article.write_text(article.read_text(encoding='utf-8').replace('"headline": "One"', '"headline": "Different"'), encoding='utf-8')
            with self.assertRaisesRegex(ValueError, 'versions do not match'):
                check_site(root)
            with self.assertRaisesRegex(ValueError, 'structured title differs'):
                check_site(root)

    def test_relative_links_subpaths_and_escaped_paths(self):
        root = Path('.artifacts/site-check-fixture').resolve()
        self.assertEqual(local_target(root, 'blog/one/index.html', '../../assets/image.png', 'https://example.test/notebook/')[0], root / 'assets/image.png')
        self.assertIsNone(local_target(root, 'index.html', 'https://elsewhere.test/', 'https://example.test/'))
        with self.assertRaises(ValueError):
            local_target(root, 'index.html', '/%2e%2e/private.json', 'https://example.test/')

    def test_inconsistent_sharing_images_are_rejected(self):
        with TemporaryDirectory() as temporary:
            root = Path(temporary)
            article = self.fixture(root)
            article.write_text(article.read_text(encoding='utf-8').replace('"image": "https://example.test/cover.jpg"',
                                                                       '"image": "https://example.test/other.jpg"'), encoding='utf-8')
            with self.assertRaisesRegex(ValueError, 'sharing images'):
                check_site(root)


if __name__ == '__main__':
    unittest.main()
