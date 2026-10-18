// Loading line, running header, statement rail and outline mode for article pages.
(function () {
  "use strict";
  var header = document.querySelector(".md-header");
  var inner = document.querySelector(".md-content__inner");
  var wide = matchMedia("screen and (min-width: 76.25em)");
  var STATEMENTS = ".theorem, .proposition, .prop, .lemma, .corollary, .property, .claim, .collary, .definition, .problem, .example";

  /* Loading line. */
  if (header) {
    var line = document.createElement("div");
    line.className = "zdd-loadline";
    header.appendChild(line);
    var timer = 0;
    document.addEventListener("click", function (event) {
      var a = event.target.closest && event.target.closest("a[href]");
      if (!a || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (a.target && a.target !== "_self") return;
      if (a.origin !== location.origin || a.hasAttribute("download") || /\.(pdf|zip|png|jpe?g)$/i.test(a.pathname)) return;
      if (a.pathname === location.pathname && a.hash) return;
      header.classList.add("is-loading");
      clearTimeout(timer);
      timer = setTimeout(function () { header.classList.remove("is-loading"); }, 10000);
    });
    window.addEventListener("pageshow", function () { header.classList.remove("is-loading"); });
  }

  if (!inner || !document.body.classList.contains("article-layout")) return;

  var opener = inner.querySelector(":scope > .book-opener");
  var headings = [].slice.call(inner.querySelectorAll(":scope > h2, :scope > h3"));
  var statements = [].slice.call(inner.querySelectorAll(":scope > :is(.admonition, details):is(" + STATEMENTS + ")"));

  function headerBottom() { return header ? header.getBoundingClientRect().bottom : 0; }
  function scrollToNode(node, smooth) {
    var top = node.getBoundingClientRect().top - headerBottom() - 24;
    window.scrollBy({top: top, behavior: smooth ? "smooth" : "instant"});
  }

  /* Rail and label room. */
  var rail = document.createElement("div");
  rail.className = "zdd-rail";
  inner.insertBefore(rail, inner.firstChild);
  function layout() {
    var top = opener ? opener.offsetTop + opener.offsetHeight + 24 : 0;
    var end = inner.querySelector(":scope > .zdd-article-end, :scope > footer");
    var bottom = end ? end.offsetTop - 24 : inner.offsetHeight;
    rail.style.setProperty("--rail-top", top + "px");
    rail.style.setProperty("--rail-height", Math.max(0, bottom - top) + "px");
    statements.forEach(function (node) {
      var title = node.querySelector(":scope > .admonition-title, :scope > summary");
      node.style.minHeight = wide.matches && title ? title.offsetHeight + "px" : "";
    });
  }
  layout();
  if (window.ResizeObserver) new ResizeObserver(layout).observe(inner);
  wide.addEventListener("change", layout);
  if (document.fonts) document.fonts.ready.then(layout);

  /* Running header. */
  var run = null;
  var bar = header && header.querySelector(".md-header__inner");
  var title = opener && opener.querySelector("h1");
  if (bar && title) {
    run = document.createElement("nav");
    run.className = "zdd-runhead";
    run.setAttribute("aria-label", "当前位置");
    var titleAnchor = bar.querySelector(".md-header__title");
    bar.insertBefore(run, titleAnchor ? titleAnchor.nextSibling : null);
  }
  function text(node) {
    var clone = node.cloneNode(true);
    clone.querySelectorAll(".book-visually-hidden, .headerlink, .book-secnum").forEach(function (n) { n.remove(); });
    var num = node.querySelector(".book-secnum");
    return (num ? num.textContent.replace(/\s+/g, " ").trim() + " " : "") + clone.textContent.replace(/\s+/g, " ").trim();
  }
  function crumb(label, target, current) {
    var a = document.createElement("a");
    a.textContent = label;
    a.href = target ? "#" + target.id : "#";
    if (current) a.className = "is-current";
    a.addEventListener("click", function (event) {
      event.preventDefault();
      if (target) scrollToNode(target, true);
      else window.scrollTo({top: 0, behavior: "smooth"});
    });
    return a;
  }
  var lastKey = "";
  function updateRun() {
    if (!run) return;
    var limit = headerBottom() + Math.round(innerHeight * 0.3);
    var on = !opener || opener.getBoundingClientRect().bottom < headerBottom() + 28;
    run.classList.toggle("is-on", on);
    var h2 = null, h3 = null;
    headings.forEach(function (h) {
      if (h.offsetParent === null || h.getBoundingClientRect().top > limit) return;
      if (h.tagName === "H2") { h2 = h; h3 = null; } else h3 = h;
    });
    var key = (h2 && h2.id) + "|" + (h3 && h3.id);
    if (key === lastKey) return;
    lastKey = key;
    var series = opener.querySelector(".book-runhead a");
    var parts = [];
    if (series) parts.push([series.textContent.trim(), null]);
    parts.push([text(title), null]);
    if (h2) parts.push([text(h2), h2]);
    if (h3) parts.push([text(h3), h3]);
    run.textContent = "";
    parts.forEach(function (part, i) {
      if (i) {
        var sep = document.createElement("span");
        sep.className = "sep";
        sep.textContent = "/";
        run.appendChild(sep);
      }
      run.appendChild(crumb(part[0], part[1], i === parts.length - 1));
    });
  }
  var queued = false;
  document.addEventListener("scroll", function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; updateRun(); });
  }, {capture: true, passive: true});
  updateRun();

  /* Outline mode. */
  if (headings.length + statements.length < 4) return;
  var items = [].slice.call(inner.querySelectorAll(":scope > h2, :scope > h3, :scope > :is(.admonition, details):is(" + STATEMENTS + ")"));
  var button = document.createElement("button");
  button.type = "button";
  button.className = "zdd-outline-btn";
  button.title = "大纲模式：只看标题与定理（O）";
  button.setAttribute("aria-pressed", "false");
  button.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 4h12M2 8h8M2 12h10"/></svg><span>大纲</span><kbd>O</kbd>';
  document.body.appendChild(button);

  function transition(change) {
    if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) document.startViewTransition(change);
    else change();
  }
  function firstVisible() {
    var limit = headerBottom();
    for (var i = 0; i < items.length; i++) if (items[i].getBoundingClientRect().bottom > limit + 8) return items[i];
    return null;
  }
  function setOutline(on, target) {
    if (document.body.classList.contains("zdd-outline") === on) return;
    var anchor = target || firstVisible();
    var before = anchor ? anchor.getBoundingClientRect().top : 0;
    transition(function () {
      document.body.classList.toggle("zdd-outline", on);
      button.setAttribute("aria-pressed", String(on));
      layout();
      if (!anchor) return;
      if (target && !on) {
        scrollToNode(anchor, false);
        anchor.classList.remove("zdd-flash");
        void anchor.offsetWidth;
        anchor.classList.add("zdd-flash");
      } else {
        window.scrollBy({top: anchor.getBoundingClientRect().top - before, behavior: "instant"});
      }
      lastKey = "";
      updateRun();
    });
  }
  button.addEventListener("click", function () { setOutline(!document.body.classList.contains("zdd-outline")); });
  inner.addEventListener("click", function (event) {
    if (!document.body.classList.contains("zdd-outline")) return;
    var item = items.find(function (node) { return node.contains(event.target); });
    if (!item) return;
    event.preventDefault();
    setOutline(false, item);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "o" && event.key !== "O") return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    var el = document.activeElement;
    if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
    setOutline(!document.body.classList.contains("zdd-outline"));
  });
})();
