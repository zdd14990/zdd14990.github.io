"""Shared tag rules for page rendering and generated blog data."""


TOPIC_INFERENCE = {
    "probability-statistics": ["probability"],
    "qualification-exam-review": ["qualification-exam", "review-materials"],
    "cryptography": ["cryptography"],
    "cryptography/cryptanalysis": ["cryptanalysis"],
    "applied-math/convex-optimization": ["optimization"],
    "applied-math/numerical-pde": ["numerical-methods", "pde"],
    "applied-math/applied-math-exam": ["numerical-methods"],
    "applied-math/ai-exam": ["machine-learning"],
    "applied-math/data-science": ["machine-learning"],
    "physics/electrodynamics": ["electromagnetism"],
    "physics/quantum-mechanics": ["quantum"],
    "physics/statistical-mechanics": ["statistical-physics"],
}


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
    inferred = []
    for prefix, topics in TOPIC_INFERENCE.items():
        if normalized_path.startswith("blog/" + prefix + "/"):
            inferred.extend(topics)
    return list(dict.fromkeys(_as_tags(explicit_tags) + inferred))
