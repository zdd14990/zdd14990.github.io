"""Move annotated excerpts out of the article body and bind them to code lines."""
import html
import json
import re
from html.parser import HTMLParser


class Element:
    def __init__(self, tag, attrs, start, opening_end, parent):
        self.tag, self.attrs = tag, dict(attrs)
        self.start, self.opening_end = start, opening_end
        self.end = self.closing_start = opening_end
        self.parent, self.children = parent, []


class Article(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.offsets = [0]
        for match in re.finditer('\n', source):
            self.offsets.append(match.end())
        self.root = Element('root', [], 0, 0, None)
        self.stack, self.elements, self.comments = [self.root], [], []
        self.feed(source)

    def position(self):
        line, column = self.getpos()
        return self.offsets[line - 1] + column

    def handle_starttag(self, tag, attrs):
        start = self.position()
        node = Element(tag, attrs, start, start + len(self.get_starttag_text()), self.stack[-1])
        self.stack[-1].children.append(node)
        self.elements.append(node)
        if tag not in ('area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'):
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if self.stack[-1].tag == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                node = self.stack[index]
                node.closing_start = self.position()
                node.end = self.source.index('>', node.closing_start) + 1
                del self.stack[index:]
                break

    def text(self, node):
        inner = self.source[node.opening_end:node.closing_start]
        inner = re.sub(r'<a\b[^>]*class="headerlink".*?</a>', '', inner, flags=re.S)
        return html.unescape(re.sub(r'<[^>]+>', '', inner))

    def handle_comment(self, data):
        start = self.position()
        self.comments.append((start, self.source.index('-->', start) + 3, data.strip(), self.stack[-1]))


class HighlightLines(HTMLParser):
    """Split syntax markup at newlines, balancing spans on both sides of a split."""
    def __init__(self, markup):
        super().__init__(convert_charrefs=False)
        self.lines, self.stack = [''], []
        self.feed(markup)
        if not re.sub(r'<[^>]+>', '', self.lines[-1]):
            self.lines.pop()

    def handle_starttag(self, tag, attrs):
        # Pygments uses spans; old line anchors are intentionally not duplicated.
        if tag == 'span':
            attrs = [(key, value) for key, value in attrs if key != 'id']
            opening = '<span' + ''.join(f' {key}="{html.escape(value or "", quote=True)}"' for key, value in attrs) + '>'
            self.stack.append(opening)
            self.lines[-1] += opening

    def handle_endtag(self, tag):
        if tag == 'span' and self.stack:
            self.lines[-1] += '</span>'
            self.stack.pop()

    def handle_data(self, data):
        parts = data.split('\n')
        for index, part in enumerate(parts):
            if index:
                self.lines[-1] += '</span>' * len(self.stack)
                self.lines.append(''.join(self.stack))
            self.lines[-1] += html.escape(part, quote=False)

    def handle_entityref(self, name):
        self.lines[-1] += '&' + name + ';'

    def handle_charref(self, name):
        self.lines[-1] += '&#' + name + ';'


NOTE_ID = r'[A-Za-z][\w.-]*'
CODE_MARKER = re.compile(r'\s*!\s*@note-(start|end)\s+(' + NOTE_ID + r')\s*')
PROSE_MARKER = re.compile(r'note-(start|end):\s*(' + NOTE_ID + r'(?:\s+' + NOTE_ID + r')*)')


def _code_ranges(code, markup):
    """Resolve stable markers to visible lines, hiding the Fortran comments."""
    raw_lines = code.rstrip('\n').split('\n')
    highlighted = HighlightLines(markup).lines
    if len(raw_lines) != len(highlighted):
        raise ValueError('Code notes: line splitting failed')
    lines, clean, ranges = [], [], []
    active, seen = None, set()
    for raw, rendered in zip(raw_lines, highlighted):
        marker = CODE_MARKER.fullmatch(raw)
        if marker:
            action, name = marker.groups()
            if action == 'start':
                if active:
                    raise ValueError(f'Code notes: nested code marker {name}')
                if name in seen:
                    raise ValueError(f'Code notes: duplicate code marker {name}')
                seen.add(name)
                active = (name, len(lines) + 1)
            else:
                if not active or active[0] != name:
                    raise ValueError(f'Code notes: mismatched code marker {name}')
                if active[1] > len(lines):
                    raise ValueError(f'Code notes: empty code range {name}')
                ranges.append((name, active[1], len(lines)))
                active = None
        else:
            if re.match(r'\s*!\s*@note-', raw):
                raise ValueError(f'Code notes: malformed code marker {raw.strip()}')
            lines.append(rendered)
            clean.append(raw)
    if active:
        raise ValueError(f'Code notes: unclosed code marker {active[0]}')
    return '\n'.join(clean), lines, ranges


def _prose_ranges(article):
    """A prose region may serve several notes; one note may use several regions."""
    excerpts, edits, active = {}, [], None
    for start, end, data, parent in article.comments:
        if not re.match(r'note-(?:start|end)\b', data):
            continue
        marker = PROSE_MARKER.fullmatch(data)
        if not marker or parent is not article.root:
            raise ValueError(f'Code notes: malformed prose marker {data}')
        action, names = marker.groups()
        names = names.split()
        if len(set(names)) != len(names):
            raise ValueError(f'Code notes: duplicate prose target {data}')
        edits.append((start, end, ''))
        if action == 'start':
            if active:
                raise ValueError(f'Code notes: nested prose marker {data}')
            active = (names, end)
        else:
            if not active or active[0] != names:
                raise ValueError(f'Code notes: mismatched prose marker {data}')
            nodes = [node for node in article.root.children
                     if active[1] <= node.start and node.end <= start
                     and node.tag not in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6')]
            if not nodes:
                raise ValueError(f'Code notes: empty prose range {data}')
            for name in names:
                excerpts.setdefault(name, []).extend(nodes)
            active = None
    if active:
        raise ValueError(f'Code notes: unclosed prose marker {active[0]}')
    return excerpts, edits


def bind_annotations(source):
    article = Article(source)
    selected, edits = _prose_ranges(article)
    modules, headings, note_names = {}, [], set()
    for node in article.elements:
        if node.tag in ('h2', 'h3', 'h4'):
            headings.append((article.text(node).strip(), node))
        if node.tag == 'code' and node.parent.tag == 'pre':
            code = article.text(node).replace('\r\n', '\n')
            if not re.match(r'(?:module|program)\s+\w+\s*\n', code) and not re.search(r'^\s*!\s*@note-', code, re.M):
                continue
            clean, lines, ranges = _code_ranges(code, source[node.opening_end:node.closing_start])
            match = re.match(r'(?:module|program)\s+(\w+)\s*\n', clean)
            if not match:
                if ranges:
                    raise ValueError('Code notes: marked code must start with a module or program')
                continue
            name = match[1]
            if name in modules:
                raise ValueError(f'Code notes: duplicate module {name}')
            modules[name] = (node, code, lines, ranges)
            for note_name, _, _ in ranges:
                if note_name in note_names:
                    raise ValueError(f'Code notes: duplicate code marker {note_name}')
                note_names.add(note_name)
    if note_names != set(selected):
        missing = sorted(note_names - set(selected))
        orphaned = sorted(set(selected) - note_names)
        raise ValueError(f'Code notes: missing prose {missing}; orphaned prose {orphaned}')
    if not note_names:
        raise ValueError('Code notes: no inline annotations found')

    notes, source_keys, excerpts = [], {}, {}
    for name, (code_node, code, line_markup, ranges) in modules.items():
        bindings = {}
        for note_name, first, last in ranges:
            note_id = f'zdd-note-{len(notes) + 1}'
            refs, sections = [], {}
            for node in selected[note_name]:
                if any(node.start <= module_node.start < node.end for module_node, _, _, _ in modules.values()):
                    raise ValueError(f'Code notes: prose includes a full module for {note_name}')
                heading = next(((title, item) for title, item in reversed(headings) if item.start < node.start), None)
                if heading is None:
                    raise ValueError(f'Code notes: missing prose heading for {note_name}')
                title, heading = heading
                if heading.start not in sections:
                    heading_html = source[heading.opening_end:heading.closing_start]
                    heading_html = re.sub(r'<a\b[^>]*class="headerlink".*?</a>', '', heading_html, flags=re.S)
                    heading_html = re.sub(r'^\d+(?:\.\d+)*\.?\s+', '', heading_html)
                    ref = {'title': re.sub(r'^\d+(?:\.\d+)*\.?\s+', '', title), 'heading': heading_html, 'sources': []}
                    sections[heading.start] = ref
                    refs.append(ref)
                if node.start not in source_keys:
                    key = f'cn-source-{len(source_keys) + 1}'
                    source_keys[node.start] = key
                    excerpts[key] = source[node.start:node.end]
                    edits.append((node.start, node.end, ''))
                sections[heading.start]['sources'].append(source_keys[node.start])
            notes.append({'id': note_id, 'module': name, 'lines': [first, last], 'references': refs})
            for number in range(first, last + 1):
                bindings[number] = (note_id, first, refs[0]['title'])
        rendered = []
        for number, markup in enumerate(line_markup, 1):
            attrs = f' class="zdd-code-line" data-line="{number}" id="{name}-L{number}"'
            if number in bindings:
                note_id, first, title = bindings[number]
                attrs += f' data-zdd-note="{note_id}"'
                if number == first:
                    attrs += ' tabindex="0" role="button" aria-expanded="false" aria-controls="zdd-code-note"'
                    attrs += f' aria-label="{html.escape(title, quote=True)}"'
            rendered.append('<span' + attrs + '>' + markup + '</span>')
        ending = '\n' if code.endswith('\n') else ''
        edits.append((code_node.opening_end, code_node.closing_start, '\n'.join(rendered) + ending))
        position = code_node.opening_end - 1
        edits.append((position, position, f' data-zdd-code="{name}"'))
    # Remove headings whose entire section has moved into annotations. Parent
    # headings remain when any prose, formula, code or child section remains.
    for title, heading in headings:
        stop = next((node.start for _, node in headings if node.start > heading.start and int(node.tag[1]) <= int(heading.tag[1])), len(source))
        remaining = [node for node in article.root.children if heading.end <= node.start < stop and node.tag not in ('h2', 'h3', 'h4') and node.start not in source_keys and 'zdd-article-taxonomy' not in node.attrs.get('class', '')]
        if not remaining:
            edits.append((heading.start, heading.end, ''))
    for start, end, replacement in sorted(edits, reverse=True):
        source = source[:start] + replacement + source[end:]
    payload = json.dumps({'notes': notes, 'sources': excerpts}, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')
    return source + '\n<script type="application/json" id="zdd-code-notes">' + payload + '</script>\n'


def prune_note_toc(source, toc):
    """Keep MkDocs navigation aligned with the headings left in the body."""
    ids = {node.attrs.get('id') for node in Article(source).elements if node.tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6')}

    def retain(items):
        result = []
        for item in items:
            item.children = retain(item.children)
            if item.id in ids:
                result.append(item)
            else:
                result.extend(item.children)
        return result

    toc.items = retain(toc.items)


def add_code_notes(source, name):
    if not name:
        return source
    if name != 'inline':
        raise ValueError(f'Unknown code notes mode: {name}')
    return bind_annotations(source)
