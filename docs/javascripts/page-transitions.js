// Direction of cross-document view transitions (next/prev chapter, up/down a level,
// sideways between the sections of the header menu).
// Loaded blocking in <head>: pagereveal fires before the first frame.
(function () {
  "use strict";
  var KEY = "zdd.vt";
  function norm(path) { return path.replace(/index\.html$/, ""); }
  function same(link, path) { return link && norm(new URL(link.href, location.href).pathname) === path; }
  // Header menu order; moving between these slides sideways instead of up or down.
  var SECTIONS = ["", "blog/", "tags/", "friends/friends/"];
  function section(path) {
    var logo = document.querySelector(".md-header__button.md-logo");
    var root = norm(new URL(logo ? logo.href : "/", location.href).pathname);
    return path.indexOf(root) === 0 ? SECTIONS.indexOf(path.slice(root.length)) : -1;
  }

  window.addEventListener("pageswap", function (event) {
    if (!event.viewTransition || !event.activation || !event.activation.entry) return;
    var to = norm(new URL(event.activation.entry.url).pathname);
    var from = norm(location.pathname);
    var dir = "fade";
    var a = section(from), b = section(to);
    if (a >= 0 && b >= 0 && a !== b) dir = b > a ? "across-next" : "across-prev";
    else if (same(document.querySelector(".zdd-pager-link.is-next, a[rel=next]"), to)) dir = "next";
    else if (same(document.querySelector(".zdd-pager-link.is-prev, a[rel=prev]"), to)) dir = "prev";
    else if (to !== from && from.indexOf(to) === 0) dir = "up";
    else if (to !== from && to.indexOf(from) === 0) dir = "down";
    try { sessionStorage.setItem(KEY, dir); } catch (error) {}
  });

  window.addEventListener("pagereveal", function (event) {
    var dir = null;
    try { dir = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); } catch (error) {}
    if (event.viewTransition && dir && dir !== "fade") event.viewTransition.types.add(dir);
  });
})();
