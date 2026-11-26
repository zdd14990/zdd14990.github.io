(function() {
  "use strict";

  // Click (or tap) a rendered formula to copy its LaTeX source.
  var SKIP = "a, button, input, textarea, select, label, [contenteditable], .zdd-no-math-copy";
  var toast = null;
  var toastTimer = 0;

  function texFor(container) {
    var math = window.MathJax;
    var doc = math && math.startup && math.startup.document;
    if (!doc || !doc.getMathItemsWithin) return null;
    var items = doc.getMathItemsWithin(container);
    for (var i = 0; i < items.length; i += 1) {
      if (items[i].typesetRoot === container) {
        var tex = String(items[i].math || "").trim();
        if (!tex) return null;
        return items[i].display ? "$$\n" + tex + "\n$$" : "$" + tex + "$";
      }
    }
    return null;
  }

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (error) {}
    area.remove();
    return ok ? Promise.resolve() : Promise.reject(new Error("copy failed"));
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function() { return fallbackCopy(text); });
    }
    return fallbackCopy(text);
  }

  function showToast(message, x, y) {
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "zdd-math-copy-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.left = Math.max(8, Math.min(x, window.innerWidth - 120)) + "px";
    toast.style.top = Math.max(8, y - 36) + "px";
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function() { toast.classList.remove("is-visible"); }, 1200);
  }

  function eligible(container) {
    if (!container || document.body.classList.contains("lab-layout")) return false;
    if (container.closest(SKIP)) return false;
    var selection = window.getSelection && window.getSelection();
    return !(selection && !selection.isCollapsed && String(selection).trim());
  }

  document.addEventListener("click", function(event) {
    if (event.button !== 0 || event.defaultPrevented) return;
    var container = event.target.closest && event.target.closest("mjx-container");
    if (!eligible(container)) return;
    var tex = texFor(container);
    if (!tex) return;
    copy(tex).then(function() {
      showToast("已复制 LaTeX", event.clientX, event.clientY);
    }, function() {
      showToast("复制失败", event.clientX, event.clientY);
    });
  });

  document.addEventListener("mouseover", function(event) {
    var container = event.target.closest && event.target.closest("mjx-container");
    if (container && !container.hasAttribute("data-zdd-copy") && eligible(container)) {
      container.setAttribute("data-zdd-copy", "");
      container.setAttribute("title", "点击复制 LaTeX");
    }
  });
})();
