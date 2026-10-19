import unittest
from pathlib import Path
from types import SimpleNamespace

from hooks import _set_course_navigation
from main import _article_data, _chapter_neighbors, _render_tree, _tree_insert
from zdd_build.site_catalog import SITE_CATALOG

PILOT = next(course for course in SITE_CATALOG['courses'] if course['id'] == 'probability-theory-course')
PROBABILITY_COURSE_CHAPTERS = tuple(PILOT['chapters'])
PROBABILITY_COURSE_ANCHOR = PILOT['anchor']

ROOT = Path(__file__).resolve().parents[1]


class CourseNavigationTests(unittest.TestCase):
    def page(self, source):
        return SimpleNamespace(file=SimpleNamespace(src_path=source), url=source[:-3] + '/', meta={})

    def test_six_chapters_have_correct_boundaries_and_existing_targets(self):
        expected_titles = [
            'Probability Space and Random Variables', 'Convergences',
            'Law of Large Numbers', 'Central Limit Theorem',
            'Conditional Expectation', 'Markov Chains',
        ]
        for i, source in enumerate(PROBABILITY_COURSE_CHAPTERS):
            with self.subTest(source=source):
                page = self.page(source)
                _set_course_navigation(page, {'docs_dir': ROOT / 'docs'})
                nav = page.meta['course_navigation']
                self.assertEqual(nav['position'], i + 1)
                self.assertEqual(nav['total'], 6)
                self.assertTrue(nav['catalog_url'].endswith('#' + PROBABILITY_COURSE_ANCHOR))
                for key, j in [('previous', i - 1), ('next', i + 1)]:
                    if 0 <= j < 6:
                        self.assertEqual(nav[key]['title'], expected_titles[j])
                        self.assertEqual(nav[key]['url'], f'../chapter-{j + 1:02d}/')
                    else:
                        self.assertIsNone(nav[key])

    def test_unlisted_articles_and_missing_chapters_have_no_course_navigation(self):
        for source in [
            'blog/applied-math/numerical-pde/exercise1.md',
            'blog/applied-math/convex-optimization/homework.md',
            PROBABILITY_COURSE_CHAPTERS[0].replace('01.md', '07.md'),
        ]:
            page = self.page(source)
            _set_course_navigation(page, {'docs_dir': ROOT / 'docs'})
            self.assertNotIn('course_navigation', page.meta)

    def test_every_course_links_all_chapters_in_order(self):
        for course in SITE_CATALOG['courses']:
            chapters = course['chapters']
            for i, source in enumerate(chapters):
                with self.subTest(course=course['id'], source=source):
                    page = self.page(source)
                    _set_course_navigation(page, {'docs_dir': ROOT / 'docs'})
                    nav = page.meta['course_navigation']
                    self.assertEqual((nav['position'], nav['total']), (i + 1, len(chapters)))
                    self.assertTrue(nav['catalog_url'].endswith('#' + course['anchor']))
                    self.assertEqual(nav['previous'] is None, i == 0)
                    self.assertEqual(nav['next'] is None, i == len(chapters) - 1)

    def test_every_course_anchor_appears_once_in_catalog(self):
        tree = {}
        for article in _article_data():
            _tree_insert(tree, article)
        rendered = _render_tree(tree)
        for course in SITE_CATALOG['courses']:
            with self.subTest(course=course['id']):
                self.assertEqual(rendered.count(f'id="{course["anchor"]}"'), 1)

    def test_catalog_target_is_unique_and_contains_all_six_chapters(self):
        tree = {}
        for article in _article_data():
            _tree_insert(tree, article)
        rendered = _render_tree(tree)
        marker = f'id="{PROBABILITY_COURSE_ANCHOR}"'
        self.assertEqual(rendered.count(marker), 1)
        group = rendered.split(marker, 1)[1].split('</details>', 1)[0]
        for source in PROBABILITY_COURSE_CHAPTERS:
            self.assertIn('/' + source[:-3] + '/', group)

    def test_folder_command_neighbors_keep_their_existing_semantics(self):
        neighbors = _chapter_neighbors(_article_data())
        self.assertEqual(
            neighbors['blog/applied-math/numerical-pde/chapter1.md']['next_url'],
            '/blog/applied-math/numerical-pde/exercise1/',
        )

    def test_generated_navigation_replaced_hand_written_buttons(self):
        for course in SITE_CATALOG['courses']:
            for source in course['chapters']:
                with self.subTest(source=source):
                    text = (ROOT / 'docs' / source).read_text(encoding='utf-8')
                    self.assertNotIn('octicons-arrow-left-24', text)
                    self.assertNotIn('下一篇 :octicons-arrow-right-24:', text)

if __name__ == '__main__':
    unittest.main()
