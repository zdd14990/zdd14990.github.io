# hooks.py
import os
import re

from mkdocs.utils import get_relative_url


PDF_EMBED_RE = re.compile(r'(<embed\s+[^>]*?src=")([^"]+\.pdf)("[^>]*>)', re.IGNORECASE)


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
            
    return markdown
