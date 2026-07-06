---
title: Home
hide:
  - navigation
  - toc
  - footer
---

<style>
  body.home-layout .md-footer,
  body.zdd-minimal-layout.home-layout .md-footer {
    display: none !important;
  }

  body.home-layout .md-main__inner,
  body.home-layout .md-content,
  body.home-layout .md-content__inner,
  body.zdd-minimal-layout.home-layout .md-main__inner,
  body.zdd-minimal-layout.home-layout .md-content,
  body.zdd-minimal-layout.home-layout .md-content__inner {
    margin: 0 !important;
    padding: 0 !important;
    max-width: none !important;
    width: 100% !important;
  }

  body.home-layout .md-content__inner::before,
  body.home-layout .md-content__inner::after,
  body.zdd-minimal-layout.home-layout .md-content__inner::before,
  body.zdd-minimal-layout.home-layout .md-content__inner::after {
    display: none !important;
    content: none !important;
  }

  body.home-layout .minimal-home,
  body.zdd-minimal-layout.home-layout .minimal-home {
    position: relative;
    box-sizing: border-box;

    min-height: calc(100svh - 3rem);
    padding: 0 1rem 3.6rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  body.home-layout .minimal-home-hero,
  body.zdd-minimal-layout.home-layout .minimal-home-hero {
    width: 100%;
    transform: translateY(-2.2rem);
  }

  .zdd-home-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1.05rem;

    text-align: center;
    font-size: 0.62rem;
    line-height: 1.4;
    color: var(--zdd-surface-muted, #4a6a78);
    opacity: 0.72;
    user-select: none;
  }

  .zdd-home-footer a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid transparent;
  }

  .zdd-home-footer a:hover {
    border-bottom-color: currentColor;
  }

  body[data-md-color-scheme="slate"] .zdd-home-footer {
    color: var(--zdd-surface-muted, #9fb8c4);
  }

  body.home-layout .minimal-home:has(.minimal-search-results:not([hidden])) .zdd-home-footer,
  body.zdd-minimal-layout.home-layout .minimal-home:has(.minimal-search-results:not([hidden])) .zdd-home-footer {
    display: none;
  }
</style>

<section class="minimal-home">
  <div class="minimal-home-hero">
    <h1 class="minimal-home-line"><span id="typing-text">“ 去过和没去过的地方 哪里更远 ”</span></h1>
    <form class="minimal-search" id="home-search-form">
      <input id="home-search-input" type="search" placeholder="Search or type /help" autocomplete="off" aria-label="搜索文章或输入命令">
    </form>
    <div class="minimal-search-ghost" id="home-search-ghost" aria-hidden="true"></div>
    <div class="minimal-search-results" id="home-search-results"></div>
  </div>

  <div class="zdd-home-footer">
    © 2026 zdd14990's Blog
  </div>
</section>

<script id="zdd-search-data" type="application/json">{{ search_index_data() }}</script>
<script>
(function() {
  var textLight = "“ 去过和没去过的地方 哪里更远 ”";
  var textDark = "“ 抓住和抓不住的照片 哪张更美 ”";
  var target = document.getElementById("typing-text");
  var timer = 0;

  function type(text) {
    if (!target) return;
    window.clearTimeout(timer);
    target.textContent = "";
    var i = 0;
    function next() {
      target.textContent += text.charAt(i++);
      if (i < text.length) timer = window.setTimeout(next, 90);
    }
    next();
  }

  function refreshTitle() {
    type(document.body.getAttribute("data-md-color-scheme") === "slate" ? textDark : textLight);
  }

  window.setTimeout(refreshTitle, 300);
  new MutationObserver(refreshTitle).observe(document.body, {
    attributes: true,
    attributeFilter: ["data-md-color-scheme"]
  });

  var form = document.getElementById("home-search-form");
  var input = document.getElementById("home-search-input");
  var resultBox = document.getElementById("home-search-results");
  var ghost = document.getElementById("home-search-ghost");
  var dataNode = document.getElementById("zdd-search-data");
  var posts = dataNode ? JSON.parse(dataNode.textContent || "[]") : [];
  var selectedCommandIndex = 0;
  var selectedSuggestionIndex = 0;
  var commandRows = [];
  var suggestionRows = [];
  var suggestionBase = "";
  var commands = [
    {name: "/random", syntax: "/random [tag:<tag>|category:<category>]", kind: "jump", fill: "/random ", desc: "Open a random article."},
    {name: "/rewind", syntax: "/rewind", kind: "jump", desc: "Return to the last article you opened."},
    {name: "/tag", syntax: "/tag <tag>", kind: "jump", fill: "/tag ", desc: "Open the result page for a tag."},
    {name: "/tags", syntax: "/tags", kind: "jump", desc: "Open the Tags page."},
    {name: "/blog", syntax: "/blog", kind: "jump", desc: "Open the Blog page."},
    {name: "/home", syntax: "/home", kind: "jump", desc: "Return to the homepage."},
    {name: "/404", syntax: "/404", kind: "jump", desc: "Enter the 404 page on purpose."},
    {name: "/latest", syntax: "/latest", kind: "query", desc: "Show the latest updated articles."},
    {name: "/count", syntax: "/count", kind: "stats", desc: "Show article, category, tag, word and PDF counts."},
    {name: "/summon", syntax: "/summon <math|note|life|cat|keyword>", kind: "query", fill: "/summon ", desc: "Summon a group of articles."},
    {name: "/math", syntax: "/math <keyword>", kind: "search", fill: "/math ", desc: "Search LaTeX source snippets such as \\bm or \\Omega."},
    {name: "/pdf", syntax: "/pdf", kind: "query", desc: "List articles with PDF readers or downloads."},
    {name: "/zen", syntax: "/zen", kind: "view", desc: "Enable quiet reading mode."},
    {name: "/unzen", syntax: "/unzen", kind: "view", desc: "Leave quiet reading mode."},
    {name: "/theme", syntax: "/theme [light|dark|ocean|terminal|cat]", kind: "view", fill: "/theme ", desc: "Switch the color theme."},
    {name: "/clear", syntax: "/clear", kind: "system", desc: "Clear the console result."},
    {name: "/kill", syntax: "/kill", kind: "system", desc: "Crash the page, politely."},
    {name: "/help", syntax: "/help", kind: "system", desc: "Show all available commands and examples."}
  ];

  function normalize(text) {
    return String(text || "").toLowerCase();
  }

  function escapeHtml(text) {
    return String(text || "").replace(/[&<>"']/g, function(ch) {
      return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[ch];
    });
  }

  function unique(values) {
    var seen = {};
    var out = [];
    values.forEach(function(value) {
      if (!value || seen[value]) return;
      seen[value] = true;
      out.push(value);
    });
    return out;
  }

  function allTags() {
    var tags = [];
    posts.forEach(function(post) {
      tags = tags.concat(post.tags || []);
    });
    return unique(tags).sort();
  }

  function allCategories() {
    var categories = [];
    posts.forEach(function(post) {
      categories = categories.concat(post.categories || []);
    });
    return unique(categories).sort();
  }

  function navigate(url) {
    window.location.href = url;
  }

  function hideResults() {
    if (resultBox) {
      resultBox.innerHTML = "";
      resultBox.hidden = true;
    }
    commandRows = [];
    suggestionRows = [];
    updateGhost("");
  }

  function updateGhost(text) {
    if (!ghost) return;
    var current = input ? input.value : "";
    var value = String(text || "");
    if (!value || value === current) {
      ghost.textContent = "";
      ghost.hidden = true;
      return;
    }
    ghost.textContent = "Tab → " + value.replace(/\s+$/, " ");
    ghost.hidden = false;
  }

  function firstCompletion() {
    if (suggestionRows.length) return suggestionBase + suggestionRows[selectedSuggestionIndex || 0].value;
    if (commandRows.length) return commandRows[selectedCommandIndex || 0].fill || commandRows[selectedCommandIndex || 0].name;
    return "";
  }

  function postResult(post) {
    return '<a class="zdd-search-result" href="' + post.url + '">'
      + '<span class="zdd-search-title">' + escapeHtml(post.title) + '</span>'
      + '<span class="zdd-search-meta">' + escapeHtml((post.categories || []).join(" / ")) + ' · ' + Number(post.words || 0).toLocaleString() + ' words</span>'
      + '</a>';
  }

  function commandButton(command, index) {
    var active = index === selectedCommandIndex ? " is-active" : "";
    return '<button class="zdd-command-row' + active + '" type="button" data-command-index="' + index + '">'
      + '<span class="zdd-command-main">'
      + '<span class="zdd-command-name">' + escapeHtml(command.name) + '</span>'
      + '<span class="zdd-command-desc">' + escapeHtml(command.desc) + '</span>'
      + '</span>'
      + '<span class="zdd-command-side">'
      + '<span class="zdd-command-kind">' + escapeHtml(command.kind) + '</span>'
      + '<span class="zdd-command-syntax">' + escapeHtml(command.syntax) + '</span>'
      + '</span>'
      + '</button>';
  }

  function suggestionButton(item, index) {
    var active = index === selectedSuggestionIndex ? " is-active" : "";
    return '<button class="zdd-command-row zdd-command-suggestion' + active + '" type="button" data-suggestion-index="' + index + '">'
      + '<span class="zdd-command-main">'
      + '<span class="zdd-command-name">' + escapeHtml(item.label) + '</span>'
      + '<span class="zdd-command-desc">' + escapeHtml(item.desc || "Complete with Tab") + '</span>'
      + '</span>'
      + '<span class="zdd-command-side">'
      + '<span class="zdd-command-kind">' + escapeHtml(item.kind || "arg") + '</span>'
      + '<span class="zdd-command-syntax">' + escapeHtml(suggestionBase + item.value) + '</span>'
      + '</span>'
      + '</button>';
  }

  function matchingOptions(prefix, values, prefixSymbol, kind) {
    var needle = normalize(prefix || "");
    if (!needle) return [];
    return values.filter(function(value) {
      return normalize(value).indexOf(needle) === 0;
    }).slice(0, 12).map(function(value) {
      return {
        value: value,
        label: (prefixSymbol || "") + value,
        kind: kind || "arg"
      };
    });
  }

  function renderSuggestionPanel(base, prefix, prompt, values, prefixSymbol, kind) {
    if (!resultBox) return;
    suggestionBase = base;
    suggestionRows = matchingOptions(prefix, values, prefixSymbol, kind);
    commandRows = [];
    selectedSuggestionIndex = Math.max(0, Math.min(selectedSuggestionIndex, suggestionRows.length - 1));
    if (!prefix) {
      resultBox.innerHTML = "";
      resultBox.hidden = true;
      updateGhost("");
      return;
    }
    resultBox.innerHTML = '<div class="zdd-command-panel">'
      + '<div class="zdd-command-prompt">' + escapeHtml(prompt || "Completion") + '</div>'
      + (suggestionRows.length ? suggestionRows.map(suggestionButton).join("") : '<div class="zdd-command-empty">No matching option found.</div>')
      + '</div>';
    resultBox.hidden = false;
    updateGhost(firstCompletion());
  }

  function renderCommandParameters(raw) {
    var randomTag = raw.match(/^\/random\s+tag:([^\s]*)$/i);
    if (randomTag) {
      renderSuggestionPanel("/random tag:", randomTag[1], "/random tag:<tag>", allTags(), "#", "tag");
      return true;
    }
    var tagCommand = raw.match(/^\/tag\s+([^\s]*)$/i);
    if (tagCommand) {
      renderSuggestionPanel("/tag ", tagCommand[1], "/tag <tag>", allTags(), "#", "tag");
      return true;
    }
    var themeCommand = raw.match(/^\/theme\s+([^\s]*)$/i);
    if (themeCommand) {
      renderSuggestionPanel("/theme ", themeCommand[1], "/theme <preset>", ["light", "dark", "ocean", "terminal", "cat"], "", "theme");
      return true;
    }
    var summonCommand = raw.match(/^\/summon\s+([^\s]*)$/i);
    if (summonCommand) {
      renderSuggestionPanel("/summon ", summonCommand[1], "/summon <type>", ["math", "note", "life", "cat"], "", "type");
      return true;
    }
    return false;
  }

  function renderCommandPanel(query, showAll) {
    if (!resultBox) return;
    var raw = String(query || "").trim();
    if (!showAll && renderCommandParameters(raw)) return;
    var needle = normalize(raw.replace(/^\//, ""));
    if (!showAll && (!raw || raw === "/" || !needle)) {
      hideResults();
      return;
    }
    commandRows = commands.filter(function(command) {
      if (showAll && !needle) return true;
      return normalize(command.name).replace(/^\//, "").indexOf(needle) === 0;
    });
    suggestionRows = [];
    selectedCommandIndex = Math.max(0, Math.min(selectedCommandIndex, commandRows.length - 1));
    resultBox.innerHTML = '<div class="zdd-command-panel">'
      + (commandRows.length ? commandRows.map(commandButton).join("") : '<div class="zdd-command-empty">No command found.</div>')
      + '</div>';
    resultBox.hidden = false;
    updateGhost(firstCompletion());
  }

  function renderCommandOutput(command, title, body) {
    if (!resultBox) return;
    commandRows = [];
    suggestionRows = [];
    updateGhost("");
    resultBox.innerHTML = '<div class="zdd-command-panel zdd-command-output">'
      + '<div class="zdd-command-prompt">&gt; ' + escapeHtml(command) + '</div>'
      + '<div class="zdd-command-output-title">' + escapeHtml(title) + '</div>'
      + '<div class="zdd-command-output-body">' + body + '</div>'
      + '<div class="zdd-command-hint">Enter: rerun · Esc: close</div>'
      + '</div>';
    resultBox.hidden = false;
  }

  function renderPostOutput(command, title, matches, emptyText) {
    var body = matches.length
      ? '<div class="zdd-command-posts">' + matches.map(postResult).join("") + '</div>'
      : '<div class="zdd-command-empty">' + escapeHtml(emptyText || "No result.") + '</div>';
    renderCommandOutput(command, title, body);
  }

  function completeCommand(command) {
    if (!command || !input) return;
    input.value = command.fill || command.name;
    input.focus();
    renderCommandPanel(input.value);
  }

  function completeSuggestion() {
    if (!input || !suggestionRows.length) return;
    input.value = suggestionBase + suggestionRows[selectedSuggestionIndex || 0].value;
    input.focus();
    renderCommandPanel(input.value);
  }

  function randomPost(items) {
    if (!items.length) return null;
    return items[Math.floor(Math.random() * items.length)];
  }

  function setMaterialTheme(mode) {
    var normalized = normalize(mode || "");
    var current = document.body.getAttribute("data-md-color-scheme") === "slate" ? "dark" : "light";
    if (!normalized) normalized = current === "dark" ? "light" : "dark";
    var preset = "";
    if (normalized === "ocean" || normalized === "terminal" || normalized === "cat") {
      preset = normalized;
      normalized = normalized === "terminal" ? "dark" : "light";
    }
    var scheme = normalized === "dark" ? "slate" : "default";
    var primary = normalized === "dark" ? "black" : "blue";
    var media = normalized === "dark" ? "(prefers-color-scheme: dark)" : "(prefers-color-scheme: light)";
    document.documentElement.classList.add("zdd-theme-fading");
    window.setTimeout(function() {
      document.documentElement.classList.remove("zdd-theme-fading");
    }, 260);
    document.body.setAttribute("data-md-color-scheme", scheme);
    document.body.setAttribute("data-md-color-primary", primary);
    document.body.setAttribute("data-md-color-accent", "indigo");
    if (window.__md_set) {
      window.__md_set("__palette", {
        color: {media: media, scheme: scheme, primary: primary, accent: "indigo"}
      });
    }
    var palette = document.querySelector('input[name="__palette"][data-md-color-scheme="' + scheme + '"]');
    if (palette) {
      palette.checked = true;
      palette.dispatchEvent(new Event("change", {bubbles: true}));
    }
    if (window.zddSetThemePreset) window.zddSetThemePreset(preset);
    return preset || normalized;
  }

  function killPage() {
    var old = document.querySelector(".zdd-kill-screen");
    if (old) old.remove();
    var overlay = document.createElement("div");
    overlay.className = "zdd-kill-screen";
    overlay.innerHTML = '<div class="zdd-kill-box">'
      + '<div>zdd14990.exe has stopped.</div>'
      + '<div>exit code: 0</div>'
      + '<div>press any key to reboot</div>'
      + '</div>';
    document.body.appendChild(overlay);
    document.body.classList.add("zdd-kill-active");
    window.setTimeout(function() {
      function reboot() {
        document.body.classList.remove("zdd-kill-active");
        overlay.remove();
        window.removeEventListener("keydown", reboot);
        overlay.removeEventListener("click", reboot);
        if (input) input.value = "";
        hideResults();
      }
      window.addEventListener("keydown", reboot);
      overlay.addEventListener("click", reboot);
    }, 120);
  }

  function articleText(post) {
    return normalize([
      post.title,
      post.content,
      (post.categories || []).join(" "),
      (post.tags || []).join(" ")
    ].join(" "));
  }

  function summonPosts(arg) {
    var key = normalize(arg || "");
    if (!key) return [];
    if (key === "math") {
      return posts.filter(function(post) {
        var text = articleText(post);
        return /(math|数学|分析|代数|概率|统计|概统|pde|数值|优化|物理|algebra|analysis|probability|statistics|physics)/i.test(text);
      });
    }
    if (key === "note") {
      return posts.filter(function(post) {
        return post.has_pdf || /笔记|notes?/i.test(articleText(post));
      });
    }
    if (key === "life") {
      return posts.filter(function(post) {
        return /life|生活|随笔|misc|其他|russian/i.test(articleText(post));
      });
    }
    if (key === "cat") {
      return posts.filter(function(post) {
        return /cat|猫/i.test(articleText(post));
      });
    }
    return posts.filter(function(post) {
      return articleText(post).indexOf(key) >= 0;
    });
  }

  function rewindArticle(commandLine) {
    var history = window.zddReadArticleHistory ? window.zddReadArticleHistory() : [];
    if (!history.length) {
      renderCommandOutput(commandLine, "No previous article", '<div class="zdd-command-empty">还没有记录到读过的文章。先打开一篇文章，再回来试试 <code>/rewind</code>。</div>');
      return;
    }
    var currentPath = window.location.pathname;
    for (var i = history.length - 1; i >= 0; i--) {
      if (history[i].url && history[i].url !== currentPath) {
        navigate(history[i].url);
        return;
      }
    }
    renderCommandOutput(commandLine, "No previous article", '<div class="zdd-command-empty">目前只有这一篇文章记录。</div>');
  }

  function runCommand(line) {
    var commandLine = String(line || "").trim();
    var parts = commandLine.split(/\s+/);
    var name = normalize(parts[0]);
    var arg = commandLine.slice(parts[0].length).trim();

    if (!commandLine || commandLine === "/") {
      renderCommandPanel(commandLine);
      return;
    }

    if (name === "/help") {
      selectedCommandIndex = 0;
      renderCommandPanel("", true);
      return;
    }

    if (name === "/clear") {
      if (input) input.value = "";
      hideResults();
      return;
    }

    if (name === "/home") {
      navigate("./");
      return;
    }

    if (name === "/tags") {
      navigate("tags/");
      return;
    }

    if (name === "/blog") {
      navigate("blog/");
      return;
    }

    if (name === "/404") {
      navigate("404/");
      return;
    }

    if (name === "/rewind") {
      rewindArticle(commandLine);
      return;
    }

    if (name === "/tag") {
      if (!arg) {
        renderSuggestionPanel("/tag ", "", "/tag <tag>", allTags(), "#", "tag");
        return;
      }
      navigate("tags/?tag=" + encodeURIComponent(arg.replace(/^#/, "")));
      return;
    }

    if (name === "/latest") {
      renderPostOutput(commandLine, "Latest articles", posts.slice(0, 6), "No articles found.");
      return;
    }

    if (name === "/count") {
      var words = posts.reduce(function(sum, post) { return sum + (Number(post.words) || 0); }, 0);
      var pdfCount = posts.filter(function(post) { return post.has_pdf; }).length;
      var latest = posts.reduce(function(max, post) { return post.date > max ? post.date : max; }, "");
      var stats = [
        ["Articles", posts.length.toLocaleString()],
        ["Categories", allCategories().length.toLocaleString()],
        ["Tags", allTags().length.toLocaleString()],
        ["Words", words.toLocaleString()],
        ["PDF notes", pdfCount.toLocaleString()],
        ["Last update", latest || "-"]
      ].map(function(row) {
        return '<span class="zdd-command-stat"><b>' + escapeHtml(row[1]) + '</b><small>' + escapeHtml(row[0]) + '</small></span>';
      }).join("");
      renderCommandOutput(commandLine, "Site statistics", '<div class="zdd-command-stats">' + stats + '</div>');
      return;
    }

    if (name === "/pdf") {
      renderPostOutput(commandLine, "PDF articles", posts.filter(function(post) { return post.has_pdf; }).slice(0, 10), "No PDF articles found.");
      return;
    }

    if (name === "/math") {
      if (!arg) {
        renderCommandOutput(commandLine, "Missing keyword", '<div class="zdd-command-empty">Usage: <code>/math &lt;keyword&gt;</code>, for example <code>/math \\bm</code>.</div>');
        return;
      }
      var mathMatches = posts.filter(function(post) {
        return normalize((post.source || "") + " " + (post.content || "")).indexOf(normalize(arg)) >= 0;
      }).slice(0, 10);
      renderPostOutput(commandLine, "Math source search", mathMatches, "No matching formula source found.");
      return;
    }

    if (name === "/summon") {
      if (!arg) {
        renderCommandOutput(commandLine, "Summon what?", '<div class="zdd-command-empty">Try <code>/summon math</code>, <code>/summon note</code>, <code>/summon life</code>, or any keyword.</div>');
        return;
      }
      renderPostOutput(commandLine, "Summoned articles", summonPosts(arg).slice(0, 10), "Nothing answered the summon.");
      return;
    }

    if (name === "/zen") {
      if (window.zddSetZen) window.zddSetZen(true);
      renderCommandOutput(commandLine, "Zen mode enabled", '<div class="zdd-command-empty">Header and sidebars are softened away. Use <code>/unzen</code> to restore.</div>');
      return;
    }

    if (name === "/unzen") {
      if (window.zddSetZen) window.zddSetZen(false);
      renderCommandOutput(commandLine, "Zen mode disabled", '<div class="zdd-command-empty">Layout restored.</div>');
      return;
    }

    if (name === "/theme") {
      var selected = setMaterialTheme(arg);
      renderCommandOutput(commandLine, "Theme switched", '<div class="zdd-command-empty">Current theme: <code>' + escapeHtml(selected) + '</code>.</div>');
      return;
    }

    if (name === "/kill") {
      killPage();
      return;
    }

    if (name === "/random") {
      var pool = posts.slice();
      if (arg) {
        var pair = arg.split(":");
        var key = normalize(pair[0]);
        var value = normalize(pair.slice(1).join(":").trim());
        if (key === "tag" && value) {
          pool = posts.filter(function(post) {
            return (post.tags || []).some(function(tag) { return normalize(tag) === value; });
          });
        } else if (key === "category" && value) {
          pool = posts.filter(function(post) {
            return (post.categories || []).some(function(category) { return normalize(category) === value; });
          });
        }
      }
      var picked = randomPost(pool);
      if (picked) {
        navigate(picked.url);
      } else {
        renderCommandOutput(commandLine, "No article found", '<div class="zdd-command-empty">Try <code>/random</code> or check the tag/category name.</div>');
      }
      return;
    }

    renderCommandOutput(commandLine, "Unknown command", '<div class="zdd-command-empty">Command not found. Try <code>/help</code>.</div>');
  }

  function renderContentResults() {
    if (!input || !resultBox) return;
    var query = normalize(input.value.trim());
    if (!query) {
      hideResults();
      return;
    }
    commandRows = [];
    suggestionRows = [];
    updateGhost("");
    var matches = posts.filter(function(post) {
      return articleText(post).indexOf(query) >= 0;
    });
    resultBox.innerHTML = matches.slice(0, 8).map(postResult).join("");
    resultBox.hidden = matches.length === 0;
  }

  function renderResults() {
    if (!input) return;
    selectedCommandIndex = 0;
    selectedSuggestionIndex = 0;
    if (input.value.trim().charAt(0) === "/") {
      renderCommandPanel(input.value);
    } else {
      renderContentResults();
    }
  }

  function moveSelection(rows, selected, direction) {
    if (!rows.length) return selected;
    selected += direction;
    if (selected < 0) selected = rows.length - 1;
    if (selected >= rows.length) selected = 0;
    return selected;
  }

  if (form && input) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      if (input.value.trim().charAt(0) === "/") {
        runCommand(input.value);
      } else {
        renderContentResults();
      }
    });

    input.addEventListener("input", renderResults);

    input.addEventListener("keydown", function(event) {
      var isCommand = input.value.trim().charAt(0) === "/";
      if (event.key === "Escape") {
        hideResults();
        return;
      }
      if (!isCommand) {
        if (event.key === "Enter") {
          event.preventDefault();
          renderContentResults();
        }
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (suggestionRows.length) {
          selectedSuggestionIndex = moveSelection(suggestionRows, selectedSuggestionIndex, event.key === "ArrowDown" ? 1 : -1);
        } else {
          selectedCommandIndex = moveSelection(commandRows, selectedCommandIndex, event.key === "ArrowDown" ? 1 : -1);
        }
        renderCommandPanel(input.value);
      } else if (event.key === "Tab") {
        event.preventDefault();
        if (suggestionRows.length) {
          completeSuggestion();
        } else {
          completeCommand(commandRows[selectedCommandIndex]);
        }
      } else if (event.key === "Enter") {
        event.preventDefault();
        runCommand(input.value);
      }
    });

    resultBox.addEventListener("click", function(event) {
      var suggestionButton = event.target.closest(".zdd-command-suggestion");
      if (suggestionButton) {
        selectedSuggestionIndex = Number(suggestionButton.getAttribute("data-suggestion-index"));
        completeSuggestion();
        return;
      }
      var button = event.target.closest(".zdd-command-row");
      if (!button) return;
      completeCommand(commandRows[Number(button.getAttribute("data-command-index"))]);
    });

    hideResults();
    var initialQuery = new URLSearchParams(window.location.search).get("q");
    if (initialQuery) {
      input.value = initialQuery;
      if (history.replaceState) {
        history.replaceState(null, "", window.location.pathname + window.location.hash);
      }
      if (initialQuery.trim().charAt(0) === "/") {
        runCommand(initialQuery);
      } else {
        renderContentResults();
      }
    }
  }
})();
</script>
