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
# 安装依赖
pip install mkdocs-material mkdocs-macros-plugin pymdown-extensions

# 本地预览 (http://127.0.0.1:8000)
mkdocs serve

# 部署到 GitHub Pages
mkdocs gh-deploy
```

## 项目结构

```
zdd/
├── docs/                  # Markdown 源文件
│   ├── blog/              # 笔记内容（按学科分目录）
│   ├── index.md           # 首页
│   ├── tags/              # 标签系统
│   ├── friends/           # 友链
│   ├── javascripts/       # 自定义 JS（命令搜索、MathJax 等）
│   └── stylesheets/       # 自定义 CSS
├── mkdocs.yml             # 站点配置
├── main.py                # 自定义宏（blog catalog、标签探索、Pixiv 集成等）
├── hooks.py               # 构建钩子（搜索索引预处理、页面后处理）
├── overrides/             # 主题覆写（main.html 等）
├── tools/                 # 辅助脚本
└── site/                  # 构建输出（由 mkdocs 生成）
```

## 特性

- **标签系统** — 笔记按标签归类，支持标签探索器
- **命令搜索** — `Ctrl+Enter` 唤起，内置多种指令

## 致谢

- 站点框架：[Material for MkDocs](https://github.com/squidfunk/mkdocs-material)
- 数学渲染：[MathJax](https://www.mathjax.org/)
- 托管服务：[GitHub Pages](https://pages.github.com/)
