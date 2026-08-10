---
title: Function Plotter
description: Plot common one-variable functions without eval().
hide:
  - navigation
  - toc
---

# Function Plotter

Plot a real-valued function of (x). The parser supports arithmetic, powers, `pi`, `e`, and common functions such as `sin`, `cos`, `sqrt`, `abs`, `exp`, and `log`—without using `eval()`.

<div class="zdd-lab-tool" id="zdd-function-plotter">
  <form data-plot-form>
    <div class="zdd-lab-field">
      <label for="zdd-plot-expression">Expression</label>
      <input id="zdd-plot-expression" type="text" value="sin(x)" spellcheck="false" autocomplete="off" aria-describedby="zdd-plot-status">
    </div>
    <div class="zdd-control-row">
      <label class="zdd-range-field" for="zdd-plot-range">
        <span>Range</span>
        <input id="zdd-plot-range" type="range" min="2" max="20" value="10" step="1">
        <output for="zdd-plot-range" data-plot-range-output>±10</output>
      </label>
      <button class="zdd-lab-button" type="submit">Draw</button>
      <button class="zdd-lab-button" type="button" data-plot-reset>Reset</button>
    </div>
    <div class="zdd-lab-examples" aria-label="Example functions">
      <button class="zdd-lab-example" type="button" data-expression="sin(x)">sin(x)</button>
      <button class="zdd-lab-example" type="button" data-expression="x^2">x²</button>
      <button class="zdd-lab-example" type="button" data-expression="exp(-x^2)">Gaussian</button>
      <button class="zdd-lab-example" type="button" data-expression="sin(x)/x">sinc</button>
    </div>
    <p class="zdd-lab-status-line" id="zdd-plot-status" role="status" aria-live="polite"></p>
  </form>
  <div class="zdd-plot-stage">
    <canvas width="900" height="480" data-plot-canvas aria-label="Cartesian plot of the current expression"></canvas>
  </div>
  <div class="zdd-plot-readout" aria-live="polite">
    <span data-plot-summary>y = sin(x)</span>
    <span>Scroll the range slider to zoom.</span>
  </div>
</div>

<script src="../../javascripts/lab-plot.js" defer></script>
