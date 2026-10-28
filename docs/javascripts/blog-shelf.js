// Blog catalog as a library: each shelf is a full-width strip; clicking it unfolds
// the shelf's book covers in place, under the strip. A cover opens the book's
// contents under its row. Esc closes the book, then the shelf. Into an article
// from its card the card slides away while the page cross-fades, and back again.
// /blog/#<shelf> and /blog/#<book> deep-link.
// Without this script the catalog stays nested <details>.
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var RETURN_KEY = "zdd.blog-return";
  var ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M6 2.5 11.5 8 6 13.5"/></svg>';

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function years(meta) {
    var found = meta.match(/\d{4}(?=-\d\d-\d\d)/g) || [];
    if (!found.length) return "";
    var first = found[0], last = found[found.length - 1];
    return first === last ? first : first + "\u2013" + last.slice(2);
  }
  function splitMeta(meta) {
    // "5 册 · 32 篇 · 2025-11-19 - 2026-10-14 · 113,289 字" -> counts, rest
    var match = /^((?:\d+ 册 · )?\d+ 篇)(?: · )?(.*)$/.exec(meta.trim());
    return match ? [match[1], match[2].replace(/ - /, " \u2013 ")] : [meta, ""];
  }
  function path(url) { return new URL(url, location.href).pathname.replace(/index\.html$/, ""); }

  // ---- view-transition names: a lead that slides sideways, the rest parting around it
  var named = [];
  function name(node, id, kind) {
    if (!node) return;
    node.style.viewTransitionName = id;
    node.style.setProperty("view-transition-class", kind);
    named.push(node);
  }
  function unname() {
    named.forEach(function (node) {
      node.style.removeProperty("view-transition-name");
      node.style.removeProperty("view-transition-class");
    });
    named = [];
  }
  function visible(node) {
    var box = node.getBoundingClientRect();
    return box.bottom > 0 && box.top < innerHeight && box.height > 0;
  }
  // Only the clicked row moves (a short slide to the left); the page around it
  // simply cross-fades.
  function part(lead, others, prefix) {
    if (visible(lead)) name(lead, prefix + "-lead", "zdd-leads");
  }


  // ---- cover motifs: one line drawing per shelf subject, varied per book by a
  // seed from its title, so every cover differs but a shelf reads as a set
  function seeded(text) {
    var h = 2166136261;
    for (var i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () {
      h += 0x6D2B79F5;
      var t = Math.imul(h ^ (h >>> 15), 1 | h);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function f1(n) { return Math.round(n * 10) / 10; }
  var MOTIFS = {
    // graphs of smooth functions and one tangent
    analysis: function (r) {
      var out = "", k = 1 + Math.floor(r() * 3), a = 10 + r() * 8;
      for (var c = 0; c < 3; c++) {
        var d = "";
        for (var x = 0; x <= 100; x += 4) d += (x ? "L" : "M") + x + " " + f1(40 - c * 6 - a * Math.sin((x / 100) * Math.PI * k + c * 0.8) * (1 - c * 0.25));
        out += '<path d="' + d + '"' + (c ? ' opacity="' + (0.55 - c * 0.15) + '"' : "") + "/>";
      }
      var t = 20 + r() * 60, y = 40 - a * Math.sin((t / 100) * Math.PI * k), s = -a * Math.cos((t / 100) * Math.PI * k) * Math.PI * k / 100;
      out += '<path class="is-accent" d="M' + f1(t - 22) + " " + f1(y - 22 * s) + "L" + f1(t + 22) + " " + f1(y + 22 * s) + '"/>';
      return out + '<circle class="is-accent-fill" cx="' + f1(t) + '" cy="' + f1(y) + '" r="1.8"/>';
    },
    // a lattice of objects and arrows, one square marked as commuting
    algebra: function (r) {
      var out = "", cols = 3 + Math.floor(r() * 2), gap = 84 / (cols - 1);
      for (var i = 0; i < cols; i++) for (var j = 0; j < 3; j++) {
        var x = 8 + i * gap, y = 12 + j * 24;
        out += '<circle cx="' + f1(x) + '" cy="' + y + '" r="1.6" class="is-fill"/>';
        if (i < cols - 1 && r() > 0.25) out += '<path d="M' + f1(x + 4) + " " + y + "H" + f1(x + gap - 4) + '" marker-end="url(#zdd-arrow)"/>';
        if (j < 2 && r() > 0.35) out += '<path d="M' + f1(x) + " " + (y + 4) + "V" + (y + 20) + '" marker-end="url(#zdd-arrow)"/>';
      }
      var ci = Math.floor(r() * (cols - 1)), cj = Math.floor(r() * 2);
      return out + '<path class="is-accent" d="M' + f1(8 + ci * gap + gap / 2 - 3) + " " + (24 + cj * 24) + 'a3 3 0 1 1 3 3"/>';
    },
    // random walks fanning out from one start; one of them inked in red
    "probability-statistics": function (r) {
      var out = "", paths = 7, steps = 50, accent = Math.floor(r() * paths);
      for (var k = 0; k < paths; k++) {
        var y = 40, d = "M4 40";
        for (var i = 1; i <= steps; i++) {
          y += (r() - 0.5) * 7;
          y = Math.max(4, Math.min(76, y));
          d += "L" + f1(4 + i * 1.84) + " " + f1(y);
        }
        out += k === accent
          ? '<path class="is-accent" d="' + d + '"/><circle class="is-accent-fill" cx="96" cy="' + f1(y) + '" r="1.8"/>'
          : '<path d="' + d + '" opacity="' + f1(0.35 + r() * 0.35) + '"/><circle class="is-fill" cx="96" cy="' + f1(y) + '" r="1"/>';
      }
      return out + '<circle class="is-fill" cx="4" cy="40" r="1.8"/>';
    },
    // a phase portrait: trajectories spiralling into a stable focus
    "applied-math": function (r) {
      var out = "", cx = 44 + r() * 12, cy = 38 + r() * 4;
      // x' = a x - b y, y' = b x + a y, stepped finely; about two turns to the focus
      var a = -0.14 - r() * 0.06, b = (r() > 0.5 ? 1 : -1) * (0.55 + r() * 0.2), turn = r() * Math.PI * 2, h = 0.08;
      for (var k = 0; k < 7; k++) {
        var t = turn + k * Math.PI * 2 / 7, x = Math.cos(t) * 30, y = Math.sin(t) * 30, d = "";
        for (var i = 0; i < 400 && x * x + y * y > 6; i++) {
          if (i % 3 === 0) d += (i ? "L" : "M") + f1(cx + x) + " " + f1(cy + y * 0.95);
          var nx = x + h * (a * x - b * y), ny = y + h * (b * x + a * y);
          x = nx; y = ny;
        }
        out += '<path d="' + d + '"' + (k === 0 ? ' class="is-accent"' : ' opacity="' + f1(0.35 + (k % 3) * 0.15) + '"') + "/>";
      }
      return '<clipPath id="zdd-cover-clip"><rect width="100" height="80"/></clipPath><g clip-path="url(#zdd-cover-clip)">' + out + '</g>'
        + '<circle class="is-accent-fill" cx="' + f1(cx) + '" cy="' + f1(cy) + '" r="2"/>';
    },
    // a block of cipher bits with one key column picked out
    cryptography: function (r) {
      var out = "", key = Math.floor(r() * 10);
      for (var i = 0; i < 10; i++) for (var j = 0; j < 7; j++) if (r() > 0.45 || i === key)
        out += '<rect' + (i === key ? ' class="is-accent-fill"' : ' class="is-fill"') + ' x="' + (i * 10 + 2) + '" y="' + (j * 11 + 2) + '" width="6" height="7"/>';
      return out;
    },
    // field lines between two charges
    physics: function (r) {
      var out = "", ax = 25 + r() * 10, bx = 65 + r() * 10, y = 40;
      for (var k = -3; k <= 3; k++) if (k) out += '<path d="M' + f1(ax) + " " + y + "C" + f1(ax + 10) + " " + f1(y + k * 13) + " " + f1(bx - 10) + " " + f1(y + k * 13) + " " + f1(bx) + " " + y + '"' + (Math.abs(k) > 2 ? ' opacity=".45"' : "") + "/>";
      return out + '<circle class="is-accent-fill" cx="' + f1(ax) + '" cy="' + y + '" r="3"/><circle cx="' + f1(bx) + '" cy="' + y + '" r="3" class="is-fill"/>';
    },
    // a constellation: scattered stars joined by one path, one star in red
    misc: function (r) {
      var stars = [], out = "", n = 8 + Math.floor(r() * 4);
      for (var i = 0; i < n; i++) stars.push([8 + r() * 84, 6 + r() * 68, 0.6 + r() * 1.6]);
      // join them nearest-first from the leftmost star
      stars.sort(function (p, q) { return p[0] - q[0]; });
      var left = stars.slice(1), cur = stars[0], d = "M" + f1(cur[0]) + " " + f1(cur[1]), linked = 5 + Math.floor(r() * 3);
      for (var j = 0; j < linked && left.length; j++) {
        left.sort(function (p, q) { return Math.hypot(p[0] - cur[0], p[1] - cur[1]) - Math.hypot(q[0] - cur[0], q[1] - cur[1]); });
        cur = left.shift();
        d += "L" + f1(cur[0]) + " " + f1(cur[1]);
      }
      out += '<path d="' + d + '" opacity=".55"/>';
      var bright = Math.floor(r() * n);
      stars.forEach(function (p, i) {
        out += i === bright
          ? '<circle class="is-accent-fill" cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="2.4"/><circle class="is-accent" cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="4.6" opacity=".5"/>'
          : '<circle class="is-fill" cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="' + f1(p[2]) + '"/>';
      });
      return out;
    }
  };
  function motif(shelf, title) {
    var draw = MOTIFS[shelf] || MOTIFS.misc;
    var span = el("span", "zdd-cover-motif");
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = '<svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">'
      + '<defs><marker id="zdd-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="currentColor"/></marker></defs>'
      + draw(seeded(shelf + ":" + title)) + "</svg>";
    return span;
  }

  // ---- book covers and contents (inside a shelf view)
  function cover(index, title, meta, shelf) {
    var button = el("button", "zdd-cover");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", title + "，" + meta + "，展开目录");
    button.appendChild(el("span", "zdd-cover-kicker", "Vol. " + pad(index + 1)));
    button.appendChild(el("span", "zdd-cover-title", title));
    button.appendChild(el("span", "zdd-cover-rule"));
    button.appendChild(motif(shelf, title));
    var foot = el("span", "zdd-cover-foot");
    var count = el("span", "zdd-cover-count", (meta.match(/^(\d+)/) || [, ""])[1]);
    count.appendChild(el("small", "", "篇"));
    foot.appendChild(count);
    foot.appendChild(el("span", "zdd-cover-year", years(meta)));
    button.appendChild(foot);
    button.appendChild(el("span", "zdd-cover-notch"));
    return button;
  }
  function contents(book, title, meta, close) {
    var content = book.querySelector(":scope > .zdd-folder-content");
    var head = el("header", "zdd-book-head");
    head.appendChild(el("b", "", title));
    head.appendChild(el("span", "", meta.replace(/ - /, " \u2013 ")));
    var cross = el("button", "zdd-book-close");
    cross.type = "button";
    cross.title = "合上 (Esc)";
    cross.setAttribute("aria-label", "合上《" + title + "》");
    cross.addEventListener("click", close);
    head.appendChild(cross);
    content.insertBefore(head, content.firstChild);
    if (book.querySelectorAll(".zdd-post-card").length > 4) {
      var foot = el("footer", "zdd-book-foot");
      var end = el("button", "zdd-book-end", "合上");
      end.type = "button";
      end.addEventListener("click", close);
      foot.appendChild(end);
      content.appendChild(foot);
    }
    book.querySelectorAll(".zdd-post-card .zdd-post-title").forEach(function (t, i) { t.dataset.vol = pad(i + 1); });
  }

  function Shelf(folder, index) {
    var self = this;
    var summary = folder.querySelector(":scope > summary");
    this.key = folder.id || folder.dataset.shelf || ("shelf-" + pad(index + 1));
    this.title = summary.querySelector(".zdd-folder-name").textContent.trim();
    var meta = splitMeta(summary.querySelector(".zdd-folder-meta").textContent);
    var books = [].slice.call(folder.querySelectorAll(':scope > .zdd-folder-content > div > .zdd-catalog-folder[data-level="1"]'));

    // the strip
    var strip = this.strip = el("a", "zdd-strip");
    strip.href = "#" + this.key;
    strip.dataset.shelf = this.key;
    strip.setAttribute("aria-expanded", "false");
    strip.setAttribute("aria-controls", "shelf-" + this.key);
    var head = el("span", "zdd-strip-head");
    head.appendChild(el("span", "zdd-strip-name", "No. " + pad(index + 1)));
    head.appendChild(el("span", "zdd-strip-meta", meta[0]));
    strip.appendChild(head);
    var zone = el("span", "zdd-strip-zone");
    var names = books.map(function (b) { return b.querySelector(":scope > summary .zdd-folder-name").textContent.trim(); });
    zone.appendChild(el("span", "zdd-strip-title", this.title));
    var desc = el("span", "zdd-strip-desc");
    desc.appendChild(el("span", "zdd-strip-books", names.join(" \u00b7 ")));
    desc.appendChild(el("span", "zdd-strip-figures", meta[1]));
    zone.appendChild(desc);
    strip.appendChild(zone);
    var chevron = el("span", "zdd-strip-chevron");
    chevron.innerHTML = ARROW;
    strip.appendChild(chevron);

    // its covers, unfolding in place under the strip
    var panel = this.panel = el("div", "zdd-shelf-panel");
    panel.id = "shelf-" + this.key;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-label", this.title);
    panel.inert = true;
    var inner = el("div", "zdd-shelf-panel-inner");
    var grid = this.grid = el("div", "zdd-shelf");
    inner.appendChild(grid);
    var parked = this.parked = el("div", "zdd-books-parked");
    inner.appendChild(parked);
    panel.appendChild(inner);

    this.isOpen = false;
    this.current = -1;
    this.entries = books.map(function (book, i) {
      var t = book.querySelector(":scope > summary .zdd-folder-name").textContent.trim();
      var m = book.querySelector(":scope > summary .zdd-folder-meta").textContent.trim();
      var button = cover(i, t, m, self.key);
      grid.appendChild(button);
      parked.appendChild(book);
      contents(book, t, m, function () { self.closeBook(true); });
      button.addEventListener("click", function () {
        if (self.current === i) self.closeBook(false);
        else self.openBook(i, true);
      });
      return { button: button, book: book };
    });
    folder.hidden = true;
  }
  Shelf.prototype.setOpen = function (open) {
    this.isOpen = open;
    this.strip.classList.toggle("is-open", open);
    this.strip.setAttribute("aria-expanded", String(open));
    this.panel.classList.toggle("is-open", open);
    this.panel.inert = !open;
    if (!open) this.closeBook(false);
  };
  Shelf.prototype.place = function () {
    if (this.current < 0) return;
    var entry = this.entries[this.current], top = entry.button.offsetTop, last = entry.button;
    this.entries.forEach(function (other) { if (other.button.offsetTop === top) last = other.button; });
    if (last.nextSibling !== entry.book) this.grid.insertBefore(entry.book, last.nextSibling);
  };
  Shelf.prototype.closeBook = function (focus) {
    if (this.current < 0) return;
    var entry = this.entries[this.current];
    this.current = -1;
    entry.button.setAttribute("aria-expanded", "false");
    entry.book.open = false;
    entry.book.classList.remove("is-open-book", "is-entering");
    this.parked.appendChild(entry.book);
    if (history.replaceState && this.isOpen) history.replaceState(history.state, "", "#" + this.key);
    if (focus) entry.button.focus();
  };
  Shelf.prototype.openBook = function (i, animate) {
    this.closeBook(false);
    this.current = i;
    var entry = this.entries[i];
    entry.button.setAttribute("aria-expanded", "true");
    entry.book.classList.add("is-open-book");
    if (animate && !reduce.matches) {
      entry.book.classList.add("is-entering");
      setTimeout(function () { entry.book.classList.remove("is-entering"); }, 400);
    }
    this.place();
    entry.book.open = true;
    if (entry.book.id && history.replaceState) history.replaceState(history.state, "", "#" + entry.book.id);
    var top = entry.book.getBoundingClientRect().top;
    if (animate && top > innerHeight - 120) scrollBy({ top: top - innerHeight + 260, behavior: reduce.matches ? "auto" : "smooth" });
  };

  function init() {
    var catalog = document.querySelector(".zdd-blog-catalog");
    if (!catalog || catalog.dataset.library) return;
    catalog.dataset.library = "1";
    var posts = catalog.querySelectorAll(".zdd-post-card").length;
    var folders = [].slice.call(catalog.querySelectorAll(':scope > .zdd-catalog-folder[data-level="0"]'));
    var shelves = folders.map(function (folder, i) { return new Shelf(folder, i); });
    var byKey = {};
    shelves.forEach(function (s) { byKey[s.key] = s; });

    var library = el("div", "zdd-library");
    var books = shelves.reduce(function (n, s) { return n + s.entries.length; }, 0);
    var band = el("header", "zdd-band zdd-band--overview");
    var row = el("div", "zdd-band-row");
    row.appendChild(el("h1", "zdd-band-title", "Blog"));
    band.appendChild(row);
    band.appendChild(el("p", "zdd-band-line", shelves.length + " 个书架 \u00b7 " + books + " 本书 \u00b7 " + posts + " 篇"));
    library.appendChild(band);
    var strips = el("div", "zdd-strips");
    shelves.forEach(function (s) { strips.appendChild(s.strip); strips.appendChild(s.panel); });
    library.appendChild(strips);
    catalog.appendChild(library);
    catalog.classList.add("is-library");

    var active = null;
    function show(shelf) {
      shelves.forEach(function (s) { if (s !== shelf && s.isOpen) s.setOpen(false); });
      if (shelf && !shelf.isOpen) shelf.setOpen(true);
      active = shelf;
      if (shelf) requestAnimationFrame(function () { shelf.place(); });
    }
    function toggle(shelf) {
      var top = shelf.strip.getBoundingClientRect().top;
      show(shelf.isOpen ? null : shelf);
      if (history.replaceState) history.replaceState(history.state, "", active ? "#" + active.key : location.pathname);
      // a shelf closing above must not pull the clicked strip away from the pointer
      var moved = shelf.strip.getBoundingClientRect().top - top;
      if (moved) scrollBy({ top: moved, behavior: "instant" });
    }

    // Captured on window so site-shell.js's smooth scrolling of same-page
    // anchors (a capture listener on document) never sees these links.
    addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var link = event.target.closest && event.target.closest(".zdd-strip");
      if (!link || !catalog.contains(link)) return;
      event.preventDefault();
      event.stopPropagation();
      toggle(byKey[link.dataset.shelf]);
    }, true);
    addEventListener("hashchange", function () { route(); });
    addEventListener("resize", function () { if (active) active.place(); });
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !active) return;
      var shelf = active;
      if (shelf.current >= 0) { shelf.closeBook(true); return; }
      toggle(shelf);
      shelf.strip.focus({ preventScroll: true });
    });

    // #shelf opens a shelf; #book opens its shelf and the book
    function find(id) {
      var hit = { shelf: byKey[id] || null, book: -1 };
      if (!hit.shelf && id) shelves.some(function (s) {
        return s.entries.some(function (entry, i) {
          if (entry.book.id === id) { hit.shelf = s; hit.book = i; return true; }
          return false;
        });
      });
      return hit;
    }
    function route() {
      var hit = find(decodeURIComponent(location.hash.slice(1)));
      if (!hit.shelf) return;
      catalog.classList.add("is-instant");
      show(hit.shelf);
      if (hit.book >= 0) hit.shelf.openBook(hit.book, false);
      var target = hit.book >= 0 ? hit.shelf.entries[hit.book].button : hit.shelf.strip;
      requestAnimationFrame(function () {
        target.scrollIntoView({ block: hit.book >= 0 ? "center" : "start" });
        requestAnimationFrame(function () { catalog.classList.remove("is-instant"); });
      });
    }
    route();

    // ---- across pages: into an article from its card, and back again
    function cardFor(url) {
      return [].slice.call(catalog.querySelectorAll(".is-open-book .zdd-post-card")).filter(function (c) { return path(c.href) === url; })[0];
    }
    function around(card) {
      var panel = card.closest(".zdd-shelf-panel");
      return [].slice.call(panel.querySelectorAll(".zdd-cover, .is-open-book .zdd-book-head, .is-open-book .zdd-post-card, .zdd-book-foot"));
    }
    addEventListener("pageswap", function (event) {
      if (!event.viewTransition || !event.activation || !event.activation.entry || reduce.matches) return;
      var to = path(event.activation.entry.url);
      var card = cardFor(to);
      // no named card: its snapshot hanging over the new page for a few frames
      // read as a pixelated ghost, so the page simply cross-fades
      if (!card) return;
      try {
        sessionStorage.setItem("zdd.vt", "zdd-leaf");
        sessionStorage.setItem(RETURN_KEY, to);
      } catch (error) {}
    });
    addEventListener("pagereveal", function (event) {
      var from = null;
      try { from = sessionStorage.getItem(RETURN_KEY); } catch (error) {}
      var activation = window.navigation && navigation.activation;
      var came = activation && activation.from && activation.from.url ? path(activation.from.url) : null;
      if (!event.viewTransition || !from || came !== from || reduce.matches) return;
      var card = cardFor(from);
      if (!card) return;
      try { sessionStorage.removeItem(RETURN_KEY); } catch (error) {}
      event.viewTransition.types.add("zdd-leaf");
      event.viewTransition.types.add("zdd-return");
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
