"""Shared Markdown summaries and passage extraction for the static blog."""

import html
import re
from html.parser import HTMLParser

from markdown.extensions.toc import slugify, unique


HEADING_RE = re.compile(r"^\s{0,3}(#{1,6})\s+(.+?)\s*$")
HEADING_ATTR_RE = re.compile(r"\s+\{[^}]*#([A-Za-z0-9_.:-]+)[^}]*\}\s*$")
FENCE_RE = re.compile(r"^\s{0,3}(`{3,}|~{3,})")
PASSAGE_CHAR_LIMIT = 900
PASSAGE_OVERLAP = 120


def plain_markdown(text):
    text = re.sub(r"```[\s\S]*?```", " ", text)
    text = re.sub(r"~~~[\s\S]*?~~~", " ", text)
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    # Keep delimited math intact; HTML must have a tag name and valid attributes.
    text = re.sub(
        r'(\$\$[\s\S]*?\$\$|\$[^$\n]+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])'
        r'|<!--[\s\S]*?-->|</?[A-Za-z][A-Za-z0-9-]*'
        r"""(?:\s+[A-Za-z_:][A-Za-z0-9_.:-]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*\s*/?>""",
        lambda match: match.group(1) or " ",
        text,
    )
    text = re.sub(r"^\s{0,3}(?:>\s*)+", " ", text, flags=re.M)
    text = re.sub(r"^\s*#{1,6}\s*", "", text, flags=re.M)
    text = re.sub(r"^\s*!!!.*$", "", text, flags=re.M)
    text = re.sub(r"^\s*(?:[-+*]|\d+[.)])\s+", "", text, flags=re.M)
    text = re.sub(r"[*`#|{}\[\]]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def chunk_passage_text(text, limit=PASSAGE_CHAR_LIMIT, overlap=PASSAGE_OVERLAP):
    text = plain_markdown(text)
    if not text:
        return []
    if len(text) <= limit:
        return [text]

    chunks = []
    start = 0
    sentence_marks = "。！？.!?；;"
    while start < len(text):
        end = min(len(text), start + limit)
        if end < len(text):
            floor = start + int(limit * 0.62)
            sentence_end = max(text.rfind(mark, floor, end) for mark in sentence_marks)
            if sentence_end >= floor:
                end = sentence_end + 1
            else:
                word_end = text.rfind(" ", floor, end)
                if word_end >= floor:
                    end = word_end
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end >= len(text):
            break
        next_start = max(0, end - overlap)
        if next_start <= start:
            next_start = end
        space = text.find(" ", next_start, min(end, next_start + overlap))
        start = space + 1 if space >= 0 else next_start
    return chunks


MATH_SNIPPET_RE = re.compile(
    r"(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$"
    r"|(?<![\\$])\$(?:\\.|[^$\\\n])+\$(?!\$)"
    r"|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]"
)


def display_chunks(source, chunks):
    """Restore whole math only for display; keep retrieval chunks byte-for-byte."""
    plain = plain_markdown(source)
    formulas = []
    cursor = 0
    for match in MATH_SNIPPET_RE.finditer(source):
        original = re.sub(r"\s+", " ", match.group()).strip()
        cleaned = plain_markdown(match.group())
        start = plain.find(cleaned, cursor)
        if start < 0 or not cleaned:
            continue
        end = start + len(cleaned)
        formulas.append((start, end, original))
        cursor = end

    displays = []
    cursor = 0
    for chunk in chunks:
        start = plain.find(chunk, cursor)
        if start < 0:
            displays.append(None)
            continue
        end = start + len(chunk)
        cursor = start + 1  # Chunks overlap; do not skip to their end.
        inside = [(left, right, raw) for left, right, raw in formulas if left < end and right > start]
        if not inside:
            displays.append(None)
            continue
        pieces = []
        position = start
        for left, right, raw in inside:
            pieces.append(plain[position:max(position, left)])
            pieces.append(raw)
            position = min(end, right)
        pieces.append(plain[position:end])
        displays.append("".join(pieces))
    return displays


def heading_data(raw_heading, used_ids):
    heading = re.sub(r"\s+#+\s*$", "", raw_heading.strip())
    custom_match = HEADING_ATTR_RE.search(heading)
    custom_id = custom_match.group(1) if custom_match else ""
    if custom_match:
        heading = heading[:custom_match.start()].strip()
    heading = plain_markdown(heading)
    anchor = unique(custom_id or slugify(heading, "-"), used_ids)
    return heading, anchor


class HeadingParser(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.headings = []
        self.current = None
        self.skip_link = False
        self.feed(content)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self.current = {'level': int(tag[1]), 'anchor': attrs.get('id', ''), 'text': ''}
        if tag == 'a' and 'headerlink' in attrs.get('class', '').split():
            self.skip_link = True

    def handle_endtag(self, tag):
        if tag == 'a':
            self.skip_link = False
        if self.current and tag == f'h{self.current["level"]}':
            if self.current['anchor']:
                self.headings.append(self.current)
            self.current = None

    def handle_data(self, data):
        if self.current and not self.skip_link:
            self.current['text'] += data


def rendered_headings(content):
    return HeadingParser(content).headings


def _heading_key(text):
    text = plain_markdown(text)
    for delimiter in (r'\(', r'\)', r'\[', r'\]'):
        text = text.replace(delimiter, '')
    return re.sub(r'[\W_]+', '', html.unescape(text)).casefold()


def markdown_passages(document_id, document_url, document_title, body, headings=None):
    used_ids = set()
    heading_stack = {}
    anchor_stack = {}
    rendered = {}
    for heading in headings or []:
        rendered.setdefault((heading['level'], _heading_key(heading['text'])), []).append(heading['anchor'])
    sections = []
    current = {
        "section": document_title,
        "anchor": "",
        "heading_level": 0,
        "breadcrumb": [],
        "lines": [],
    }
    active_fence = ""

    def flush():
        text = "\n".join(current["lines"]).strip()
        chunks = chunk_passage_text(text)
        if not chunks and current["heading_level"]:
            chunks = [current["section"]]
        if chunks:
            sections.append({
                "section": current["section"],
                "anchor": current["anchor"],
                "heading_level": current["heading_level"],
                "breadcrumb": current["breadcrumb"],
                "chunks": chunks,
                "displays": display_chunks(text, chunks),
            })

    for line in body.splitlines():
        fence_match = FENCE_RE.match(line)
        if active_fence:
            if fence_match and fence_match.group(1).startswith(active_fence[0]) and len(fence_match.group(1)) >= len(active_fence):
                active_fence = ""
            continue
        if fence_match:
            active_fence = fence_match.group(1)
            continue

        heading_match = HEADING_RE.match(line)
        if not heading_match:
            current["lines"].append(line)
            continue

        level = len(heading_match.group(1))
        heading, anchor = heading_data(heading_match.group(2), used_ids)
        if headings is not None:
            targets = rendered.get((level, _heading_key(heading)), [])
            for stacked_level in list(anchor_stack):
                if stacked_level >= level:
                    del anchor_stack[stacked_level]
            # Moved annotation headings link to their closest surviving parent.
            anchor = targets.pop(0) if targets else anchor_stack[max(anchor_stack)] if anchor_stack else ''
            anchor_stack[level] = anchor
        if level > 3:
            current["lines"].append(heading)
            continue

        flush()
        for stacked_level in list(heading_stack):
            if stacked_level >= level:
                del heading_stack[stacked_level]
        heading_stack[level] = heading
        current = {
            "section": heading or document_title,
            "anchor": anchor,
            "heading_level": level,
            "breadcrumb": [heading_stack[key] for key in sorted(heading_stack)],
            "lines": [],
        }
    flush()

    passages = []
    passage_index = 0
    anchor_counts = {}
    for section in sections:
        anchor = section['anchor']
        anchor_offset = anchor_counts.get(anchor, 0)
        for chunk_index, chunk in enumerate(section["chunks"]):
            anchor = section["anchor"]
            passages.append({
                "id": f"{document_id}:{anchor or 'document'}:{anchor_offset + chunk_index}",
                "documentId": document_id,
                "section": section["section"],
                "breadcrumb": section["breadcrumb"],
                "text": chunk,
                **({"displayText": section["displays"][chunk_index]}
                   if section["displays"][chunk_index] is not None else {}),
                "url": f"{document_url}#{anchor}" if anchor else document_url,
                "location": {
                    "anchor": anchor,
                    "headingLevel": section["heading_level"],
                    "passageIndex": passage_index,
                    "chunkIndex": chunk_index,
                },
            })
            passage_index += 1
        anchor_counts[anchor] = anchor_offset + len(section['chunks'])
    return passages


def render_math_text(text, limit=180):
    parts = re.split(r"(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)", text)
    out = []
    used = 0
    for part in parts:
        if not part or used >= limit:
            continue
        if part.startswith("$$") and part.endswith("$$"):
            formula = html.escape(part[2:-2].strip())
            out.append(f'<span class="arithmatex">\\[{formula}\\]</span>')
            used += 8
        elif part.startswith("$") and part.endswith("$"):
            formula = html.escape(part[1:-1].strip())
            out.append(f'<span class="arithmatex">\\({formula}\\)</span>')
            used += 4
        else:
            cleaned = plain_markdown(part)
            if not cleaned:
                continue
            remaining = limit - used
            piece = cleaned[:remaining]
            used += len(piece)
            out.append(html.escape(piece))
    preview = " ".join(out).strip()
    if used >= limit:
        preview += "..."
    return preview or "暂无预览"


def first_content_block(body):
    body = re.sub(r"```[\s\S]*?```", " ", body)
    body = re.sub(r"<!--[\s\S]*?-->", " ", body)
    blocks = [block.strip() for block in re.split(r"\n\s*\n", body) if block.strip()]
    for block in blocks:
        if (
            block.startswith("#")
            or block.startswith("<div")
            or "<embed" in block
            or "application/pdf" in block
            or block.startswith("[点击下载")
            or re.fullmatch(r"\[[^\]]+\]\([^)]+\.pdf(?:[?#][^)]*)?\)(?:\{[^}]*\})?", block, re.I)
            or re.fullmatch(r"-{3,}", block)
            or re.match(r"^(title|date|categories|tags):", block, re.I)
        ):
            continue
        return block
    return ""


def article_description(body, limit=160):
    description = plain_markdown(first_content_block(body))
    if len(description) <= limit:
        return description
    shortened = description[: limit - 1].rstrip(" ,.;:。，；：")
    return shortened + "…"

