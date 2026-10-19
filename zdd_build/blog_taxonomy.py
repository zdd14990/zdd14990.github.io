"""Shared tag rules for page rendering and generated blog data."""

import re


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
