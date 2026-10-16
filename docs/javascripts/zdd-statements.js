(function() {
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
    var context = normalize(item.section + " " + item.article + " " + (item.tags || []).join(" "));
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

  function itemHtml(item) {
    var where = [item.article, item.section].filter(Boolean).join(" · ");
    return '<li class="zdd-statement-item" data-kind="' + escapeHtml(item.kind) + '">'
      + '<span class="zdd-statement-kind">' + escapeHtml(item.label) + '</span>'
      + '<a class="zdd-statement-title" href="' + escapeHtml(item.url) + '">' + escapeHtml(item.title) + '</a>'
      + '<span class="zdd-statement-where">' + escapeHtml(where) + '</span>'
      + '<span class="zdd-statement-text arithmatex">' + escapeHtml(item.text) + '</span>'
      + '</li>';
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
    var summary = root.querySelector(".zdd-statement-summary");
    var list = root.querySelector(".zdd-statement-list");
    var more = root.querySelector(".zdd-statement-more");
    var params = new URLSearchParams(window.location.search);
    var state = {items: [], matches: [], shown: 0, kind: params.get("kind") || "all"};
    var timer = null;
    input.value = params.get("q") || "";

    function syncUrl() {
      var next = new URLSearchParams();
      if (input.value.trim()) next.set("q", input.value.trim());
      if (state.kind !== "all") next.set("kind", state.kind);
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
      var terms = normalize(input.value).split(/\s+/).filter(Boolean);
      state.matches = state.items.map(function(item) {
        return {item: item, score: state.kind === "all" || item.kind === state.kind ? score(item, terms) : 0};
      }).filter(function(entry) {
        return entry.score > 0;
      });
      if (terms.length) state.matches.sort(function(a, b) { return b.score - a.score; });
      state.matches = state.matches.map(function(entry) { return entry.item; });
      summary.textContent = state.matches.length
        ? "共 " + state.matches.length + " 条"
        : "没有匹配的条目，换个更短的关键词试试。";
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
      render();
    }).catch(function() {
      summary.textContent = "索引加载失败，请刷新重试。";
    });
  }

  function start() {
    var root = document.querySelector("[data-zdd-statements]");
    if (root && !root.dataset.ready) {
      root.dataset.ready = "1";
      init(root);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
