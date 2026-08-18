(function(root, factory) {
  "use strict";

  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.ZddPixivCore = api;
})(typeof window !== "undefined" ? window : globalThis, function() {
  "use strict";

  function artworkId(value) {
    if (typeof value === "boolean") return "";
    var candidate = String(value == null ? "" : value);
    return /^[1-9]\d{0,19}$/.test(candidate) ? candidate : "";
  }

  function normalizeItem(item) {
    if (!item || typeof item !== "object") return null;
    var id = artworkId(item.id);
    if (!id || typeof item.title !== "string") return null;
    return {id: id, title: item.title};
  }

  function artworkUrl(id) {
    var safeId = artworkId(id);
    return safeId ? "https://www.pixiv.net/artworks/" + safeId : "";
  }

  function imageUrl(id) {
    var safeId = artworkId(id);
    return safeId ? "https://pixiv.cat/" + safeId + ".jpg" : "";
  }

  return {
    artworkId: artworkId,
    normalizeItem: normalizeItem,
    artworkUrl: artworkUrl,
    imageUrl: imageUrl
  };
});
