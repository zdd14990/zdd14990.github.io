"use strict";

var assert = require("assert");
var pixiv = require("../docs/javascripts/zdd-pixiv-core.js");

assert.strictEqual(pixiv.artworkUrl(123456), "https://www.pixiv.net/artworks/123456");
assert.strictEqual(pixiv.artworkUrl("987654"), "https://www.pixiv.net/artworks/987654");
assert.strictEqual(pixiv.imageUrl("123456"), "https://pixiv.cat/123456.jpg");

["javascript:alert(1)", "data:text/html,bad", "https://example.com/1", "1/../../bad", "999999999999999999999", "0", "-1", true, null].forEach(function(value) {
  assert.strictEqual(pixiv.artworkUrl(value), "");
  assert.strictEqual(pixiv.imageUrl(value), "");
});

assert.deepStrictEqual(
  pixiv.normalizeItem({id: 42, title: "Safe", url: "javascript:alert(1)"}),
  {id: "42", title: "Safe"}
);
assert.strictEqual(pixiv.normalizeItem({id: "javascript:alert(1)", title: "Unsafe"}), null);
assert.strictEqual(pixiv.normalizeItem({id: 42, title: {html: "unsafe"}}), null);

console.log("pixiv-core: safe numeric URL construction passed");
