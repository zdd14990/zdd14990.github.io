---
title: Isaac Map Lab
description: Generate exact Repentance+ floor layouts from an Isaac seed with the recovered Python pipeline running locally in your browser.
zdd_assets: [isaac-dungeon]
hide:
  - navigation
  - toc
---

<div
  class="zdd-isaac"
  id="zdd-isaac-lab"
  data-worker-url="../../javascripts/isaac-runtime-worker.mjs"
  data-runtime-manifest="../../assets/isaac-runtime.json"
>
  <header class="zdd-isaac-page-intro">
    <h1 id="isaac-map-lab">Isaac Map Lab</h1>
    <p>Generate deterministic <em>The Binding of Isaac: Repentance+</em> floor layouts with the recovered offline generator. Python runs in a browser worker; no seed or map data leaves this page.</p>
  </header>

  <header class="zdd-isaac-hero">
    <div>
      <span class="zdd-isaac-eyebrow">Repentance+ · recovered pipeline</span>
      <h2>Seed to floor, entirely in your browser</h2>
      <p>MAIN 1–8 and ALT 1+–6+, NORMAL or HARD. Unsupported natural Labyrinth / XL runs fail closed instead of approximating a floor.</p>
    </div>
    <div class="zdd-isaac-runtime-badges" aria-label="Runtime characteristics">
      <span>Python</span>
      <span>WebAssembly</span>
      <span>Exact data snapshot</span>
    </div>
  </header>

  <section class="zdd-isaac-controls" aria-labelledby="zdd-isaac-controls-title">
    <div class="zdd-isaac-section-heading">
      <div>
        <span>01</span>
        <h2 id="zdd-isaac-controls-title">Run configuration</h2>
      </div>
      <p>The first run downloads the pinned browser Python runtime. Later runs reuse the browser cache.</p>
    </div>

    <form class="zdd-isaac-form" data-isaac-form>
      <label class="zdd-isaac-field zdd-isaac-seed-field" for="zdd-isaac-seed">
        <span>Seed</span>
        <input id="zdd-isaac-seed" data-isaac-seed type="text" value="B911 99AC" inputmode="text" autocomplete="off" spellcheck="false" maxlength="9" aria-describedby="zdd-isaac-status">
      </label>
      <label class="zdd-isaac-field" for="zdd-isaac-difficulty">
        <span>Difficulty</span>
        <select id="zdd-isaac-difficulty" data-isaac-difficulty>
          <option value="NORMAL">Normal</option>
          <option value="HARD">Hard</option>
        </select>
      </label>
      <label class="zdd-isaac-field" for="zdd-isaac-route">
        <span>Route</span>
        <select id="zdd-isaac-route" data-isaac-route>
          <option value="MAIN">Main</option>
          <option value="ALT">Alternate</option>
        </select>
      </label>
      <label class="zdd-isaac-field" for="zdd-isaac-floor">
        <span>Floor</span>
        <select id="zdd-isaac-floor" data-isaac-floor></select>
      </label>
      <button class="zdd-isaac-button zdd-isaac-button-primary" data-isaac-generate type="submit">
        Generate floor
      </button>
    </form>

    <div class="zdd-isaac-actions">
      <button class="zdd-isaac-button" data-isaac-random type="button">Random valid seed</button>
      <button class="zdd-isaac-button" data-isaac-copy type="button">Copy share link</button>
      <button class="zdd-isaac-button" data-isaac-export type="button" disabled>Export JSON</button>
      <div class="zdd-isaac-examples" aria-label="Seed examples">
        <span>Try</span>
        <button data-isaac-example="B911 99AC" type="button">B911 99AC</button>
      </div>
    </div>

    <div class="zdd-isaac-runtime-status">
      <span class="zdd-isaac-progress" data-isaac-progress hidden aria-hidden="true"></span>
      <p id="zdd-isaac-status" data-isaac-status role="status" aria-live="polite">Ready.</p>
    </div>
  </section>

  <div class="zdd-isaac-workbench">
    <section class="zdd-isaac-map-panel" aria-labelledby="zdd-isaac-map-title">
      <div class="zdd-isaac-section-heading zdd-isaac-map-heading">
        <div>
          <span>02</span>
          <h2 id="zdd-isaac-map-title">Recovered floor</h2>
        </div>
        <div class="zdd-isaac-map-actions">
          <button class="zdd-isaac-button" data-isaac-reveal type="button" aria-pressed="true" disabled>Hide secret rooms</button>
          <button class="zdd-isaac-button" data-isaac-fit type="button">Fit map</button>
        </div>
      </div>

      <div class="zdd-isaac-map-shell">
        <div class="zdd-isaac-placeholder" data-isaac-placeholder>
          <strong>No floor generated yet</strong>
          <span>Choose a route and submit a valid Isaac seed.</span>
        </div>
        <svg class="zdd-isaac-map" data-isaac-map role="group" aria-label="Generated Isaac floor layout" preserveAspectRatio="xMidYMid meet" hidden></svg>
      </div>
      <div class="zdd-isaac-legend" data-isaac-legend aria-label="Room legend"></div>
    </section>

    <aside class="zdd-isaac-sidebar" aria-labelledby="zdd-isaac-details-title">
      <div class="zdd-isaac-section-heading">
        <div>
          <span>03</span>
          <h2 id="zdd-isaac-details-title">Run details</h2>
        </div>
      </div>
      <dl class="zdd-isaac-stats">
        <div><dt>Seed</dt><dd data-isaac-stat="seed">—</dd></div>
        <div><dt>Floor</dt><dd data-isaac-stat="floor">—</dd></div>
        <div><dt>Difficulty</dt><dd data-isaac-stat="difficulty">—</dd></div>
        <div><dt>Rooms shown</dt><dd data-isaac-stat="rooms">—</dd></div>
        <div><dt>Attempts</dt><dd data-isaac-stat="attempts">—</dd></div>
        <div><dt>Boss ID</dt><dd data-isaac-stat="boss">—</dd></div>
        <div><dt>Stage seed</dt><dd data-isaac-stat="stage-seed">—</dd></div>
        <div><dt>Evidence</dt><dd data-isaac-stat="evidence">—</dd></div>
        <div><dt>Profile</dt><dd data-isaac-stat="profile">—</dd></div>
        <div><dt>Runtime</dt><dd data-isaac-stat="runtime">—</dd></div>
      </dl>
      <div class="zdd-isaac-inspector" aria-live="polite">
        <span>Room inspector</span>
        <strong data-isaac-inspector-title>Select a room</strong>
        <p data-isaac-inspector-body>Click, focus, or tap a room to inspect its recovered configuration.</p>
      </div>
    </aside>
  </div>

  <section class="zdd-isaac-trace" aria-labelledby="zdd-isaac-trace-title">
    <div class="zdd-isaac-section-heading">
      <div>
        <span>04</span>
        <h2 id="zdd-isaac-trace-title">Generation attempts</h2>
      </div>
      <p>Accepted and rejected topology attempts from the recovered deterministic pipeline.</p>
    </div>
    <div class="zdd-isaac-table-wrap">
      <table>
        <thead><tr><th>Attempt</th><th>Outcome</th><th>Target rooms</th><th>Level RNG end</th></tr></thead>
        <tbody data-isaac-attempts><tr><td colspan="4">Generate a floor to inspect its trace.</td></tr></tbody>
      </table>
    </div>
  </section>

  <footer class="zdd-isaac-note">
    <strong>Accuracy boundary</strong>
    <p>This page executes the version-locked offline generator from source commit <code>1d04c32</code>. It does not launch the game, read saves, or send seeds to a server.</p>
  </footer>
</div>
