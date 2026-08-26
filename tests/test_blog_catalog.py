import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

import main


class QualificationReviewCatalogTests(unittest.TestCase):
    def test_exam_materials_share_parent_without_changing_urls(self):
        sources = {
            "blog/probability-statistics/probability-theory/course/chapter-01.md": "Probability",
            "blog/applied-math/ai-exam/machine-learning-crash-course.md": "AI",
            "blog/applied-math/applied-math-exam/numerical-algebra-exercises.md": "Applied",
            "blog/qualification-exam-review/probability-statistics-qualification-exam-review.md": "Probability review",
            "blog/qualification-exam-review/ai-qualification-exam-review.md": "AI review",
            "blog/qualification-exam-review/applied-mathematics-qualification-exam-review.md": "Applied review",
        }
        expected_sections = {
            "probability-statistics": 2,
            "ai-exam": 2,
            "applied-math-exam": 2,
        }

        with TemporaryDirectory() as temporary_directory:
            docs_dir = Path(temporary_directory)
            for source, title in sources.items():
                path = docs_dir / source
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(
                    f"---\ntitle: {title}\ndate: 2026-01-01\n---\n\n# {title}\n\nSummary.\n",
                    encoding="utf-8",
                )

            with mock.patch.object(main, "_docs_dir", return_value=docs_dir):
                articles = main._article_data()
                tree = {}
                for article in articles:
                    main._tree_insert(tree, article)

        self.assertEqual(len(articles), len(sources))
        self.assertEqual(set(tree), {"qualification-exam-review"})
        review_root = tree["qualification-exam-review"]
        self.assertEqual(
            {section: len(main._collect_articles(review_root[section])) for section in expected_sections},
            expected_sections,
        )

        by_source = {article["src_path"]: article for article in articles}
        for source in sources:
            self.assertEqual(by_source[source]["url"], "/" + source[:-3] + "/")


if __name__ == "__main__":
    unittest.main()
