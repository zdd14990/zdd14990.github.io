---
title: Dungeon Seed
description: Generate Isaac-like floors and guess the hidden rooms.
hide:
  - navigation
  - toc
---

# Dungeon Seed

Generate Isaac-like floors and guess the hidden rooms.

<div class="zdd-dungeon" id="zdd-dungeon-lab">
  <section class="zdd-dungeon-seed-panel" aria-labelledby="zdd-dungeon-seed-title">
    <div class="zdd-dungeon-section-heading">
      <div>
        <h2 id="zdd-dungeon-seed-title">Seed</h2>
        <p>The same seed always produces the same classic floor.</p>
      </div>
    </div>
    <form class="zdd-dungeon-seed-form" data-dungeon-form>
      <label class="zdd-dungeon-seed-field" for="zdd-dungeon-seed">
        <span class="zdd-dungeon-visually-hidden">Dungeon seed</span>
        <input id="zdd-dungeon-seed" data-dungeon-seed type="text" value="ZDD14990" autocomplete="off" spellcheck="false" aria-describedby="zdd-dungeon-seed-status">
      </label>
      <button class="zdd-lab-button zdd-dungeon-primary" type="submit">Generate</button>
    </form>
    <div class="zdd-dungeon-seed-actions">
      <button class="zdd-lab-button" type="button" data-dungeon-random>Random Seed</button>
      <button class="zdd-lab-button" type="button" data-dungeon-mutate>Mutate</button>
      <button class="zdd-lab-button" type="button" data-dungeon-copy>Copy Link</button>
    </div>
    <div class="zdd-dungeon-examples" aria-label="Regression seed examples">
      <span>Examples</span>
      <button type="button" data-dungeon-example="ZDD14990">ZDD14990</button>
      <button type="button" data-dungeon-example="ISAAC">ISAAC</button>
      <button type="button" data-dungeon-example="HELLO-WORLD">HELLO-WORLD</button>
    </div>
    <p class="zdd-lab-status-line" id="zdd-dungeon-seed-status" data-dungeon-status role="status" aria-live="polite"></p>
  </section>

  <div class="zdd-dungeon-workbench">
    <section class="zdd-dungeon-map-panel" aria-labelledby="zdd-dungeon-map-title">
      <div class="zdd-dungeon-section-heading">
        <div>
          <h2 id="zdd-dungeon-map-title">Floor map</h2>
          <p data-dungeon-map-caption>Secret rooms and their connections are hidden.</p>
        </div>
        <button class="zdd-lab-button" type="button" data-dungeon-fit>Fit</button>
      </div>
      <div class="zdd-dungeon-map-shell" data-dungeon-map-shell>
        <svg class="zdd-dungeon-map" data-dungeon-map role="group" aria-label="Generated dungeon floor map" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
      <div class="zdd-dungeon-legend" aria-label="Room symbol legend">
        <span data-kind="start"><b>S</b> Start</span>
        <span data-kind="boss"><b>B</b> Boss</span>
        <span data-kind="shop"><b>$</b> Shop</span>
        <span data-kind="treasure"><b>T</b> Treasure</span>
        <span data-kind="curse"><b>C</b> Curse</span>
        <span data-kind="sacrifice"><b>†</b> Sacrifice</span>
        <span data-kind="challenge"><b>!</b> Challenge</span>
        <span data-kind="arcade"><b>A</b> Arcade</span>
        <span data-kind="vault"><b>V</b> Vault</span>
        <span data-kind="library"><b>L</b> Library</span>
        <span data-kind="planetarium"><b>P</b> Planetarium</span>
      </div>
    </section>

    <aside class="zdd-dungeon-info-panel" aria-labelledby="zdd-dungeon-info-title">
      <div class="zdd-dungeon-section-heading">
        <div>
          <h2 id="zdd-dungeon-info-title">Floor info</h2>
          <p>Public map statistics.</p>
        </div>
      </div>
      <dl class="zdd-dungeon-stats">
        <div><dt>Seed</dt><dd data-dungeon-info="seed">-</dd></div>
        <div><dt>Fingerprint</dt><dd data-dungeon-info="fingerprint">-</dd></div>
        <div><dt>Generator</dt><dd data-dungeon-info="generator">-</dd></div>
        <div><dt>Visible rooms</dt><dd data-dungeon-info="visible-rooms">-</dd></div>
        <div><dt>Total rooms</dt><dd data-dungeon-info="total-rooms">-</dd></div>
        <div><dt>Max distance</dt><dd data-dungeon-info="max-distance">-</dd></div>
      </dl>
      <div class="zdd-dungeon-inspector" data-dungeon-inspector aria-live="polite">
        <span class="zdd-dungeon-inspector-label">Room inspector</span>
        <strong>Select a room</strong>
        <span>Hover, focus, or tap a visible room.</span>
      </div>
    </aside>
  </div>

  <section class="zdd-dungeon-guess-panel" aria-labelledby="zdd-dungeon-guess-title">
    <div class="zdd-dungeon-guess-heading">
      <div>
        <h2 id="zdd-dungeon-guess-title">Find the Secret Rooms</h2>
        <p>Choose a mode, then select an empty cell beside the public floor. Answers stay hidden until reveal.</p>
      </div>
      <div class="zdd-dungeon-score" data-dungeon-score hidden aria-live="polite">0 / 2</div>
    </div>

    <div class="zdd-dungeon-guess-controls">
      <div class="zdd-dungeon-guess-modes" aria-label="Guess mode">
        <button class="zdd-lab-button" type="button" data-dungeon-guess-mode="secret" aria-pressed="true">Guess Secret</button>
        <button class="zdd-lab-button" type="button" data-dungeon-guess-mode="super-secret" aria-pressed="false">Guess Super Secret</button>
      </div>
      <div class="zdd-dungeon-guess-readout">
        <span><b>Secret</b><output data-dungeon-guess-output="secret">Not placed</output></span>
        <span><b>Super Secret</b><output data-dungeon-guess-output="super-secret">Not placed</output></span>
      </div>
      <button class="zdd-lab-button zdd-dungeon-reveal" type="button" data-dungeon-reveal>Reveal Rooms</button>
    </div>
    <p class="zdd-dungeon-guess-hint" data-dungeon-guess-hint>Guessing Secret Room. Select any outlined empty cell beside a visible room.</p>

    <div class="zdd-dungeon-results" data-dungeon-results hidden>
      <div class="zdd-dungeon-result-row">
        <strong>Secret Room</strong>
        <span data-dungeon-result="secret">-</span>
      </div>
      <div class="zdd-dungeon-result-row">
        <strong>Super Secret Room</strong>
        <span data-dungeon-result="super-secret">-</span>
      </div>
      <div class="zdd-dungeon-why">
        <h3>Why here?</h3>
        <p data-dungeon-why="secret"></p>
        <p data-dungeon-why="super-secret"></p>
      </div>
    </div>
  </section>
</div>

<script src="../../javascripts/dungeon-core.js" defer></script>
<script src="../../javascripts/dungeon-ui-core.js" defer></script>
<script src="../../javascripts/dungeon-lab.js" defer></script>
