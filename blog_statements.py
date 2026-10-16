"""Theorem, definition and exercise blocks extracted from rendered article HTML.

Articles write statements as Material admonitions, optionally followed by a
collapsible proof or solution::

    !!! theorem "正交投影定理"
        ...
    ??? proof "证明"
        ...

``extract_statements`` gives each statement a stable-per-build anchor and
returns the structured items used by the theorem index and ``/quiz``.
"""

import re
from html.parser import HTMLParser

STATEMENT_CLASSES = ("theorem", "definition", "problem")
ANSWER_CLASSES = ("proof", "solution")
KIND_LABELS = {
    "definition": "定义",
    "theorem": "定理",
    "proposition": "命题",
    "lemma": "引理",
    "corollary": "推论",
    "problem": "习题",
}
ANCHOR_PREFIX = {
    "definition": "def",
    "theorem": "thm",
    "proposition": "prop",
    "lemma": "lem",
    "corollary": "cor",
    "problem": "ex",
}
_TITLE_KINDS = (
    ("proposition", ("命题", "proposition")),
    ("lemma", ("引理", "lemma")),
    ("corollary", ("推论", "corollary")),
    ("theorem", ("定理", "theorem")),
    ("definition", ("定义", "definition")),
    ("problem", ("习题", "练习", "exercise", "problem")),
)
# Leading kind word plus numbering such as "定理 3.2.1" or "Lemma 4:".
_GENERIC_PREFIX = re.compile(
    r"^\s*(?:定理|命题|引理|推论|定义|习题|练习|theorem|proposition|lemma|corollary|definition|exercise|problem)?"
    r"\s*[\d.．\-–()（）]*\s*[:：.。]?\s*",
    re.IGNORECASE,
)
ANSWER_HTML_LIMIT = 12000


def _class_list(attrs):
    return (dict(attrs).get("class") or "").split()


class _BlockScanner(HTMLParser):
    """Record character spans of statement admonitions, answers and headings."""

    def __init__(self, content):
        super().__init__(convert_charrefs=True)
        self.content = content
        self.line_starts = [0]
        for match in re.finditer("\n", content):
            self.line_starts.append(match.end())
        self.stack = []
        self.blocks = []
        self.heading = None
        self.feed(content)
        self.close()

    def _offset(self):
        line, column = self.getpos()
        return self.line_starts[line - 1] + column

    def handle_starttag(self, tag, attrs):
        start = self._offset()
        classes = _class_list(attrs)
        kind = None
        if tag == "div" and "admonition" in classes:
            kind = next((name for name in STATEMENT_CLASSES if name in classes), None)
            kind = ("statement", kind) if kind else None
        elif tag == "details":
            answer = next((name for name in ANSWER_CLASSES if name in classes), None)
            kind = ("answer", answer) if answer else None
        elif tag in ("h2", "h3", "h4") and not any(entry[1] for entry in self.stack):
            kind = ("heading", dict(attrs).get("id") or "")
            self.heading = {"text": []}
        if tag in ("br", "img", "hr", "input", "meta", "link", "source", "wbr"):
            return
        self.stack.append((tag, kind, start, len(self.stack)))

    def handle_endtag(self, tag):
        if not self.stack:
            return
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                break
        else:
            return
        open_tag, kind, start, depth = self.stack[index]
        del self.stack[index:]
        if not kind:
            return
        end = self._offset() + len(f"</{tag}>")
        nested = any(entry[1] for entry in self.stack)
        if kind[0] == "heading":
            text = " ".join("".join(self.heading["text"]).split()).rstrip("¶ ")
            self.heading = None
            self.blocks.append({"type": "heading", "id": kind[1], "text": text, "start": start, "end": end})
        elif not nested:
            self.blocks.append({"type": kind[0], "class": kind[1], "start": start, "end": end})

    def handle_data(self, data):
        if self.heading is not None:
            self.heading["text"].append(data)


class _TextCollector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style") or "headerlink" in _class_list(attrs):
            self.skip += 1

    def handle_endtag(self, tag):
        if self.skip and tag in ("script", "style", "a"):
            self.skip -= 1

    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)


def plain_text(fragment):
    collector = _TextCollector()
    collector.feed(fragment)
    collector.close()
    return " ".join("".join(collector.parts).split())


_TITLE_RE = re.compile(r'<p class="admonition-title">(.*?)</p>', re.S)
_SUMMARY_RE = re.compile(r"<summary>(.*?)</summary>", re.S)


def _inner(fragment, title_re):
    body = fragment[fragment.index(">") + 1:fragment.rindex("<")]
    match = title_re.search(body)
    title = plain_text(match.group(1)) if match else ""
    if match:
        body = body[:match.start()] + body[match.end():]
    return title, body.strip()


def statement_kind(css_class, title):
    if css_class in ("definition", "problem"):
        return css_class
    lowered = title.strip().lower()
    for kind, words in _TITLE_KINDS:
        if any(lowered.startswith(word) for word in words):
            return kind if kind not in ("definition", "problem") else "theorem"
    return "theorem"


def statement_name(title):
    """Return the descriptive part of a title, or "" for "定理 3.2" style labels."""
    rest = _GENERIC_PREFIX.sub("", title, count=1).strip(" （）()")
    return rest if re.search(r"[^\W\d_]", rest) else ""


def extract_statements(content):
    """Add anchors to statement admonitions; return ``(html, items)``."""
    try:
        blocks = sorted(_BlockScanner(content).blocks, key=lambda block: block["start"])
    except (AssertionError, ValueError):
        return content, []
    items = []
    insertions = []
    counters = {}
    used_ids = set(re.findall(r'\sid="([^"]+)"', content))
    section = {"id": "", "text": ""}
    for index, block in enumerate(blocks):
        if block["type"] == "heading":
            section = {"id": block["id"], "text": block["text"]}
            continue
        if block["type"] != "statement":
            continue
        fragment = content[block["start"]:block["end"]]
        title, body = _inner(fragment, _TITLE_RE)
        kind = statement_kind(block["class"], title)
        answer = None
        following = blocks[index + 1] if index + 1 < len(blocks) else None
        if following and following["type"] == "answer" and not content[block["end"]:following["start"]].strip():
            answer_title, answer_body = _inner(content[following["start"]:following["end"]], _SUMMARY_RE)
            if len(answer_body) <= ANSWER_HTML_LIMIT:
                answer = {"title": answer_title, "html": answer_body}
            else:
                answer = {"title": answer_title, "html": ""}
        existing = re.match(r'<div[^>]*\sid="([^"]+)"', fragment)
        if existing:
            anchor = existing.group(1)
        else:
            prefix = ANCHOR_PREFIX[kind]
            counters[prefix] = counters.get(prefix, 0) + 1
            anchor = f"{prefix}-{counters[prefix]}"
            while anchor in used_ids:
                counters[prefix] += 1
                anchor = f"{prefix}-{counters[prefix]}"
            used_ids.add(anchor)
            insertions.append((block["start"] + len("<div"), f' id="{anchor}"'))
        items.append({
            "anchor": anchor,
            "kind": kind,
            "title": title or KIND_LABELS[kind],
            "name": statement_name(title),
            "html": body,
            "text": plain_text(body),
            "answer": answer,
            "section": section["text"],
            "section_anchor": section["id"],
        })
    for position, text in sorted(insertions, reverse=True):
        content = content[:position] + text + content[position:]
    return content, items


def statement_records(items, page_title, page_url, source, tags):
    """Attach article context to extracted items for the public JSON."""
    records = []
    for item in items:
        record = {
            "id": f"{source[:-3]}#{item['anchor']}",
            "kind": item["kind"],
            "label": KIND_LABELS[item["kind"]],
            "title": item["title"],
            "name": item["name"],
            "html": item["html"],
            "text": item["text"][:600],
            "url": page_url + "#" + item["anchor"],
            "article": page_title,
            "section": item["section"],
            "tags": tags,
        }
        if item["answer"] is not None:
            record["answer_title"] = item["answer"]["title"] or "证明"
            record["answer_html"] = item["answer"]["html"]
        records.append(record)
    return records
