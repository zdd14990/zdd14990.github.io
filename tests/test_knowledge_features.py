import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from zdd_build.blog_links import linked_sources  # noqa: E402
from zdd_build.blog_statements import extract_statements, statement_kind, statement_name, statement_records  # noqa: E402
from main import _truncate_math_text  # noqa: E402


ARTICLE = """
<h2 id="hilbert">2. Hilbert 空间<a class="headerlink" href="#hilbert">¶</a></h2>
<div class="admonition definition">
<p class="admonition-title">定义 2.1：内积</p>
<p>映射 <span class="arithmatex">\\(\\langle\\cdot,\\cdot\\rangle\\)</span> 满足……</p>
</div>
<div class="admonition theorem">
<p class="admonition-title">正交投影定理</p>
<p>每个 \\(x\\) 唯一分解。</p>
<div class="admonition note"><p>nested note</p></div>
</div>
<details class="proof">
<summary>证明</summary>
<p>取最近点。</p>
</details>
<div class="admonition theorem" id="kept">
<p class="admonition-title">推论 2.3</p>
<p>推论内容</p>
</div>
<p>正文隔开</p>
<details class="proof"><summary>证明</summary><p>不属于上面的推论</p></details>
<div class="admonition problem">
<p class="admonition-title">习题</p>
<p>证明 Bessel 不等式。</p>
</div>
<details class="solution"><summary>Solution</summary><p>展开即可。</p></details>
"""


class StatementExtractionTests(unittest.TestCase):
    def setUp(self):
        self.html, self.items = extract_statements(ARTICLE)

    def test_kinds_titles_and_names(self):
        self.assertEqual([item["kind"] for item in self.items], ["definition", "theorem", "corollary", "problem"])
        self.assertEqual(self.items[0]["name"], "内积")
        self.assertEqual(self.items[1]["name"], "正交投影定理")
        self.assertEqual(self.items[2]["name"], "")
        self.assertEqual(self.items[0]["section"], "2. Hilbert 空间")
        self.assertEqual(self.items[0]["section_anchor"], "hilbert")

    def test_anchors_are_added_once_and_existing_ids_are_kept(self):
        self.assertEqual([item["anchor"] for item in self.items], ["def-1", "thm-1", "kept", "ex-1"])
        self.assertIn('<div id="def-1" class="admonition definition">', self.html)
        self.assertEqual(self.html.count('id="kept"'), 1)
        self.assertNotIn('id="thm-2"', self.html)

    def test_only_adjacent_proofs_become_answers(self):
        self.assertEqual(self.items[1]["answer"]["html"], "<p>取最近点。</p>")
        self.assertIsNone(self.items[0]["answer"])
        self.assertIsNone(self.items[2]["answer"])
        self.assertEqual(self.items[3]["answer"]["title"], "Solution")

    def test_nested_admonitions_are_kept_in_the_statement_body(self):
        self.assertIn("nested note", self.items[1]["html"])
        self.assertNotIn("¶", self.items[0]["section"])

    def test_records_carry_article_context(self):
        records = statement_records(self.items, "第三章", "/blog/x/", "blog/x.md", ["hilbert-space"])
        self.assertEqual(records[1]["url"], "/blog/x/#thm-1")
        self.assertEqual(records[1]["answer_title"], "证明")
        self.assertNotIn("answer_html", records[0])
        self.assertEqual(records[0]["id"], "blog/x#def-1")

    def test_title_classification(self):
        self.assertEqual(statement_kind("theorem", "Lemma 4: Zorn"), "lemma")
        self.assertEqual(statement_kind("theorem", "命题（Kronecker）"), "proposition")
        self.assertEqual(statement_kind("theorem", "Hahn–Banach 定理"), "theorem")
        self.assertEqual(statement_name("定理 9.1.1：Hahn–Banach 定理"), "Hahn–Banach 定理")
        self.assertEqual(statement_name("引理 3.2"), "")


class TruncationTests(unittest.TestCase):
    def test_never_leaves_an_open_formula(self):
        text = r"abc \(x+y\) and \(a very long formula\)"
        self.assertEqual(_truncate_math_text(text, 25), r"abc \(x+y\) and…")
        self.assertEqual(_truncate_math_text("short", 25), "short")


class LinkTests(unittest.TestCase):
    def test_relative_markdown_links_resolve_to_articles(self):
        body = (
            "见 [第一章](chapter-01.md#sec)、[附录](../other/appendix.md \"t\")、"
            "[目录](index.md)、[外链](https://example.com/a.md)、[自己](chapter-02.md)\n"
            "```md\n[代码里](ignored.md)\n```\n"
        )
        self.assertEqual(
            linked_sources("blog/analysis/fa/chapter-02.md", body),
            ["blog/analysis/fa/chapter-01.md", "blog/analysis/other/appendix.md"],
        )


if __name__ == "__main__":
    unittest.main()
