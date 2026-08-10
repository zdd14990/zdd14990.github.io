(function() {
  var state = {
    posts: [],
    loaded: false,
    input: null,
    resultBox: null,
    ghost: null,
    overlay: null,
    selectedCommandIndex: 0,
    selectedSuggestionIndex: 0,
    commandRows: [],
    suggestionRows: [],
    suggestionBase: "",
    activeScope: "home"
  };

  var helpCategories = ["Navigation", "Knowledge", "Tools", "Site"];
  var commands = [
    {name: "/lab", syntax: "/lab", kind: "jump", category: "Navigation", desc: "Open the experiment index."},
    {name: "/next", syntax: "/next", kind: "jump", category: "Navigation", advanced: true, desc: "Open the next article in this folder."},
    {name: "/prev", syntax: "/prev", kind: "jump", category: "Navigation", advanced: true, desc: "Open the previous article in this folder."},
    {name: "/rewind", syntax: "/rewind", kind: "jump", category: "Navigation", advanced: true, desc: "Return to the last article you opened."},
    {name: "/random", syntax: "/random [tag:<tag>|category:<category>]", kind: "jump", category: "Knowledge", fill: "/random ", desc: "Open a random post or lab."},
    {name: "/latest", syntax: "/latest", kind: "query", category: "Knowledge", desc: "Show the latest dated articles."},
    {name: "/tag", syntax: "/tag <tag>", kind: "jump", category: "Knowledge", fill: "/tag ", desc: "Open the result page for a tag."},
    {name: "/pdf", syntax: "/pdf", kind: "query", category: "Knowledge", advanced: true, desc: "List articles with PDF readers or downloads."},
    {name: "/tex", syntax: "/tex [formula]", kind: "jump", category: "Tools", fill: "/tex ", desc: "Open the LaTeX playground, optionally prefilled."},
    {name: "/plot", syntax: "/plot [expression]", kind: "jump", category: "Tools", fill: "/plot ", desc: "Open the function plotter, optionally prefilled."},
    {name: "/life", syntax: "/life", kind: "jump", category: "Tools", desc: "Open Conway's Game of Life."},
    {name: "/theme", syntax: "/theme [light|dark|ocean|terminal|cat]", kind: "view", category: "Site", fill: "/theme ", desc: "Switch the color theme."},
    {name: "/count", syntax: "/count", kind: "stats", category: "Site", desc: "Show content, category, tag, word and PDF counts."},
    {name: "/log", syntax: "/log", kind: "query", category: "Site", advanced: true, desc: "Show recent update notes."},
    {name: "/ip", syntax: "/ip", kind: "query", category: "Site", advanced: true, desc: "Show your visitor IP address."},
    {name: "/404", syntax: "/404", kind: "jump", category: "Site", advanced: true, desc: "Enter the 404 page on purpose."},
    {name: "/clear", syntax: "/clear", kind: "system", category: "Site", desc: "Clear the console result."},
    {name: "/kill", syntax: "/kill", kind: "system", category: "Site", advanced: true, desc: "Crash the page, politely."},
    {name: "/help", syntax: "/help [advanced]", kind: "system", category: "Site", fill: "/help ", desc: "Show commands grouped by purpose."}
  ];
  var updateLogs = [
    {
      date: "2026-08-10",
      title: "Knowledge playground",
      detail: "Added Lab experiments, reusable article widgets, internal article previews, and matching console routes."
    },
    {
      date: "2026-07-06",
      title: "Global command console",
      detail: "Moved the homepage search console into a reusable site-wide overlay with command completion, Ctrl+Enter launch, and shared search data."
    },
    {
      date: "2026-07-06",
      title: "Command set cleanup",
      detail: "Reduced /help to common commands, moved power tools to /help advanced, and added /next, /prev, /log, /tex and /ip."
    },
    {
      date: "2026-07-06",
      title: "Navigation simplification",
      detail: "Kept Friends on the homepage only and replaced it elsewhere with a lightweight Search entry."
    },
    {
      date: "2026-07-05",
      title: "Blog catalog redesign",
      detail: "Rebuilt the Blog page as an expandable catalog with category cards, article cards, and smoother folder transitions."
    },
    {
      date: "2026-07-05",
      title: "Theme polish",
      detail: "Switched the old image background to solid color themes and unified card colors across Home, Blog, Tags and article pages."
    }
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

  function loadPosts() {
    if (state.loaded) return Promise.resolve(state.posts);
    if (window.zddContentIndexPromise) {
      return window.zddContentIndexPromise.then(function(data) {
        state.posts = Array.isArray(data) ? data : [];
        state.loaded = true;
        return state.posts;
      });
    }
    var embedded = document.getElementById("zdd-search-data");
    if (embedded) {
      try {
        state.posts = JSON.parse(embedded.textContent || "[]");
        state.loaded = true;
        window.zddContentIndexPromise = Promise.resolve(state.posts);
        return Promise.resolve(state.posts);
      } catch (e) {}
    }
    var url = window.zddSearchDataUrl || "/assets/zdd-search-data.json";
    window.zddContentIndexPromise = fetch(url, {credentials: "same-origin", cache: "no-store"})
      .then(function(response) {
        if (!response.ok) throw new Error("Search data unavailable");
        return response.json();
      })
      .then(function(data) {
        state.posts = Array.isArray(data) ? data : [];
        state.loaded = true;
        return state.posts;
      })
      .catch(function() {
        state.posts = [];
        state.loaded = true;
        return state.posts;
      });
    return window.zddContentIndexPromise;
  }

  function allTags() {
    var tags = [];
    state.posts.forEach(function(post) {
      tags = tags.concat(post.tags || []);
    });
    return unique(tags).sort();
  }

  function allCategories() {
    var categories = [];
    state.posts.forEach(function(post) {
      if (post.type && post.type !== "post") return;
      categories = categories.concat(post.categories || []);
    });
    return unique(categories).sort();
  }

  function siteUrl(path) {
    var base = window.zddSearchDataUrl || "/assets/zdd-search-data.json";
    var prefix = "/";
    try {
      var url = new URL(base, window.location.href);
      var marker = "/assets/zdd-search-data.json";
      prefix = url.pathname.endsWith(marker) ? url.pathname.slice(0, url.pathname.length - marker.length) + "/" : "/";
    } catch (e) {}
    return prefix + String(path || "").replace(/^\/+/, "");
  }

  function navigate(url) {
    window.location.href = url;
  }

  function hideResults() {
    if (state.resultBox) {
      state.resultBox.innerHTML = "";
      state.resultBox.hidden = true;
    }
    state.commandRows = [];
    state.suggestionRows = [];
    updateGhost("");
  }

  function updateHomeSearchState() {
    var homeInput = document.getElementById("home-search-input");
    if (!homeInput) return;
    document.body.classList.toggle("home-search-active", !!homeInput.value.trim());
  }

  function updateGhost(text) {
    if (!state.ghost || !state.input) return;
    var current = state.input.value;
    var value = String(text || "");
    if (!value || value === current) {
      state.ghost.textContent = "";
      state.ghost.hidden = true;
      return;
    }
    state.ghost.textContent = "Tab -> " + value.replace(/\s+$/, " ");
    state.ghost.hidden = false;
  }

  function firstCompletion() {
    if (state.suggestionRows.length) return state.suggestionBase + state.suggestionRows[state.selectedSuggestionIndex || 0].value;
    if (state.commandRows.length) return state.commandRows[state.selectedCommandIndex || 0].fill || state.commandRows[state.selectedCommandIndex || 0].name;
    return "";
  }

  function postResult(post) {
    var contentType = post.type || "post";
    var category = (post.categories || []).join(" / ") || contentType;
    var detail = contentType === "post"
      ? category + " · " + Number(post.words || 0).toLocaleString() + " words"
      : category + (post.date ? " · " + post.date : "");
    return '<a class="zdd-search-result" href="' + escapeHtml(post.url) + '">'
      + '<span class="zdd-search-title">' + escapeHtml(post.title) + '</span>'
      + '<span class="zdd-search-meta">' + escapeHtml(detail) + '</span>'
      + '</a>';
  }

  function commandButton(command, index) {
    var active = index === state.selectedCommandIndex ? " is-active" : "";
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
    var active = index === state.selectedSuggestionIndex ? " is-active" : "";
    return '<button class="zdd-command-row zdd-command-suggestion' + active + '" type="button" data-suggestion-index="' + index + '">'
      + '<span class="zdd-command-main">'
      + '<span class="zdd-command-name">' + escapeHtml(item.label) + '</span>'
      + '<span class="zdd-command-desc">' + escapeHtml(item.desc || "Complete with Tab") + '</span>'
      + '</span>'
      + '<span class="zdd-command-side">'
      + '<span class="zdd-command-kind">' + escapeHtml(item.kind || "arg") + '</span>'
      + '<span class="zdd-command-syntax">' + escapeHtml(state.suggestionBase + item.value) + '</span>'
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
    if (!state.resultBox) return;
    state.suggestionBase = base;
    state.suggestionRows = matchingOptions(prefix, values, prefixSymbol, kind);
    state.commandRows = [];
    state.selectedSuggestionIndex = Math.max(0, Math.min(state.selectedSuggestionIndex, state.suggestionRows.length - 1));
    if (!prefix) {
      hideResults();
      return;
    }
    state.resultBox.innerHTML = '<div class="zdd-command-panel">'
      + '<div class="zdd-command-prompt">' + escapeHtml(prompt || "Completion") + '</div>'
      + (state.suggestionRows.length ? state.suggestionRows.map(suggestionButton).join("") : '<div class="zdd-command-empty">No matching option found.</div>')
      + '</div>';
    state.resultBox.hidden = false;
    updateGhost(firstCompletion());
  }

  function renderCommandParameters(raw) {
    var randomTag = raw.match(/^\/random\s+tag:([^\s]*)$/i);
    if (randomTag) {
      renderSuggestionPanel("/random tag:", randomTag[1], "/random tag:<tag>", allTags(), "#", "tag");
      return true;
    }
    var randomCategory = raw.match(/^\/random\s+category:([^\s]*)$/i);
    if (randomCategory) {
      renderSuggestionPanel("/random category:", randomCategory[1], "/random category:<category>", allCategories(), "", "category");
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
    return false;
  }

  function renderCommandPanel(query, mode) {
    if (!state.resultBox) return;
    var raw = String(query || "").trim();
    if (mode !== "help" && renderCommandParameters(raw)) return;
    var needle = normalize(raw.replace(/^\//, "").split(/\s+/)[0]);
    var pool = commands;
    if (mode === "help") {
      pool = commands.filter(function(command) {
        return !command.advanced;
      });
    } else if (mode === "advanced") {
      pool = commands.filter(function(command) {
        return command.advanced;
      });
    }
    if (mode !== "help" && mode !== "advanced" && (!raw || raw === "/" || !needle)) {
      hideResults();
      return;
    }
    state.commandRows = pool.filter(function(command) {
      if ((mode === "help" || mode === "advanced") && !needle) return true;
      return normalize(command.name).replace(/^\//, "").indexOf(needle) === 0;
    });
    state.suggestionRows = [];
    state.selectedCommandIndex = Math.max(0, Math.min(state.selectedCommandIndex, state.commandRows.length - 1));
    var rows = state.commandRows.map(commandButton).join("");
    if ((mode === "help" || mode === "advanced") && state.commandRows.length) {
      rows = helpCategories.map(function(category) {
        var grouped = state.commandRows.map(function(command, index) {
          return {command: command, index: index};
        }).filter(function(item) {
          return item.command.category === category;
        });
        if (!grouped.length) return "";
        return '<section class="zdd-command-group"><div class="zdd-command-group-title">' + escapeHtml(category) + '</div>'
          + grouped.map(function(item) { return commandButton(item.command, item.index); }).join("") + '</section>';
      }).join("");
    }
    state.resultBox.innerHTML = '<div class="zdd-command-panel">'
      + (rows || '<div class="zdd-command-empty">No command found.</div>') + '</div>';
    state.resultBox.hidden = false;
    updateGhost(firstCompletion());
  }

  function renderCommandOutput(command, title, body) {
    if (!state.resultBox) return;
    state.commandRows = [];
    state.suggestionRows = [];
    updateGhost("");
    state.resultBox.innerHTML = '<div class="zdd-command-panel zdd-command-output">'
      + '<div class="zdd-command-prompt">&gt; ' + escapeHtml(command) + '</div>'
      + '<div class="zdd-command-output-title">' + escapeHtml(title) + '</div>'
      + '<div class="zdd-command-output-body">' + body + '</div>'
      + '<div class="zdd-command-hint">Enter: rerun · Esc: close</div>'
      + '</div>';
    state.resultBox.hidden = false;
  }

  function renderPostOutput(command, title, matches, emptyText) {
    var body = matches.length
      ? '<div class="zdd-command-posts">' + matches.map(postResult).join("") + '</div>'
      : '<div class="zdd-command-empty">' + escapeHtml(emptyText || "No result.") + '</div>';
    renderCommandOutput(command, title, body);
  }

  function completeCommand(command) {
    if (!command || !state.input) return;
    state.input.value = command.fill || command.name;
    state.input.focus();
    renderCommandPanel(state.input.value);
  }

  function completeSuggestion() {
    if (!state.input || !state.suggestionRows.length) return;
    state.input.value = state.suggestionBase + state.suggestionRows[state.selectedSuggestionIndex || 0].value;
    state.input.focus();
    renderCommandPanel(state.input.value);
  }

  function randomPost(items) {
    if (!items.length) return null;
    return items[Math.floor(Math.random() * items.length)];
  }

  function currentArticleIndex() {
    var current = window.location.pathname.replace(/\/index\.html$/, "/");
    return state.posts.findIndex(function(post) {
      try {
        return new URL(post.url, window.location.origin).pathname.replace(/\/index\.html$/, "/") === current;
      } catch (e) {
        return post.url === current;
      }
    });
  }

  function currentArticle() {
    var index = currentArticleIndex();
    return index >= 0 ? state.posts[index] : null;
  }

  function jumpRelative(commandLine, direction) {
    var current = currentArticle();
    if (!current) {
      renderCommandOutput(commandLine, "No current article", '<div class="zdd-command-empty">Open an article first, then use this command.</div>');
      return;
    }
    var targetUrl = direction > 0 ? current.next_url : current.prev_url;
    if (targetUrl) {
      navigate(targetUrl);
    } else {
      renderCommandOutput(commandLine, "Folder edge", '<div class="zdd-command-empty">No more article in this folder direction.</div>');
    }
  }

  function rewindArticle(commandLine) {
    var history = window.zddReadArticleHistory ? window.zddReadArticleHistory() : [];
    if (!history.length) {
      renderCommandOutput(commandLine, "No previous article", '<div class="zdd-command-empty">No article history yet.</div>');
      return;
    }
    var currentPath = window.location.pathname;
    for (var i = history.length - 1; i >= 0; i--) {
      if (history[i].url && history[i].url !== currentPath) {
        navigate(history[i].url);
        return;
      }
    }
    renderCommandOutput(commandLine, "No previous article", '<div class="zdd-command-empty">Only the current article is in history.</div>');
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
        if (state.input) state.input.value = "";
        hideResults();
      }
      window.addEventListener("keydown", reboot);
      overlay.addEventListener("click", reboot);
    }, 120);
  }

  function articleText(post) {
    return normalize([
      post.title,
      post.preview,
      post.content,
      (post.categories || []).join(" "),
      (post.tags || []).join(" ")
    ].join(" "));
  }

  function renderLog(commandLine) {
    var rows = updateLogs.map(function(item) {
      return '<div class="zdd-log-row">'
        + '<span>' + escapeHtml(item.date) + '</span>'
        + '<b>' + escapeHtml(item.title) + '</b>'
        + '<small>' + escapeHtml(item.detail) + '</small>'
        + '</div>';
    }).join("");
    renderCommandOutput(commandLine, "Recent front-end changes", '<div class="zdd-log-list">' + rows + '</div>');
  }

  function renderIp(commandLine) {
    renderCommandOutput(commandLine, "Visitor IP", '<div class="zdd-command-empty">Checking...</div>');
    fetch("https://api.ipify.org?format=json")
      .then(function(response) { return response.json(); })
      .then(function(data) {
        renderCommandOutput(commandLine, "Visitor IP", '<div class="zdd-ip-value">' + escapeHtml(data.ip || "unknown") + '</div>');
      })
      .catch(function() {
        renderCommandOutput(commandLine, "Visitor IP", '<div class="zdd-command-empty">Unable to read IP from this network.</div>');
      });
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
      state.selectedCommandIndex = 0;
      renderCommandPanel("", normalize(arg) === "advanced" ? "advanced" : "help");
      return;
    }

    if (name === "/clear") {
      if (state.input) state.input.value = "";
      hideResults();
      updateHomeSearchState();
      return;
    }

    if (name === "/lab") {
      navigate(siteUrl("lab/"));
      return;
    }

    if (name === "/life") {
      navigate(siteUrl("lab/life/"));
      return;
    }

    if (name === "/404") {
      navigate(siteUrl("404/"));
      return;
    }

    if (name === "/rewind") {
      rewindArticle(commandLine);
      return;
    }

    if (name === "/next") {
      jumpRelative(commandLine, 1);
      return;
    }

    if (name === "/prev") {
      jumpRelative(commandLine, -1);
      return;
    }

    if (name === "/tag") {
      if (!arg) {
        renderSuggestionPanel("/tag ", "", "/tag <tag>", allTags(), "#", "tag");
        return;
      }
      navigate(siteUrl("tags/?tag=" + encodeURIComponent(arg.replace(/^#/, ""))));
      return;
    }

    if (name === "/latest") {
      var publishedPosts = state.posts.filter(function(post) {
        return (!post.type || post.type === "post") && post.published;
      });
      renderPostOutput(commandLine, "Latest articles", publishedPosts.slice(0, 6), "No articles found.");
      return;
    }

    if (name === "/log") {
      renderLog(commandLine);
      return;
    }

    if (name === "/count") {
      var articles = state.posts.filter(function(post) { return !post.type || post.type === "post"; });
      var labItems = state.posts.filter(function(post) { return post.type === "lab"; });
      var words = state.posts.reduce(function(sum, post) { return sum + (Number(post.words) || 0); }, 0);
      var pdfCount = articles.filter(function(post) { return post.has_pdf; }).length;
      var latest = state.posts.reduce(function(max, post) {
        return post.published && post.date > max ? post.date : max;
      }, "");
      var stats = [
        ["Articles", articles.length.toLocaleString()],
        ["Lab items", labItems.length.toLocaleString()],
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
      renderPostOutput(commandLine, "PDF articles", state.posts.filter(function(post) {
        return (!post.type || post.type === "post") && post.has_pdf;
      }).slice(0, 10), "No PDF articles found.");
      return;
    }

    if (name === "/tex") {
      navigate(siteUrl("lab/tex/" + (arg ? "?formula=" + encodeURIComponent(arg) : "")));
      return;
    }

    if (name === "/plot") {
      navigate(siteUrl("lab/plot/" + (arg ? "?expression=" + encodeURIComponent(arg) : "")));
      return;
    }

    if (name === "/ip") {
      renderIp(commandLine);
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
      var pool = state.posts.slice();
      if (arg) {
        var pair = arg.split(":");
        var key = normalize(pair[0]);
        var value = normalize(pair.slice(1).join(":").trim());
        if (key === "tag" && value) {
          pool = state.posts.filter(function(post) {
            return (post.tags || []).some(function(tag) { return normalize(tag) === value; });
          });
        } else if (key === "category" && value) {
          pool = state.posts.filter(function(post) {
            return (post.categories || []).some(function(category) { return normalize(category) === value; });
          });
        }
      }
      var picked = randomPost(pool);
      if (picked) {
        navigate(picked.url);
      } else {
        renderCommandOutput(commandLine, "No content found", '<div class="zdd-command-empty">Try <code>/random</code> or check the tag/category name.</div>');
      }
      return;
    }

    if (name === "/pixiv") {
      var r18 = normalize(arg) === "r18";
      var label = r18 ? "Pixiv R18 排行榜" : "Pixiv 排行榜";
      var dataUrl = r18 ? "assets/pixiv-r18-ranking.json" : "assets/pixiv-ranking.json";
      renderCommandOutput(commandLine, label, '<div class="zdd-command-empty">Fetching...</div>');
      fetch(siteUrl(dataUrl), {credentials: "same-origin", cache: "no-store"})
        .then(function(response) {
          if (!response.ok) throw new Error("No ranking data");
          return response.json();
        })
        .then(function(items) {
          if (!items.length) throw new Error("Empty ranking");
          var picked = items[Math.floor(Math.random() * items.length)];
          var imgSrc = "https://pixiv.cat/" + picked.id + ".jpg";
          var title = escapeHtml(picked.title || "Untitled");
          var link = picked.url || ("https://www.pixiv.net/artworks/" + picked.id);
          renderCommandOutput(commandLine, label,
            '<a class="zdd-pixiv-card" href="' + escapeHtml(link) + '" target="_blank" rel="noopener">'
            + '<img src="' + escapeHtml(imgSrc) + '" alt="' + title + '" loading="lazy">'
            + '<span class="zdd-pixiv-title">' + title + '</span>'
            + '</a>'
          );
        })
        .catch(function(err) {
          renderCommandOutput(commandLine, label, '<div class="zdd-command-empty">No ranking data available. Try building locally with a PIXIV_SESSION.</div>');
        });
      return;
    }


    renderCommandOutput(commandLine, "Unknown command", '<div class="zdd-command-empty">Command not found. Try <code>/help</code> or <code>/help advanced</code>.</div>');
  }

  function renderContentResults() {
    if (!state.input || !state.resultBox) return;
    var query = normalize(state.input.value.trim());
    if (!query) {
      hideResults();
      return;
    }
    state.commandRows = [];
    state.suggestionRows = [];
    updateGhost("");
    var matches = state.posts.filter(function(post) {
      return articleText(post).indexOf(query) >= 0;
    });
    state.resultBox.innerHTML = matches.slice(0, 8).map(postResult).join("");
    state.resultBox.hidden = matches.length === 0;
  }

  function renderResults() {
    if (!state.input) return;
    updateHomeSearchState();
    loadPosts().then(function() {
      state.selectedCommandIndex = 0;
      state.selectedSuggestionIndex = 0;
      var value = state.input.value.trim();
      if (value.charAt(0) === "/") {
        renderCommandPanel(value);
      } else {
        renderContentResults();
      }
    });
  }

  function moveSelection(rows, selected, direction) {
    if (!rows.length) return selected;
    selected += direction;
    if (selected < 0) selected = rows.length - 1;
    if (selected >= rows.length) selected = 0;
    return selected;
  }

  function bindSearch(form, input, resultBox, ghost, scope) {
    if (!form || !input || form.dataset.zddBound === "1") return;
    form.dataset.zddBound = "1";
    state.input = input;
    state.resultBox = resultBox;
    state.ghost = ghost;
    state.activeScope = scope || "home";

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      loadPosts().then(function() {
        if (input.value.trim().charAt(0) === "/") {
          runCommand(input.value);
        } else {
          renderContentResults();
        }
      });
    });

    input.addEventListener("focus", function() {
      state.input = input;
      state.resultBox = resultBox;
      state.ghost = ghost;
      updateHomeSearchState();
    });

    input.addEventListener("input", renderResults);

    input.addEventListener("keydown", function(event) {
      var isCommand = input.value.trim().charAt(0) === "/";
      if (event.key === "Escape") {
        if (scope === "modal") closeModal();
        else {
          hideResults();
          updateHomeSearchState();
        }
        return;
      }
      if (!isCommand) {
        if (event.key === "Enter") {
          event.preventDefault();
          loadPosts().then(renderContentResults);
        }
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (state.suggestionRows.length) {
          state.selectedSuggestionIndex = moveSelection(state.suggestionRows, state.selectedSuggestionIndex, event.key === "ArrowDown" ? 1 : -1);
        } else {
          state.selectedCommandIndex = moveSelection(state.commandRows, state.selectedCommandIndex, event.key === "ArrowDown" ? 1 : -1);
        }
        renderCommandPanel(input.value);
      } else if (event.key === "Tab") {
        event.preventDefault();
        if (state.suggestionRows.length) {
          completeSuggestion();
        } else {
          completeCommand(state.commandRows[state.selectedCommandIndex]);
        }
      } else if (event.key === "Enter") {
        event.preventDefault();
        loadPosts().then(function() {
          runCommand(input.value);
        });
      }
    });

    if (resultBox) {
      resultBox.addEventListener("click", function(event) {
        var suggestion = event.target.closest(".zdd-command-suggestion");
        if (suggestion) {
          state.selectedSuggestionIndex = Number(suggestion.getAttribute("data-suggestion-index"));
          completeSuggestion();
          return;
        }
        var button = event.target.closest(".zdd-command-row");
        if (!button) return;
        completeCommand(state.commandRows[Number(button.getAttribute("data-command-index"))]);
      });
    }
  }

  function createModal() {
    if (state.overlay) return;
    var overlay = document.createElement("div");
    overlay.className = "zdd-global-search";
    overlay.hidden = true;
    overlay.innerHTML = '<div class="zdd-global-search-backdrop" data-zdd-close-search></div>'
      + '<div class="zdd-global-search-dialog" role="dialog" aria-modal="true" aria-label="Search">'
      + '<form class="minimal-search" id="zdd-global-search-form">'
      + '<input id="zdd-global-search-input" type="search" placeholder="Search or type /help" autocomplete="off" aria-label="Search articles or commands">'
      + '</form>'
      + '<div class="minimal-search-ghost" id="zdd-global-search-ghost" aria-hidden="true"></div>'
      + '<div class="minimal-search-results" id="zdd-global-search-results"></div>'
      + '</div>';
    document.body.appendChild(overlay);
    state.overlay = overlay;
    bindSearch(
      overlay.querySelector("#zdd-global-search-form"),
      overlay.querySelector("#zdd-global-search-input"),
      overlay.querySelector("#zdd-global-search-results"),
      overlay.querySelector("#zdd-global-search-ghost"),
      "modal"
    );
    overlay.addEventListener("click", function(event) {
      if (event.target.closest("[data-zdd-close-search]")) closeModal();
    });
  }

  function openModal() {
    createModal();
    state.overlay.hidden = false;
    document.body.classList.add("zdd-search-open");
    var input = state.overlay.querySelector("#zdd-global-search-input");
    var resultBox = state.overlay.querySelector("#zdd-global-search-results");
    var ghost = state.overlay.querySelector("#zdd-global-search-ghost");
    state.input = input;
    state.resultBox = resultBox;
    state.ghost = ghost;
    hideResults();
    window.setTimeout(function() {
      input.focus();
      input.select();
    }, 30);
  }

  function closeModal() {
    if (!state.overlay) return;
    state.overlay.hidden = true;
    document.body.classList.remove("zdd-search-open");
    hideResults();
  }

  function initHomeTitle() {
    var target = document.getElementById("typing-text");
    if (!target) return;
    if (target.dataset.zddTypingBound === "1") return;
    target.dataset.zddTypingBound = "1";
    var textLight = '" 去过和没去过的地方 哪里更远 "';
    var textDark = '" 抓住和抓不住的照片 哪张更美 "';
    var timer = 0;
    function type(text) {
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
  }

  function init() {
    initHomeTitle();
    bindSearch(
      document.getElementById("home-search-form"),
      document.getElementById("home-search-input"),
      document.getElementById("home-search-results"),
      document.getElementById("home-search-ghost"),
      "home"
    );
    document.querySelectorAll("[data-zdd-open-search]").forEach(function(button) {
      if (button.dataset.zddBound === "1") return;
      button.dataset.zddBound = "1";
      button.addEventListener("click", openModal);
    });
    if (!window.zddCommandSearchKeyBound) {
      window.zddCommandSearchKeyBound = true;
      document.addEventListener("keydown", function(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
          event.preventDefault();
          openModal();
        }
      });
    }
    loadPosts().then(function() {
      var input = document.getElementById("home-search-input");
      var initialQuery = new URLSearchParams(window.location.search).get("q");
      if (input && initialQuery) {
        state.input = input;
        state.resultBox = document.getElementById("home-search-results");
        state.ghost = document.getElementById("home-search-ghost");
        input.value = initialQuery;
        if (history.replaceState) {
          history.replaceState(null, "", window.location.pathname + window.location.hash);
        }
        if (initialQuery.trim().charAt(0) === "/") runCommand(initialQuery);
        else renderContentResults();
      }
    });
  }

  if (window.document$ && document$.subscribe) {
    document$.subscribe(init);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
