import sys
import os
import re
import html
from datetime import datetime

DATE_RE = re.compile(r'^date:\s*["\']?(\d{4}-\d{2}-\d{2})["\']?', re.MULTILINE)

# =================================================================
# 1. 核心工具：强力清洗 + 安全转义
# =================================================================
def extract_date(content):
    date_match = DATE_RE.search(content)
    if not date_match:
        return None, None

    date_str = date_match.group(1)
    try:
        return datetime.strptime(date_str, "%Y-%m-%d"), date_str
    except ValueError:
        return None, None


def page_has_date(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except OSError:
        return False

    date_obj, _ = extract_date(content)
    return date_obj is not None


def is_blog_article(page):
    if not page.title:
        return False

    path = page.file.src_path.replace('\\', '/')
    return ("blog" in path) and (not path.endswith("index.md")) and (page.title != "概览") and ("catalog" not in page.file.name)


def parse_file_content(file_path, length=120):
    preview_text = "(暂无预览)"
    date_obj = None
    date_str = "Unknown"
    
    try:
        if not os.path.exists(file_path):
            return date_obj, date_str, preview_text

        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # --- A. 提取日期 ---
        date_obj, date_str = extract_date(content)
        if date_obj is None:
            return None, "Unknown", preview_text

        # --- B. 预览内容深度清洗 ---
        content = re.sub(r'^---[\s\S]+?---\s*', '', content)
        content = re.sub(r'\$\$[\s\S]*?\$\$', ' [公式] ', content)
        content = re.sub(r'\$.*?\$', ' [公式] ', content)
        content = re.sub(r'\\frac\{.*?\}\{.*?\}', ' [公式] ', content)
        content = re.sub(r'^\s*!!!.*$', '', content, flags=re.MULTILINE)
        content = re.sub(r':[a-zA-Z0-9\-]+:', '', content)
        content = re.sub(r'<[^>]+>', '', content)
        content = re.sub(r'!\[.*?\]\(.*?\)', '', content)
        content = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', content)
        content = re.sub(r'\{.*?\}', '', content)
        content = re.sub(r'[`#\*\->!]', ' ', content)
        content = re.sub(r'\s+', ' ', content).strip()
        
        if len(content) > length:
            raw_preview = content[:length] + "..."
        else:
            raw_preview = content
            
        # --- C. 关键修复：双重转义 ---
        safe_preview = html.escape(raw_preview)
        safe_preview = safe_preview.replace('{', '&#123;').replace('}', '&#125;')
        preview_text = safe_preview

    except Exception as e:
        print(f"Error parsing {file_path}: {e}")
    
    return date_obj, date_str, preview_text

# =================================================================
# 2. Hook
# =================================================================
def on_nav(nav, config, files):
    sys._mkdocs_global_nav_bridge = nav
    return nav

# =================================================================
# 3. Macros (新增统计功能)
# =================================================================
def define_env(env):
    
    # --- 辅助函数：获取有效文章列表 ---
    def get_valid_pages():
        nav = getattr(sys, '_mkdocs_global_nav_bridge', None)
        if not nav: return []
        
        valid_pages = []
        for page in nav.pages:
            # 统一过滤条件：在博文目录下，且不是索引页、目录页、概览页
            if is_blog_article(page):
                valid_pages.append(page)
        return valid_pages

    # --- 宏 1: 获取文章总数 ---
    @env.macro
    def article_count():
        return len(get_valid_pages())

    # --- 宏 2: 获取分类总数 (自动统计子文件夹数量) ---
    @env.macro
    def category_count():
        pages = get_valid_pages()
        categories = set()
        for page in pages:
            path = page.file.src_path.replace('\\', '/')
            parts = path.split('/')
            # 假设结构是：博文/分类名/文章.md
            # parts[0]是博文, parts[1]是分类名
            if len(parts) >= 2:
                categories.add(parts[1])
        return len(categories)

    # --- 宏 3: 最新文章列表 (保持原有逻辑) ---
    @env.macro
    def recent_posts(max_items=6):
        posts = []
        for page in get_valid_pages():
            if not page_has_date(page.file.abs_src_path):
                continue

            path = page.file.src_path.replace('\\', '/')
            sort_key, date_str, preview = parse_file_content(page.file.abs_src_path)
            if sort_key is None:
                continue

            safe_title = html.escape(page.title).replace('{', '&#123;').replace('}', '&#125;')

            # 提取分类
            path_parts = path.split('/')
            category = path_parts[-2] if len(path_parts) >= 2 else "默认"
            safe_category = html.escape(category)

            posts.append({
                'title': safe_title,
                'url': page.url,
                'date': date_str,
                'sort_key': sort_key,
                'preview': preview,
                'category': safe_category
            })

        posts.sort(key=lambda x: x['sort_key'], reverse=True)
        posts = posts[:max_items]

        html_parts = ['<div class="recent-post-list">']
        for p in posts:
            card = (
                f'<div class="post-card-item">'
                f'<a class="post-card-link" href="{p["url"]}">'
                f'<span class="post-card-title">{p["title"]}</span>'
                f'<span class="post-card-meta">'
                f'<span class="icon">📂</span>{p["category"]}'
                f'<span style="margin: 0 8px; opacity: 0.3;">|</span>'
                f'<span class="icon">📅</span>{p["date"]}'
                f'</span>'
                f'<span class="post-card-preview">{p["preview"]}</span>'
                f'</a></div>'
            )
            html_parts.append(card)
        html_parts.append('</div>')
        
        return "".join(html_parts)
