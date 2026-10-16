import html
import hashlib
import gzip
import json
import re
import sys
from datetime import datetime
from pathlib import Path
from urllib.parse import urljoin
from xml.etree import ElementTree

# The macros plugin loads this file directly; console entry points may omit
# the project directory from sys.path, so local helper imports need it here.
PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from blog_content import content_store, parse_document
from blog_text import (
    article_description, plain_markdown as _plain_markdown,
    chunk_passage_text as _chunk_passage_text, display_chunks as _display_chunks,
    markdown_passages as _markdown_passages, render_math_text as _render_math_text,
    first_content_block as _first_content_block,
)
from site_catalog import SITE_CATALOG, course_for_folder

CHAPTER_RE = re.compile(
    r"(?i)(?:^|[-_\s])(?:chapter|chap|part|section|sec|exercise|ex|homework|hw)[-_\s]*(\d+)(?:[-_.\s]*(\d+))?"
)
SEARCH_TEXT_LIMIT = 12000


def _strip_frontmatter(content):
    return parse_document(content)[1]


def _meta_and_body(path):
    article = content_store().read(path)
    return dict(article.metadata), article.body


def _word_count(markdown):
    text = _strip_frontmatter(markdown)
    text = re.sub(r"```[\s\S]*?```", " ", text)
    text = re.sub(r"<[^>]+>", " ", text)
    cjk = len(re.findall(r"[\u4e00-\u9fff]", text))
    words = len(re.findall(r"[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?", text))
    return cjk + words


def _date_obj(date_str):
    try:
        return datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        return None


def _chapter_order_key(article):
    source = " ".join([
        article["path"].stem,
        article["title"],
        "/".join(article.get("folder_parts", [])),
    ])
    match = CHAPTER_RE.search(source)
    if match:
        return (0, int(match.group(1)), int(match.group(2) or 0), article["title"].casefold())

    leading = re.match(r"^(\d+)(?:[-_.\s]*(\d+))?", article["path"].stem)
    if leading:
        return (0, int(leading.group(1)), int(leading.group(2) or 0), article["title"].casefold())

    return (1, article["title"].casefold(), article["src_path"].casefold())


def _chapter_neighbors(articles):
    groups = {}
    for article in articles:
        groups.setdefault(tuple(article["folder_parts"]), []).append(article)

    neighbors = {}
    for group in groups.values():
        ordered = sorted(group, key=_chapter_order_key)
        for index, article in enumerate(ordered):
            neighbors[article["src_path"]] = {
                "prev_url": ordered[index - 1]["url"] if index > 0 else "",
                "next_url": ordered[index + 1]["url"] if index + 1 < len(ordered) else "",
            }
    return neighbors


def _article_url(src_path):
    return "/" + src_path[:-3].replace("\\", "/") + "/"


def _article_data():
    store = content_store()
    if store.articles is not None:
        return store.articles
    articles = []
    for source in store.article_sources():
        path, meta, body = source.path, source.metadata, source.body
        rel = source.src_path
        src_path = rel
        title = source.title
        date = meta["date"]
        published_at = _date_obj(date)
        tags = meta["tags"]
        categories = meta["categories"]
        search_text = _plain_markdown(body)
        parts = rel.split("/")
        folder_parts = parts[1:-1]
        if folder_parts == [SITE_CATALOG["qualification_review_root"]]:
            section = SITE_CATALOG["qualification_review_pages"].get(path.stem)
            if section:
                folder_parts.append(section)
        elif folder_parts and folder_parts[0] == "probability-statistics":
            folder_parts.insert(0, SITE_CATALOG["qualification_review_root"])
        elif (
            len(folder_parts) > 1
            and folder_parts[0] == "applied-math"
            and folder_parts[1] in {"ai-exam", "applied-math-exam"}
        ):
            folder_parts = [SITE_CATALOG["qualification_review_root"], *folder_parts[1:]]
        elif len(folder_parts) > 1 and folder_parts[0] in SITE_CATALOG["flatten_roots"]:
            folder_parts = folder_parts[1:]
        articles.append({
            "path": path,
            "src_path": src_path,
            "url": _article_url(src_path),
            "title": title,
            "date": date,
            "published": published_at is not None,
            "sort_key": published_at or datetime.min,
            "modified": meta["updated"] or date,
            "created": date,
            "categories": categories,
            "tags": tags,
            "words": _word_count(body),
            "description": meta.get("description") or article_description(body),
            "preview": _render_math_text(_first_content_block(body)),
            "search_text": search_text[:SEARCH_TEXT_LIMIT],
            "folder_parts": folder_parts,
            "_source": source.text,
            "_body": body,
        })
    store.articles = articles
    return articles


def _format_words(count):
    return f"{count:,} 字"


def _post_card(article, extra_class=""):
    tags = " ".join(html.escape(tag) for tag in article["tags"])
    category = " / ".join(html.escape(c) for c in article["categories"]) or "未分类"
    date_meta = f"\n    <span>{html.escape(article['date'])}</span>" if article["date"] else ""
    return f"""
<a class="zdd-post-card {extra_class}" href="{article['url']}" data-tags="{tags}">
  <span class="zdd-post-title">{html.escape(article['title'])}</span>
  <span class="zdd-post-preview">{article['preview']}</span>
  <span class="zdd-post-meta">
    <span>{category}</span>{date_meta}
    <span>{_format_words(article['words'])}</span>
  </span>
</a>
"""


def _lab_catalog():
    cards = []
    for item in sorted(
        SITE_CATALOG["labs"],
        key=lambda value: (not value.get("featured", False), value.get("date", ""), value["title"]),
    ):
        tags = "".join(
            f'<span class="zdd-lab-tag">{html.escape(tag)}</span>'
            for tag in item.get("tags", [])
        )
        status = item.get("status", "")
        status_label = (
            f'<span class="zdd-lab-status" data-status="{html.escape(status)}">{html.escape(status)}</span>'
            if status
            else ""
        )
        date = item.get("date", "")
        date_label = f'<time datetime="{html.escape(date)}">{html.escape(date)}</time>' if date else ""
        cards.append(f"""
<a class="zdd-lab-item" href="/lab/{html.escape(item['slug'])}/">
  <span class="zdd-lab-item-heading">
    <span class="zdd-lab-item-title">{html.escape(item['title'])}</span>
    {status_label}
  </span>
  <span class="zdd-lab-item-description">{html.escape(item['description'])}</span>
  <span class="zdd-lab-item-meta">{date_label}<span class="zdd-lab-tags">{tags}</span></span>
</a>
""")
    return '<div class="zdd-lab-list">' + "".join(cards) + "</div>"


def _folder_stats(articles):
    if not articles:
        return {"count": 0, "created": "-", "updated": "-", "words": 0}
    published = [a for a in articles if a["published"]]
    created = min((a["sort_key"] for a in published), default=None)
    updated = max((a["sort_key"] for a in published), default=None)
    return {
        "count": len(articles),
        "created": created.strftime("%Y-%m-%d") if created else "-",
        "updated": updated.strftime("%Y-%m-%d") if updated else "-",
        "words": sum(a["words"] for a in articles),
    }


def _tree_insert(tree, article):
    node = tree
    for part in article["folder_parts"]:
        node = node.setdefault(part, {"_articles": {}})
    node["_articles"][article["path"].stem] = article


def _collect_articles(node):
    items = []
    for key, value in node.items():
        if key == "_articles":
            items.extend(value.values())
        else:
            items.extend(_collect_articles(value))
    return items


def _render_tree(node, level=0, folder_parts=()):
    html_parts = []
    folder_keys = [key for key in node.keys() if key != "_articles"]
    folder_keys.sort(key=lambda k: (SITE_CATALOG["top_order"].index(k) if k in SITE_CATALOG["top_order"] else 99, SITE_CATALOG["display_names"].get(k, k)))

    for key in folder_keys:
        child = node[key]
        child_parts = (*folder_parts, key)
        course = course_for_folder(child_parts)
        folder_id = f' id="{course["anchor"]}"' if course else ""
        articles = _collect_articles(child)
        stats = _folder_stats(articles)
        name = SITE_CATALOG["display_names"].get(key, key.replace("-", " ").title())
        date_range = f" · {stats['created']} - {stats['updated']}" if stats["created"] != "-" else ""
        html_parts.append(f"""
<details class="zdd-catalog-folder" data-level="{level}"{folder_id}>
  <summary>
    <span class="zdd-folder-name">{html.escape(name)}</span>
    <span class="zdd-folder-meta">{stats['count']} 篇{date_range} · {_format_words(stats['words'])}</span>
  </summary>
  <div class="zdd-folder-content"><div>
    {_render_tree(child, level + 1, child_parts)}
  </div></div>
</details>
""")

    articles = sorted(node.get("_articles", {}).values(), key=_chapter_order_key)
    if articles:
        html_parts.append('<div class="zdd-catalog-posts">')
        html_parts.extend(_post_card(article, "catalog") for article in articles)
        html_parts.append("</div>")
    return "".join(html_parts)


def _article_subtitle(article):
    if article["categories"]:
        return " / ".join(article["categories"])
    labels = [SITE_CATALOG["display_names"].get(part, part.replace("-", " ").title()) for part in article["folder_parts"]]
    return " / ".join(labels)


def _public_search_index(compact=False):
    documents = []
    passages = []
    store = content_store()
    articles = _article_data()
    neighbors = _chapter_neighbors(articles)
    for article in sorted(articles, key=lambda x: x["sort_key"], reverse=True):
        adjacent = neighbors.get(article["src_path"], {})
        document_id = article["src_path"][:-3]
        source_text, body = article["_source"], article["_body"]
        documents.append({
            "id": document_id,
            "type": "post",
            "sourceType": "blog-post",
            "contentType": "article",
            "visibility": "public",
            "title": article["title"],
            "subtitle": _article_subtitle(article),
            "url": article["url"],
            "prev_url": adjacent.get("prev_url", ""),
            "next_url": adjacent.get("next_url", ""),
            "preview": re.sub(r"<[^>]+>", " ", article["preview"]),
            "date": article["date"],
            "published": article["published"],
            "words": article["words"],
            "categories": article["categories"],
            "tags": article["tags"],
            "content": article["search_text"],
            "source": body[:3000],
            "has_pdf": bool(re.search(r"(\.pdf\b|application/pdf|<embed)", source_text, re.I)),
        })
        passages.extend(_markdown_passages(document_id, article["url"], article["title"], body,
                                          headings=store.rendered_headings.get(article["src_path"])))

    for item in SITE_CATALOG["labs"]:
        document_id = f"lab:{item['slug']}"
        url = f"/lab/{item['slug']}/"
        documents.append({
            "id": document_id,
            "type": "lab",
            "sourceType": "lab",
            "contentType": "interactive",
            "visibility": "public",
            "title": item["title"],
            "subtitle": "Lab",
            "url": url,
            "prev_url": "",
            "next_url": "",
            "preview": item["description"],
            "date": item.get("date", ""),
            "published": bool(_date_obj(item.get("date", ""))),
            "words": len(item["description"].split()),
            "categories": ["Lab"],
            "tags": item.get("tags", []),
            "content": item["description"],
            "source": item["description"],
            "has_pdf": False,
            "status": item.get("status", ""),
        })
        passages.append({
            "id": f"{document_id}:document:0",
            "documentId": document_id,
            "section": item["title"],
            "breadcrumb": [],
            "text": item["description"],
            "url": url,
            "location": {
                "anchor": "",
                "headingLevel": 0,
                "passageIndex": 0,
                "chunkIndex": 0,
            },
        })
    documents.sort(key=lambda item: item.get("date", ""), reverse=True)
    if compact:
        documents = [_catalog_document(item) for item in documents]
    index = {
        "scope": "public",
        "version": 2,
        "documents": documents,
        "passages": passages,
    }
    content_payload = json.dumps({"documents": documents, "passages": passages}, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    index.update({
        "generatedAt": datetime.now().astimezone().isoformat(),
        "documentCount": len(documents),
        "passageCount": len(passages),
        "contentHash": hashlib.sha256(content_payload.encode("utf-8")).hexdigest(),
    })
    return index


def _catalog_document(document):
    return {key: value for key, value in document.items() if key not in {"content", "source"}}


def _search_index_items():
    return _public_search_index(compact=True)["documents"]


def _tag_explorer():
    articles = _article_data()
    tags = sorted({tag for article in articles for tag in article["tags"]})
    options = "".join(f'<a href="/tags/?tag={html.escape(tag)}">#{html.escape(tag)}</a>' for tag in tags)
    cards = "".join(_post_card(article, "tagged") for article in sorted(articles, key=lambda x: x["sort_key"], reverse=True))
    return f"""
<div class="zdd-tag-page">
  <div id="zdd-tag-heading" class="zdd-tag-heading">All Tags</div>
  <div class="zdd-post-list zdd-tag-results">{cards}</div>
  <div class="zdd-tag-cloud">{options}</div>
</div>
<script>
(function() {{
  var params = new URLSearchParams(window.location.search);
  var tag = params.get("tag");
  var heading = document.getElementById("zdd-tag-heading");
  var list = document.querySelector(".zdd-tag-results");
  var cards = document.querySelectorAll(".zdd-tag-results .zdd-post-card");
  if (tag) {{
    heading.textContent = "#" + tag;
    cards.forEach(function(card) {{
      var tags = (card.getAttribute("data-tags") || "").split(/\\s+/);
      card.style.display = tags.indexOf(tag) >= 0 ? "" : "none";
    }});
  }} else {{
    list.style.display = "none";
  }}
}})();
</script>
"""


def _exclude_sitemap_urls(site_dir, site_url, excluded_paths):
    sitemap_path = Path(site_dir) / "sitemap.xml"
    if not sitemap_path.exists() or not excluded_paths:
        return 0

    namespace = "http://www.sitemaps.org/schemas/sitemap/0.9"
    ElementTree.register_namespace("", namespace)
    try:
        tree = ElementTree.parse(sitemap_path)
    except (OSError, ElementTree.ParseError) as exc:
        print(f"[sitemap] Unable to filter {sitemap_path}: {exc}")
        return 0

    excluded_urls = {
        urljoin(site_url.rstrip("/") + "/", str(path).lstrip("/"))
        for path in excluded_paths
    }
    root = tree.getroot()
    removed = 0
    for entry in list(root.findall(f"{{{namespace}}}url")):
        location = entry.find(f"{{{namespace}}}loc")
        if location is not None and location.text in excluded_urls:
            root.remove(entry)
            removed += 1

    if not removed:
        return 0
    ElementTree.indent(tree, space="    ")
    tree.write(sitemap_path, encoding="utf-8", xml_declaration=True)
    with sitemap_path.open("rb") as source, gzip.open(sitemap_path.with_suffix(".xml.gz"), "wb") as target:
        target.write(source.read())
    print(f"[sitemap] Excluded {removed} non-indexable URL(s)")
    return removed




def on_post_build(env=None, config=None, **kwargs):
    config = config or getattr(env, "_conf", None) or getattr(env, "config", env)
    try:
        site_dir = config["site_dir"]
    except (KeyError, TypeError):
        site_dir = config.site_dir
    public_index = _public_search_index(compact=True)
    public_output = Path(site_dir) / "assets" / "zdd-public-search-index.json"
    public_output.parent.mkdir(parents=True, exist_ok=True)
    public_output.write_text(json.dumps(public_index, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    catalog = {
        "scope": "public",
        "version": 1,
        "contentHash": public_index["contentHash"],
        "documents": public_index["documents"],
    }
    catalog_output = Path(site_dir) / "assets" / "zdd-content-catalog.json"
    catalog_output.write_text(json.dumps(catalog, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    extra = config.get("extra", {}) if hasattr(config, "get") else getattr(config, "extra", {})
    site_url = config.get("site_url", "") if hasattr(config, "get") else getattr(config, "site_url", "")
    _exclude_sitemap_urls(site_dir, site_url, extra.get("sitemap_exclude", []))


def define_env(env):
    @env.macro
    def article_count():
        return len(_article_data())

    @env.macro
    def category_count():
        return len({a["folder_parts"][0] for a in _article_data() if a["folder_parts"]})

    @env.macro
    def recent_posts(max_items=6):
        posts = [article for article in _article_data() if article["published"]]
        posts = sorted(posts, key=lambda x: x["sort_key"], reverse=True)[:max_items]
        return '<div class="zdd-post-list">' + "".join(_post_card(post, "recent") for post in posts) + "</div>"

    @env.macro
    def search_index_data():
        return json.dumps(_search_index_items(), ensure_ascii=False)

    @env.macro
    def blog_catalog():
        tree = {}
        for article in _article_data():
            _tree_insert(tree, article)
        return '<div class="zdd-blog-catalog">' + _render_tree(tree) + "</div>"

    @env.macro
    def lab_catalog():
        return _lab_catalog()

    @env.macro
    def tag_explorer():
        return _tag_explorer()
