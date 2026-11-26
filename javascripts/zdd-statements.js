(function(root) {
  "use strict";

  var PAGE_SIZE = 60;
  var KIND_ORDER = [
    ["all", "全部"],
    ["definition", "定义"],
    ["theorem", "定理"],
    ["proposition", "命题"],
    ["lemma", "引理"],
    ["corollary", "推论"],
    ["problem", "习题"]
  ];

  function escapeHtml(text) {
    return String(text || "").replace(/[&<>"']/g, function(ch) {
      return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[ch];
    });
  }

  function normalize(text) {
    return String(text || "").toLowerCase();
  }

  function score(item, terms) {
    if (!terms.length) return 1;
    var head = normalize(item.title + " " + item.name);
    var context = normalize(item.section + " " + item.article + " " + (item.book || "") + " " + (item.tags || []).join(" "));
    var body = normalize(item.text);
    var total = 0;
    for (var i = 0; i < terms.length; i += 1) {
      if (head.indexOf(terms[i]) >= 0) total += 6;
      else if (context.indexOf(terms[i]) >= 0) total += 2;
      else if (body.indexOf(terms[i]) >= 0) total += 1;
      else return 0;
    }
    return total + (item.name ? 1 : 0);
  }

  // "代数学 · 第一章：域 · 1. 域扩张": book, then the article when it is not the book itself, then the section.
  function whereText(item) {
    var parts = [];
    [item.book, item.article, item.section].forEach(function(part) {
      if (part && parts.indexOf(part) < 0) parts.push(part);
    });
    return parts.join(" · ");
  }

  function itemHtml(item) {
    var name = String(item.name || "").trim();
    var label = escapeHtml(item.number || item.label);
    var url = escapeHtml(item.url);
    // The label always links to the statement; when a named title link follows,
    // keep the label out of the tab order so each item is one stop.
    var kind = '<a class="zdd-statement-kind" href="' + url + '"'
      + (name ? ' tabindex="-1" aria-hidden="true"' : "") + '>' + label + '</a>';
    return '<li class="zdd-statement-item' + (name ? " has-name" : "") + '" data-kind="' + escapeHtml(item.kind) + '">'
      + kind
      + (name ? '<a class="zdd-statement-title" href="' + url + '">' + escapeHtml(name) + '</a>' : "")
      + '<span class="zdd-statement-where">' + escapeHtml(whereText(item)) + '</span>'
      + '<span class="zdd-statement-text arithmatex">' + escapeHtml(item.text) + '</span>'
      + '</li>';
  }

  // Books in order of first appearance, with how many statements each holds.
  function bookCounts(items) {
    var counts = {};
    var order = [];
    items.forEach(function(item) {
      var book = item.book || "";
      if (!book) return;
      if (!Object.prototype.hasOwnProperty.call(counts, book)) {
        counts[book] = 0;
        order.push(book);
      }
      counts[book] += 1;
    });
    return order.map(function(book) { return [book, counts[book]]; });
  }

  // Items matching the kind filter, the book filter and every query term, best match first when searching.
  function filterItems(items, filters) {
    var terms = normalize(filters.query).split(/\s+/).filter(Boolean);
    var kind = filters.kind || "all";
    var book = filters.book || "";
    var matches = [];
    items.forEach(function(item, index) {
      if (kind !== "all" && item.kind !== kind) return;
      if (book && item.book !== book) return;
      var value = score(item, terms);
      if (value > 0) matches.push({item: item, score: value, index: index});
    });
    if (terms.length) matches.sort(function(a, b) { return b.score - a.score || a.index - b.index; });
    return matches.map(function(entry) { return entry.item; });
  }

  function typeset(nodes) {
    if (window.zddTypesetMath) {
      nodes.forEach(function(node) { window.zddTypesetMath(node); });
      return;
    }
    var math = window.MathJax;
    if (math && math.typesetPromise) math.typesetPromise(nodes).catch(function() {});
  }

  function init(root) {
    var input = root.querySelector("[data-zdd-statement-query]");
    var kindsBox = root.querySelector(".zdd-statement-kinds");
    var bookSelect = root.querySelector("[data-zdd-statement-book]");
    var summary = root.querySelector(".zdd-statement-summary");
    var list = root.querySelector(".zdd-statement-list");
    var more = root.querySelector(".zdd-statement-more");
    var params = new URLSearchParams(window.location.search);
    var state = {items: [], matches: [], shown: 0, kind: params.get("kind") || "all", book: params.get("book") || ""};
    var timer = null;
    input.value = params.get("q") || "";

    function syncUrl() {
      var next = new URLSearchParams();
      if (input.value.trim()) next.set("q", input.value.trim());
      if (state.kind !== "all") next.set("kind", state.kind);
      if (state.book) next.set("book", state.book);
      var query = next.toString();
      window.history.replaceState(null, "", window.location.pathname + (query ? "?" + query : ""));
    }

    function renderKinds() {
      var counts = {all: state.items.length};
      state.items.forEach(function(item) { counts[item.kind] = (counts[item.kind] || 0) + 1; });
      kindsBox.innerHTML = KIND_ORDER.filter(function(pair) {
        return counts[pair[0]];
      }).map(function(pair) {
        var active = pair[0] === state.kind;
        return '<button type="button" class="zdd-statement-kind-filter' + (active ? " is-active" : "") + '"'
          + ' data-kind="' + pair[0] + '" aria-pressed="' + active + '">'
          + escapeHtml(pair[1]) + ' <small>' + counts[pair[0]] + '</small></button>';
      }).join("");
    }

    function renderBooks() {
      if (!bookSelect) return;
      var books = bookCounts(state.items);
      if (!books.some(function(pair) { return pair[0] === state.book; })) state.book = "";
      bookSelect.innerHTML = '<option value="">全部书目</option>' + books.map(function(pair) {
        return '<option value="' + escapeHtml(pair[0]) + '">' + escapeHtml(pair[0]) + "（" + pair[1] + "）</option>";
      }).join("");
      bookSelect.value = state.book;
    }

    function renderMore() {
      var batch = state.matches.slice(state.shown, state.shown + PAGE_SIZE);
      var holder = document.createElement("ol");
      holder.innerHTML = batch.map(itemHtml).join("");
      var added = Array.prototype.slice.call(holder.children);
      added.forEach(function(node) { list.appendChild(node); });
      state.shown += batch.length;
      more.hidden = state.shown >= state.matches.length;
      typeset(added);
    }

    function render() {
      state.matches = filterItems(state.items, {query: input.value, kind: state.kind, book: state.book});
      summary.textContent = state.matches.length
        ? "共 " + state.matches.length + " 条" + (state.book ? "（" + state.book + "）" : "")
        : "没有匹配的条目，换个更短的关键词或其他书目试试。";
      list.innerHTML = "";
      state.shown = 0;
      renderMore();
      syncUrl();
    }

    kindsBox.addEventListener("click", function(event) {
      var button = event.target.closest("[data-kind]");
      if (!button) return;
      state.kind = button.getAttribute("data-kind");
      renderKinds();
      render();
    });
    if (bookSelect) {
      bookSelect.addEventListener("change", function() {
        state.book = bookSelect.value;
        render();
      });
    }
    input.addEventListener("input", function() {
      window.clearTimeout(timer);
      timer = window.setTimeout(render, 160);
    });
    more.addEventListener("click", renderMore);

    fetch(window.zddStatementsUrl).then(function(response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    }).then(function(data) {
      state.items = data.statements || [];
      if (!KIND_ORDER.some(function(pair) { return pair[0] === state.kind; })) state.kind = "all";
      renderKinds();
      renderBooks();
      render();
    }).catch(function() {
      summary.textContent = "索引加载失败，请刷新重试。";
    });
  }

  function start() {
    var node = document.querySelector("[data-zdd-statements]");
    if (node && !node.dataset.ready) {
      node.dataset.ready = "1";
      init(node);
    }
  }

  var api = {PAGE_SIZE: PAGE_SIZE, itemHtml: itemHtml, whereText: whereText, bookCounts: bookCounts, filterItems: filterItems};
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof document === "undefined") return;
  root.ZddStatements = api;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})(typeof window !== "undefined" ? window : this);
