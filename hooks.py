# hooks.py
import html
import os
import re

from blog_taxonomy import article_tags
from blog_content import begin_build, end_build, content_store, normalize_metadata
from blog_text import article_description, rendered_headings
from site_catalog import course_for_source, refresh_site_catalog
from pathlib import Path
from mkdocs.utils import get_relative_url
from reading_features import article_dates, page_needs_math
from code_notes import add_code_notes, prune_note_toc


PDF_EMBED_RE = re.compile(r'(<embed\s+[^>]*?src=")([^"]+\.pdf)("[^>]*>)', re.IGNORECASE)


def on_pre_build(config):
    refresh_site_catalog(config["docs_dir"])
    begin_build(config["docs_dir"])


def on_page_read_source(page, config):
    source = page.file.src_path.replace("\\", "/")
    if source.startswith("blog/") and not source.endswith("index.md"):
        return content_store(config["docs_dir"]).read(page.file.abs_src_path).text
    return None


def on_post_build(config):
    end_build()


def on_build_error(error):
    end_build()


def on_serve(server, config, builder):
    root = Path(__file__).resolve().parent
    server.watch(str(root / "data" / "site-catalog.json"), builder)
    return server

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


def _append_taxonomy(markdown, page):
    path = page.file.src_path.replace("\\", "/")
    if not path.startswith("blog/") or path.endswith("index.md"):
        return markdown

    categories = _as_list(page.meta.get("categories"))
    tags = article_tags(page.meta.get("tags"), path)
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


def _set_article_description(markdown, page):
    path = page.file.src_path.replace("\\", "/")
    if not path.startswith("blog/") or path.endswith("index.md") or page.meta.get("description"):
        return
    description = article_description(markdown)
    if not description:
        description = f"{page.title}：zdd 的个人学习笔记与复习资料。"
    page.meta["description"] = description


def _set_course_navigation(page, config):
    source = page.file.src_path.replace("\\", "/")
    page.meta.pop("course_navigation", None)
    course = course_for_source(source)
    if course is None:
        return
    chapters = course["chapters"]
    position = chapters.index(source)

    def chapter_link(index):
        if not 0 <= index < len(chapters):
            return None
        path = chapters[index]
        article = content_store(config["docs_dir"]).read(Path(config["docs_dir"]) / path)
        return {
            "title": article.title,
            "url": get_relative_url(path[:-3] + "/", page.url),
        }

    page.meta["course_navigation"] = {
        "title": course.get("title") or course["id"],
        "position": position + 1,
        "total": len(chapters),
        "catalog_url": get_relative_url("blog/", page.url) + "#" + course["anchor"],
        "previous": chapter_link(position - 1),
        "next": chapter_link(position + 1),
    }


def on_page_markdown(markdown, page, config, files):
    source = page.file.src_path.replace("\\", "/")
    assets = _as_list(page.meta.get("zdd_assets"))
    registry = config.get("extra", {}).get("page_assets", {})
    for asset in assets:
        if asset not in registry:
            raise ValueError(f"{source}: unknown page asset {asset!r}")
    page.meta["zdd_assets"] = list(dict.fromkeys(assets))
    if source.startswith("blog/") and not source.endswith("index.md"):
        page.meta.update(normalize_metadata(page.meta, source))
    _set_course_navigation(page, config)
    if page.file.src_path.replace('\\', '/').startswith('blog/'):
        published, modified = article_dates(page.meta.get('date'), page.meta.get('updated'))
        page.meta['reading_date'] = published
        page.meta['reading_updated'] = modified if modified != published else ''
    _set_article_description(markdown, page)
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


def on_page_content(html, page, config, files):
    html = add_code_notes(html, page.meta.get("code_notes"))
    if page.meta.get("code_notes"):
        prune_note_toc(html, page.toc)
    page.meta['reading_math'] = bool(page.meta.get("code_notes")) or page_needs_math(html, page.file.src_path.replace('\\', '/'))
    source = page.file.src_path.replace("\\", "/")
    if source.startswith("blog/") and not source.endswith("index.md"):
        content_store(config["docs_dir"]).rendered_headings[source] = rendered_headings(html)
    return html
