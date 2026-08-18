import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import mock

import main
from blog_taxonomy import article_tags


class BlogTagTests(unittest.TestCase):
    def test_shared_rules_keep_frequent_rare_and_multiple_explicit_tags(self):
        self.assertEqual(article_tags(["common", "rare"], "blog/misc/example.md"), ["common", "rare"])
        self.assertEqual(
            article_tags(["course", "common", "common"], "blog/cryptography/cryptanalysis/example.md"),
            ["course", "common", "cryptography", "cryptanalysis"],
        )

    def test_tag_explorer_contains_article_with_single_use_tag(self):
        with TemporaryDirectory() as temporary_directory:
            docs_dir = Path(temporary_directory)
            blog_dir = docs_dir / "blog" / "misc"
            blog_dir.mkdir(parents=True)
            articles = {
                "one.md": ("One", ["common", "only-once"]),
                "two.md": ("Two", ["common", "second"]),
                "three.md": ("Three", ["common"]),
            }
            for file_name, (title, tags) in articles.items():
                tag_lines = "\n".join(f"  - {tag}" for tag in tags)
                (blog_dir / file_name).write_text(
                    f"---\ntitle: {title}\ndate: 2026-01-01\ntags:\n{tag_lines}\n---\n\n# {title}\n",
                    encoding="utf-8",
                )

            with mock.patch.object(main, "_docs_dir", return_value=docs_dir):
                generated = main._tag_explorer()
                by_title = {article["title"]: article for article in main._article_data()}

        self.assertEqual(by_title["One"]["tags"], ["common", "only-once"])
        self.assertIn('href="/tags/?tag=only-once"', generated)
        self.assertIn('data-tags="common only-once"', generated)
        self.assertIn("One", generated)


if __name__ == "__main__":
    unittest.main()
