import unittest
from datetime import date
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch

from zdd_build.blog_content import ContentStore, begin_build, content_store, end_build, normalize_metadata, parse_document
from main import _article_data, _public_search_index


class BlogContentTests(unittest.TestCase):
    def tearDown(self):
        end_build()

    def test_yaml_forms_share_normalized_metadata(self):
        inline = '---\ntitle: "Title: with punctuation"\ntags: [math, "two-words", math]\ncategories: Research\ndate: 2026-09-01\nupdated: 2026-09-02\n---\n\nBody\n'
        block = '---\ntitle: "Title: with punctuation"\ntags:\n  - math\n  - two-words\ncategories:\n  - Research\ndate: "2026-09-01"\nupdated: "2026-09-02"\n---\n\nBody\n'
        self.assertEqual(parse_document(inline), parse_document(block))
        metadata, body = parse_document(inline)
        self.assertEqual(metadata['tags'], ['math', 'two-words'])
        self.assertEqual(metadata['date'], '2026-09-01')
        self.assertEqual(body, 'Body\n')

    def test_mkdocs_multimarkdown_bom_and_line_endings(self):
        metadata, body = parse_document('\ufefftitle: Title\r\ntags: math\r\n\r\nBody\r\n')
        self.assertEqual(metadata['title'], 'Title')
        self.assertEqual(metadata['tags'], ['math'])
        self.assertEqual(body, 'Body\n')

    def test_invalid_metadata_names_the_source(self):
        for fields in ('tags: {math: true}', 'tags: [math, 42]', 'tags: false', 'tags: [two words]', 'tags: [Math]',
                       'tags: ["$x$ notes"]', 'categories: 0', 'title: 42', 'date: 2026-02-30',
                       'date: 2026-09-02\nupdated: 2026-09-01', 'updated: 2026-09-01', 'tags: [broken'):
            with self.subTest(fields=fields), self.assertRaisesRegex(ValueError, 'blog/example.md'):
                parse_document('---\n' + fields + '\n---\nBody', 'blog/example.md')
        for text in ('---\n- math\n---\nBody', '---\ntitle: Missing end'):
            with self.assertRaises(ValueError):
                parse_document(text)

    def test_page_and_source_dates_and_taxonomy_agree(self):
        metadata = {'title': 'Title', 'date': date(2026, 9, 1), 'tags': ['math'], 'categories': ['Math']}
        source = 'blog/applied-math/numerical-pde/example.md'
        normalized = normalize_metadata(metadata, source)
        self.assertEqual(normalized['tags'], ['math', 'numerical-methods', 'pde'])
        self.assertEqual(metadata['date'], date(2026, 9, 1))
        self.assertEqual(normalize_metadata(normalized, source), normalized)

    def test_sources_are_read_once_and_rebuild_refreshes_articles(self):
        with TemporaryDirectory() as temporary:
            docs = Path(temporary)
            blog = docs / 'blog'
            blog.mkdir()
            article = blog / 'example.md'
            article.write_text('---\ntitle: First\ntags: [math]\n---\nFirst body', encoding='utf-8')
            store = begin_build(docs)
            with patch.object(Path, 'read_text', autospec=True, side_effect=Path.read_text) as read:
                first = _article_data()
                self.assertIs(first, _article_data())
                document = next(item for item in _public_search_index()['documents'] if item['id'] == 'blog/example')
                self.assertEqual(document['title'], 'First')
                self.assertEqual(store.read(article).title, 'First')
                self.assertEqual(read.call_count, 1)
            article.write_text('---\ntitle: Second\n---\nSecond body', encoding='utf-8')
            begin_build(docs)
            self.assertEqual(_article_data()[0]['title'], 'Second')
            document = next(item for item in _public_search_index()['documents'] if item['id'] == 'blog/example')
            self.assertEqual(document['source'], 'Second body')
            self.assertEqual(content_store(docs).read(article).title, 'Second')
            end_build()
            self.assertIsNot(content_store(docs), content_store(docs))

    def test_without_build_a_store_is_fresh_and_heading_supplies_title(self):
        with TemporaryDirectory() as temporary:
            docs = Path(temporary)
            article = docs / 'example.md'
            article.write_text('# Heading title\n\nBody', encoding='utf-8')
            self.assertEqual(ContentStore(docs).read(article).title, 'Heading title')


if __name__ == '__main__':
    unittest.main()
