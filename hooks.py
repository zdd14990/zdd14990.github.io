# hooks.py
def on_page_markdown(markdown, page, config, files):
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