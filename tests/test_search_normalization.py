import unittest
from pathlib import Path

from main import _display_chunks, _chunk_passage_text, _markdown_passages, _meta_and_body, _plain_markdown, _public_search_index
from zdd_build.blog_text import rendered_headings


class SearchNormalizationTests(unittest.TestCase):
    def test_search_uses_rendered_math_heading_ids(self):
        import markdown
        body = '# Notes\n\n## 1.3 $L^2$ stability\n\nA stable result.\n'
        rendered = markdown.markdown(body, extensions=['toc', 'pymdownx.arithmatex'],
                                     extension_configs={'pymdownx.arithmatex': {'generic': True}})
        headings = rendered_headings(rendered)
        passages = _markdown_passages('notes', '/notes/', 'Notes', body, headings=headings)
        self.assertEqual(passages[-1]['location']['anchor'], headings[-1]['anchor'])
        self.assertIn('A stable result.', passages[-1]['text'])

    def test_moved_annotation_text_links_to_a_surviving_parent(self):
        body = '## Module\n\nIntro.\n\n### Moved note\n\nExplanation.\n\n## Next\n\nTail.'
        headings = [{'level': 2, 'text': 'Module', 'anchor': 'module'},
                    {'level': 2, 'text': 'Next', 'anchor': 'next'}]
        passages = _markdown_passages('notes', '/notes/', 'Notes', body, headings=headings)
        explanation = next(p for p in passages if 'Explanation.' in p['text'])
        self.assertEqual(explanation['url'], '/notes/#module')
        self.assertEqual(passages[-1]['url'], '/notes/#next')
        self.assertEqual(len({p['id'] for p in passages}), len(passages))

    def test_display_restores_math_without_changing_search_chunks(self):
        source = r"中心极限定理：$\frac{X_1+\cdots+X_n}{\sqrt{n}}$，并且 \(x<y\) 和 \[a>b\]。"
        chunks = _chunk_passage_text(source)
        displays = _display_chunks(source, chunks)
        self.assertNotIn("{", chunks[0])
        self.assertIn(r"$\frac{X_1+\cdots+X_n}{\sqrt{n}}$", displays[0])
        self.assertIn(r"\(x<y\)", displays[0])
        self.assertIn(r"\[a>b\]", displays[0])
        passages = _markdown_passages('test', '/test/', 'Test', source)
        self.assertEqual([p['text'] for p in passages], chunks)

    def test_formula_crossing_a_chunk_boundary_is_whole_in_both_displays(self):
        formula = r"$$\frac{" + "x+" * 120 + r"y}{\sqrt{n}}$$"
        source = "前文。" * 25 + formula + "后文。" * 30
        chunks = _chunk_passage_text(source, limit=180, overlap=35)
        displays = _display_chunks(source, chunks)
        math_displays = [d for d in displays if d is not None]
        self.assertGreater(len(math_displays), 1)
        for display in math_displays:
            self.assertIn(formula, display)
            self.assertEqual(display.count('$$'), 2)

    def test_no_math_needs_no_additional_display_field(self):
        passages = _markdown_passages('test', '/test/', 'Test', '广播 unbroadcast_f and x < y')
        self.assertNotIn('displayText', passages[0])

    def test_real_clt_display_preserves_fraction_and_location(self):
        _, body = _meta_and_body(Path('docs/blog/applied-math/data-science/notes.md'))
        passages = _markdown_passages('notes', '/notes/', 'Notes', body)
        result = next(p for p in passages if '中心极限定理 (CLT)' in p['text'])
        self.assertEqual(result['location']['anchor'], '_3')
        self.assertIn(r'\frac{X_1+\cdots +X_n}{\sqrt{n}}', result['displayText'])

    def test_inequalities_retain_text_and_operators(self):
        for source in (
            "x < y",
            "x > y",
            "x < y and z > w",
            "0<x<1 and y>2",
            "$x<y>z$",
            r"\(x<y>z\)",
            "$$x<y>z$$",
        ):
            with self.subTest(source=source):
                self.assertEqual(_plain_markdown(source), source)
        self.assertIn("x<y>z", _plain_markdown(r"\[x<y>z\]"))

    def test_html_tags_are_removed_without_removing_their_text(self):
        for source, expected in (
            ("<span>text</span>", "text"),
            ('<span title="x > y">text</span>', "text"),
            ("<div\n class='note'>text<br/>more</div>", "text more"),
            ("before <!-- hidden comment --> after", "before after"),
            ("<span>x < y and z > w</span>", "x < y and z > w"),
            ("> quoted text", "quoted text"),
        ):
            with self.subTest(source=source):
                self.assertEqual(_plain_markdown(source), expected)

    def test_wald_minimal_reproduction(self):
        source = "$T<\\infty$\n\n**Exercise 12.8 (Wald's Identity)**\n\n$X_1>0$"
        cleaned = _plain_markdown(source)
        self.assertIn("Exercise 12.8 (Wald's Identity)", cleaned)
        self.assertIn(r"<\infty", cleaned)
        self.assertIn(">0", cleaned)

    def test_real_wald_exercise_survives_passage_generation(self):
        path = Path("docs/blog/probability-statistics/probability-theory/gtm295/chapter-12.md")
        _, body = _meta_and_body(path)
        passages = _markdown_passages("chapter-12", "/chapter-12/", "Chapter 12", body)
        self.assertIn("Wald's Identity", body)
        self.assertTrue(any("Exercise 12.8 (Wald's Identity)" in p["text"] for p in passages))

    def test_symbols_retain_underscores(self):
        for symbol in ("unbroadcast_f", "multiple_part_symbol", "__init__", "plain"):
            with self.subTest(symbol=symbol):
                self.assertEqual(_plain_markdown("`" + symbol + "`"), symbol)

    def test_public_index_contains_wald_and_broadcasting_symbol(self):
        index = _public_search_index()
        for suffix, expected in (
            ("gtm295/chapter-12", "Wald's Identity"),
            ("autograd/07-broadcasting", "unbroadcast_f"),
        ):
            with self.subTest(suffix=suffix):
                document = next(d for d in index["documents"] if d["id"].endswith(suffix))
                self.assertIn(expected, document["content"])
                self.assertTrue(any(
                    expected in p["text"] for p in index["passages"]
                    if p["documentId"] == document["id"]
                ))


if __name__ == "__main__":
    unittest.main()
