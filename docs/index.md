---
title: 首页
# template: main.html
hide:
  - navigation
  - toc
---


<div align="center" style="margin-top: 20px; margin-bottom: 40px;" markdown="1">

# :material-book-open-page-variant: Z弟弟的数理秘密花园

<p style="font-size: 1.2rem; color: var(--md-default-fg-color--light); font-style: italic;">
    “ 家里蹲是绝对正义 ”
</p>

<br>

[:material-math-integral: 分析](博文/catalog_analysis.md){ .md-button .md-button--primary }
[:material-sigma: 代数](博文/catalog_algebra.md){ .md-button .md-button--primary }
[:material-vector-curve: 应用](博文/catalog_applied.md){ .md-button .md-button--primary }
[:material-chart-bell-curve-cumulative: 经济](博文/catalog_econ.md){.md-button  .md-button--primary }
[:material-link-variant: 友链](友链/友链.md){ .md-button }

</div>

<hr style="border-top: 1px solid var(--md-default-fg-color--light); opacity: 0.2; margin: 0 auto; max-width: 800px;">
<br>


<div class="hero-layout" markdown="1">

<div class="profile-card" markdown="1">

<div class="avatar-wrapper">
<img src="assets/avatar.jpg" alt="Avatar" class="avatar">
</div>

<div class="profile-info">
<h2 class="profile-name">zdd</h2>
<p class="profile-bio">家里蹲是绝对正义</p>
</div>

<div class="stats-row">
<div class="stat-item">
<span class="stat-num">9</span>
<span class="stat-label">文章</span>
</div>
<div class="stat-divider"></div>
<div class="stat-item">
<span class="stat-num">4</span>
<span class="stat-label">分类</span>
</div>
</div>

<div class="decoration-icon">
🍥
</div>

<div class="action-buttons" markdown="1">
<a href="." class="btn-main">
:material-castle: 首页
</a>

<div class="sub-actions" markdown="1">
<a href="博文/" class="btn-text">
:material-feather: 文章
</a>

<a href="友链/友链/" class="btn-text">
:material-heart: 友链
</a>

</div>
</div>

</div>

<div class="intro-area" markdown="1">

### :material-hand-wave: 欢迎光临

!!! quote "人生在世"
    头号观众不是别人，而是我们自己。

这里是我整理笔记的数字花园。你可以通过上方的按钮快速跳转到不同学科的笔记。

建站前的笔记实在是懒得将tex转成md直接传了pdf见谅_(:3 」∠ )_

之后有空也许会慢慢在ai帮助下换成md方便在网站上阅读。

#### 最近更新 :material-clock-edit-outline:

* [2025-11-19] 上传了建站前笔记的pdf版本
* [2025-11-18] 建站

</div>
</div>


<style>
/* --- 布局容器 --- */
.hero-layout {
    display: flex;
    gap: 40px;
    max-width: 1000px;
    margin: 20px auto 0;
    align-items: flex-start;
    justify-content: center; /* 居中整个布局 */
}

/* --- 左侧名片卡样式 --- */
.profile-card {
    flex: 0 0 280px; /* 稍微调窄一点以适应上方按钮的比例 */
    background-color: var(--md-default-bg-color);
    border-radius: 20px;
    padding: 30px 20px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 1px solid rgba(0,0,0,0.05);
}

/* 暗色模式适配 */
[data-md-color-scheme="slate"] .profile-card {
    background-color: #2e303e; /* 模仿图片中的深色背景 */
    border: none;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

/* 头像 */
.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
    border: 3px solid var(--md-default-bg-color);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* 名字 */
.profile-name {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--md-default-fg-color);
}
.profile-bio {
    margin: 5px 0 20px;
    font-size: 0.85rem;
    color: var(--md-default-fg-color--light);
}

/* 统计栏 */
.stats-row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.stat-item { padding: 0 12px; }
.stat-num {
    display: block;
    font-size: 1.1rem;
    font-weight: bold;
    color: var(--md-default-fg-color);
}
.stat-label {
    font-size: 0.7rem;
    color: var(--md-default-fg-color--light);
}
.stat-divider {
    width: 1px; height: 20px;
    background-color: var(--md-default-fg-color--light);
    opacity: 0.2;
}

/* 装饰图标 */
.decoration-icon {
    margin: 10px 0;
    color: var(--md-default-fg-color--light);
    opacity: 0.3;
    animation: spin 8s linear infinite;
}
@keyframes spin { 100% { transform: rotate(360deg); } }

/* 名片上的按钮 */
.btn-main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 10px 0;
    margin-bottom: 15px;
    border-radius: 10px;
    background: linear-gradient(135deg, #a16b83, #8f5c70); /* 粉褐色渐变 */
    color: #fff !important;
    font-weight: bold;
    text-decoration: none;
    transition: transform 0.2s;
}
.btn-main:hover { transform: translateY(-2px); opacity: 0.9; }

.sub-actions { display: flex; justify-content: space-around; }
.btn-text {
    display: flex; align-items: center; gap: 5px;
    color: var(--md-default-fg-color--light);
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.2s;
}
.btn-text:hover { color: var(--md-accent-fg-color); }

/* --- 右侧内容区 --- */
.intro-area {
    flex: 1;
    padding-left: 20px; /* 给右侧内容一点左边距 */
}

/* --- 移动端适配 --- */
@media (max-width: 768px) {
    .hero-layout {
        flex-direction: column;
        align-items: center;
    }
    .profile-card {
        width: 100%;
        max-width: 350px;
    }
    .intro-area {
        width: 100%;
        padding-left: 0;
        margin-top: 30px;
    }
}
</style>