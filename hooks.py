# hooks.py
import html
import os
import re

from mkdocs.utils import get_relative_url


PDF_EMBED_RE = re.compile(r'(<embed\s+[^>]*?src=")([^"]+\.pdf)("[^>]*>)', re.IGNORECASE)
MEANINGLESS_TAG_RE = re.compile(
    r"^(chapter\d+|part\d+|exercise\d+|homework|final-project|final-cheatsheet|midterm-cheatsheet|exercise-collection|course|exercises|notes)$",
    re.I,
)

TOPIC_INFERENCE = {
    "probability-statistics": ["probability"],
    "applied-math/convex-optimization": ["optimization"],
    "applied-math/numerical-pde": ["numerical-methods", "pde"],
    "applied-math/applied-math-exam": ["numerical-methods"],
    "applied-math/ai-exam": ["machine-learning"],
    "applied-math/data-science": ["machine-learning"],
    "physics/electrodynamics": ["electromagnetism"],
    "physics/quantum-mechanics": ["quantum"],
    "physics/statistical-mechanics": ["statistical-physics"],
}


def _infer_topic_tags(page):
    src = page.file.src_path.replace("\\", "/")
    inferred = set()
    for prefix, topics in TOPIC_INFERENCE.items():
        if src.startswith("blog/" + prefix + "/"):
            inferred.update(topics)
    return sorted(inferred)



def _fix_pdf_embed_paths(markdown, page, config):
    docs_dir = os.path.abspath(config["docs_dir"])
    page_dir = os.path.dirname(page.file.abs_src_path)

    def replace(match):
        prefix, src, suffix = match.groups()
        if src.startswith(("http://", "https://", "/", "{{")):
            return match.group(0)

        abs_target = os.path.abspath(os.path.join(page_dir, src.replace("/", os.sep)))
        if os.path.commonpath([docs_dir, abs_target]) != docs_dir:
            return match.group(0)

        target_src_path = os.path.relpath(abs_target, docs_dir).replace(os.sep, "/")
        fixed_src = get_relative_url(target_src_path, page.url)
        return f'{prefix}{fixed_src}{suffix}'

    return PDF_EMBED_RE.sub(replace, markdown)


def _as_list(value):
    if not value:
        return []
    if isinstance(value, (list, tuple)):
        return [str(item) for item in value]
    return [str(value)]


def _clean_tags(tags):
    return [tag for tag in tags if not MEANINGLESS_TAG_RE.match(tag)]


def _append_taxonomy(markdown, page):
    path = page.file.src_path.replace("\\", "/")
    if not path.startswith("blog/") or path.endswith("index.md"):
        return markdown

    categories = _as_list(page.meta.get("categories"))
    tags = list(dict.fromkeys(_clean_tags(_as_list(page.meta.get("tags"))) + _infer_topic_tags(page)))
    if not categories and not tags:
        return markdown

    tags_url = get_relative_url("tags/", page.url)
    category_links = "".join(
        f'<span class="zdd-category-chip">#{html.escape(label)}</span>'
        for label in categories
    )
    tag_links = "".join(
        f'<a class="zdd-tag-chip" href="{tags_url}?tag={html.escape(tag)}">#{html.escape(tag)}</a>'
        for tag in tags
    )

    taxonomy = f"""

<div class="zdd-article-taxonomy">
  <div class="zdd-taxonomy-row zdd-taxonomy-categories">{category_links}</div>
  <div class="zdd-taxonomy-row zdd-taxonomy-tags">{tag_links}</div>
</div>
"""
    return markdown + taxonomy


def on_page_markdown(markdown, page, config, files):
    markdown = _fix_pdf_embed_paths(markdown, page, config)

    # 判断逻辑：如果当前页面不是首页 (index.md)
    # 注意：MkDocs 中首页的 page.url 通常是 "" 或 "index.html"
    if page.url != "" and page.url != "index.html":
        
        # 如果页面元数据中还没有 hide 属性，初始化它
        if 'hide' not in page.meta:
            page.meta['hide'] = []
        
        # 如果 hide 列表里还没有 navigation，把它加进去
        if 'navigation' not in page.meta['hide']:
            page.meta['hide'].append('navigation')
            
    return _append_taxonomy(markdown, page)
