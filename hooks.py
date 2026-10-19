# hooks.py
import html
import os
import re

from blog_taxonomy import article_tags
from book_layout import apply_book_layout
from blog_content import begin_build, end_build, content_store, normalize_metadata
from blog_links import backlink_map
from blog_statements import extract_statements, statement_records
from blog_text import article_description, rendered_headings
from site_catalog import course_for_folder, course_for_source, refresh_site_catalog, shelf_categories, shelf_for_source
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
    page.meta.pop("taxonomy", None)
    if not path.startswith("blog/") or path.endswith("index.md"):
        return markdown

    # The shelf map decides the category shown; front matter is only a fallback.
    categories = shelf_categories(path) or _as_list(page.meta.get("categories"))
    tags = article_tags(page.meta.get("tags"), path)
    if not categories and not tags:
        return markdown

    # Rendered by overrides/partials/article-end.html together with the
    # series pager and backlinks.
    tags_url = get_relative_url("tags/", page.url)
    page.meta["taxonomy"] = {
        "categories": categories,
        "tags": [{"name": tag, "url": f"{tags_url}?tag={tag}"} for tag in tags],
    }
    return markdown


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


def _set_backlinks(page, config):
    source = page.file.src_path.replace("\\", "/")
    page.meta.pop("backlinks", None)
    if not source.startswith("blog/") or source.endswith("index.md"):
        return
    store = content_store(config["docs_dir"])
    referrers = backlink_map(store).get(source, [])
    if referrers:
        page.meta["backlinks"] = [
            {
                "title": store.read(Path(config["docs_dir"]) / referrer).title,
                "url": get_relative_url(referrer[:-3] + "/", page.url),
            }
            for referrer in referrers
        ]


def _set_place(page, source):
    """Shelf and book of a blog page, as [name, anchor on /blog/] pairs for the running header."""
    shelf, book = shelf_for_source(source) if source.startswith("blog/") else (None, None)
    if not shelf:
        return
    course = course_for_folder((shelf["key"], book["key"]))
    page.meta["zdd_place"] = [[shelf["name"], shelf["key"]], [book["name"], course["anchor"] if course else book["key"]]]


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
    _set_backlinks(page, config)
    _set_place(page, source)
    if page.file.src_path.replace('\\', '/').startswith('blog/'):
        published, modified = article_dates(page.meta.get('date'), page.meta.get('updated'))
        page.meta['reading_date'] = published
        page.meta['reading_updated'] = modified if modified != published else ''
        from main import _word_count  # local import keeps hook start-up independent of the macros module
        words = _word_count(markdown)
        page.meta['reading_words'] = words
        page.meta['reading_minutes'] = max(1, round(words / 350))
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
        store = content_store(config["docs_dir"])
        store.rendered_headings[source] = rendered_headings(html)
        html, items = extract_statements(html)
        records = statement_records(items, page.title, "/" + page.url, source, page.meta.get("tags", []))
        html, page.meta["book_opener"], numbers = apply_book_layout(html, page.title)
        for record in records:
            record["number"] = numbers.get(record["url"].rsplit("#", 1)[1], "")
        store.statements[source] = records
    return html
