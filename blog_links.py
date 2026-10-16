"""Internal article links, used to show "referenced by" lists on each article."""

import posixpath
import re

# [text](target.md) or [text](target.md#anchor); external URLs never end in a
# bare relative ``.md`` path, and fenced code is stripped before matching.
MD_LINK_RE = re.compile(r"\]\(\s*<?([^)\s:>]+?\.md)(?:#[^)\s>]*)?>?(?:\s+\"[^\"]*\")?\s*\)")
FENCE_RE = re.compile(r"^(```|~~~).*?^\1[^\n]*$", re.M | re.S)


def linked_sources(source, body):
    """Return docs-relative article sources linked from ``body`` (in order, unique)."""
    base = posixpath.dirname(source)
    targets = []
    for match in MD_LINK_RE.finditer(FENCE_RE.sub("", body)):
        target = posixpath.normpath(posixpath.join(base, match.group(1)))
        if target.startswith("blog/") and target != source and not target.endswith("index.md"):
            targets.append(target)
    return list(dict.fromkeys(targets))


def backlink_map(store):
    """Map each article source to the sources that link to it, cached per build."""
    cached = getattr(store, "backlinks", None)
    if cached is not None:
        return cached
    articles = {article.src_path: article for article in store.article_sources()}
    backlinks = {}
    for source, article in articles.items():
        for target in linked_sources(source, article.body):
            if target in articles:
                backlinks.setdefault(target, []).append(source)
    store.backlinks = backlinks
    return backlinks
