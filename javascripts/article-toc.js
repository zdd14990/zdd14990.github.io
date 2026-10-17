(function () {
  "use strict";
  var dialog = document.getElementById("zdd-toc-dialog");
  var toggle = document.querySelector(".zdd-toc-toggle");
  if (!dialog || !toggle || typeof dialog.showModal !== "function") return;
  var headings = Array.from(document.querySelectorAll(".md-content__inner :is(h2, h3, h4, h5, h6)[id]"));
  if (!headings.length) return;
  var list = dialog.querySelector("ol");
  var links = headings.map(function (heading) {
    var item = document.createElement("li");
    var link = document.createElement("a");
    var label = heading.cloneNode(true);
    label.querySelectorAll(".headerlink").forEach(function (node) { node.remove(); });
    item.style.setProperty("--zdd-toc-level", Number(heading.tagName.slice(1)) - 2);
    link.href = "#" + encodeURIComponent(heading.id);
    link.textContent = label.textContent.trim();
    item.appendChild(link);
    list.appendChild(item);
    return link;
  });
  var navigationTarget = null;
  function updateActive() {
    var index = 0;
    headings.forEach(function (heading, i) {
      if (heading.getBoundingClientRect().top <= 130) index = i;
    });
    links.forEach(function (link, i) {
      if (i === index) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  toggle.hidden = false;
  toggle.addEventListener("click", function () {
    updateActive();
    dialog.showModal();
    toggle.setAttribute("aria-expanded", "true");
    var current = list.querySelector('[aria-current="location"]');
    if (current) {
      current.focus({preventScroll: true});
      current.scrollIntoView({block: "nearest", behavior: "instant"});
    }
  });
  dialog.querySelector("[data-zdd-toc-close]").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) {
    if (event.target !== dialog) return;
    var box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  // Document capture still runs alongside site-shell's same-page anchor handler.
  document.addEventListener("click", function (event) {
    if (!dialog.open || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest && event.target.closest("#zdd-toc-dialog a[href]");
    if (link) {
      navigationTarget = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      dialog.close();
    }
  }, true);
  dialog.addEventListener("close", function () {
    toggle.setAttribute("aria-expanded", "false");
    if (navigationTarget) {
      navigationTarget.setAttribute("tabindex", "-1");
      navigationTarget.focus({preventScroll: true});
      navigationTarget = null;
    } else {
      toggle.focus({preventScroll: true});
    }
  });
  var desktop = matchMedia("(min-width: 60em)");
  desktop.addEventListener("change", function () { if (desktop.matches && dialog.open) dialog.close(); });
})();
