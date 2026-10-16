# zdd's Notebook

基于 [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) 的个人博客与学习笔记站，托管于 GitHub Pages，由 [MathJax](https://www.mathjax.org/) 驱动数学公式渲染。

🔗 **在线浏览**：<https://zdd14990.github.io/>

## 内容覆盖

| 分类 | 内容 |
|------|------|
| 概率与统计 | GTM295 (概率论)、概率论课程笔记、数理统计课程笔记 |
| 基础数学 | 数学分析、高等代数、实分析、交换代数、表示论 |
| 应用数学 | 数值PDE、凸优化、数据分析、科学计算考试专题 |
| AI | 深度学习、机器学习、强化学习、优化方法 |
| 物理 | 量子力学、电动力学（含 A4 纸）、统计力学 |
| 其他 | 中级微观经济学、俄语学习笔记 |

## 本地运行

```bash
# 创建并激活干净环境
python -m venv .venv
# Windows PowerShell: .\.venv\Scripts\Activate.ps1
# macOS / Linux: source .venv/bin/activate

# 安装固定版本的直接构建依赖
python -m pip install -r requirements.txt

# 本地预览 (http://127.0.0.1:8000)
mkdocs serve

# 生产构建
mkdocs build --strict

# 部署：推送到 main 后 CI 通过检查会自动发布到 gh-pages；如需手动发布：
mkdocs gh-deploy --strict --force --no-history
```

## 项目结构

```
zdd/
├── docs/                  # Markdown 源文件
│   ├── blog/              # 笔记内容（按学科分目录）
│   ├── lab/               # 交互实验页面
│   ├── os/                # 本地 Personal OS 页面壳
│   ├── index.md           # 首页
│   ├── tags/              # 标签系统
│   ├── friends/           # 友链
│   ├── javascripts/       # 自定义 JS（命令搜索、MathJax 等）
│   └── stylesheets/       # 自定义 CSS
├── mkdocs.yml             # 站点配置
├── main.py                # 自定义宏（blog catalog、标签探索等）
├── blog_content.py        # 统一文章元数据校验与单次构建缓存
├── blog_text.py           # 正文摘要、搜索分段和公式展示文本
├── site_catalog.py        # 分类、实验与课程清单校验
├── data/site-catalog.json # 分类显示名、实验条目与课程章节顺序
├── blog_taxonomy.py       # 页面与索引共用的标签规则
├── hooks.py               # 构建钩子（搜索索引预处理、页面后处理）
├── overrides/             # 主题覆写（main.html 等）
├── scripts/               # Personal OS 数据、站点检查等辅助脚本
├── requirements.txt       # 固定版本的直接构建依赖
└── site/                  # 构建输出（由 mkdocs 生成）
```

## 特性

- **标签系统** — 笔记按标签归类，支持标签探索器
- **命令搜索** — `Ctrl+Enter` 唤起，内置多种指令

## 阅读体验与维护

正文使用固定文楷字体、18 px 字号和 1.8 倍行距。阅读位置、阅读记录、继续阅读、已读进度和阅读设置已移除；访问页面时会清除旧版遗留的阅读记录及偏好，不影响主题等其他设置。

宽表格可以展开并横向滚动，图示可以放大查看和下载原图。手机目录使用浮动入口，桌面目录保持在视口内。

RSS 入口和订阅文件生成已移除。友链页使用无头像的文字列表，桌面双列、手机单列，保留站点名称、介绍和域名。文章可以使用以下日期字段：

```yaml
date: 2026-09-06
updated: 2026-09-07
```

`date` 是首次发布日期；只有内容发生实质更新时才设置 `updated`，且不能早于 `date`。列表继续按发布日期组织，页面和结构化数据会单独显示更新日期。

### 样式与资源

- `docs/stylesheets/theme-tokens.css` 集中定义主题颜色；`site-layout.css` 负责页面背景和文章表面。
- `docs/stylesheets/article-toc.css` 负责侧栏目录、手机目录弹窗和文章锚点间距。
- `docs/stylesheets/solid-background.css` 保留导航和页眉配色；`extra.css` 保留既有组件样式。
- `docs/stylesheets/reading.css` 负责固定正文排版、日期、表格和图片弹窗。
- MathJax 仅在具有公式的页面和需要动态公式的实验工具中加载；含公式摘要的文章目录也会加载。
- 文楷固定为 `lxgw-wenkai-screen-web@1.522.0`，位于 `docs/assets/fonts/wenkai/`，附 `OFL.txt` 和 SHA-256 清单。单字体族的 244 个 WOFF2 分片与样式表共约 13.35 MB，浏览器仅请求当前文字需要的分片。

需要重新取得同一版本字体时，可显式运行 `python scripts/vendor_reading_font.py`。普通构建和 CI 不运行下载脚本。

### CI 构建检查

文章 front matter 使用 YAML 解析，支持行内列表、块列表和多行标题；标题、标签、分类及日期由同一套规则校验。目录、搜索和页面共享文章数据，每次构建开始时刷新缓存，预览重建不会沿用上一轮文章内容。无效字段或日期会报告源文件路径并终止构建。

文章预览和命令导航共享 `zdd-content-catalog.json` 轻量目录。全文检索才请求 `zdd-public-search-index.json`，目录与正文索引通过内容哈希校验版本一致性。搜索字段在浏览器内按索引对象缓存，避免每次输入重新清洗全部段落；更新索引时应替换索引或段落数组。站点不再启用 MkDocs 自带的 search 插件，也不再输出兼容用的 `zdd-search-data.json`，全文检索只有这一套索引。

课程上下篇通过 `data/site-catalog.json` 中的 `courses` 定义。每条课程声明源目录、章节顺序、目录树路径和锚点，构建会检查章节存在且没有重复；初始配置保留概率论六章试点。命令 `/next` 和 `/prev` 继续按文件夹顺序工作。

页面的 `zdd_assets` 对应 `mkdocs.yml` 中的 `extra.page_assets`，统一声明所需样式与脚本，资源只加载到使用它们的页面。未知资源名称会让构建失败。预览自动监听课程清单变化；修改共享 Python 构建模块后需重启预览。

GitHub Actions 在 push 和 pull request 时检查 Python 依赖一致性、执行严格构建，并确认构建没有改写已跟踪的源文件。main 分支的检查全部通过后，`deploy` 任务执行 `mkdocs gh-deploy --no-history` 发布到 `gh-pages`（只保留最新一次构建，避免分支体积持续增长）。
构建后还会检查生成的导航链接、搜索锚点、页面资源、SEO 数据一致性、运行时校验和，以及公开输出没有混入私有资料索引。

```bash
python -m pip check
python -m mkdocs build --strict
python -B scripts/check_site.py
```

## 致谢

- 站点框架：[Material for MkDocs](https://github.com/squidfunk/mkdocs-material)
- 数学渲染：[MathJax](https://www.mathjax.org/)
- 托管服务：[GitHub Pages](https://pages.github.com/)
