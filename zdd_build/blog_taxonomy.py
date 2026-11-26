"""Shared tag rules for page rendering and generated blog data."""

import json
import re
from functools import lru_cache
from pathlib import Path


TAG_NAMES_PATH = Path(__file__).resolve().parents[1] / "data" / "tag-names.json"
# Folder-level topics. Tags describe cross-cutting subjects; the folder and
# category hierarchy already expresses disciplines such as "analysis".
TOPIC_INFERENCE = {
    "probability-statistics/probability-theory": ["probability"],
    "probability-statistics/statistics": ["statistics"],
    "qualification-exam-review": ["qualification-exam"],
    "cryptography/cryptanalysis": ["cryptanalysis"],
    "applied-math/autograd": ["automatic-differentiation"],
    "applied-math/convex-optimization": ["optimization"],
    "applied-math/numerical-pde": ["numerical-methods", "pde"],
    "applied-math/applied-math-exam": ["numerical-methods", "qualification-exam"],
    "applied-math/ai-exam": ["machine-learning", "qualification-exam"],
    "applied-math/data-science": ["machine-learning"],
    "physics/electrodynamics": ["electromagnetism"],
    "physics/quantum-mechanics": ["quantum"],
    "physics/statistical-mechanics": ["statistical-physics"],
}

# Tags must be lowercase kebab-case words, e.g. "spectral-theory".
TAG_RE = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")


def _as_tags(value):
    if not value:
        return []
    if isinstance(value, (list, tuple)):
        values = value
    else:
        values = [value]
    return [str(tag).strip() for tag in values if str(tag).strip()]


def article_tags(explicit_tags, src_path):
    """Return explicit and inferred tags, preserving order and low-frequency tags."""
    normalized_path = src_path.replace("\\", "/")
    explicit = _as_tags(explicit_tags)
    invalid = [tag for tag in explicit if not TAG_RE.fullmatch(tag)]
    if invalid:
        raise ValueError(f"tags must be lowercase kebab-case: {invalid!r}")
    return list(dict.fromkeys(explicit + inferred_tags(normalized_path)))


def inferred_tags(src_path):
    """Return folder-level topics for a docs-relative source path."""
    normalized_path = src_path.replace("\\", "/")
    inferred = []
    for prefix, topics in TOPIC_INFERENCE.items():
        base = "blog/" + prefix
        if normalized_path.startswith(base + "/") or normalized_path == base + ".md":
            inferred.extend(topics)
    return inferred


@lru_cache(maxsize=None)
def tag_names(path=TAG_NAMES_PATH):
    """Slug -> {"name": Chinese display name, "initial": pinyin initial A-Z}."""
    try:
        data = json.loads(Path(path).read_text(encoding="utf-8"))
    except FileNotFoundError:
        return {}
    if not isinstance(data, dict):
        raise ValueError(f"{path}: expected an object mapping tag slugs to names")
    for slug, entry in data.items():
        if not TAG_RE.fullmatch(slug):
            raise ValueError(f"{path}: tag {slug!r} must be lowercase kebab-case")
        if (not isinstance(entry, dict) or not isinstance(entry.get("name"), str) or not entry["name"].strip()
                or not re.fullmatch(r"[A-Z]", str(entry.get("initial", "")))):
            raise ValueError(f"{path}: tag {slug!r} needs a non-empty name and an A-Z initial")
    return data


def tag_display_name(slug):
    """Chinese display name of a tag; the slug itself when it has none."""
    entry = tag_names().get(slug)
    return entry["name"] if entry else slug


def tag_initial(slug):
    """Index letter of a tag: its pinyin initial, else the slug's first letter, else "#"."""
    entry = tag_names().get(slug)
    if entry:
        return entry["initial"]
    initial = slug[:1].upper()
    return initial if "A" <= initial <= "Z" else "#"
