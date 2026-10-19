// Blog catalog: each top-level folder opens onto a shelf of book covers; a cover
// opens that book's contents under its row. Esc, the cross, the end rule or the
// cover itself closes it. /blog/#<book> opens a book directly.
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  function years(meta) {
    var found = meta.match(/\d{4}(?=-\d\d-\d\d)/g) || [];
    if (!found.length) return "";
    var first = found[0], last = found[found.length - 1];
    return first === last ? first : first + "\u2013" + last.slice(2);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function splitMeta(meta) {
    // keep "5 册 · 32 篇" on small screens, hide the dates and word count
    var match = /^((?:\d+ 册 · )?\d+ 篇)(.*)$/.exec(meta.textContent.trim());
    if (!match) return;
    meta.textContent = "";
    meta.appendChild(el("span", "", match[1]));
    meta.appendChild(el("span", "zdd-folder-meta-rest", match[2]));
  }

  function cover(book, index, name, meta) {
    var button = el("button", "zdd-cover");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", name + "，" + meta + "，展开目录");
    button.appendChild(el("span", "zdd-cover-kicker", "Vol. " + String(index + 1).padStart(2, "0")));
    button.appendChild(el("span", "zdd-cover-title", name));
    button.appendChild(el("span", "zdd-cover-rule"));
    var foot = el("span", "zdd-cover-foot");
    var count = el("span", "zdd-cover-count", (meta.match(/^(\d+)/) || [, ""])[1]);
    count.appendChild(el("small", "", "篇"));
    foot.appendChild(count);
    foot.appendChild(el("span", "zdd-cover-year", years(meta)));
    button.appendChild(foot);
    button.appendChild(el("span", "zdd-cover-notch"));
    return button;
  }

  function contents(book, name, meta, close) {
    var content = book.querySelector(":scope > .zdd-folder-content");
    var head = el("header", "zdd-book-head");
    head.appendChild(el("b", "", name));
    head.appendChild(el("span", "", meta));
    var cross = el("button", "zdd-book-close");
    cross.type = "button";
    cross.title = "合上 (Esc)";
    cross.setAttribute("aria-label", "合上《" + name + "》");
    cross.addEventListener("click", close);
    head.appendChild(cross);
    content.insertBefore(head, content.firstChild);
    var cards = book.querySelectorAll(".zdd-post-card");
    if (cards.length > 4) {
      var foot = el("footer", "zdd-book-foot");
      var end = el("button", "zdd-book-end", "合上");
      end.type = "button";
      end.addEventListener("click", close);
      foot.appendChild(end);
      content.appendChild(foot);
    }
    book.querySelectorAll(".zdd-post-card .zdd-post-title").forEach(function (title, i) {
      title.dataset.vol = String(i + 1).padStart(2, "0");
    });
  }

  function shelve(folder) {
    var body = folder.querySelector(":scope > .zdd-folder-content > div");
    if (!body) return null;
    var books = [].slice.call(body.querySelectorAll(':scope > .zdd-catalog-folder[data-level="1"]'));
    if (!books.length) return null;
    folder.classList.add("is-shelved");
    var shelf = el("div", "zdd-shelf");
    body.insertBefore(shelf, body.firstChild);
    var current = -1;

    function place() {
      if (current < 0) return;
      var entry = entries[current], top = entry.button.offsetTop, last = entry.button;
      entries.forEach(function (other) { if (other.button.offsetTop === top) last = other.button; });
      if (last.nextSibling !== entry.book) shelf.insertBefore(entry.book, last.nextSibling);
    }
    function close(focus) {
      if (current < 0) return;
      var entry = entries[current];
      current = -1;
      entry.button.setAttribute("aria-expanded", "false");
      entry.book.open = false;
      entry.book.classList.remove("is-open-book", "is-entering");
      body.appendChild(entry.book);
      if (focus) entry.button.focus();
    }
    function open(index, animate) {
      close(false);
      current = index;
      var entry = entries[index];
      entry.button.setAttribute("aria-expanded", "true");
      entry.book.classList.add("is-open-book");
      if (animate && !reduce.matches) {
        entry.book.classList.add("is-entering");
        setTimeout(function () { entry.book.classList.remove("is-entering"); }, 400);
      }
      place();
      entry.book.open = true;
      if (entry.book.id && history.replaceState) history.replaceState(null, "", "#" + entry.book.id);
      var top = entry.book.getBoundingClientRect().top;
      if (animate && top > innerHeight - 120) scrollBy({ top: top - innerHeight + 260, behavior: reduce.matches ? "auto" : "smooth" });
    }

    var entries = books.map(function (book, index) {
      var name = book.querySelector(":scope > summary .zdd-folder-name").textContent.trim();
      var meta = book.querySelector(":scope > summary .zdd-folder-meta").textContent.trim();
      var button = cover(book, index, name, meta);
      shelf.appendChild(button);
      contents(book, name, meta, function () { close(true); });
      button.addEventListener("click", function () { if (current === index) close(false); else open(index, true); });
      return { button: button, book: book };
    });
    return { folder: folder, entries: entries, open: open, close: close, place: place };
  }

  function init() {
    var catalog = document.querySelector(".zdd-blog-catalog");
    if (!catalog || catalog.dataset.shelved) return;
    catalog.dataset.shelved = "1";
    catalog.querySelectorAll(':scope > .zdd-catalog-folder[data-level="0"] > summary .zdd-folder-meta').forEach(splitMeta);
    var shelves = [].map.call(catalog.querySelectorAll(':scope > .zdd-catalog-folder[data-level="0"]'), shelve).filter(Boolean);
    addEventListener("resize", function () { shelves.forEach(function (s) { s.place(); }); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") shelves.forEach(function (s) { s.close(true); });
    });
    var target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    shelves.forEach(function (s) {
      s.entries.forEach(function (entry, index) {
        if (entry.book !== target) return;
        s.folder.open = true;
        s.open(index, false);
        requestAnimationFrame(function () { entry.button.scrollIntoView({ block: "center" }); });
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
