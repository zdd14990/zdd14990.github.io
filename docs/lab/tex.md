---
title: LaTeX Playground
description: Write and render a display-math formula with MathJax.
hide:
  - navigation
  - toc
---

# LaTeX Playground

Write a formula and see the display-math result immediately. This reuses the same MathJax setup as the rest of the notebook.

<div class="zdd-lab-tool" id="zdd-tex-playground">
  <div class="zdd-lab-tool-grid">
    <div>
      <label class="zdd-lab-field" for="zdd-tex-input">
        <span>LaTeX input</span>
        <textarea id="zdd-tex-input" spellcheck="false" aria-describedby="zdd-tex-status">\int_0^\infty e^{-x^2}\,dx=\frac{\sqrt{\pi}}{2}</textarea>
      </label>
      <div class="zdd-lab-examples" aria-label="Example formulas">
        <button class="zdd-lab-example" type="button" data-formula="\int_0^\infty e^{-x^2}\,dx=\frac{\sqrt{\pi}}{2}">Gaussian integral</button>
        <button class="zdd-lab-example" type="button" data-formula="e^{i\pi}+1=0">Euler identity</button>
        <button class="zdd-lab-example" type="button" data-formula="\sum_{n=1}^{\infty}\frac{1}{n^2}=\frac{\pi^2}{6}">Basel problem</button>
      </div>
      <div class="zdd-lab-actions">
        <button class="zdd-lab-button" type="button" data-tex-copy>Copy input</button>
        <button class="zdd-lab-button" type="button" data-tex-reset>Reset</button>
      </div>
      <p class="zdd-lab-status-line" id="zdd-tex-status" role="status" aria-live="polite"></p>
    </div>
    <div>
      <div class="zdd-lab-field-label">Rendered display math</div>
      <div class="zdd-lab-output" id="zdd-tex-output" aria-live="polite"></div>
    </div>
  </div>
</div>

<script src="../../javascripts/lab-tex.js" defer></script>
