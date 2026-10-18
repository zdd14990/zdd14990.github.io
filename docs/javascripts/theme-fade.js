// Keep the document canvas in sync with Material's body palette on every page,
// and cross-fade the light/dark switch as one snapshot instead of transitioning
// every element's colours (which stalls long pages full of MathJax nodes).
(function () {
  function syncCanvas() {
    var scheme = document.body.getAttribute("data-md-color-scheme");
    document.documentElement.style.setProperty("background", scheme === "slate" ? "#151412" : "#f4f1ea", "important");
    document.documentElement.style.colorScheme = scheme === "slate" ? "dark" : "light";
  }
  syncCanvas();
  new MutationObserver(syncCanvas).observe(document.body, {attributes: true, attributeFilter: ["data-md-color-scheme"]});

  var switching = false;

  function waitForScheme(before) {
    return new Promise(function (resolve) {
      var observer;
      var timer;
      var done = function () { observer.disconnect(); clearTimeout(timer); resolve(); };
      observer = new MutationObserver(function () {
        if (document.body.getAttribute("data-md-color-scheme") !== before) done();
      });
      timer = setTimeout(done, 400);
      observer.observe(document.body, {attributes: true, attributeFilter: ["data-md-color-scheme"]});
    });
  }

  document.addEventListener(
    "click",
    function (event) {
      var label = event.target.closest && event.target.closest(".md-header__option label[for]");
      if (!label || switching || typeof document.startViewTransition !== "function") return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      var input = document.getElementById(label.htmlFor);
      if (!input) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      switching = true;
      var before = document.body.getAttribute("data-md-color-scheme");
      var update = function () {
        var changed = waitForScheme(before);
        input.click();
        return changed;
      };
      var transition;
      try {
        transition = document.startViewTransition({update: update, types: ["theme"]});
      } catch (error) {
        transition = document.startViewTransition(update);
      }
      transition.finished.finally(function () { switching = false; });
    },
    true
  );
})();
