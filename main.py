import html
import json
import os
import re
import ssl
import urllib.request
from datetime import datetime
from pathlib import Path

DATE_RE = re.compile(r'^date:\s*["\']?(\d{4}-\d{2}-\d{2})["\']?', re.MULTILINE)
FRONTMATTER_RE = re.compile(r"^\ufeff?---\s*\n(.*?)\n---\s*\n", re.S)
CHAPTER_RE = re.compile(
    r"(?i)(?:^|[-_\s])(?:chapter|chap|part|section|sec|exercise|ex|homework|hw)[-_\s]*(\d+)(?:[-_.\s]*(\d+))?"
)
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


def _infer_topic_tags(src_path):
    inferred = set()
    for prefix, topics in TOPIC_INFERENCE.items():
        if src_path.startswith("blog/" + prefix + "/"):
            inferred.update(topics)
    return sorted(inferred)

SEARCH_TEXT_LIMIT = 12000
DISPLAY_NAMES = {
    "analysis": "分析",
    "algebra": "代数",
    "probability-statistics": "概统",
    "statistics": "统计",
    "probability-theory": "概率论",
    "course": "课程",
    "gtm295": "GTM295",
    "applied-math": "应用数学",
    "numerical-pde": "PDE 数值解",
    "convex-optimization": "凸优化",
    "data-science": "数据科学专题",
    "applied-math-exam": "应用数学博资考",
    "ai-exam": "AI 博资考",
    "paper-notes": "论文笔记",
    "physics": "物理",
    "electrodynamics": "电动力学",
    "economics": "经济学",
    "misc": "其他",
}
TOP_ORDER = [
    "analysis",
    "algebra",
    "probability-statistics",
    "course",
    "gtm295",
    "ai-exam",
    "numerical-pde",
    "convex-optimization",
    "data-science",
    "applied-math-exam",
    "paper-notes",
    "physics",
    "economics",
    "misc",
]
FLATTEN_ROOTS = {"applied-math"}


def _docs_dir():
    return Path("docs").resolve()


def _strip_frontmatter(content):
    return FRONTMATTER_RE.sub("", content, count=1)


def _read_text(path):
    return path.read_text(encoding="utf-8", errors="ignore").lstrip("\ufeff")


def _parse_list_meta(meta, key):
    match = re.search(rf"^{re.escape(key)}:\s*\n((?:\s+- .+\n?)+)", meta, re.M)
    if not match:
        return []
    values = []
    for line in match.group(1).splitlines():
        item = line.strip()
        if item.startswith("- "):
            values.append(item[2:].strip().strip('"\''))
    return values


def _parse_scalar_meta(meta, key):
    match = re.search(rf"^{re.escape(key)}:\s*(.*?)\s*$", meta, re.M)
    if not match:
        return ""
    return match.group(1).strip().strip('"\'')


def _clean_tags(tags):
    return [tag for tag in tags if not MEANINGLESS_TAG_RE.match(tag)]


def _meta_and_body(path):
    content = _read_text(path)
    match = FRONTMATTER_RE.match(content)
    if match:
        return match.group(1), content[match.end():]
    return "", content


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


def _plain_markdown(text):
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"^\s*#{1,6}\s*", "", text, flags=re.M)
    text = re.sub(r"^\s*!!!.*$", "", text, flags=re.M)
    text = re.sub(r"[*_`>#|{}\[\]]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _render_math_text(text, limit=180):
    parts = re.split(r"(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)", text)
    out = []
    used = 0
    for part in parts:
        if not part or used >= limit:
            continue
        if part.startswith("$$") and part.endswith("$$"):
            formula = html.escape(part[2:-2].strip())
            out.append(f'<span class="arithmatex">\\[{formula}\\]</span>')
            used += 8
        elif part.startswith("$") and part.endswith("$"):
            formula = html.escape(part[1:-1].strip())
            out.append(f'<span class="arithmatex">\\({formula}\\)</span>')
            used += 4
        else:
            cleaned = _plain_markdown(part)
            if not cleaned:
                continue
            remaining = limit - used
            piece = cleaned[:remaining]
            used += len(piece)
            out.append(html.escape(piece))
    preview = " ".join(out).strip()
    if used >= limit:
        preview += "..."
    return preview or "暂无预览"


def _first_content_block(body):
    body = re.sub(r"```[\s\S]*?```", " ", body)
    blocks = [block.strip() for block in re.split(r"\n\s*\n", body) if block.strip()]
    for block in blocks:
        if (
            block.startswith("#")
            or block.startswith("<div")
            or "<embed" in block
            or "application/pdf" in block
            or block.startswith("[点击下载")
            or re.fullmatch(r"-{3,}", block)
            or re.match(r"^(title|date|categories|tags):", block, re.I)
        ):
            continue
        return block
    return ""


def _article_data():
    docs_dir = _docs_dir()
    blog_dir = docs_dir / "blog"
    articles = []
    for path in sorted(blog_dir.rglob("*.md")):
        if path.name == "index.md":
            continue
        meta, body = _meta_and_body(path)
        rel = path.relative_to(docs_dir).as_posix()
        src_path = rel
        title = _parse_scalar_meta(meta, "title") or path.stem.replace("-", " ").title()
        date = _parse_scalar_meta(meta, "date") or datetime.fromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d")
        tags = list(dict.fromkeys(_clean_tags(_parse_list_meta(meta, "tags")) + _infer_topic_tags(src_path)))
        categories = _parse_list_meta(meta, "categories")
        content = _read_text(path)
        search_text = _plain_markdown(body)
        parts = rel.split("/")
        folder_parts = parts[1:-1]
        if len(folder_parts) > 1 and folder_parts[0] in FLATTEN_ROOTS:
            folder_parts = folder_parts[1:]
        articles.append({
            "path": path,
            "src_path": src_path,
            "url": _article_url(src_path),
            "title": title,
            "date": date,
            "sort_key": _date_obj(date) or datetime.fromtimestamp(path.stat().st_mtime),
            "modified": date,
            "created": date,
            "categories": categories,
            "tags": tags,
            "words": _word_count(content),
            "preview": _render_math_text(_first_content_block(body)),
            "search_text": search_text[:SEARCH_TEXT_LIMIT],
            "folder_parts": folder_parts,
        })
    tag_freq = {}
    for a in articles:
        for t in a["tags"]:
            tag_freq[t] = tag_freq.get(t, 0) + 1
    for a in articles:
        a["tags"] = [t for t in a["tags"] if tag_freq[t] >= 3]
    return articles


def _format_words(count):
    return f"{count:,} 字"


def _post_card(article, extra_class=""):
    tags = " ".join(html.escape(tag) for tag in article["tags"])
    category = " / ".join(html.escape(c) for c in article["categories"]) or "未分类"
    return f"""
<a class="zdd-post-card {extra_class}" href="{article['url']}" data-tags="{tags}">
  <span class="zdd-post-title">{html.escape(article['title'])}</span>
  <span class="zdd-post-preview">{article['preview']}</span>
  <span class="zdd-post-meta">
    <span>{category}</span>
    <span>{html.escape(article['date'])}</span>
    <span>{_format_words(article['words'])}</span>
  </span>
</a>
"""


def _folder_stats(articles):
    if not articles:
        return {"count": 0, "created": "-", "updated": "-", "words": 0}
    created = min(a["sort_key"] for a in articles).strftime("%Y-%m-%d")
    updated = max(a["sort_key"] for a in articles).strftime("%Y-%m-%d")
    return {
        "count": len(articles),
        "created": created,
        "updated": updated,
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


def _render_tree(node, level=0):
    html_parts = []
    folder_keys = [key for key in node.keys() if key != "_articles"]
    folder_keys.sort(key=lambda k: (TOP_ORDER.index(k) if k in TOP_ORDER else 99, DISPLAY_NAMES.get(k, k)))

    for key in folder_keys:
        child = node[key]
        articles = _collect_articles(child)
        stats = _folder_stats(articles)
        name = DISPLAY_NAMES.get(key, key.replace("-", " ").title())
        html_parts.append(f"""
<details class="zdd-catalog-folder" data-level="{level}">
  <summary>
    <span class="zdd-folder-name">{html.escape(name)}</span>
    <span class="zdd-folder-meta">{stats['count']} 篇 · {stats['created']} - {stats['updated']} · {_format_words(stats['words'])}</span>
  </summary>
  <div class="zdd-folder-content"><div>
    {_render_tree(child, level + 1)}
  </div></div>
</details>
""")

    articles = sorted(node.get("_articles", {}).values(), key=_chapter_order_key)
    if articles:
        html_parts.append('<div class="zdd-catalog-posts">')
        html_parts.extend(_post_card(article, "catalog") for article in articles)
        html_parts.append("</div>")
    return "".join(html_parts)


def _search_index_items():
    items = []
    articles = _article_data()
    neighbors = _chapter_neighbors(articles)
    for article in sorted(articles, key=lambda x: x["sort_key"], reverse=True):
        adjacent = neighbors.get(article["src_path"], {})
        items.append({
            "title": article["title"],
            "url": article["url"],
            "prev_url": adjacent.get("prev_url", ""),
            "next_url": adjacent.get("next_url", ""),
            "preview": re.sub(r"<[^>]+>", " ", article["preview"]),
            "date": article["date"],
            "words": article["words"],
            "categories": article["categories"],
            "tags": article["tags"],
            "content": article["search_text"],
            "source": _strip_frontmatter(_read_text(article["path"]))[:3000],
            "has_pdf": bool(re.search(r"(\.pdf\b|application/pdf|<embed)", _read_text(article["path"]), re.I)),
        })
    return items




def _load_pixiv_session():
    env_path = Path(".env")
    if not env_path.exists():
        return ""
    content = env_path.read_text(encoding="utf-8", errors="ignore")
    for line in content.splitlines():
        line = line.strip()
        if line.startswith("PIXIV_SESSION="):
            return line.split("=", 1)[1].strip().strip("\"'")
    return ""


def _fetch_pixiv_ranking(mode="daily"):
    session = _load_pixiv_session()
    label = f"pixiv:{mode}"
    if not session:
        print(f"[{label}] No PIXIV_SESSION found — skipping")
        return []

    url = f"https://www.pixiv.net/ranking.php?format=json&mode={mode}"
    req = urllib.request.Request(url, headers={
        "Cookie": f"PHPSESSID={session}",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://www.pixiv.net/",
        "Accept": "application/json",
        "Accept-Language": "zh-CN,zh;q=0.9",
    })

    try:
        ctx = ssl.create_default_context()
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"[{label}] Failed: {e}")
        return []

    contents = data.get("contents", [])
    if not isinstance(contents, list):
        return []

    results = []
    for item in contents:
        illust_id = item.get("illust_id")
        if illust_id:
            results.append({
                "id": illust_id,
                "title": item.get("title", ""),
                "url": item.get("url", ""),
            })

    print(f"[{label}] Fetched {len(results)} entries")
    return results
def on_post_build(env=None, config=None, **kwargs):
    config = config or getattr(env, "_conf", None) or getattr(env, "config", env)
    try:
        site_dir = config["site_dir"]
    except (KeyError, TypeError):
        site_dir = config.site_dir
    output = Path(site_dir) / "assets" / "zdd-search-data.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(_search_index_items(), ensure_ascii=False), encoding="utf-8")

    for file_name, mode in [("pixiv-ranking.json", "daily"), ("pixiv-r18-ranking.json", "daily_r18")]:
        data = _fetch_pixiv_ranking(mode)
        if data:
            (Path(site_dir) / "assets" / file_name).write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")


def define_env(env):
    @env.macro
    def article_count():
        return len(_article_data())

    @env.macro
    def category_count():
        return len({a["folder_parts"][0] for a in _article_data() if a["folder_parts"]})

    @env.macro
    def recent_posts(max_items=6):
        posts = sorted(_article_data(), key=lambda x: x["sort_key"], reverse=True)[:max_items]
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
    def tag_explorer():
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
