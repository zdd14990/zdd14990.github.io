import json
import re
import sys
import unittest
from collections import Counter
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from code_notes import Article, HighlightLines, add_code_notes, bind_annotations, prune_note_toc


def render(text):
    return markdown.markdown(text, extensions=['toc', 'attr_list', 'md_in_html', 'pymdownx.superfences', 'pymdownx.arithmatex', 'tables'], extension_configs={'pymdownx.arithmatex': {'generic': True}})


def payload(source):
    article = Article(source)
    data = next(node for node in article.elements if node.attrs.get('id') == 'zdd-code-notes')
    return json.loads(source[data.opening_end:data.closing_start])


def without_markers(code):
    return re.sub(r'^[ \t]*![ \t]*@note-(?:start|end)[^\n]*\n', '', code, flags=re.M)


SAMPLE = r"""## Example

Intro stays visible.

```fortran
module demo
    implicit none
contains
    ! @note-start kernel
    real function gaussian(x)
        real :: x
        gaussian = exp(-x*x)
    end function gaussian
    ! @note-end kernel
end module demo
```

### 3. Kernel $G$

<!-- note-start: kernel -->

The kernel explanation.

$$
G(x) = e^{-x^2}
$$

~~~fortran
y = gaussian(x)
~~~

<!-- note-end: kernel -->

Visible tail.
"""


class CodeNotesTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.text = (ROOT / 'docs/blog/applied-math/numerical-pde/rb-learning-notes.md').read_text(encoding='utf-8-sig').split('---', 2)[2]
        cls.html = render(cls.text)
        cls.result = add_code_notes(cls.html, 'inline')

    def test_entire_article_keeps_code_and_excerpts(self):
        before, after = Article(self.html), Article(self.result)
        data = payload(self.result)

        def codes(article):
            return [without_markers(article.text(node)) for node in article.elements if node.tag == 'code' and node.parent.tag == 'pre']

        moved_code = [code for fragment in data['sources'].values() for code in codes(Article(fragment))]
        self.assertEqual(Counter(codes(before)), Counter(codes(after) + moved_code))
        self.assertTrue(data['notes'])
        self.assertNotIn('@note-start', ''.join(codes(after)))
        self.assertNotIn('<!-- note-start:', self.result)
        original_blocks = [before.text(node) for node in before.root.children if node.tag not in ('h1', 'h2', 'h3', 'h4')]
        remaining_blocks = [after.text(node) for node in after.root.children if node.tag not in ('h1', 'h2', 'h3', 'h4', 'script')]
        moved_blocks = []
        for fragment in data['sources'].values():
            excerpt = Article(fragment)
            self.assertEqual(len(excerpt.root.children), 1)
            self.assertIn(fragment, self.html)
            moved_blocks.append(excerpt.text(excerpt.root.children[0]))
        self.assertEqual(Counter(without_markers(block) for block in original_blocks), Counter(remaining_blocks + moved_blocks))
        bound_rows = {node.attrs.get('id'): node for node in after.elements if node.attrs.get('data-zdd-note')}
        for note in data['notes']:
            for number in range(note['lines'][0], note['lines'][1] + 1):
                self.assertEqual(bound_rows[f'{note["module"]}-L{number}'].attrs['data-zdd-note'], note['id'])
            for reference in note['references']:
                self.assertTrue(reference['sources'])
                for key in reference['sources']:
                    self.assertIn(key, data['sources'])

    def test_removed_headings_are_absent_from_toc(self):
        from mkdocs.structure.toc import AnchorLink, TableOfContents
        original = Article(self.html)
        toc = TableOfContents([AnchorLink(original.text(node), node.attrs['id'], int(node.tag[1])) for node in original.elements if node.tag in ('h2', 'h3', 'h4')])
        before_count = len(toc.items)
        prune_note_toc(self.result, toc)
        retained = {node.attrs['id'] for node in Article(self.result).elements if node.tag in ('h2', 'h3', 'h4')}
        self.assertEqual({node.id for node in toc}, retained)
        self.assertLess(len(toc.items), before_count)

    def test_authoring_comments_do_not_change_catalog_intro(self):
        from main import article_description
        without_comments = re.sub(r'<!--[\s\S]*?-->', '', self.text)
        self.assertEqual(article_description(self.text), article_description(without_comments))


class InlineNotesTests(unittest.TestCase):
    def build(self, text=SAMPLE):
        return bind_annotations(render(text))

    def test_code_edits_and_insertions_follow_markers(self):
        before = payload(self.build())['notes'][0]
        changed = SAMPLE.replace('contains\n', 'contains\n    ! An inserted ordinary comment\n')
        changed = changed.replace('gaussian = exp(-x*x)', 'gaussian = exp(-2*x*x)\n        gaussian = max(gaussian, 0.0)')
        result = self.build(changed)
        after = payload(result)['notes'][0]
        self.assertEqual(after['lines'], [before['lines'][0] + 1, before['lines'][1] + 2])
        self.assertEqual(after['references'], before['references'])
        article = Article(result)
        code = next(node for node in article.elements if node.attrs.get('data-zdd-code') == 'demo')
        self.assertIn('exp(-2*x*x)', article.text(code))
        self.assertNotIn('@note-', article.text(code))

    def test_prose_edits_are_picked_up_without_indices(self):
        changed = SAMPLE.replace('The kernel explanation.', 'A revised explanation.\n\nAn added paragraph.\n\n- First item\n- Second item')
        changed = changed.replace('### 3. Kernel $G$', '### 17. Renamed $G$')
        result = self.build(changed)
        data = payload(result)
        ref = data['notes'][0]['references'][0]
        self.assertEqual(ref['title'], 'Renamed \\(G\\)')
        self.assertIn('arithmatex', ref['heading'])
        fragments = '\n'.join(data['sources'].values())
        self.assertIn('An added paragraph.', fragments)
        self.assertIn('<li>Second item</li>', fragments)
        self.assertIn('arithmatex', fragments)
        self.assertIn('gaussian', fragments)
        self.assertNotIn('A revised explanation.', result.split('<script')[0])
        self.assertIn('Visible tail.', result)

    def test_shared_and_discontiguous_prose_keeps_one_source(self):
        extra = '\n    ! @note-start other\n    ! Another annotated line\n    ! @note-end other\n'
        changed = SAMPLE.replace('end module demo', extra + 'end module demo')
        changed = changed.replace('<!-- note-start: kernel -->', '<!-- note-start: kernel other -->')
        changed = changed.replace('<!-- note-end: kernel -->', '<!-- note-end: kernel other -->')
        changed += '\n### Further details\n\n<!-- note-start: kernel -->\n\nAdditional explanation.\n\n<!-- note-end: kernel -->\n'
        data = payload(self.build(changed))
        first, second = data['notes']
        self.assertEqual(first['references'][0]['sources'], second['references'][0]['sources'])
        self.assertEqual(len(first['references']), 2)
        self.assertEqual(len(second['references']), 1)
        self.assertEqual(sum('The kernel explanation.' in part for part in data['sources'].values()), 1)

    def test_modules_and_chapters_can_be_renamed_and_moved(self):
        changed = SAMPLE.replace('demo', 'renamed').replace('## Example', '## Different chapter')
        code = re.search(r'```fortran.*?```', changed, re.S)[0]
        changed = changed.replace(code, '') + '\n\n' + code
        data = payload(self.build(changed))
        self.assertEqual(data['notes'][0]['module'], 'renamed')
        self.assertIn('The kernel explanation.', ''.join(data['sources'].values()))

    def test_marker_can_wrap_module_declaration(self):
        changed = SAMPLE.replace('    ! @note-start kernel\n', '').replace('module demo\n', '! @note-start kernel\nmodule demo\n', 1)
        self.assertEqual(payload(self.build(changed))['notes'][0]['lines'][0], 1)

    def test_unmarked_empty_snippet_does_not_break_annotations(self):
        changed = SAMPLE.replace('The kernel explanation.', 'The kernel explanation.\n\n```fortran\n```')
        self.assertEqual(len(payload(self.build(changed))['notes']), 1)

    def test_missing_and_orphaned_prose_fail(self):
        cases = [
            SAMPLE.replace('<!-- note-start: kernel -->', '').replace('<!-- note-end: kernel -->', ''),
            SAMPLE.replace('! @note-start kernel', '! @note-start unknown').replace('! @note-end kernel', '! @note-end unknown'),
        ]
        for changed in cases:
            with self.subTest(changed=changed), self.assertRaisesRegex(ValueError, 'missing prose'):
                self.build(changed)

    def test_invalid_code_markers_fail(self):
        cases = [
            ('    ! @note-end kernel\n', '', 'unclosed code'),
            ('! @note-end kernel', '! @note-end wrong', 'mismatched code'),
            ('! @note-start kernel', '! @note-start kernel\n! @note-start nested', 'nested code'),
            ('! @note-start kernel', '! @note-start kernel\n! @note-end kernel', 'empty code'),
            ('! @note-start kernel', '! @note-start', 'malformed code'),
            ('! @note-end kernel', '! @note-end kernel\n! @note-start kernel', 'duplicate code'),
        ]
        for old, new, error in cases:
            with self.subTest(error=error), self.assertRaisesRegex(ValueError, error):
                self.build(SAMPLE.replace(old, new))

    def test_duplicate_code_marker_across_modules_fails(self):
        other = re.search(r'```fortran.*?```', SAMPLE, re.S)[0].replace('demo', 'other')
        with self.assertRaisesRegex(ValueError, 'duplicate code marker'):
            self.build(SAMPLE + '\n\n' + other)

    def test_invalid_prose_markers_fail(self):
        cases = [
            ('<!-- note-end: kernel -->', '', 'unclosed prose'),
            ('<!-- note-end: kernel -->', '<!-- note-end: wrong -->', 'mismatched prose'),
            ('<!-- note-start: kernel -->', '<!-- note-start: kernel -->\n\n<!-- note-start: nested -->', 'nested prose'),
            ('<!-- note-start: kernel -->', '<!-- note-start: kernel -->\n\n<!-- note-end: kernel -->', 'empty prose'),
            ('<!-- note-start: kernel -->', '<!-- note-start kernel -->', 'malformed prose'),
            ('<!-- note-start: kernel -->', '<!-- note-start: kernel kernel -->', 'duplicate prose target'),
        ]
        for old, new, error in cases:
            with self.subTest(error=error), self.assertRaisesRegex(ValueError, error):
                self.build(SAMPLE.replace(old, new))

    def test_full_module_cannot_be_moved_to_prose(self):
        changed = SAMPLE.replace('<!-- note-start: kernel -->', '').replace('<!-- note-end: kernel -->', '')
        changed = changed.replace('```fortran\nmodule', '<!-- note-start: kernel -->\n\n```fortran\nmodule')
        changed = changed.replace('end module demo\n```', 'end module demo\n```\n\n<!-- note-end: kernel -->')
        with self.assertRaisesRegex(ValueError, 'prose includes a full module'):
            self.build(changed)

    def test_annotation_search_and_toc_hide_moved_sections(self):
        from material.plugins.search.plugin import Parser
        changed = SAMPLE.replace('Visible tail.', '')
        result = self.build(changed)
        parser = Parser()
        parser.feed(result)
        search_text = str([section.text for section in parser.data])
        self.assertNotIn('The kernel explanation.', search_text)
        self.assertNotIn('cn-source-', search_text)
        self.assertNotIn('<h3', result)
        self.assertIn('Intro stays visible.', result)

    def test_enabled_page_requires_annotations(self):
        with self.assertRaisesRegex(ValueError, 'no inline annotations'):
            add_code_notes('<p>No annotations</p>', 'inline')
        self.assertEqual(add_code_notes('<p>Plain page</p>', None), '<p>Plain page</p>')
        with self.assertRaisesRegex(ValueError, 'Unknown code notes mode'):
            add_code_notes('', 'unknown')

    def test_multiline_highlighting_keeps_balanced_spans(self):
        lines = HighlightLines('<span class="s">first\nsecond\n</span>').lines
        self.assertEqual(lines, ['<span class="s">first</span>', '<span class="s">second</span>'])


if __name__ == '__main__':
    unittest.main()
