import unittest

import main


class SearchIndexPassageTests(unittest.TestCase):
    def test_heading_hierarchy_and_mkdocs_anchors(self):
        body = """# 中文标题

开场内容。

## Location Family

The middle of the section explains a location family in detail.

### Examples

一个中文例子。
"""
        passages = main._markdown_passages("doc", "/blog/doc/", "Document", body)
        by_section = {passage["section"]: passage for passage in passages}

        self.assertEqual(by_section["中文标题"]["location"]["anchor"], "_1")
        self.assertEqual(by_section["Location Family"]["location"]["anchor"], "location-family")
        self.assertEqual(by_section["Examples"]["breadcrumb"], ["中文标题", "Location Family", "Examples"])
        self.assertEqual(by_section["Examples"]["url"], "/blog/doc/#examples")

    def test_fenced_heading_is_not_indexed(self):
        body = """```markdown
## Not a real heading
```

## Real Heading

Searchable content.
"""
        passages = main._markdown_passages("doc", "/blog/doc/", "Document", body)
        self.assertEqual([passage["section"] for passage in passages], ["Real Heading"])

    def test_long_section_is_chunked_with_stable_location(self):
        body = "## Long Section\n\n" + ("probability convergence context " * 120)
        passages = main._markdown_passages("doc", "/blog/doc/", "Document", body)

        self.assertGreater(len(passages), 1)
        self.assertTrue(all(passage["location"]["anchor"] == "long-section" for passage in passages))
        self.assertEqual([passage["location"]["passageIndex"] for passage in passages], list(range(len(passages))))
        self.assertTrue(all(len(passage["text"]) <= main.PASSAGE_CHAR_LIMIT for passage in passages))


if __name__ == "__main__":
    unittest.main()
