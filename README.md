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

# 生产构建（只读取已有 Pixiv 缓存，不访问 Pixiv 网络）
mkdocs build --strict

# 部署到 GitHub Pages
mkdocs gh-deploy
```

## 数据刷新与测试

Pixiv 排行缓存只会通过显式命令刷新，普通预览和构建不会修改源缓存：

```bash
python scripts/refresh_pixiv_cache.py
```

R18 排行需要在当前进程环境中提供 `PIXIV_SESSION`。不要把会话值写入 Git 或命令输出；没有该变量时，刷新命令会保留已有的 R18 缓存。

运行现有回归测试：

```bash
python -m unittest discover -s tests -p "test_*.py"
node --test tests/*.test.js
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
├── main.py                # 自定义宏（blog catalog、标签探索、Pixiv 集成等）
├── blog_taxonomy.py       # 页面与索引共用的标签规则
├── hooks.py               # 构建钩子（搜索索引预处理、页面后处理）
├── overrides/             # 主题覆写（main.html 等）
├── scripts/               # Pixiv 缓存、Personal OS 数据等辅助脚本
├── tests/                 # Python 与 Node 回归测试
├── requirements.txt       # 固定版本的直接构建依赖
└── site/                  # 构建输出（由 mkdocs 生成）
```

## 特性

- **标签系统** — 笔记按标签归类，支持标签探索器
- **命令搜索** — `Ctrl+Enter` 唤起，内置多种指令

## 致谢

- 站点框架：[Material for MkDocs](https://github.com/squidfunk/mkdocs-material)
- 数学渲染：[MathJax](https://www.mathjax.org/)
- 托管服务：[GitHub Pages](https://pages.github.com/)
