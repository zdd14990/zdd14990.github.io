"""Build-only publication dates and math detection."""
from datetime import date, datetime
from html.parser import HTMLParser


def article_dates(published, updated=None):
    def parse(value):
        if not value:
            return ''
        if isinstance(value, datetime):
            return value.date().isoformat()
        return date.fromisoformat(str(value)).isoformat()
    published, updated = parse(published), parse(updated)
    if updated and (not published or updated < published):
        raise ValueError('updated requires date and cannot precede it')
    return published, updated or published


class MathProbe(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.has_math = False
        self.feed(content)

    def handle_starttag(self, tag, attrs):
        if 'arithmatex' in dict(attrs).get('class', '').split():
            self.has_math = True


def page_needs_math(content, source):
    return source in ('lab/tex.md', 'lab/diagram.md', 'theorems/index.md') or MathProbe(content).has_math
