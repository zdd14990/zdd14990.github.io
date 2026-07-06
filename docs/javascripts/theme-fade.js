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