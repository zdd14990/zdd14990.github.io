"""Validated article sources and caches scoped to one MkDocs build."""

from dataclasses import dataclass
from pathlib import Path

import yaml
from mkdocs.utils import get_markdown_title
from mkdocs.utils.meta import YAML_RE, get_data

from .blog_taxonomy import article_tags
from .reading_features import article_dates


def normalize_metadata(metadata, source):
    metadata = dict(metadata)
    try:
        for field in ("title", "description"):
            value = metadata.get(field)
            if value is not None and not isinstance(value, str):
                raise ValueError(f"{field} must be a string")
        for field in ("tags", "categories"):
            value = metadata.get(field)
            if value is None:
                value = []
            if isinstance(value, str):
                value = [value]
            if not isinstance(value, (list, tuple)) or any(not isinstance(item, str) for item in value):
                raise ValueError(f"{field} must be a string or a list of strings")
            metadata[field] = list(dict.fromkeys(item.strip() for item in value if item.strip()))
        published, modified = article_dates(metadata.get("date"), metadata.get("updated"))
        metadata["date"] = published
        metadata["updated"] = modified if metadata.get("updated") else ""
        metadata["tags"] = article_tags(metadata["tags"], source)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{source}: {exc}") from exc
    return metadata


def parse_document(text, source="article.md"):
    text = text.lstrip("\ufeff").replace("\r\n", "\n").replace("\r", "\n")
    match = YAML_RE.match(text)
    if match:
        try:
            metadata = yaml.safe_load(match.group(1))
        except (yaml.YAMLError, ValueError) as exc:
            raise ValueError(f"{source}: invalid YAML front matter: {exc}") from exc
        if metadata is None:
            metadata = {}
        if not isinstance(metadata, dict):
            raise ValueError(f"{source}: front matter must be a mapping")
        body = text[match.end():].lstrip("\n")
    else:
        if text.split("\n", 1)[0].strip() == "---":
            raise ValueError(f"{source}: front matter requires a closing delimiter and newline")
        body, metadata = get_data(text)
    return normalize_metadata(metadata, source), body


@dataclass(frozen=True)
class ArticleSource:
    path: Path
    src_path: str
    text: str
    metadata: dict
    body: str

    @property
    def title(self):
        return self.metadata.get("title") or get_markdown_title(self.body) or self.path.stem.replace("-", " ").capitalize()


class ContentStore:
    def __init__(self, docs_dir):
        self.docs_dir = Path(docs_dir).resolve()
        self.sources = {}
        self.articles = None
        self.rendered_headings = {}
        self.statements = {}
        self.backlinks = None

    def read(self, path):
        path = Path(path).resolve()
        source = path.relative_to(self.docs_dir).as_posix()
        if source not in self.sources:
            text = path.read_text(encoding="utf-8-sig")
            metadata, body = parse_document(text, source)
            self.sources[source] = ArticleSource(path, source, text, metadata, body)
        return self.sources[source]

    def article_sources(self):
        for path in sorted((self.docs_dir / "blog").rglob("*.md")):
            if path.name != "index.md":
                yield self.read(path)


_build_store = None


def begin_build(docs_dir):
    global _build_store
    _build_store = ContentStore(docs_dir)
    return _build_store


def end_build():
    global _build_store
    _build_store = None


def content_store(docs_dir=None):
    root = Path(docs_dir).resolve() if docs_dir is not None else None
    if _build_store is not None and (root is None or root == _build_store.docs_dir):
        return _build_store
    return ContentStore(root or Path(__file__).resolve().parents[1] / "docs")
