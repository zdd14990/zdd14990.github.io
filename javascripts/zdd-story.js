(function() {
  // Archive lookup for the console story. A search that exactly matches an
  // answer decrypts one archive card. Nothing is stored and nothing on the
  // site changes; the bundle only holds answer hashes and ciphertext.
  var script = document.currentScript;
  var scriptSrc = script && script.src ? script.src : window.location.href;
  var dataUrl = new URL("../assets/xh/archive.json", scriptSrc).href;
  var siteBase = new URL("../", scriptSrc).href;
  var bundlePromise = null;
  var encoder = new TextEncoder();

  function normalize(text) {
    return String(text || "").normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  }

  function hex(buffer) {
    return Array.from(new Uint8Array(buffer)).map(function(b) {
      return b.toString(16).padStart(2, "0");
    }).join("");
  }

  function fromHex(text) {
    var out = new Uint8Array(text.length / 2);
    for (var i = 0; i < out.length; i++) out[i] = parseInt(text.substr(i * 2, 2), 16);
    return out;
  }

  function fromBase64(text) {
    var raw = atob(text);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  function escapeHtml(text) {
    return String(text || "").replace(/[&<>"']/g, function(ch) {
      return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[ch];
    });
  }

  function loadBundle() {
    if (!bundlePromise) {
      bundlePromise = fetch(dataUrl, {cache: "no-cache"}).then(function(response) {
        if (!response.ok) throw new Error("bundle " + response.status);
        return response.json();
      }).then(function(bundle) {
        var index = {};
        bundle.entries.forEach(function(entry) { index[entry.id] = entry; });
        return {iter: bundle.iter, index: index};
      }).catch(function(error) {
        bundlePromise = null;
        throw error;
      });
    }
    return bundlePromise;
  }

  function decrypt(norm, entry, iterations) {
    var subtle = window.crypto.subtle;
    return subtle.importKey("raw", encoder.encode(norm), "PBKDF2", false, ["deriveBits"]).then(function(base) {
      return subtle.deriveBits({name: "PBKDF2", hash: "SHA-256", salt: fromHex(entry.salt), iterations: iterations}, base, 256);
    }).then(function(bits) {
      var key = new Uint8Array(bits);
      var data = fromBase64(entry.data);
      var blocks = [];
      for (var b = 0; b * 32 < data.length; b++) {
        var input = new Uint8Array(36);
        input.set(key, 0);
        new DataView(input.buffer).setUint32(32, b);
        blocks.push(subtle.digest("SHA-256", input));
      }
      return Promise.all(blocks).then(function(pads) {
        var out = new Uint8Array(data.length);
        pads.forEach(function(pad, b) {
          var bytes = new Uint8Array(pad);
          for (var i = 0; i < 32 && b * 32 + i < data.length; i++) out[b * 32 + i] = data[b * 32 + i] ^ bytes[i];
        });
        return JSON.parse(new TextDecoder().decode(out));
      });
    });
  }

  function withBase(html) {
    return String(html || "").split("{{XH_BASE}}").join(siteBase);
  }

  function renderCard(payload) {
    if (payload.kind === "ending") {
      return '<section class="xh-card xh-card--ending" aria-label="西荒档案 结局">'
        + '<header class="xh-card-head"><span>西荒档案 · 结局</span></header>'
        + '<h3 class="xh-card-title">' + escapeHtml(payload.title) + '</h3>'
        + '<div class="xh-card-body">' + withBase(payload.html) + '</div></section>';
    }
    var label = payload.kind === "cover" ? escapeHtml(payload.no) : escapeHtml(payload.no) + ' / ' + payload.total;
    var html = '<section class="xh-card" aria-label="西荒档案 ' + escapeHtml(payload.no) + '">'
      + '<header class="xh-card-head"><span>西荒档案 · ' + label + '</span>'
      + '<span class="xh-card-form">' + escapeHtml(payload.form) + '</span></header>'
      + '<h3 class="xh-card-title">' + escapeHtml(payload.title) + '</h3>'
      + '<div class="xh-card-body">' + withBase(payload.html) + '</div>';
    if (payload.endings) {
      html += '<div class="xh-answer" role="group" aria-label="作答">'
        + '<button type="button" data-xh-answer="Y">Y</button>'
        + '<button type="button" data-xh-answer="N">N</button></div>';
      Object.keys(payload.endings).forEach(function(name) {
        var ending = payload.endings[name];
        html += '<div class="xh-ending" data-xh-ending="' + name + '" hidden>'
          + '<h3 class="xh-card-title">' + escapeHtml(ending.title) + '</h3>'
          + '<div class="xh-card-body">' + withBase(ending.html) + '</div></div>';
      });
    }
    return html + '</section>';
  }

  function lookup(query) {
    var norm = normalize(query);
    if (!norm || norm.length > 64 || !window.crypto || !window.crypto.subtle) return Promise.resolve(null);
    return Promise.all([
      loadBundle(),
      window.crypto.subtle.digest("SHA-256", encoder.encode("xh:" + norm))
    ]).then(function(results) {
      var entry = results[0].index[hex(results[1]).slice(0, 32)];
      if (!entry) return null;
      return decrypt(norm, entry, results[0].iter).then(renderCard);
    }).catch(function() { return null; });
  }

  document.addEventListener("click", function(event) {
    var button = event.target.closest && event.target.closest("[data-xh-answer]");
    if (!button) return;
    var card = button.closest(".xh-card");
    if (!card) return;
    var answer = button.getAttribute("data-xh-answer");
    card.querySelectorAll("[data-xh-ending]").forEach(function(node) {
      node.hidden = node.getAttribute("data-xh-ending") !== answer;
    });
    var group = card.querySelector(".xh-answer");
    if (group) group.hidden = true;
  });

  window.ZddStory = {lookup: lookup};
})();
