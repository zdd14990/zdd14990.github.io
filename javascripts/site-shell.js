(function() {
  "use strict";

  var historyKey = "zdd.articleHistory";
  var presetKey = "zdd.themePreset";
  var presetClasses = ["zdd-theme-cat", "zdd-theme-ocean", "zdd-theme-terminal"];

  function classifyPage() {
    var path = window.location.pathname.replace(/^\/+/, "").replace(/\/index\.html$/, "").replace(/\/$/, "");
    var parts = path.split("/").filter(Boolean);
    var blogIndex = parts.lastIndexOf("blog");

    document.body.classList.add("zdd-minimal-layout");
    document.body.classList.remove(
      "home-layout",
      "os-layout",
      "blog-index-layout",
      "tag-layout",
      "lab-layout",
      "article-layout"
    );

    if (document.querySelector(".minimal-home") || path === "" || path === "index.html") {
      document.body.classList.add("home-layout");
    } else if (parts.indexOf("os") !== -1) {
      document.body.classList.add("os-layout");
    } else if (document.querySelector(".zdd-blog-catalog") || blogIndex === parts.length - 1) {
      document.body.classList.add("blog-index-layout");
    } else if (document.querySelector(".zdd-tag-page") || parts.indexOf("tags") !== -1) {
      document.body.classList.add("tag-layout");
    } else if (parts.indexOf("lab") !== -1) {
      document.body.classList.add("lab-layout");
    } else if (blogIndex !== -1) {
      document.body.classList.add("article-layout");
    }
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function applyPreset() {
    presetClasses.forEach(function(name) {
      document.body.classList.remove(name);
    });
    var preset = localStorage.getItem(presetKey);
    if (preset && presetClasses.indexOf("zdd-theme-" + preset) >= 0) {
      document.body.classList.add("zdd-theme-" + preset);
    }
  }

  function rememberArticle() {
    if (!document.body.classList.contains("article-layout")) return;
    var titleNode = document.querySelector(".md-content__inner h1");
    var item = {
      url: window.location.pathname,
      title: titleNode ? titleNode.textContent.trim() : document.title,
      time: Date.now()
    };
    var history = readJson(historyKey, []).filter(function(entry) {
      return entry && entry.url && entry.url !== item.url;
    });
    history.push(item);
    localStorage.setItem(historyKey, JSON.stringify(history.slice(-30)));
  }

  window.zddReadArticleHistory = function() {
    return readJson(historyKey, []);
  };

  window.zddSetThemePreset = function(preset) {
    if (preset) {
      localStorage.setItem(presetKey, preset);
    } else {
      localStorage.removeItem(presetKey);
    }
    applyPreset();
  };

  function pageAssetUrl(value) {
    if (!value) return null;
    try {
      var url = new URL(value, window.location.href);
      return url.origin === window.location.origin ? url.href : null;
    } catch (error) {
      return null;
    }
  }

  function loadPageAssets() {
    var root = document.querySelector("[data-zdd-page-style], [data-zdd-page-script]");
    if (!root) return;

    var styleUrl = pageAssetUrl(root.dataset.zddPageStyle);
    if (styleUrl && !document.querySelector('link[data-zdd-page-asset="' + styleUrl + '"]')) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = styleUrl;
      link.dataset.zddPageAsset = styleUrl;
      document.head.appendChild(link);
    }

    var scriptUrl = pageAssetUrl(root.dataset.zddPageScript);
    if (scriptUrl && !document.querySelector('script[data-zdd-page-asset="' + scriptUrl + '"]')) {
      var script = document.createElement("script");
      script.src = scriptUrl;
      script.defer = true;
      script.dataset.zddPageAsset = scriptUrl;
      document.head.appendChild(script);
    }
  }

  function refreshPageState() {
    classifyPage();
    document.body.classList.remove("zdd-zen");
    localStorage.removeItem("zdd.zen");
    applyPreset();
    rememberArticle();
    attachCatalogAnimations(document);
    loadPageAssets();
    updateReadingProgress();
  }

  function ensureReadingProgress() {
    var progressBar = document.getElementById("reading-progress");
    if (progressBar) return progressBar;
    progressBar = document.createElement("div");
    progressBar.id = "reading-progress";
    progressBar.style.cssText = "position:fixed;top:0;left:0;height:3px;background:#e67e96;width:0%;z-index:99999;transition:width .1s ease";
    document.body.appendChild(progressBar);
    return progressBar;
  }

  function updateReadingProgress() {
    var progressBar = ensureReadingProgress();
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = scrollHeight > 0 ? Math.min(100, Math.max(0, scrollTop / scrollHeight * 100)) : 0;
    progressBar.style.width = scrolled + "%";
  }

  function attachCatalogAnimations(root) {
    var folders = (root || document).querySelectorAll(".zdd-catalog-folder");
    folders.forEach(function(folder) {
      if (folder.dataset.zddAnimated === "1") return;
      var summary = folder.querySelector(":scope > summary");
      var content = folder.querySelector(":scope > .zdd-folder-content");
      if (!summary || !content) return;
      folder.dataset.zddAnimated = "1";

      summary.addEventListener("click", function(event) {
        event.preventDefault();
        if (folder.dataset.zddAnimating === "1") return;
        folder.dataset.zddAnimating = "1";

        if (folder.open) {
          content.style.height = content.scrollHeight + "px";
          content.offsetHeight;
          requestAnimationFrame(function() {
            content.style.height = "0px";
          });
          content.addEventListener("transitionend", function done(transitionEvent) {
            if (transitionEvent.propertyName !== "height") return;
            content.removeEventListener("transitionend", done);
            folder.open = false;
            folder.dataset.zddAnimating = "0";
          });
        } else {
          folder.open = true;
          content.style.height = "0px";
          content.offsetHeight;
          requestAnimationFrame(function() {
            content.style.height = content.scrollHeight + "px";
          });
          content.addEventListener("transitionend", function done(transitionEvent) {
            if (transitionEvent.propertyName !== "height") return;
            content.removeEventListener("transitionend", done);
            content.style.height = "auto";
            folder.dataset.zddAnimating = "0";
          });
        }
      });
    });
  }

  function samePageAnchor(anchor) {
    var raw = anchor.getAttribute("href") || "";
    if (raw === "#") return "";
    if (!raw || raw.charAt(0) !== "#") {
      try {
        var url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return null;
        return url.hash ? url.hash.slice(1) : null;
      } catch (error) {
        return null;
      }
    }
    return raw.slice(1);
  }

  function findAnchorTarget(id) {
    if (!id) return null;
    try {
      return document.getElementById(decodeURIComponent(id)) || document.getElementById(id);
    } catch (error) {
      return document.getElementById(id);
    }
  }

  function smoothScrollTo(target, id) {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var behavior = reduceMotion ? "auto" : "smooth";
    if (target) {
      target.scrollIntoView({behavior: behavior, block: "start"});
    } else {
      window.scrollTo({top: 0, behavior: behavior});
    }
    if (history.pushState) {
      history.pushState(null, "", id ? "#" + id : window.location.pathname + window.location.search);
    }
  }

  document.addEventListener("click", function(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var anchor = event.target.closest && event.target.closest("a[href]");
    if (!anchor) return;
    var id = samePageAnchor(anchor);
    if (id === null) return;
    event.preventDefault();
    event.stopPropagation();
    smoothScrollTo(findAnchorTarget(id), id);
  }, true);

  window.addEventListener("scroll", updateReadingProgress, {passive: true});

  if (window.document$ && document$.subscribe) {
    document$.subscribe(refreshPageState);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refreshPageState);
  } else {
    refreshPageState();
  }
})();
