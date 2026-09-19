(function () {
  "use strict";
  var data = document.getElementById("zdd-code-notes");
  var article = document.querySelector(".md-content__inner");
  if (!data || !article || document.getElementById("zdd-code-note")) return;
  var payload = JSON.parse(data.textContent);
  var notes = new Map();
  payload.notes.forEach(function (note) {
    note.rows = Array.from(article.querySelectorAll('[data-zdd-note="' + note.id + '"]'));
    note.trigger = note.rows[0];
    notes.set(note.id, note);
  });
  var sources = new Map();
  Object.keys(payload.sources).forEach(function (key) {
    var template = document.createElement("template");
    template.innerHTML = payload.sources[key];
    sources.set(key, template.content.firstElementChild);
  });
  var card = document.createElement("aside");
  card.id = "zdd-code-note";
  card.className = "md-typeset zdd-code-note";
  card.setAttribute("aria-labelledby", "zdd-code-note-title");
  card.hidden = true;
  card.innerHTML = '<header class="zdd-code-note-header"><span id="zdd-code-note-title"></span><button type="button" data-note-pin aria-label="固定批注" aria-pressed="false" title="固定批注"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8l-1 6 4 4v2h-6v6l-1 1-1-1v-6H5v-2l4-4-1-6Z"/></svg></button><button type="button" data-note-close aria-label="关闭批注" title="关闭批注"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></header><div class="zdd-code-note-body"></div>';
  document.body.appendChild(card);
  var body = card.querySelector(".zdd-code-note-body");
  var title = card.querySelector("#zdd-code-note-title");
  var pinButton = card.querySelector("[data-note-pin]");
  var active = null, anchor = null, pinned = false, dismissed = null;
  var hoverTimer, hideTimer, scrollFrame, pointerFocusing = false;
  var hoverLocked = false, pointerX = null, pointerY = null;
  var compact = matchMedia("(max-width: 760px)");

  function cancelTimers() { clearTimeout(hoverTimer); clearTimeout(hideTimer); }
  function setPinned(value) {
    pinned = value;
    pinButton.setAttribute("aria-pressed", String(value));
    pinButton.setAttribute("aria-label", value ? "取消固定批注" : "固定批注");
    pinButton.title = value ? "取消固定批注" : "固定批注";
  }
  function updateLines(note, enabled) {
    if (!note) return;
    note.rows.forEach(function (row) { row.classList.toggle("is-note-active", enabled); });
    note.trigger.setAttribute("aria-expanded", String(enabled));
  }
  function positionCard() {
    if (!active || card.hidden) return;
    card.style.maxHeight = "";
    var row = anchor.getBoundingClientRect();
    var code = anchor.closest("code").getBoundingClientRect();
    var header = document.querySelector(".md-header");
    var topLimit = Math.max(12, header ? header.getBoundingClientRect().bottom + 12 : 12);
    if (compact.matches) {
      card.style.left = "10px";
      card.style.top = "";
      card.style.bottom = "10px";
      card.style.width = "calc(100% - 20px)";
      return;
    }
    var width = Math.min(432, innerWidth - 32);
    card.style.width = width + "px";
    card.style.bottom = "";
    var height = card.getBoundingClientRect().height;
    var left, top;
    if (innerWidth - code.right >= width + 24) {
      left = code.right + 12;
      top = row.top - 12;
    } else if (code.left >= width + 24) {
      left = code.left - width - 12;
      top = row.top - 12;
    } else {
      // With no free side margin, float below (or above) the current line,
      // keeping the actual code under discussion unobscured.
      left = innerWidth - width - 16;
      top = row.bottom + 12;
      if (top + height > innerHeight - 16 && row.top - height - 12 >= topLimit) top = row.top - height - 12;
      else if (top + height > innerHeight - 16) {
        // The lower half is too short: keep a compact card below the line.
        // It scrolls independently, with its header always available.
        var below = innerHeight - row.bottom - 28;
        var above = row.top - topLimit - 12;
        if (above > below && above >= 180) {
          card.style.maxHeight = Math.min(560, above) + "px";
          top = row.top - card.getBoundingClientRect().height - 12;
        } else if (below >= 180) {
          card.style.maxHeight = Math.min(560, below) + "px";
        }
      }
    }
    height = card.getBoundingClientRect().height;
    card.style.left = Math.max(16, left) + "px";
    card.style.top = Math.max(topLimit, Math.min(top, innerHeight - height - 16)) + "px";
  }
  function typesetIfNeeded() {
    var math = window.MathJax;
    if (!math || !math.typesetPromise || !card.querySelector('.arithmatex:not(:has(mjx-container))')) return;
    var current = active;
    var ready = math.startup && math.startup.promise ? math.startup.promise : Promise.resolve();
    ready.then(function () {
      if (active === current && !card.hidden) return math.typesetPromise([card]);
    }).then(function () { if (active === current) positionCard(); }).catch(function () {
      // The original TeX remains readable if the site's existing math loader fails.
    });
  }
  function fillHeading(element, reference) {
    element.innerHTML = reference.heading;
    element.querySelectorAll('[id]').forEach(function (node) { node.removeAttribute('id'); });
  }
  function fill(note) {
    if (window.MathJax && window.MathJax.typesetClear) window.MathJax.typesetClear([card]);
    body.replaceChildren();
    note.references.forEach(function (reference, index) {
      if (!index) {
        fillHeading(title, reference);
      } else {
        var subheading = document.createElement("h4");
        fillHeading(subheading, reference);
        body.appendChild(subheading);
      }
      reference.sources.forEach(function (key) {
        var original = sources.get(key);
        if (!original) return;
        var clone = original.cloneNode(true);
        clone.removeAttribute("data-zdd-note-source");
        clone.removeAttribute("id");
        clone.querySelectorAll("[id]").forEach(function (node) { node.removeAttribute("id"); });
        clone.querySelectorAll(".headerlink,.zdd-media-expand").forEach(function (node) { node.remove(); });
        if (clone.tagName === "TABLE") {
          var wrap = document.createElement("div");
          wrap.className = "zdd-code-note-table";
          wrap.appendChild(clone);
          body.appendChild(wrap);
        } else body.appendChild(clone);
      });
    });
    body.scrollTop = 0;
  }
  function show(note, row, pin) {
    cancelTimers();
    if ((pinned || dismissed === note) && !pin) return;
    if (active !== note) {
      updateLines(active, false);
      fill(note);
    }
    active = note;
    if (pin) hoverLocked = false;
    anchor = row;
    setPinned(!!pin);
    updateLines(note, true);
    card.hidden = false;
    card.style.maxHeight = "";
    positionCard();
    typesetIfNeeded();
    if (compact.matches && pin) {
      var bounds = row.getBoundingClientRect();
      if (bounds.bottom > card.getBoundingClientRect().top - 12) row.scrollIntoView({block:"start", behavior:"instant"});
    }
  }
  function close(restoreFocus) {
    cancelTimers();
    var previous = active;
    dismissed = previous;
    if (restoreFocus) hoverLocked = true;
    updateLines(previous, false);
    active = null;
    setPinned(false);
    card.hidden = true;
    if (restoreFocus && previous) previous.trigger.focus({preventScroll:true});
  }
  function scheduleHide() {
    clearTimeout(hoverTimer);
    if (pinned) return;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      if (card.matches(":hover") || card.contains(document.activeElement)) return;
      if (active && active.rows.some(function (row) { return row.matches(":hover") || row === document.activeElement; })) return;
      close(false);
    }, 380);
  }
  function markedRow(target) { return target.closest && target.closest("[data-zdd-note]"); }
  article.addEventListener("pointerdown", function (event) { pointerFocusing = !!markedRow(event.target); }, true);
  document.addEventListener("pointerup", function () { pointerFocusing = false; });
  document.addEventListener("pointercancel", function () { pointerFocusing = false; });
  document.addEventListener("pointermove", function (event) {
    var moved = pointerX === null || Math.abs(event.clientX - pointerX) + Math.abs(event.clientY - pointerY) > 2;
    pointerX = event.clientX; pointerY = event.clientY;
    if (!hoverLocked || !moved || event.pointerType === "touch") return;
    hoverLocked = false;
    var row = markedRow(event.target);
    if (row) {
      dismissed = null;
      hoverTimer = setTimeout(function () { show(notes.get(row.dataset.zddNote), row, false); }, 140);
    }
  }, {passive:true});
  article.addEventListener("pointerover", function (event) {
    if (event.pointerType === "touch" || hoverLocked) return;
    var row = markedRow(event.target);
    if (!row) return;
    var note = notes.get(row.dataset.zddNote);
    if (!note) return;
    cancelTimers();
    dismissed = null;
    if (active === note) { if (!pinned) { anchor = row; positionCard(); } return; }
    hoverTimer = setTimeout(function () { show(note, row, false); }, 140);
  });
  article.addEventListener("pointerout", function (event) {
    var row = markedRow(event.target);
    var next = event.relatedTarget && markedRow(event.relatedTarget);
    if (row && (!next || next.dataset.zddNote !== row.dataset.zddNote)) scheduleHide();
  });
  article.addEventListener("click", function (event) {
    var row = markedRow(event.target);
    if (!row || !window.getSelection().isCollapsed) return;
    var note = notes.get(row.dataset.zddNote);
    if (note) { dismissed = null; show(note, row, true); }
  });
  article.addEventListener("focusin", function (event) {
    // A touch/mouse click opens the card only after the click completes, so
    // the new card cannot intercept the pointer before it reaches that line.
    if (pointerFocusing) return;
    var row = markedRow(event.target);
    var note = row && notes.get(row.dataset.zddNote);
    if (note && dismissed !== note) show(note, row, false);
  });
  article.addEventListener("focusout", scheduleHide);
  article.addEventListener("keydown", function (event) {
    var row = markedRow(event.target);
    if (row && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      dismissed = null;
      show(notes.get(row.dataset.zddNote), row, true);
    }
  });
  card.addEventListener("pointerenter", cancelTimers);
  card.addEventListener("pointerleave", scheduleHide);
  card.addEventListener("focusin", cancelTimers);
  card.addEventListener("focusout", scheduleHide);
  pinButton.addEventListener("click", function () { setPinned(!pinned); if (!pinned) scheduleHide(); });
  card.querySelector("[data-note-close]").addEventListener("click", function () { close(true); });
  card.addEventListener("click", function (event) { if (event.target.closest("a[href^='#']")) close(false); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape" && active) { event.preventDefault(); close(true); } });
  document.addEventListener("pointerdown", function (event) {
    if (active && !card.contains(event.target) && !markedRow(event.target)) close(false);
  });
  window.addEventListener("scroll", function () {
    if (scrollFrame || !active) return;
    scrollFrame = requestAnimationFrame(function () {
      scrollFrame = null;
      if (!active) return;
      var bounds = anchor.getBoundingClientRect();
      if (!pinned && (bounds.bottom < 60 || bounds.top > innerHeight)) close(false);
      else positionCard();
    });
  }, {passive:true});
  window.addEventListener("resize", function () { card.style.maxHeight = ""; positionCard(); });
  window.addEventListener("load", function () {
    if (active) { fill(active); typesetIfNeeded(); positionCard(); }
  }, {once:true});
})();
