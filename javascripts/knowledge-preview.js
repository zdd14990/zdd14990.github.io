(function() {
  "use strict";

  var state = {
    popup: null,
    anchor: null,
    openTimer: 0,
    closeTimer: 0,
    indexPromise: null,
    lastTouchAt: 0
  };
  var OPEN_DELAY = 320;
  var FOCUS_DELAY = 140;
  var CLOSE_DELAY = 130;

  function normalizePath(value) {
    try {
      var url = new URL(value, window.location.href);
      return url.pathname.replace(/\/index\.html$/, "/").replace(/\/{2,}/g, "/");
    } catch (error) {
      return "";
    }
  }

  function isArticle(item) {
    return item && (item.type === "post" || (!item.type && normalizePath(item.url).indexOf("/blog/") >= 0));
  }

  function loadIndex() {
    if (state.indexPromise) return state.indexPromise;
    if (window.zddContentIndexPromise) {
      state.indexPromise = window.zddContentIndexPromise;
      return state.indexPromise;
    }

    var embedded = document.getElementById("zdd-search-data");
    if (embedded) {
      try {
        state.indexPromise = Promise.resolve(JSON.parse(embedded.textContent || "[]"));
        window.zddContentIndexPromise = state.indexPromise;
        return state.indexPromise;
      } catch (error) {}
    }

    var source = window.zddSearchDataUrl || "/assets/zdd-search-data.json";
    state.indexPromise = fetch(source, {credentials: "same-origin"})
      .then(function(response) {
        if (!response.ok) throw new Error("Preview data unavailable");
        return response.json();
      })
      .then(function(items) { return Array.isArray(items) ? items : []; })
      .catch(function() { return []; });
    window.zddContentIndexPromise = state.indexPromise;
    return state.indexPromise;
  }

  function candidateAnchor(target) {
    if (!document.body.classList.contains("article-layout")) return null;
    var anchor = target && target.closest ? target.closest(".md-content__inner a[href]") : null;
    if (!anchor || anchor.closest(".zdd-knowledge-preview")) return null;
    var raw = anchor.getAttribute("href") || "";
    if (!raw || raw.charAt(0) === "#" || anchor.hasAttribute("download")) return null;
    try {
      var url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return null;
    } catch (error) {
      return null;
    }
    return anchor;
  }

  function createPopup() {
    if (state.popup) return state.popup;
    var popup = document.createElement("aside");
    popup.className = "zdd-knowledge-preview";
    popup.id = "zdd-knowledge-preview";
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-label", "Article preview");
    popup.hidden = true;
    popup.addEventListener("pointerenter", cancelClose);
    popup.addEventListener("pointerleave", scheduleClose);
    popup.addEventListener("focusin", cancelClose);
    popup.addEventListener("focusout", scheduleClose);
    document.body.appendChild(popup);
    state.popup = popup;
    return popup;
  }

  function renderPopup(item) {
    var popup = createPopup();
    popup.textContent = "";

    var title = document.createElement("strong");
    title.className = "zdd-knowledge-preview-title";
    title.textContent = item.title || "Untitled article";
    var description = document.createElement("p");
    description.className = "zdd-knowledge-preview-description";
    description.textContent = item.preview || "No preview is available for this article.";
    var meta = document.createElement("div");
    meta.className = "zdd-knowledge-preview-meta";
    if (item.date) {
      var time = document.createElement("time");
      time.dateTime = item.date;
      time.textContent = item.date;
      meta.appendChild(time);
    }
    (item.tags || []).slice(0, 3).forEach(function(tag) {
      var chip = document.createElement("span");
      chip.textContent = "#" + tag;
      meta.appendChild(chip);
    });
    var openLink = document.createElement("a");
    openLink.className = "zdd-knowledge-preview-open";
    openLink.href = item.url;
    openLink.textContent = "Open article";

    popup.appendChild(title);
    popup.appendChild(description);
    if (meta.childNodes.length) popup.appendChild(meta);
    popup.appendChild(openLink);
    return popup;
  }

  function positionPopup(anchor, popup) {
    popup.style.visibility = "hidden";
    popup.hidden = false;
    var anchorBounds = anchor.getBoundingClientRect();
    var popupBounds = popup.getBoundingClientRect();
    var gap = 10;
    var edge = 12;
    var spaceBelow = window.innerHeight - anchorBounds.bottom;
    var top = spaceBelow >= popupBounds.height + gap
      ? anchorBounds.bottom + gap
      : anchorBounds.top - popupBounds.height - gap;
    top = Math.max(edge, Math.min(top, window.innerHeight - popupBounds.height - edge));
    var left = anchorBounds.left + Math.min(anchorBounds.width, 36);
    left = Math.max(edge, Math.min(left, window.innerWidth - popupBounds.width - edge));
    popup.style.top = Math.round(top) + "px";
    popup.style.left = Math.round(left) + "px";
    popup.style.visibility = "visible";
  }

  function show(anchor) {
    window.clearTimeout(state.openTimer);
    if (!anchor || !anchor.isConnected) return;
    loadIndex().then(function(items) {
      if (state.anchor !== anchor || !anchor.isConnected) return;
      var path = normalizePath(anchor.href);
      var item = items.find(function(candidate) {
        return isArticle(candidate) && normalizePath(candidate.url) === path;
      });
      if (!item) return;
      var popup = renderPopup(item);
      anchor.setAttribute("aria-describedby", popup.id);
      positionPopup(anchor, popup);
      requestAnimationFrame(function() { popup.classList.add("is-visible"); });
    });
  }

  function scheduleOpen(anchor, delay) {
    cancelClose();
    if (state.anchor && state.anchor !== anchor) close();
    state.anchor = anchor;
    window.clearTimeout(state.openTimer);
    state.openTimer = window.setTimeout(function() { show(anchor); }, delay);
  }

  function cancelClose() {
    window.clearTimeout(state.closeTimer);
  }

  function scheduleClose() {
    window.clearTimeout(state.closeTimer);
    state.closeTimer = window.setTimeout(close, CLOSE_DELAY);
  }

  function close() {
    window.clearTimeout(state.openTimer);
    window.clearTimeout(state.closeTimer);
    if (state.anchor) state.anchor.removeAttribute("aria-describedby");
    state.anchor = null;
    if (!state.popup || state.popup.hidden) return;
    state.popup.classList.remove("is-visible");
    window.setTimeout(function() {
      if (state.popup && !state.popup.classList.contains("is-visible")) state.popup.hidden = true;
    }, 170);
  }

  document.addEventListener("pointerdown", function(event) {
    if (event.pointerType === "touch") state.lastTouchAt = Date.now();
  }, true);
  document.addEventListener("mouseover", function(event) {
    if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var anchor = candidateAnchor(event.target);
    if (!anchor || (event.relatedTarget && anchor.contains(event.relatedTarget))) return;
    scheduleOpen(anchor, OPEN_DELAY);
  });
  document.addEventListener("mouseout", function(event) {
    var anchor = candidateAnchor(event.target);
    if (!anchor || (event.relatedTarget && anchor.contains(event.relatedTarget))) return;
    scheduleClose();
  });
  document.addEventListener("focusin", function(event) {
    if (Date.now() - state.lastTouchAt < 700) return;
    var anchor = candidateAnchor(event.target);
    if (anchor) scheduleOpen(anchor, FOCUS_DELAY);
  });
  document.addEventListener("focusout", function(event) {
    var anchor = candidateAnchor(event.target);
    if (anchor) scheduleClose();
  });
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") close();
  });
  window.addEventListener("scroll", close, {passive: true});
  window.addEventListener("resize", close);
})();
