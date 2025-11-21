---
title: 首页
# template: main.html
hide:
  - navigation
  - toc
git_revision_date_localized:
  enable: false
---

<style>
  .md-source-file { 
      display: none !important; 
  }
</style>

<div align="center" style="margin-top: 20px; margin-bottom: 40px;" markdown="1">

# :material-book-open-page-variant: Z弟弟的数理秘密花园

<p style="font-size: 1.2rem; color: var(--md-default-fg-color--light); font-style: italic;">
    “ 按理来讲你这个级别的基米无权哈我 ”
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

<div class="profile-card" markdown="1" data-tilt data-tilt-glare data-tilt-max-glare="0.3" data-tilt-max="10" data-tilt-speed="400">

<div class="avatar-wrapper">
<img src="assets/avatar.jpg" alt="Avatar" class="avatar">
</div>

<div class="profile-info">
<h2 class="profile-name">zdd</h2>
<div class="typing-container">
  <p class="profile-bio typing-text">家里蹲是绝对正义</p>
</div>
</div>

<div class="visitor-badge">
  <span id="busuanzi_container_site_pv" class="pv-container" style="display:none">
    <span class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style="fill: currentColor;">
        <path d="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/>
      </svg>
    </span>
    <span id="busuanzi_value_site_pv">--</span>
  </span>
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
🐱
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

数学专业大三学生，这里是我整理笔记的数字花园。你可以通过上方的按钮快速跳转到不同学科的笔记。

本学期主修应用方向，因此近期会专心更新应用数学板块。

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
    justify-content: center;
}

/* --- 左侧名片卡样式 --- */
.profile-card {
    flex: 0 0 280px;
    background-color: var(--md-default-bg-color);
    border-radius: 20px;
    padding: 30px 20px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 1px solid rgba(0,0,0,0.05);
}

/* 暗色模式适配 */
[data-md-color-scheme="slate"] .profile-card {
    background-color: #2e303e;
    border: none;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

/* 头像 */
.avatar {
    width: 150px;
    height: 150px;
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
    margin: 5px 0 10px;
    font-size: 0.85rem;
    color: var(--md-default-fg-color--light);
}

/* --- 访客统计徽章样式 (Flexbox 修复版) --- */
.visitor-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.03);
    padding: 4px 12px;
    border-radius: 20px;
    margin-bottom: 20px;
    font-size: 0.75rem;
    color: var(--md-default-fg-color--light);
    font-family: "Roboto Mono", monospace;
}

[data-md-color-scheme="slate"] .visitor-badge {
    background: rgba(255, 255, 255, 0.05);
}

/* 内部 Flex 容器，确保对齐 */
.pv-container {
    display: flex !important;
    align-items: center;
    gap: 6px;
}

/* 图标微调 */
.visitor-badge .icon {
    display: flex;
    align-items: center;
    opacity: 0.8;
}

/* 数字样式 */
#busuanzi_value_site_pv {
    font-weight: bold;
    color: #e67e96;
    margin-top: 1px; /* 视觉微调 */
}

/* --- 统计栏 --- */
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
    background: linear-gradient(135deg, #a16b83, #8f5c70);
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
    padding-left: 20px;
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

/* ==========================================
   首页进场动画 (Entrance Animation)
   ========================================== */

/* 定义动画关键帧：从下往上浮动，透明度从 0 到 1 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 40px, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

/* 应用到左侧名片 (延迟 0.1秒) */
.profile-card {
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    animation-fill-mode: both; /* 保持动画结束状态 */
    animation-delay: 0.1s;
}

/* 应用到右侧文字区 (延迟 0.3秒，形成错落感) */
.intro-area {
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    animation-fill-mode: both;
    animation-delay: 0.3s;
}

/* 应用到顶部的 Hero 标题 (延迟 0秒) */
.md-typeset h1 {
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

</style>

