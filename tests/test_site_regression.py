"""Regression tests for user-visible site output.

Runs a full `mkdocs build --strict` into a temporary directory and asserts
on the generated HTML. Guards against regressions that previously reached
production:

1. /blog/ showing "Macro Rendering Error: 'blog_catalog' is undefined"
   (macro errors rendered into pages while the build still exits 0).
2. Broken site search because the public search index JSON is missing
   (zdd-public-search-index.json / zdd-search-data.json were absent from
   the deployed site, so search always returned "No matching passage
   found").
3. Search JS being removed from pages via conditional resource loading.

Keep this test free of external dependencies: stdlib + the existing
mkdocs install only (no Playwright/Selenium/Jest/Vitest).
"""

import json
import re
import subprocess
import sys
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

ROOT = Path(__file__).resolve().parent.parent

ERROR_MARKERS = (
    "Macro Rendering Error",
    "UndefinedError",
    "Traceback (most recent call last)",
)

SEARCH_SCRIPTS = (
    "javascripts/zdd-search-core.js",
    "javascripts/zdd-command-search.js",
    "javascripts/zdd-pixiv-core.js",
)

_site_dir = None
_build_log = ""
_temporary = None


def _build_site():
    global _site_dir, _build_log, _temporary
    if _site_dir is not None:
        return
    # Keep the temp dir alive for the whole test process.
    _temporary = TemporaryDirectory()
    site_dir = Path(_temporary.name) / "site"
    result = subprocess.run(
        [sys.executable, "-m", "mkdocs", "build", "--strict", "-d", str(site_dir)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        timeout=600,
    )
    _build_log = result.stdout + result.stderr
    _site_dir = site_dir


def _read_text(path):
    return path.read_text(encoding="utf-8", errors="ignore")


class SiteBuildTestCase(unittest.TestCase):
    """Base class: one shared strict build per test process."""

    @classmethod
    def setUpClass(cls):
        _build_site()
        cls.site_dir = _site_dir
        cls.build_log = _build_log

    def assert_build_ok(self):
        if self.build_log and "Documentation built" not in self.build_log:
            self.fail(f"mkdocs build --strict failed:\n{self.build_log[-3000:]}")

    def assert_clean(self, path, label):
        text = _read_text(path)
        for marker in ERROR_MARKERS:
            self.assertNotIn(marker, text, f"{marker!r} found in {label}")


class StrictBuildTests(SiteBuildTestCase):
    def test_strict_build_succeeds(self):
        self.assertIn("Documentation built", self.build_log)

    def test_macros_fail_build_on_render_error(self):
        # Without on_error_fail, a broken macro renders its error text into
        # the page and the build still exits 0 (the deployed-site failure).
        config = _read_text(ROOT / "mkdocs.yml")
        self.assertIn("on_error_fail: true", config)

    def test_define_env_registers_blog_catalog_macro(self):
        import main

        class FakeEnv:
            def __init__(self):
                self.macros = {}

            def macro(self, function):
                self.macros[function.__name__] = function
                return function

        env = FakeEnv()
        main.define_env(env)
        self.assertIn("blog_catalog", env.macros)
        self.assertIn("tag_explorer", env.macros)
        self.assertIn("lab_catalog", env.macros)

class RenderedErrorScanTests(SiteBuildTestCase):
    def test_no_error_markers_in_any_html(self):
        self.assert_build_ok()
        html_files = list(self.site_dir.rglob("*.html"))
        self.assertGreater(len(html_files), 5)
        for path in html_files:
            self.assert_clean(path, str(path.relative_to(self.site_dir)))

    def test_no_error_markers_in_generated_json_assets(self):
        self.assert_build_ok()
        for path in (self.site_dir / "assets").rglob("*.json"):
            self.assert_clean(path, str(path.relative_to(self.site_dir)))


class BlogPageTests(SiteBuildTestCase):
    def test_blog_index_renders_catalog(self):
        self.assert_build_ok()
        page = self.site_dir / "blog" / "index.html"
        self.assertTrue(page.exists(), "site/blog/index.html was not generated")
        text = _read_text(page)
        for marker in ERROR_MARKERS:
            self.assertNotIn(marker, text)
        self.assertIn('class="zdd-blog-catalog"', text)
        self.assertIn("zdd-post-card", text)
        self.assertNotRegex(text, r"<h1[^>]*>\s*Blog\s*</h1>")

    def test_tags_page_renders(self):
        self.assert_build_ok()
        page = self.site_dir / "tags" / "index.html"
        self.assertTrue(page.exists(), "site/tags/index.html was not generated")
        text = _read_text(page)
        for marker in ERROR_MARKERS:
            self.assertNotIn(marker, text)
        self.assertIn("zdd-tag-page", text)
        self.assertNotRegex(text, r"<h1[^>]*>\s*Tags\s*</h1>")

    def test_article_has_specific_social_and_structured_metadata(self):
        self.assert_build_ok()
        articles = [
            path for path in (self.site_dir / "blog").rglob("index.html")
            if path.parent != self.site_dir / "blog"
        ]
        self.assertGreater(len(articles), 0)
        for page in articles:
            text = _read_text(page)
            relative = page.relative_to(self.site_dir)
            self.assertIn('<meta property="og:type" content="article">', text, relative)
            self.assertIn('type="application/ld+json"', text, relative)
            self.assertIn('"@type": "BlogPosting"', text, relative)
            self.assertRegex(text, r'<meta name="description" content="(?!zdd\'blog)[^"]+">', relative)
            self.assertRegex(text, r'<meta property="og:description" content="(?!zdd\'blog)[^"]+">', relative)


class SearchAssetTests(SiteBuildTestCase):
    def test_search_index_files_are_generated(self):
        self.assert_build_ok()
        public = self.site_dir / "assets" / "zdd-public-search-index.json"
        legacy = self.site_dir / "assets" / "zdd-search-data.json"
        self.assertTrue(public.exists(), "zdd-public-search-index.json missing")
        self.assertTrue(legacy.exists(), "zdd-search-data.json missing")

        index = json.loads(_read_text(public))
        self.assertEqual(index.get("scope"), "public")
        self.assertGreater(len(index.get("documents", [])), 0)
        self.assertGreater(len(index.get("passages", [])), 0)

        documents = json.loads(_read_text(legacy))
        self.assertIsInstance(documents, list)
        self.assertEqual(len(documents), len(index["documents"]))

    def test_search_index_contains_real_content(self):
        self.assert_build_ok()
        index = json.loads(_read_text(self.site_dir / "assets" / "zdd-public-search-index.json"))
        haystack = json.dumps(index, ensure_ascii=False)
        self.assertIn("统计力学", haystack)

    def test_search_scripts_present_on_all_page_kinds(self):
        self.assert_build_ok()
        pages = [
            self.site_dir / "index.html",
            self.site_dir / "blog" / "index.html",
            self.site_dir / "tags" / "index.html",
            self.site_dir / "os" / "index.html",
            self.site_dir / "lab" / "dungeon" / "index.html",
        ]
        articles = [
            path for path in (self.site_dir / "blog").rglob("*.html")
            if path.name == "index.html" and path.parent.name != "blog"
        ]
        self.assertGreater(len(articles), 0, "no article pages were generated")
        pages.append(articles[0])

        for page in pages:
            self.assertTrue(page.exists(), f"{page} missing")
            text = _read_text(page)
            for script in SEARCH_SCRIPTS:
                self.assertIn(script, text, f"{script} missing from {page.relative_to(self.site_dir)}")
            self.assertIn("zdd-search-data.json", text)
            self.assertIn("zdd-public-search-index.json", text)

    def test_search_scripts_load_globally_not_conditionally(self):
        # Regression guard: a cleanup that moved search JS behind a
        # page.meta.zdd_assets conditional silently killed site search.
        self.assert_build_ok()
        config = _read_text(ROOT / "mkdocs.yml")
        for script in SEARCH_SCRIPTS:
            self.assertIn(f"- {script}", config)
        for path in (self.site_dir / "index.html", self.site_dir / "blog" / "index.html"):
            text = _read_text(path)
            for script in SEARCH_SCRIPTS:
                self.assertRegex(text, r'src="[^"]*' + re.escape(script) + r'"')


class CachedShellScriptTests(SiteBuildTestCase):
    def test_site_shell_is_external_and_available(self):
        self.assert_build_ok()
        asset = self.site_dir / "javascripts" / "site-shell.js"
        self.assertTrue(asset.exists(), "site-shell.js missing from build")
        for path in (self.site_dir / "index.html", self.site_dir / "blog" / "index.html"):
            text = _read_text(path)
            self.assertRegex(text, r'src="[^"]*javascripts/site-shell\.js"')
            self.assertNotIn('var historyKey = "zdd.articleHistory"', text)


class KeyPageTests(SiteBuildTestCase):
    KEY_PAGES = (
        "index.html",
        "blog/index.html",
        "tags/index.html",
        "friends/friends/index.html",
        "lab/dungeon/index.html",
        "lab/fourier/index.html",
        "os/index.html",
        "404.html",
    )

    def test_key_pages_exist_and_are_clean(self):
        self.assert_build_ok()
        for relative in self.KEY_PAGES:
            path = self.site_dir / relative
            self.assertTrue(path.exists(), f"{relative} was not generated")
            self.assert_clean(path, relative)

    def test_dungeon_page_keeps_lab_content(self):
        self.assert_build_ok()
        page = self.site_dir / "lab" / "dungeon" / "index.html"
        self.assert_clean(page, "lab/dungeon/index.html")
        self.assertIn("dungeon-lab.css", _read_text(page))


if __name__ == "__main__":
    unittest.main()
