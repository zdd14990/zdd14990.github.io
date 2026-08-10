---
title: Game of Life
description: A minimal Conway's Game of Life experiment.
hide:
  - navigation
  - toc
---

# Game of Life

Conway's cellular automaton needs only two rules: neighbors determine survival, and three neighbors create new life. Click a cell—or focus the grid and use arrow keys plus <kbd>Space</kbd>—to edit the board.

<div class="zdd-lab-tool" id="zdd-game-of-life">
  <div class="zdd-control-row" aria-label="Simulation controls">
    <button class="zdd-lab-button" type="button" data-life-toggle aria-pressed="false">Start</button>
    <button class="zdd-lab-button" type="button" data-life-step>Single step</button>
    <button class="zdd-lab-button" type="button" data-life-clear>Clear</button>
    <button class="zdd-lab-button" type="button" data-life-random>Randomize</button>
    <button class="zdd-lab-button" type="button" data-life-reset>Reset</button>
    <label class="zdd-range-field" for="zdd-life-speed">
      <span>Speed</span>
      <input id="zdd-life-speed" type="range" min="2" max="12" value="5" step="1">
      <output for="zdd-life-speed" data-life-speed-output>5 fps</output>
    </label>
  </div>
  <div class="zdd-life-stage">
    <canvas class="zdd-life-canvas" width="960" height="600" tabindex="0" data-life-canvas aria-label="Game of Life grid. Use arrow keys to move and Space to toggle a cell."></canvas>
  </div>
  <div class="zdd-life-readout" aria-live="polite">
    <span data-life-generation>Generation 0</span>
    <span data-life-population>Population 0</span>
  </div>
</div>

<script src="../../javascripts/lab-life.js" defer></script>
