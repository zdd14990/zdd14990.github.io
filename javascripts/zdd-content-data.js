(function() {
  "use strict";

  var catalogPromise = null;
  var indexPromise = null;

  function read(url) {
    return fetch(url, {credentials: "same-origin", cache: "no-cache"}).then(function(response) {
      if (!response.ok) throw new Error("Content data unavailable");
      return response.json();
    });
  }

  function loadCatalog() {
    if (!catalogPromise) {
      catalogPromise = read(window.zddContentCatalogUrl || "/assets/zdd-content-catalog.json")
        .then(function(data) {
          if (!data || data.scope !== "public" || data.version !== 1
              || typeof data.contentHash !== "string" || !Array.isArray(data.documents)) {
            throw new Error("Invalid content catalog");
          }
          return data;
        }).catch(function(error) {
          catalogPromise = null;
          throw error;
        });
    }
    return catalogPromise;
  }

  function loadSearchIndex() {
    if (!indexPromise) {
      indexPromise = loadCatalog().then(function(catalog) {
        var url = new URL(window.zddPublicSearchIndexUrl || "/assets/zdd-public-search-index.json", window.location.href);
        url.searchParams.set("v", catalog.contentHash);
        return read(url.href).then(function(data) {
          if (!data || data.scope !== "public" || data.version !== 2
              || data.contentHash !== catalog.contentHash || !Array.isArray(data.documents) || !Array.isArray(data.passages)) {
            throw new Error("Invalid or outdated public search index");
          }
          return data;
        });
      }).catch(function(error) {
        indexPromise = null;
        catalogPromise = null;
        throw error;
      });
    }
    return indexPromise;
  }

  window.ZddContentData = {loadCatalog: loadCatalog, loadSearchIndex: loadSearchIndex};
})();
