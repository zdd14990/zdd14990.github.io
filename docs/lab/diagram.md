---
title: Commutative Diagram
description: Build commutative diagrams visually and export TikZ-CD.
hide:
  - navigation
  - toc
---

# Commutative Diagram

Build visually. Export as TikZ-CD.

<div class="zdd-diagram" id="zdd-diagram-editor">
  <div class="zdd-diagram-toolbar" aria-label="Diagram controls">
    <label class="zdd-diagram-example-picker" for="zdd-diagram-example">
      <span>Example</span>
      <select id="zdd-diagram-example" data-diagram-example>
        <option value="">Choose…</option>
        <option value="square">Square</option>
        <option value="triangle">Triangle</option>
        <option value="pullback">Pullback</option>
        <option value="exact">Exact sequence</option>
      </select>
    </label>
    <div class="zdd-diagram-toolbar-actions">
      <button class="zdd-lab-button" type="button" data-diagram-add-row>Add row</button>
      <button class="zdd-lab-button" type="button" data-diagram-add-col>Add column</button>
      <button class="zdd-lab-button" type="button" data-diagram-clear>Clear</button>
      <button class="zdd-lab-button" type="button" data-diagram-reset>Reset</button>
    </div>
  </div>

  <div class="zdd-diagram-workbench">
    <section class="zdd-diagram-canvas-panel" aria-labelledby="zdd-diagram-canvas-title">
      <div class="zdd-diagram-section-heading">
        <h2 id="zdd-diagram-canvas-title">Diagram canvas</h2>
        <span data-diagram-size>5 × 5</span>
      </div>
      <div class="zdd-diagram-stage" data-diagram-stage>
        <div class="zdd-diagram-surface" data-diagram-surface>
          <div class="zdd-diagram-grid" data-diagram-grid role="grid" aria-label="Commutative diagram grid"></div>
          <svg class="zdd-diagram-svg" data-diagram-svg aria-label="Diagram arrows"></svg>
        </div>
      </div>
      <p class="zdd-diagram-hint">Click an empty cell to add an object. Select an object, choose Connect, then select its target.</p>
      <p class="zdd-lab-status-line" data-diagram-status role="status" aria-live="polite"></p>
    </section>

    <aside class="zdd-diagram-inspector" aria-labelledby="zdd-diagram-inspector-title">
      <div class="zdd-diagram-section-heading">
        <h2 id="zdd-diagram-inspector-title">Inspector</h2>
      </div>
      <div data-diagram-inspector></div>
      <div class="zdd-diagram-edge-list-wrap">
        <h3>Arrows</h3>
        <div class="zdd-diagram-edge-list" data-diagram-edge-list></div>
      </div>
    </aside>
  </div>

  <section class="zdd-diagram-code-panel" aria-labelledby="zdd-diagram-code-title">
    <div class="zdd-diagram-section-heading">
      <h2 id="zdd-diagram-code-title">TikZ-CD</h2>
      <div class="zdd-diagram-code-actions">
        <button class="zdd-lab-button" type="button" data-diagram-import-open>Import</button>
        <button class="zdd-lab-button" type="button" data-diagram-copy>Copy TikZ-CD</button>
      </div>
    </div>
    <pre class="zdd-diagram-code"><code data-diagram-output></code></pre>
    <p class="zdd-lab-status-line" data-diagram-copy-status role="status" aria-live="polite"></p>
  </section>

  <dialog class="zdd-diagram-import" data-diagram-import-dialog aria-labelledby="zdd-diagram-import-title">
    <form method="dialog" data-diagram-import-form>
      <div class="zdd-diagram-section-heading">
        <h2 id="zdd-diagram-import-title">Import TikZ-CD</h2>
        <button class="zdd-diagram-close" type="button" data-diagram-import-close aria-label="Close import dialog">×</button>
      </div>
      <label class="zdd-lab-field" for="zdd-diagram-import-source">
        <span>TikZ-CD source</span>
        <textarea id="zdd-diagram-import-source" data-diagram-import-source spellcheck="false"></textarea>
      </label>
      <p class="zdd-diagram-import-note">Supports grid cells, directions, labels, dashed, hook, two heads, equals, and fixed bends.</p>
      <p class="zdd-lab-status-line" data-diagram-import-error role="alert"></p>
      <div class="zdd-lab-actions">
        <button class="zdd-lab-button" type="button" data-diagram-import-close>Cancel</button>
        <button class="zdd-lab-button" type="submit">Import diagram</button>
      </div>
    </form>
  </dialog>
</div>

<script src="../../javascripts/diagram-core.js" defer></script>
<script src="../../javascripts/diagram-editor.js" defer></script>
