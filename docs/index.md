---
title: Home
hide:
  - navigation
  - toc
  - footer
---

<style>
  body.home-layout .md-footer,
  body.zdd-minimal-layout.home-layout .md-footer {
    display: none !important;
  }

  body.home-layout .md-main__inner,
  body.home-layout .md-content,
  body.home-layout .md-content__inner,
  body.zdd-minimal-layout.home-layout .md-main__inner,
  body.zdd-minimal-layout.home-layout .md-content,
  body.zdd-minimal-layout.home-layout .md-content__inner {
    margin: 0 !important;
    padding: 0 !important;
    max-width: none !important;
    width: 100% !important;
  }

  body.home-layout .md-content__inner::before,
  body.home-layout .md-content__inner::after,
  body.zdd-minimal-layout.home-layout .md-content__inner::before,
  body.zdd-minimal-layout.home-layout .md-content__inner::after {
    display: none !important;
    content: none !important;
  }

  body.home-layout .minimal-home,
  body.zdd-minimal-layout.home-layout .minimal-home {
    position: relative;
    box-sizing: border-box;

    min-height: calc(100svh - 3rem);
    padding: 0 1rem 3.6rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  body.home-layout .minimal-home-hero,
  body.zdd-minimal-layout.home-layout .minimal-home-hero {
    width: 100%;
    transform: translateY(-2.2rem);
  }

  .zdd-home-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1.05rem;

    text-align: center;
    font-size: 0.62rem;
    line-height: 1.4;
    color: var(--zdd-surface-muted, #4a6a78);
    opacity: 0.72;
    user-select: none;
  }

  .zdd-home-footer a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid transparent;
  }

  .zdd-home-footer a:hover {
    border-bottom-color: currentColor;
  }

  body[data-md-color-scheme="slate"] .zdd-home-footer {
    color: var(--zdd-surface-muted, #9fb8c4);
  }

  body.home-layout .minimal-home:has(.minimal-search-results:not([hidden])) .zdd-home-footer,
  body.zdd-minimal-layout.home-layout .minimal-home:has(.minimal-search-results:not([hidden])) .zdd-home-footer {
    display: none;
  }

  body.home-layout.home-search-active .minimal-home,
  body.zdd-minimal-layout.home-layout.home-search-active .minimal-home {
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 1.05rem;
  }

  body.home-layout.home-search-active .minimal-home-hero,
  body.zdd-minimal-layout.home-layout.home-search-active .minimal-home-hero {
    transform: none;
  }

  body.home-layout.home-search-active .minimal-home-line,
  body.zdd-minimal-layout.home-layout.home-search-active .minimal-home-line {
    display: none;
  }
</style>

<section class="minimal-home">
  <div class="minimal-home-hero">
    <h1 class="minimal-home-line"><span id="typing-text">" 去过和没去过的地方 哪里更远 "</span></h1>
    <form class="minimal-search" id="home-search-form">
      <input id="home-search-input" type="search" placeholder="Search or type /help" autocomplete="off" aria-label="搜索文章或输入命令">
    </form>
    <div class="minimal-search-ghost" id="home-search-ghost" aria-hidden="true"></div>
    <div class="minimal-search-results" id="home-search-results"></div>
  </div>

  <div class="zdd-home-footer">
    © 2026 zdd14990's Blog
  </div>
</section>
