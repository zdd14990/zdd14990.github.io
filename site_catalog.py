"""Site categories, lab entries and explicit course sequences."""

import json
import re
from pathlib import Path, PurePosixPath


CATALOG_PATH = Path(__file__).resolve().parent / "data" / "site-catalog.json"


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
    required = {"display_names": dict, "top_order": list, "flatten_roots": list,
                "qualification_review_root": str, "qualification_review_pages": dict,
                "labs": list, "courses": list}
    for key, kind in required.items():
        if not isinstance(catalog.get(key), kind):
            raise ValueError(f"{path}: {key} must be a {kind.__name__}")
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


SITE_CATALOG = load_site_catalog()


def refresh_site_catalog(docs_dir):
    catalog = load_site_catalog(docs_dir=docs_dir)
    SITE_CATALOG.clear()
    SITE_CATALOG.update(catalog)


def course_for_source(source):
    return next((course for course in SITE_CATALOG["courses"] if source in course["chapters"]), None)


def course_for_folder(folder_parts):
    return next((course for course in SITE_CATALOG["courses"] if tuple(course["catalog_path"]) == tuple(folder_parts)), None)
