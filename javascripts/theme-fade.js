// Keep the document canvas in sync with Material's body palette on every page.
(function () {
  function syncCanvas() {
    var scheme = document.body.getAttribute("data-md-color-scheme");
    document.documentElement.style.setProperty("background", scheme === "slate" ? "#101924" : "#eaf5fb", "important");
    document.documentElement.style.colorScheme = scheme === "slate" ? "dark" : "light";
  }
  syncCanvas();
  new MutationObserver(syncCanvas).observe(document.body, {attributes: true, attributeFilter: ["data-md-color-scheme"]});
})();

document.addEventListener(
  "click",
  function (event) {
    const target = event.target.closest(
      ".md-header__option label, .md-header__option input, [data-md-component='palette']"
    );

    if (!target) return;

    const root = document.documentElement;
    const body = document.body;

    const scheme =
      body.getAttribute("data-md-color-scheme") ||
      root.getAttribute("data-md-color-scheme");

    const currentBg = scheme === "slate" ? "#101924" : "#eaf5fb";

    root.style.setProperty("--zdd-theme-fade-bg", currentBg);

    root.classList.remove("zdd-theme-fading");

    void root.offsetWidth;

    root.classList.add("zdd-theme-fading");

    window.setTimeout(function () {
      root.classList.remove("zdd-theme-fading");
    }, 260);
  },
  true
);
