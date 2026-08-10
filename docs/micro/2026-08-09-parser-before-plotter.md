---
title: Parse before plotting
date: 2026-08-09
tags:
  - javascript
  - tooling
---

For a tiny function plotter, a small recursive-descent parser is enough for numbers, `x`, common functions, and arithmetic operators.

The useful constraint is simple: turn the expression into a syntax tree first; never send user input to `eval()`.
