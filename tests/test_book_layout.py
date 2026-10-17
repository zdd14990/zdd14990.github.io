import unittest

from book_layout import apply_book_layout, chinese_number, split_chapter_title


ARTICLE = """<h1 id="chapter-03">第三章：内积空间</h1>
<h2 id="s1">1. 为什么要引入内积</h2>
<p>范数给出误差大小，但只凭范数未必能谈正交方向，我们还需要角度与投影这些几何工具。</p>
<h2 id="s2">2. 形式</h2>
<div id="def-1" class="admonition definition">
<p class="admonition-title">半双线性形式</p>
</div>
<div id="thm-1" class="admonition theorem">
<p class="admonition-title">推论</p>
</div>
<div id="thm-2" class="admonition theorem">
<p class="admonition-title">定理 3.4（Riesz）</p>
</div>
<details class="proof">
<summary>证明</summary><p>y</p></details>
<p><img alt="主轨迹" src="a.png" /></p>
"""


class BookLayoutTests(unittest.TestCase):
    def test_chinese_numbers(self):
        self.assertEqual([chinese_number(t) for t in ("三", "十", "十二", "二十", "7")], [3, 10, 12, 20, 7])
        self.assertEqual(split_chapter_title("第十二章：谱理论"), (12, "谱理论"))
        self.assertEqual(split_chapter_title("附录 A"), (None, "附录 A"))

    def test_opener_and_numbering(self):
        html, opener, numbers = apply_book_layout(ARTICLE, "ignored")
        self.assertEqual(opener["number"], 3)
        self.assertEqual(opener["title_html"], "内积空间")
        self.assertEqual(opener["anchor"], "chapter-03")
        self.assertTrue(opener["lead_html"].startswith("范数"))
        self.assertNotIn("<h1", html)
        self.assertNotIn("范数给出", html)
        self.assertIn('<span class="book-secnum">§ 02</span>形式', html)
        self.assertEqual(numbers, {"def-1": "定义 2.1", "thm-1": "推论 2.2", "thm-2": "定理 2.3"})
        self.assertIn('<span class="book-name">Riesz</span>', html)
        self.assertIn("<summary>证明</summary>", html)
        self.assertIn('<b>Fig. 1</b>主轨迹', html)

    def test_unnumbered_sections_use_plain_counter(self):
        html, opener, numbers = apply_book_layout(
            '<h2 id="a">导言</h2>\n<div id="thm-1" class="admonition theorem">\n'
            '<p class="admonition-title">Banach</p>\n</div>', "随笔")
        self.assertIsNone(opener["number"])
        self.assertEqual(opener["title_html"], "随笔")
        self.assertEqual(numbers, {"thm-1": "定理 1"})
        self.assertNotIn("book-secnum", html)


if __name__ == "__main__":
    unittest.main()
