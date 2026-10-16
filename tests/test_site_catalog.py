import copy
import json
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from types import SimpleNamespace
from unittest.mock import patch

from hooks import _set_course_navigation, on_page_markdown
from site_catalog import SITE_CATALOG, course_for_folder, load_site_catalog


class SiteCatalogTests(unittest.TestCase):
    def test_default_catalog_targets_exist(self):
        root = Path(__file__).resolve().parents[1]
        catalog = load_site_catalog(docs_dir=root / 'docs')
        self.assertEqual(len(catalog['labs']), 6)
        self.assertEqual(len(catalog['courses'][0]['chapters']), 6)
        self.assertEqual(catalog['display_names']['analysis'], '\u5206\u6790')
        self.assertEqual(catalog['display_names']['numerical-pde'], 'PDE \u6570\u503c\u89e3')

    def test_duplicate_fields_and_damaged_text_are_rejected(self):
        for text, message in [(' {"title": "first", "title": "second"}', 'duplicate field'),
                              ('{"title": "\\ufffd"}', 'damaged text')]:
            with self.subTest(text=text), TemporaryDirectory() as temporary:
                path = Path(temporary) / 'catalog.json'
                path.write_text(text, encoding='utf-8')
                with self.assertRaisesRegex(ValueError, message):
                    load_site_catalog(path)

    def test_another_course_uses_its_explicit_order_and_boundaries(self):
        with TemporaryDirectory() as temporary:
            docs = Path(temporary)
            root = docs / 'blog' / 'demo'
            root.mkdir(parents=True)
            for name in ('last', 'first'):
                (root / f'{name}.md').write_text(f'---\ntitle: {name}\n---\nBody', encoding='utf-8')
            course = {'id': 'demo', 'root': 'blog/demo', 'anchor': 'demo-course',
                      'catalog_path': ['demo'], 'chapters': ['blog/demo/last.md', 'blog/demo/first.md']}
            with patch.dict(SITE_CATALOG, {'courses': [course]}):
                self.assertEqual(course_for_folder(('demo',)), course)
                page = SimpleNamespace(file=SimpleNamespace(src_path=course['chapters'][0]), url='blog/demo/last/', meta={})
                _set_course_navigation(page, {'docs_dir': docs})
                self.assertIsNone(page.meta['course_navigation']['previous'])
                self.assertEqual(page.meta['course_navigation']['next']['title'], 'first')
                self.assertTrue(page.meta['course_navigation']['catalog_url'].endswith('#demo-course'))

    def test_missing_duplicate_or_outside_course_chapters_fail(self):
        for chapter in ('blog/demo/missing.md', 'blog/demo/../outside.md', 'blog/elsewhere/page.md'):
            with self.subTest(chapter=chapter), TemporaryDirectory() as temporary:
                path = Path(temporary) / 'catalog.json'
                catalog = copy.deepcopy(SITE_CATALOG)
                catalog['courses'][0]['root'] = 'blog/demo'
                catalog['courses'][0]['chapters'] = [chapter]
                path.write_text(json.dumps(catalog), encoding='utf-8')
                with self.assertRaises(ValueError):
                    load_site_catalog(path, docs_dir=Path(temporary))
        catalog = copy.deepcopy(SITE_CATALOG)
        catalog['courses'][0]['chapters'] *= 2
        with TemporaryDirectory() as temporary:
            path = Path(temporary) / 'catalog.json'
            path.write_text(json.dumps(catalog), encoding='utf-8')
            with self.assertRaisesRegex(ValueError, 'duplicate chapter'):
                load_site_catalog(path)

    def test_unknown_page_asset_reports_source(self):
        page = SimpleNamespace(file=SimpleNamespace(src_path='lab/unknown.md'), meta={'zdd_assets': ['typo']})
        with self.assertRaisesRegex(ValueError, 'lab/unknown.md: unknown page asset'):
            on_page_markdown('', page, {'extra': {'page_assets': {}}}, [])


if __name__ == '__main__':
    unittest.main()
