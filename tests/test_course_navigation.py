import unittest
from pathlib import Path
from types import SimpleNamespace

from hooks import _set_course_navigation
from main import _article_data, _chapter_neighbors, _render_tree, _tree_insert
from site_catalog import SITE_CATALOG

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

    def test_pilot_does_not_expand_to_other_articles_or_new_chapters(self):
        for source in [
            'blog/applied-math/autograd/01-ad-and-computational-graph.md',
            'blog/probability-statistics/statistics/course/chapter-01.md',
            PROBABILITY_COURSE_CHAPTERS[0].replace('01.md', '07.md'),
        ]:
            page = self.page(source)
            _set_course_navigation(page, {'docs_dir': ROOT / 'docs'})
            self.assertNotIn('course_navigation', page.meta)

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

    def test_convex_last_chapter_has_no_self_next_link(self):
        text = (ROOT / 'docs/blog/applied-math/convex-optimization/chapter4.md').read_text(encoding='utf-8')
        self.assertNotIn('](chapter4.md)', text)
        self.assertIn('](chapter3.md)', text)


if __name__ == '__main__':
    unittest.main()
