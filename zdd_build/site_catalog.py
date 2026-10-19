"""Site categories, lab entries and explicit course sequences."""

import json
import re
from pathlib import Path, PurePosixPath


CATALOG_PATH = Path(__file__).resolve().parents[1] / "data" / "site-catalog.json"


def load_site_catalog(path=CATALOG_PATH, docs_dir=None):
    def unique_fields(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                raise ValueError(f"{path}: duplicate field {key!r}")
            if isinstance(value, str) and '\ufffd' in value:
                raise ValueError(f"{path}: damaged text in {key!r}")
            result[key] = value
        return result

    catalog = json.loads(Path(path).read_text(encoding="utf-8"), object_pairs_hook=unique_fields)
    required = {"display_names": dict, "shelves": list, "labs": list, "courses": list}
    for key, kind in required.items():
        if not isinstance(catalog.get(key), kind):
            raise ValueError(f"{path}: {key} must be a {kind.__name__}")
    books = _check_shelves(path, catalog["shelves"], docs_dir)
    roots = set()
    sources = set()
    anchors = set()
    for course in catalog["courses"]:
        root = course.get("root", "")
        anchor = course.get("anchor", "")
        if not root.startswith("blog/") or root in roots:
            raise ValueError(f"{path}: invalid or duplicate course root {root!r}")
        if not re.fullmatch(r"[A-Za-z][A-Za-z0-9_-]*", anchor) or anchor in anchors:
            raise ValueError(f"{path}: invalid or duplicate course anchor {anchor!r}")
        chapters = course.get("chapters")
        catalog_path = course.get("catalog_path")
        if not isinstance(chapters, list) or not chapters or not isinstance(catalog_path, list) or not catalog_path:
            raise ValueError(f"{path}: course {root} requires chapters and catalog_path")
        if tuple(catalog_path) not in books:
            raise ValueError(f"{path}: course {root} catalog_path is not a [shelf, book] pair")
        for source in chapters:
            if not isinstance(source, str) or not source.startswith(root + "/") or not source.endswith(".md") or ".." in PurePosixPath(source).parts or source in sources:
                raise ValueError(f"{path}: invalid or duplicate chapter {source!r}")
            if docs_dir is not None and not (Path(docs_dir) / source).is_file():
                raise ValueError(f"{path}: course chapter does not exist: {source}")
            sources.add(source)
        roots.add(root)
        anchors.add(anchor)
    slugs = set()
    for lab in catalog["labs"]:
        slug = lab.get("slug", "")
        if not re.fullmatch(r"[a-z][a-z0-9-]*", slug) or slug in slugs:
            raise ValueError(f"{path}: invalid or duplicate lab slug {slug!r}")
        if docs_dir is not None and not (Path(docs_dir) / "lab" / f"{slug}.md").is_file():
            raise ValueError(f"{path}: lab page does not exist: {slug}")
        slugs.add(slug)
    return catalog


def _check_shelves(path, shelves, docs_dir):
    """Two levels only: each shelf holds books, each book lists the sources it gathers."""
    keys, sources, books = set(), set(), set()
    for shelf in shelves:
        for item in [shelf, *shelf.get("books", [])]:
            key = item.get("key", "")
            if not re.fullmatch(r"[a-z][a-z0-9-]*", key) or key in keys or not item.get("name"):
                raise ValueError(f"{path}: invalid or duplicate shelf/book key {key!r}")
            keys.add(key)
        if not shelf.get("books"):
            raise ValueError(f"{path}: shelf {shelf['key']} has no books")
        for book in shelf["books"]:
            books.add((shelf["key"], book["key"]))
            if not isinstance(book.get("sources"), list) or not book["sources"]:
                raise ValueError(f"{path}: book {book['key']} lists no sources")
            for source in book["sources"]:
                if not isinstance(source, str) or not source.startswith("blog/") or ".." in PurePosixPath(source).parts or source in sources:
                    raise ValueError(f"{path}: invalid or duplicate book source {source!r}")
                if docs_dir is not None and not (Path(docs_dir) / source).exists():
                    raise ValueError(f"{path}: book source does not exist: {source}")
                sources.add(source)
    return books


SITE_CATALOG = load_site_catalog()


def refresh_site_catalog(docs_dir):
    catalog = load_site_catalog(docs_dir=docs_dir)
    SITE_CATALOG.clear()
    SITE_CATALOG.update(catalog)


def course_for_source(source):
    return next((course for course in SITE_CATALOG["courses"] if source in course["chapters"]), None)


def course_for_folder(folder_parts):
    return next((course for course in SITE_CATALOG["courses"] if tuple(course["catalog_path"]) == tuple(folder_parts)), None)


def shelf_for_source(source):
    """(shelf, book) holding a blog source, by the longest matching source path."""
    best, best_length = (None, None), -1
    for shelf in SITE_CATALOG["shelves"]:
        for book in shelf["books"]:
            for prefix in book["sources"]:
                if (source == prefix or source.startswith(prefix + "/")) and len(prefix) > best_length:
                    best, best_length = (shelf, book), len(prefix)
    return best


def shelf_categories(source):
    """Category labels shown for an article: the shelf and book names."""
    shelf, book = shelf_for_source(source)
    return [shelf["name"], book["name"]] if shelf else []
