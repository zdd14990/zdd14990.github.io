"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const script = fs.readFileSync(path.resolve(__dirname, "../docs/javascripts/zdd-content-data.js"), "utf8");
const catalog = {scope: "public", version: 1, contentHash: "version-a", documents: [{id: "one"}]};
const index = {...catalog, version: 2, passages: []};
const ok = data => ({ok: true, json: async () => data});

function fixture(fetcher) {
  const requests = [];
  const window = {location: {href: "https://example.test/notebook/blog/"},
    zddContentCatalogUrl: "/notebook/assets/zdd-content-catalog.json",
    zddPublicSearchIndexUrl: "/notebook/assets/zdd-public-search-index.json"};
  vm.runInNewContext(script, {window, URL, fetch: (...args) => {
    requests.push(args[0]); return fetcher(...args);
  }});
  return {data: window.ZddContentData, requests};
}

test("preview and navigation share catalog requests; search adds one versioned request", async () => {
  const f = fixture(async url => ok(String(url).includes("catalog") ? catalog : index));
  const preview = f.data.loadCatalog(), navigation = f.data.loadCatalog();
  assert.equal(preview, navigation);
  await preview;
  assert.equal(f.requests.length, 1);
  const a = f.data.loadSearchIndex(), b = f.data.loadSearchIndex();
  assert.equal(a, b);
  await a;
  assert.equal(f.requests.length, 2);
  assert.equal(new URL(f.requests[1]).pathname, "/notebook/assets/zdd-public-search-index.json");
  assert.equal(new URL(f.requests[1]).searchParams.get("v"), catalog.contentHash);
});

test("catalog transport and schema failures can retry", async () => {
  for (const bad of [{ok: false}, ok({}), {ok: true, json: async () => { throw Error("bad JSON"); }}]) {
    let failed = true;
    const f = fixture(async () => failed ? bad : ok(catalog));
    await assert.rejects(f.data.loadCatalog());
    failed = false;
    assert.equal((await f.data.loadCatalog()).contentHash, catalog.contentHash);
    assert.equal(f.requests.length, 2);
  }
});

test("private, incompatible or mismatched search indexes are rejected and refresh the catalog on retry", async () => {
  for (const bad of [{...index, scope: "private"}, {...index, version: 1}, {...index, contentHash: "older"}, {...index, passages: null}]) {
    let failed = true;
    const f = fixture(async url => ok(String(url).includes("catalog") ? catalog : failed ? bad : index));
    await assert.rejects(f.data.loadSearchIndex());
    failed = false;
    assert.equal((await f.data.loadSearchIndex()).scope, "public");
    assert.equal(f.requests.length, 4);
  }
});
