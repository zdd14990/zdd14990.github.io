---
title: zddOS
hide:
  - navigation
  - toc
  - footer
---

<div class="zdd-os" data-personal-os-root aria-live="polite">
  <header class="zdd-os__topbar">
    <a class="zdd-os__brand" href="./" data-os-link="library" aria-label="zddOS Library">
      <strong>zddOS</strong>
    </a>
    <a class="zdd-os__mode-switch" href="../">Website <span aria-hidden="true">↗</span></a>
  </header>

  <div class="zdd-os__workspace">
    <aside class="zdd-os__sidebar" aria-label="Personal OS">
      <nav class="zdd-os__nav">
        <button type="button" data-os-view="library"><span aria-hidden="true">▦</span>Library</button>
        <button type="button" data-os-view="search"><span aria-hidden="true">⌕</span>Search</button>
        <button type="button" data-os-view="courses"><span aria-hidden="true">◫</span>Courses</button>
      </nav>
    </aside>

    <main class="zdd-os__main" data-os-content>
      <section class="zdd-os__loading">
        <span class="zdd-os__spinner" aria-hidden="true"></span>
        <p>Connecting to the local knowledge library…</p>
      </section>
    </main>
  </div>

  <div class="zdd-os__command" data-os-command hidden>
    <button class="zdd-os__command-backdrop" type="button" data-os-command-close aria-label="Close search"></button>
    <section class="zdd-os__command-panel" role="dialog" aria-modal="true" aria-label="Search everything">
      <label class="zdd-os__command-input">
        <span aria-hidden="true">⌕</span>
        <input type="search" data-os-command-input placeholder="Search titles, passages, courses, topics…" autocomplete="off">
        <kbd>Esc</kbd>
      </label>
      <div class="zdd-os__command-results" data-os-command-results>
        <p class="zdd-os__empty">Type to search the private passage index.</p>
      </div>
    </section>
  </div>
</div>
