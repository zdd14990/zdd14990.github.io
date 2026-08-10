---
title: Dungeon Seed
description: Generate deterministic dungeon layouts from a seed.
hide:
  - navigation
  - toc
---

# Dungeon Seed

Generate deterministic dungeon layouts from a seed.

<div class="zdd-dungeon" id="zdd-dungeon-lab">
  <section class="zdd-dungeon-seed-panel" aria-labelledby="zdd-dungeon-seed-title">
    <div class="zdd-dungeon-section-heading">
      <div>
        <h2 id="zdd-dungeon-seed-title">Seed</h2>
        <p>A seed always produces the same floor.</p>
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
          <p>Cardinal connections are taken directly from the generator log.</p>
        </div>
        <button class="zdd-lab-button" type="button" data-dungeon-fit>Fit</button>
      </div>
      <div class="zdd-dungeon-map-shell" data-dungeon-map-shell>
        <svg class="zdd-dungeon-map" data-dungeon-map role="group" aria-label="Generated dungeon floor map" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
      <div class="zdd-dungeon-legend" aria-label="Room legend">
        <span data-kind="normal">Normal</span>
        <span data-kind="start">Start</span>
        <span data-kind="boss">Boss</span>
        <span data-kind="treasure">Treasure</span>
        <span data-kind="candidate">Candidate</span>
        <span data-kind="rejected">Rejected</span>
      </div>
    </section>

    <aside class="zdd-dungeon-info-panel" aria-labelledby="zdd-dungeon-info-title">
      <div class="zdd-dungeon-section-heading">
        <div>
          <h2 id="zdd-dungeon-info-title">Floor info</h2>
          <p>Deterministic output from dungeon-core.</p>
        </div>
      </div>
      <dl class="zdd-dungeon-stats">
        <div><dt>Seed</dt><dd data-dungeon-info="seed">-</dd></div>
        <div><dt>Fingerprint</dt><dd data-dungeon-info="fingerprint">-</dd></div>
        <div><dt>Generator</dt><dd data-dungeon-info="generator">-</dd></div>
        <div><dt>Rooms</dt><dd data-dungeon-info="rooms">-</dd></div>
        <div><dt>Dead ends</dt><dd data-dungeon-info="dead-ends">-</dd></div>
        <div><dt>Max distance</dt><dd data-dungeon-info="max-distance">-</dd></div>
      </dl>
      <div class="zdd-dungeon-inspector" data-dungeon-inspector aria-live="polite">
        <span class="zdd-dungeon-inspector-label">Room inspector</span>
        <strong>Select a room</strong>
        <span>Hover, focus, or tap a room to inspect it.</span>
      </div>
    </aside>
  </div>

  <section class="zdd-dungeon-replay" aria-labelledby="zdd-dungeon-replay-title">
    <div class="zdd-dungeon-section-heading">
      <div>
        <h2 id="zdd-dungeon-replay-title">Generation</h2>
        <p>Replay consumes the structured steps returned by the generator.</p>
      </div>
      <label class="zdd-dungeon-speed" for="zdd-dungeon-speed">
        <span>Speed</span>
        <select id="zdd-dungeon-speed" data-dungeon-speed>
          <option value="700">0.5×</option>
          <option value="350" selected>1×</option>
          <option value="175">2×</option>
        </select>
      </label>
    </div>
    <div class="zdd-dungeon-replay-toolbar" aria-label="Generation replay controls">
      <button class="zdd-lab-button" type="button" data-dungeon-first aria-label="First generation step">First</button>
      <button class="zdd-lab-button" type="button" data-dungeon-previous aria-label="Previous generation step">Previous</button>
      <button class="zdd-lab-button zdd-dungeon-play" type="button" data-dungeon-play aria-pressed="false">Play</button>
      <button class="zdd-lab-button" type="button" data-dungeon-next aria-label="Next generation step">Next</button>
      <button class="zdd-lab-button" type="button" data-dungeon-last aria-label="Last generation step">Last</button>
      <button class="zdd-lab-button zdd-dungeon-reset" type="button" data-dungeon-reset>Reset Replay</button>
    </div>
    <div class="zdd-dungeon-timeline">
      <label for="zdd-dungeon-step" data-dungeon-step-label>Step 0 / 0</label>
      <input id="zdd-dungeon-step" data-dungeon-step type="range" min="0" max="0" value="0" step="1">
    </div>
    <div class="zdd-dungeon-step-readout">
      <span class="zdd-dungeon-step-kind" data-dungeon-step-kind>Ready</span>
      <p data-dungeon-step-description role="status" aria-live="polite">Generate a floor to inspect its steps.</p>
    </div>
  </section>
</div>

<script src="../../javascripts/dungeon-core.js" defer></script>
<script src="../../javascripts/dungeon-replay.js" defer></script>
<script src="../../javascripts/dungeon-lab.js" defer></script>
