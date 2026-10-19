import copy
import json
import re
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from main import _article_data, _render_tree, _tag_index, _tree_insert
from site_catalog import SITE_CATALOG, load_site_catalog, shelf_categories, shelf_for_source

ROOT = Path(__file__).resolve().parents[1]


class BlogShelfTests(unittest.TestCase):
    def test_every_article_sits_on_a_book_two_levels_deep(self):
        for article in _article_data():
            with self.subTest(source=article['src_path']):
                shelf, book = shelf_for_source(article['src_path'])
                self.assertIsNotNone(shelf)
                self.assertEqual(article['folder_parts'], [shelf['key'], book['key']])
                self.assertEqual(article['categories'], [shelf['name'], book['name']])

    def test_catalog_renders_only_folders_and_books(self):
        tree = {}
        for article in _article_data():
            _tree_insert(tree, article)
        rendered = _render_tree(tree)
        self.assertEqual(set(re.findall(r'data-level="(\d)"', rendered)), {'0', '1'})
        self.assertNotIn('id="qualification-exam-review"', rendered)
        for shelf in SITE_CATALOG['shelves']:
            for book in shelf['books']:
                self.assertEqual(rendered.count(f'id="{book["key"]}"'), 1, book['key'])

    def test_longest_source_wins(self):
        rb = 'blog/applied-math/numerical-pde/rb-learning-notes.md'
        self.assertEqual(shelf_for_source(rb)[1]['key'], 'paper-notes')
        self.assertEqual(shelf_for_source('blog/applied-math/numerical-pde/chapter1.md')[1]['key'], 'numerical-pde')
        self.assertEqual(shelf_categories('blog/nowhere/page.md'), [])

    def test_bad_shelves_are_rejected(self):
        def broken(change):
            catalog = copy.deepcopy(SITE_CATALOG)
            change(catalog)
            return catalog
        cases = {
            'duplicate shelf/book key': broken(lambda c: c['shelves'][1]['books'].append(dict(c['shelves'][0]['books'][0], sources=['blog/x']))),
            'duplicate book source': broken(lambda c: c['shelves'][1]['books'][0]['sources'].append(c['shelves'][0]['books'][0]['sources'][0])),
            'no books': broken(lambda c: c['shelves'][0].update(books=[])),
            r'\[shelf, book\]': broken(lambda c: c['courses'][0].update(catalog_path=['analysis', 'nowhere'])),
        }
        for message, catalog in cases.items():
            with self.subTest(message=message), TemporaryDirectory() as temporary:
                path = Path(temporary) / 'catalog.json'
                path.write_text(json.dumps(catalog), encoding='utf-8')
                with self.assertRaisesRegex(ValueError, message):
                    load_site_catalog(path)

    def test_book_sources_exist(self):
        load_site_catalog(docs_dir=ROOT / 'docs')

    def test_tag_index_is_alphabetical_under_initials(self):
        rendered = _tag_index({'pde': 12, 'Banach': 1, 'adaptive-mesh': 1, 'python': 15})
        self.assertEqual(re.findall(r'<h2>(.)</h2>', rendered), ['A', 'B', 'P'])
        self.assertEqual(re.findall(r'<span>([^<]+)</span><small>', rendered), ['adaptive-mesh', 'Banach', 'pde', 'python'])
        self.assertIn('4 \u4e2a\u6807\u7b7e', rendered)


if __name__ == '__main__':
    unittest.main()
