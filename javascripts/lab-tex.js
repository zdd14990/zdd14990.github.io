(function() {
  "use strict";

  var DEFAULT_FORMULA = "\\int_0^\\infty e^{-x^2}\\,dx=\\frac{\\sqrt{\\pi}}{2}";

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function(character) {
      return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[character];
    });
  }

  function init() {
    var root = document.getElementById("zdd-tex-playground");
    if (!root || root.dataset.zddReady === "1") return;
    root.dataset.zddReady = "1";

    var input = root.querySelector("#zdd-tex-input");
    var output = root.querySelector("#zdd-tex-output");
    var status = root.querySelector("#zdd-tex-status");
    var copyButton = root.querySelector("[data-tex-copy]");
    var resetButton = root.querySelector("[data-tex-reset]");
    var timer = 0;
    var renderVersion = 0;

    function setStatus(message, state) {
      status.textContent = message || "";
      status.dataset.state = state || "ready";
    }

    function rememberFormula(formula) {
      if (!window.history || !window.history.replaceState || formula.length > 1600) return;
      var url = new URL(window.location.href);
      if (formula && formula !== DEFAULT_FORMULA) url.searchParams.set("formula", formula);
      else url.searchParams.delete("formula");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }

    function render() {
      var formula = input.value.trim();
      var version = ++renderVersion;
      window.clearTimeout(timer);
      rememberFormula(formula);

      if (!formula) {
        output.textContent = "Enter a formula to begin.";
        setStatus("Formula is empty.", "error");
        return;
      }

      if (!window.MathJax || !window.MathJax.typesetPromise) {
        output.textContent = formula;
        setStatus("MathJax is still loading…", "ready");
        timer = window.setTimeout(render, 180);
        return;
      }

      if (window.MathJax.typesetClear) window.MathJax.typesetClear([output]);
      output.innerHTML = '<span class="arithmatex">\\[' + escapeHtml(formula) + "\\]</span>";
      setStatus("Rendering…", "ready");
      window.MathJax.typesetPromise([output]).then(function() {
        if (version !== renderVersion) return;
        var mathError = output.querySelector("mjx-merror, .mjx-merror");
        setStatus(mathError ? "MathJax could not parse this formula." : "Rendered.", mathError ? "error" : "ready");
      }).catch(function(error) {
        if (version !== renderVersion) return;
        output.textContent = formula;
        setStatus(error && error.message ? error.message : "Unable to render this formula.", "error");
      });
    }

    function scheduleRender() {
      window.clearTimeout(timer);
      timer = window.setTimeout(render, 130);
    }

    function copyInput() {
      var formula = input.value;
      var task;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        task = navigator.clipboard.writeText(formula);
      } else {
        input.focus();
        input.select();
        task = Promise.resolve(document.execCommand("copy"));
      }
      task.then(function() {
        setStatus("Copied to clipboard.", "ready");
      }).catch(function() {
        setStatus("Copy failed. Select the input and copy it manually.", "error");
      });
    }

    root.querySelectorAll("[data-formula]").forEach(function(button) {
      button.addEventListener("click", function() {
        input.value = button.getAttribute("data-formula") || "";
        render();
        input.focus();
      });
    });
    input.addEventListener("input", scheduleRender);
    copyButton.addEventListener("click", copyInput);
    resetButton.addEventListener("click", function() {
      input.value = DEFAULT_FORMULA;
      render();
      input.focus();
    });

    var formulaFromUrl = new URLSearchParams(window.location.search).get("formula");
    if (formulaFromUrl) input.value = formulaFromUrl;
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
