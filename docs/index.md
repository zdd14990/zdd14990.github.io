---
title: 首页
hide:
  - navigation
  - toc
git_revision_date_localized:
  enable: false
---

<style>
  /* =========================================================
     1. 基础全局设置与清理
     ========================================================= */
  /* 隐藏默认标题和源文件链接 */
  .md-typeset h1, .md-content__inner h1 { display: none !important; }
  .md-source-file { display: none !important; }

  /* 清除 MkDocs 默认内容区域的背景和阴影，实现透明 */
  .md-content, .md-content__inner, .md-main__inner {
    background: transparent !important;       
    background-color: transparent !important; 
    box-shadow: none !important;              
    border: none !important;                  
    backdrop-filter: none !important;         
    -webkit-backdrop-filter: none !important; 
    padding-top: 0 !important;
  }

  /* 暗色模式下的背景清理 */
  [data-md-color-scheme="slate"] .md-content,
  [data-md-color-scheme="slate"] .md-main__inner,
  [data-md-color-scheme="slate"] .md-grid {
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
    backdrop-filter: none !important;
  }

  /* =========================================================
     2. 首页大标题区域样式
     ========================================================= */
  /* 主标题样式 */
  .home-hero-title {
    font-size: 3.2rem;
    font-weight: 800;
    text-align: center;
    margin-top: 60px;   
    margin-bottom: 20px;
    line-height: 1.2;
    background: linear-gradient(to right, #e67e96, #5e72e4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  /* 副标题（打字机容器）样式 */
  .home-hero-subtitle {
    font-size: 1.5rem;
    font-style: italic;
    text-align: center;
    color: #fff;
    text-shadow: 0 2px 10px rgba(0,0,0,0.8); 
    opacity: 0.95;
    min-height: 1.5em; 
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s backwards;
  }

  /* 打字机光标闪烁效果 */
  #typing-text::after {
      content: '|';
      color: currentColor;
      animation: blink 1s infinite;
      margin-left: 4px;
      font-weight: 400;
      opacity: 1;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  
  /* 亮色模式下副标题颜色适配 */
  [data-md-color-scheme="default"] .home-hero-subtitle {
      color: #333;
      text-shadow: 0 2px 10px rgba(255,255,255,0.8);
  }

  /* =========================================================
     3. 核心容器与布局 (Glassmorphism & Layout)
     ========================================================= */
  /* 主体磨砂玻璃大容器 */
  .home-glass-wrapper {
    margin-top: 100px !important; 
    margin-left: auto; margin-right: auto; margin-bottom: 60px;
    max-width: 1100px; 
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 24px;
    padding: 40px;
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    border: 1px solid rgba(255, 255, 255, 0.6);
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s backwards;
  }

  /* 暗色模式下的磨砂容器 */
  [data-md-color-scheme="slate"] .home-glass-wrapper {
    background-color: rgba(30, 32, 48, 0.85); 
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
  }
  
  /* 通用向上淡入动画定义 */
  @keyframes fadeInUp { from { opacity: 0; transform: translate3d(0, 40px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }

  /* --- 双栏布局结构 --- */
  .hero-layout { 
    display: flex; 
    gap: 40px; /* 左右栏间距 */
    align-items: flex-start; 
    justify-content: center; 
  }

  /* 左侧固定宽度列 (包含名片+公告) */
  .left-column {
    flex: 0 0 280px; /* 固定宽度 */
    display: flex;
    flex-direction: column;
    gap: 20px; /* 名片与公告之间的垂直间距 */
  }

  /* 右侧自适应列 (自我介绍) */
  .intro-area { 
    flex: 1; 
    padding-left: 20px; 
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); 
    animation-fill-mode: both; 
    animation-delay: 0.3s; 
  }

  /* =========================================================
     4. 个人名片样式 (包含 3D 动画集成)
     ========================================================= */
  .profile-card { 
    width: 100%; /* 填满左侧容器 */
    background-color: var(--md-default-bg-color); 
    border-radius: 20px; 
    padding: 30px 20px; 
    text-align: center; 
    box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
    border: 1px solid rgba(0,0,0,0.05); 
    
    /* 强制增加底部边距，防止与下方公告栏重叠 */
    margin-bottom: 20px; 
    
    /* 进场动画 */
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); 
    animation-fill-mode: both; 
    animation-delay: 0.1s; 

    /* --- 集成 3D 特效关键样式 --- */
    transform-style: preserve-3d; /* 开启 3D 空间 */
    will-change: transform; /* 性能优化 */
    transition: box-shadow 0.3s ease; /* 阴影过渡 */
  }
  
  /* 鼠标悬停时的增强阴影，增加浮动感 */
  .profile-card:hover {
    box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
  }

  /* 暗色模式名片适配 */
  [data-md-color-scheme="slate"] .profile-card { 
    background-color: #2e303e; 
    border: none; 
    box-shadow: 0 10px 30px rgba(0,0,0,0.4); 
  }
  
  /* --- 名片内部元素的 3D 层次感 (Parallax) --- */
  .avatar-wrapper { transform: translateZ(50px); }
  .profile-info { transform: translateZ(30px); }
  .visitor-badge, .stats-row, .action-buttons { transform: translateZ(20px); }

  /* 头像样式 */
  .avatar { 
    width: 150px; height: 150px; border-radius: 50%; object-fit: cover; 
    margin-bottom: 15px; border: 3px solid var(--md-default-bg-color); 
    box-shadow: 0 5px 15px rgba(0,0,0,0.1); 
  }
  
  /* 姓名样式 */
  .profile-name { margin: 0; font-size: 1.4rem; font-weight: 700; color: var(--md-default-fg-color); }
  
  /* 访客徽章样式 */
  .visitor-badge { 
    display: inline-flex; align-items: center; justify-content: center; 
    background: rgba(0, 0, 0, 0.03); padding: 4px 12px; border-radius: 20px; 
    margin-bottom: 20px; font-size: 0.75rem; color: var(--md-default-fg-color--light); 
    font-family: "Roboto Mono", monospace; 
  }
  [data-md-color-scheme="slate"] .visitor-badge { background: rgba(255, 255, 255, 0.05); }
  
  /* 不蒜子计数器 */
  .pv-container { display: flex !important; align-items: center; gap: 6px; }
  .visitor-badge .icon { display: flex; align-items: center; opacity: 0.8; }
  #busuanzi_value_site_pv { font-weight: bold; color: #e67e96; margin-top: 1px; }
  
  /* 统计行样式 */
  .stats-row { display: flex; justify-content: center; align-items: center; margin-bottom: 20px; }
  .stat-item { padding: 0 12px; }
  .stat-num { display: block; font-size: 1.1rem; font-weight: bold; color: var(--md-default-fg-color); }
  .stat-label { font-size: 0.7rem; font-weight: normal; color: var(--md-default-fg-color--light); }
  .stat-divider { width: 1px; height: 20px; background-color: var(--md-default-fg-color--light); opacity: 0.2; }
  
  /* 装饰图标 */
  .decoration-icon { 
    margin: 10px 0; color: var(--md-default-fg-color--light); opacity: 0.3; 
    animation: spin 8s linear infinite; 
  }
  @keyframes spin { 100% { transform: rotate(360deg); } }
  
  /* ================= 按钮组样式 (新修改) ================= */
  
  /* 主按钮 (首页) */
  .btn-main { 
    display: flex; align-items: center; justify-content: center;
    width: 100%; padding: 10px 0; margin-bottom: 10px; 
    border-radius: 10px; 
    background: linear-gradient(135deg, #a16b83, #8f5c70); 
    color: #fff !important; font-weight: bold; text-decoration: none; 
    transition: transform 0.2s; 
  }
  .btn-main:hover { transform: translateY(-2px); opacity: 0.9; }
  
  /* 次级按钮容器 (Flex布局) */
  .sub-actions { 
    display: flex; 
    justify-content: space-between; 
    gap: 10px; /* 按钮间距 */
  }

  /* 次级按钮样式 (文章 & 友链) */
  .btn-secondary { 
    display: flex; align-items: center; justify-content: center;
    flex: 1; /* 平分宽度 */
    padding: 10px 0; 
    border-radius: 10px; 
    background: rgba(0, 0, 0, 0.05); /* 浅色背景 */
    color: var(--md-default-fg-color) !important; 
    font-weight: bold; 
    text-decoration: none; 
    font-size: 0.9rem;
    transition: all 0.2s ease; 
  }
  
  .btn-secondary:hover { 
    background: rgba(0, 0, 0, 0.1); /* 悬停加深 */
    transform: translateY(-2px);
  }

  /* 暗色模式适配 */
  [data-md-color-scheme="slate"] .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #fff !important;
  }
  [data-md-color-scheme="slate"] .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  /* =========================================================
     5. 公告栏样式
     ========================================================= */
  .announcement-section {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    animation-fill-mode: both;
    animation-delay: 0.5s;
  }
  [data-md-color-scheme="slate"] .announcement-section {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .announcement-header {
    display: flex; align-items: center; margin-bottom: 12px; 
    padding-bottom: 8px; border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
  [data-md-color-scheme="slate"] .announcement-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .announcement-icon { font-size: 1rem; margin-right: 8px; }
  .announcement-title { font-size: 0.9rem; font-weight: 600; color: var(--md-default-fg-color); }
  .announcement-content { display: flex; flex-direction: column; gap: 8px; }
  .announcement-item { display: flex; align-items: flex-start; gap: 10px; padding: 4px 0; }
  .announcement-date {
    font-size: 0.75rem; color: var(--md-default-fg-color--light);
    min-width: 70px; flex-shrink: 0; font-family: "Roboto Mono", monospace;
  }
  .announcement-text { font-size: 0.8rem; color: var(--md-default-fg-color); line-height: 1.4; flex: 1; }

  /* =========================================================
     6. 移动端适配
     ========================================================= */
  @media (max-width: 768px) { 
    .md-header__inner { padding-left: 15px !important; padding-right: 15px !important; }
    .home-hero-title { font-size: 2.2rem; margin-top: 40px; }
    .home-glass-wrapper { margin-top: 50px !important; padding: 20px; margin-left: 15px; margin-right: 15px; }

    .hero-layout { flex-direction: column; align-items: center; } 
    .left-column { width: 100%; max-width: 350px; flex: none; }
    .intro-area { width: 100%; padding-left: 0; margin-top: 30px; } 
  }
  
  #page-pv-container { display: none !important; }
</style>

<div class="home-hero-title">
  ZDD的数理秘密花园
</div>

<div class="home-hero-subtitle">
  <span id="typing-text"></span>
</div>

<div class="home-glass-wrapper" markdown="1">

<div align="center" style="margin-bottom: 30px;" markdown="1">

[:material-math-integral: 分析](博文/catalog_analysis.md){ .md-button .md-button--primary }
[:material-sigma: 代数](博文/catalog_algebra.md){ .md-button .md-button--primary }
[:material-vector-curve: 应用](博文/catalog_applied.md){ .md-button .md-button--primary }
[:material-chart-bell-curve-cumulative: 经济](博文/catalog_econ.md){.md-button  .md-button--primary }
[:material-link-variant: 友链](友链/友链.md){ .md-button }

</div>

<hr style="border-top: 1px solid var(--md-default-fg-color--light); opacity: 0.2; margin: 0 auto 40px auto; max-width: 800px;">

<div class="hero-layout" markdown="1">

<div class="left-column">

<div class="profile-card" data-tilt data-tilt-glare data-tilt-max-glare="0.3" data-tilt-max="10" data-tilt-speed="400" markdown="1">

<div class="avatar-wrapper">
<img src="assets/avatar.jpg" alt="Avatar" class="avatar">
</div>

<div class="profile-info">
<h2 class="profile-name">zdd</h2>
<div class="typing-container">
  家里蹲是绝对正义
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
  <span class="stat-num">{{ article_count() }}</span>
  <span class="stat-label">文章</span>
</div>
<div class="stat-divider"></div>
<div class="stat-item">
  <span class="stat-num">{{ category_count() }}</span>
  <span class="stat-label">分类</span>
</div>
</div>

<div class="decoration-icon">
🐱
</div>

<div class="action-buttons">

  <a href="." class="btn-main">
    首页
  </a>

  <div class="sub-actions">
    <a href="博文/" class="btn-secondary">文章</a>
    <a href="友链/友链/" class="btn-secondary">友链</a>
  </div>

</div>

</div>
<div class="announcement-section">
<div class="announcement-header">
  <span class="announcement-icon">📢</span>
  <span class="announcement-title">公告</span>
</div>
<div class="announcement-content">
  <div class="announcement-item">
    <span class="announcement-date">2025-11-22</span>
    <span class="announcement-text">完成了首页美化</span>
  </div>
  <div class="announcement-item">
    <span class="announcement-date">2025-11-19</span>
    <span class="announcement-text">上传了建站前笔记的pdf版本</span>
  </div>
  <div class="announcement-item">
    <span class="announcement-date">2025-11-18</span>
    <span class="announcement-text">建站</span>
  </div>
</div>
</div>

</div>
<div class="intro-area" markdown="1">

### :material-hand-wave: 欢迎光临

!!! quote " "
    若还想与我相见 就来我的梦里边

数学专业大三学生，这里是我整理笔记的数字花园。你可以通过上方的按钮快速跳转到不同学科的笔记。

本学期主修应用方向，因此近期会专心更新应用数学板块。

建站前的笔记实在是懒得将tex转成md直接传了pdf见谅_(:3 」∠ )_

之后有空也许会慢慢在ai帮助下换成md方便在网站上阅读。

#### :material-history: 最新文章

{{ recent_posts(6) }}

</div>
</div>

</div>

<script>
  (function() {
    // 1. 定义文案库
    const textLight = "“ 去过和没去过的地方 哪里更远 ”";
    const textDark  = "“ 抓住和抓不住的照片 哪张更美 ”";
    
    // 2. 获取容器
    const container = document.getElementById('typing-text');
    if (!container) return;
    
    // 3. 状态变量
    let currentTimer = null;
    let currentIndex = 0;

    // 4. 核心打字机函数
    function typeWriter(text) {
      if (currentTimer) clearTimeout(currentTimer);
      container.innerHTML = "";
      currentIndex = 0;
      function nextChar() {
        if (currentIndex < text.length) {
          container.innerHTML += text.charAt(currentIndex);
          currentIndex++;
          currentTimer = setTimeout(nextChar, 150); 
        } else {
          currentTimer = null;
        }
      }
      nextChar();
    }

    // 5. 更新逻辑
    function updateTextBasedOnScheme() {
      const scheme = document.body.getAttribute('data-md-color-scheme');
      const targetText = (scheme === 'slate') ? textDark : textLight;
      typeWriter(targetText);
    }

    setTimeout(updateTextBasedOnScheme, 1000);

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === "attributes" && mutation.attributeName === "data-md-color-scheme") {
           updateTextBasedOnScheme();
        }
      });
    });

    observer.observe(document.body, { attributes: true });
  })();
</script>