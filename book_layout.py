"""Editorial article layout applied to rendered article HTML.

``apply_book_layout`` runs after statement extraction and

* lifts the leading ``<h1>`` (and an opening paragraph) out of the body so the
  template can set them as the chapter opener,
* turns explicit section numbers ("2. 标题") into a small "§ 02" label,
* numbers theorem-like blocks per section ("定理 2.2"),
* gives stand-alone images a numbered caption built from their alt text.
"""

import html as html_lib
import re

from blog_statements import _GENERIC_PREFIX, plain_text, statement_name, trim_unmatched_parens

KINDS = {
    "theorem": "定理", "proposition": "命题", "prop": "命题", "lemma": "引理",
    "corollary": "推论", "definition": "定义", "example": "例", "problem": "习题",
    "property": "性质",
}
WORDS = ("定理", "命题", "引理", "推论", "定义", "例子", "例", "习题", "练习", "性质")
_CN = {"零": 0, "〇": 0, "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9}

_H1 = re.compile(r'^\s*<h1(?: id="(?P<id>[^"]*)")?>(?P<title>.*?)</h1>\s*', re.S)
_LEAD_PARAGRAPH = re.compile(r'^(\s*(?:<h2[^>]*>.*?</h2>\s*)?)<p>((?:(?!</p>).)*)</p>\s*', re.S)
_CHAPTER = re.compile(r"^第([零〇一二三四五六七八九十\d]+)章[：:\s]\s*(.+)$")
_TOKENS = re.compile(
    r'(?P<h2><h2(?P<h2attrs>[^>]*)>(?P<num>\d+)[.．、]\s*)'
    r'|(?P<plainh2><h2[^>]*>)'
    r'|(?P<div><div(?: id="[^"]*")? class="admonition (?P<dclass>[\w\s-]+)">\s*<p class="admonition-title">)(?P<dtitle>.*?)</p>'
    r'|(?P<det><details class="(?P<sclass>[\w\s-]+)"(?: open(?:="open")?)?>\s*<summary>)(?P<stitle>.*?)</summary>'
    r'|<p>(?P<img><img [^>]*?alt="(?P<alt>[^"]+)"[^>]*>)</p>',
    re.S,
)
_ID = re.compile(r'\sid="([^"]+)"')


def chinese_number(text):
    if text.isdigit():
        return int(text)
    if text == "十":
        return 10
    if "十" in text:
        tens, _, ones = text.partition("十")
        return (_CN.get(tens, 1) if tens else 1) * 10 + (_CN.get(ones, 0) if ones else 0)
    return _CN.get(text)


def split_chapter_title(title):
    """Return ``(number, title)``; number is ``None`` for ordinary titles."""
    match = _CHAPTER.match(title.strip())
    if match and chinese_number(match.group(1)) is not None:
        return chinese_number(match.group(1)), match.group(2).strip()
    return None, title.strip()


def _lift_opener(content, page_title):
    title_html = html_lib.escape(page_title or "")
    anchor = ""
    match = _H1.match(content)
    if match:
        title_html = match.group("title").strip()
        anchor = match.group("id") or ""
        content = content[match.end():]
    number = None
    if "<" not in title_html:
        number, rest = split_chapter_title(html_lib.unescape(title_html))
        if number is not None:
            title_html = html_lib.escape(rest)
    lead = ""
    paragraph = _LEAD_PARAGRAPH.match(content)
    text = plain_text(paragraph.group(2)) if paragraph else ""
    if len(text) > 30 and not text.endswith(("：", ":")) and "<img" not in paragraph.group(2):
        lead = paragraph.group(2).strip()
        content = paragraph.group(1) + content[paragraph.end():]
    return content, {"title_html": title_html, "anchor": anchor, "number": number, "lead_html": lead}


def _statement_title(kind, title_html):
    """Return the label word and the descriptive name (HTML, may be empty)."""
    plain = plain_text(title_html)
    if plain.lower() in KINDS:
        return KINDS[kind], ""
    word = next((w for w in WORDS if plain.startswith(w)), None)
    word = KINDS[kind] if word is None else "习题" if word == "练习" else "例" if word == "例子" else word
    name = statement_name(plain)
    if not name:
        return word, ""
    if name == plain.strip():
        return word, title_html
    if "<" not in title_html:
        return word, html_lib.escape(name)
    # HTML titles (with maths): strip the same leading "例（" / "Theorem 2.4." from the markup.
    stripped = trim_unmatched_parens(_GENERIC_PREFIX.sub("", title_html, count=1))
    return word, stripped if plain_text(stripped).strip() == name else title_html


def apply_book_layout(content, page_title):
    """Return ``(html, opener, numbers)``; ``numbers`` maps anchors to labels."""
    content, opener = _lift_opener(content, page_title)
    numbered = bool(re.search(r"<h2[^>]*>\d+[.．、]", content))
    section, count, figure = 0, 0, 0
    numbers = {}

    def replace(match):
        nonlocal section, count, figure
        if match.group("h2"):
            section, count = int(match.group("num")), 0
            return f'<h2{match.group("h2attrs")}><span class="book-secnum">§ {section:02d}</span>'
        if match.group("plainh2"):
            if numbered:
                section, count = section + 1, 0
            return match.group(0)
        if match.group("img"):
            if "/diagrams/" in match.group("img"):
                # Commutative diagrams are displayed maths, not figures: no number or caption.
                return f'<p class="book-figure book-diagram">{match.group("img")}</p>'
            figure += 1
            return (f'<p class="book-figure">{match.group("img")}<span class="book-caption">'
                    f'<b>Fig. {figure}</b>{match.group("alt")}</span></p>')
        head, classes, title = (
            (match.group("div"), match.group("dclass"), match.group("dtitle")) if match.group("div")
            else (match.group("det"), match.group("sclass"), match.group("stitle")))
        kind = next((name for name in classes.split() if name in KINDS), None)
        if kind is None:
            return match.group(0)
        count += 1
        label = f"{section}.{count}" if numbered and section else str(count)
        word, name = _statement_title(kind, title)
        anchor = _ID.search(head)
        if anchor:
            numbers[anchor.group(1)] = f"{word} {label}"
        name_html = f'<span class="book-name">{name}</span>' if name else ""
        close = "</p>" if match.group("div") else "</summary>"
        return f'{head}<span class="book-label">{word} {label}</span>{name_html}{close}'

    return _TOKENS.sub(replace, content), opener, numbers
