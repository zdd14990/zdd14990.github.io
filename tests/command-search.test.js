"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const scriptPath = path.resolve(__dirname, "../docs/javascripts/zdd-command-search.js");
const core = require("../docs/javascripts/zdd-search-core.js");
const dataPath = path.resolve(__dirname, "../docs/javascripts/zdd-content-data.js");

// Small event/DOM fixture: exercise the production handlers without a browser dependency.
// Layout, native focus traversal and a real IME still require browser verification.
class Element {
  constructor(id = "") {
    this.id = id;
    this.value = "";
    this.dataset = {};
    this.listeners = {};
    this.attributes = {};
    this.hidden = false;
    this.rows = [];
    this.classes = new Set();
    this.classList = {
      toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name),
      add: name => this.classes.add(name), remove: name => this.classes.delete(name)
    };
  }
  addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }
  emit(type, values = {}) {
    const event = Object.assign({target: this, preventDefault() { this.defaultPrevented = true; }}, values);
    (this.listeners[type] || []).forEach(fn => fn(event));
    return event;
  }
  setAttribute(name, value) { this.attributes[name] = value; }
  removeAttribute(name) { delete this.attributes[name]; }
  get innerHTML() { return this.html || ""; }
  set innerHTML(value) {
    this.html = value;
    this.rows = [...value.matchAll(/<a class="zdd-search-result zdd-passage-result" href="([^"]+)"/g)].map(match => {
      const row = new Element();
      row.href = match[1].replaceAll("&amp;", "&");
      return row;
    });
  }
  querySelectorAll(selector) { return selector === ".zdd-passage-result" ? this.rows : []; }
  scrollIntoView() { this.scrolled = true; }
  focus() { this.emit("focus"); }
}

const index = {
  scope: "public", version: 2, contentHash: "fixture", documents: [{id: "one", title: "Alpha", url: "/alpha/", tags: ["probability"]},
    {id: "two", title: "Beta", url: "/beta/"}],
  passages: [{documentId: "one", text: "alpha common 中心极限定理 unbroadcast_f", url: "/alpha/#section", location: {anchor: "section"}},
    {documentId: "two", text: "beta common", url: "/beta/#section", location: {anchor: "section"}}]
};
const ok = data => ({ok: true, json: async () => data});
const tick = () => new Promise(resolve => setImmediate(resolve));
function fixture(fetcher = async () => ok(index)) {
  const nodes = Object.fromEntries(["home-search-form", "home-search-input", "home-search-results", "home-search-ghost"].map(id => [id, new Element(id)]));
  const document = new Element();
  document.readyState = "loading";
  document.body = new Element();
  document.getElementById = id => nodes[id] || null;
  document.querySelectorAll = () => [];
  document.querySelector = () => null;
  const window = {document, location: {href: "https://example.test/", pathname: "/", search: "", hash: ""},
    setTimeout, clearTimeout, ZddSearchCore: {...core}, addEventListener() {}};
  let requests = 0;
  const queries = [];
  window.ZddSearchCore.search = (...args) => { queries.push(args[1]); return core.search(...args); };
  const context = vm.createContext({
    window, document, URL, URLSearchParams, history: {}, setTimeout, clearTimeout,
    fetch: (...args) => {
      if (String(args[0]).includes("zdd-content-catalog.json")) return Promise.resolve(ok({scope: "public", version: 1, contentHash: index.contentHash, documents: index.documents}));
      requests++; return fetcher(...args);
    }
  });
  vm.runInContext(fs.readFileSync(dataPath, "utf8"), context);
  vm.runInContext(fs.readFileSync(scriptPath, "utf8"), context);
  document.emit("DOMContentLoaded");
  const input = nodes["home-search-input"], box = nodes["home-search-results"];
  return {input, box, window, queries, document, form: nodes["home-search-form"], requests: () => requests,
    type(text) { input.value = text; input.emit("input"); },
    retry() { box.emit("click", {target: {closest: selector => selector === "[data-zdd-search-retry]" ? {} : null}}); }};
}

test("HTTP, malformed JSON and invalid index failures can recover, unlike valid empty results", async () => {
  for (const failure of [async () => ({ok: false}), async () => ({ok: true, json: async () => { throw Error("bad JSON"); }}), async () => ok({})]) {
    let fail = true;
    const f = fixture(() => fail ? failure() : Promise.resolve(ok(index)));
    f.type("alpha");
    assert.match(f.box.innerHTML, /正在加载/);
    await tick();
    assert.match(f.box.innerHTML, /加载失败/);
    fail = false;
    f.retry();
    await tick();
    assert.equal(f.requests(), 2);
    assert.equal(f.box.rows.length, 1);
    f.type("no-such-term");
    await tick();
    assert.match(f.box.innerHTML, /No matching passage/);
    assert.doesNotMatch(f.box.innerHTML, /加载失败/);
    assert.equal(f.requests(), 2);
  }
});

test("pending index is shared; only the latest query renders, and Escape cancels rendering", async () => {
  let resolve;
  const f = fixture(() => new Promise(r => { resolve = r; }));
  f.type("alpha"); f.type("beta"); f.type("alpha");
  await tick();
  resolve(ok(index)); await tick();
  assert.equal(f.requests(), 1);
  assert.deepEqual(f.queries, ["alpha"]);
  f.type("beta"); f.input.emit("keydown", {key: "Escape"}); await tick();
  assert.equal(f.box.hidden, true);
  assert.deepEqual(f.queries, ["alpha"]);
});

test("clearing a pending query does not show its results or failure", async () => {
  let resolve;
  const f = fixture(() => new Promise(r => { resolve = r; }));
  f.type("alpha"); f.type(""); await tick(); resolve({ok: false}); await tick();
  assert.equal(f.box.hidden, true);
  assert.equal(f.box.innerHTML, "");
});

test("ordinary arrows select links, Enter opens the selection, Tab is not intercepted", async () => {
  const f = fixture(); f.type("common"); await tick();
  assert.equal(f.box.rows.length, 2);
  f.input.emit("keydown", {key: "ArrowDown"});
  assert.equal(f.box.rows[0].classes.has("is-active"), true);
  assert.equal(f.box.rows[0].scrolled, true);
  f.input.emit("keydown", {key: "ArrowDown"});
  assert.equal(f.box.rows[1].classes.has("is-active"), true);
  f.input.emit("keydown", {key: "ArrowUp"});
  assert.equal(f.box.rows[0].classes.has("is-active"), true);
  assert.equal(f.input.emit("keydown", {key: "Tab"}).defaultPrevented, undefined);
  f.input.emit("keydown", {key: "Enter"});
  assert.equal(f.window.location.href, f.box.rows[0].href);
  assert.match(f.window.location.href, /zdd-highlight=common#section/);
});

test("composition suppresses queries and Enter, then searches final Chinese text once", async () => {
  const f = fixture();
  f.input.emit("compositionstart");
  f.type("zhong");
  const enter = f.input.emit("keydown", {key: "Enter", isComposing: true});
  assert.equal(enter.defaultPrevented, undefined);
  f.form.emit("submit");
  assert.equal(f.requests(), 0);
  f.input.value = "中心极限定理";
  f.input.emit("compositionend");
  f.input.emit("input");
  await new Promise(r => setTimeout(r, 10));
  assert.deepEqual(f.queries, ["中心极限定理"]);
  assert.equal(f.box.rows.length, 1);
  assert.equal(f.input.emit("keydown", {key: "Enter", keyCode: 229}).defaultPrevented, undefined);
});

test("new composition invalidates an already pending search", async () => {
  let resolve;
  const f = fixture(() => new Promise(r => { resolve = r; }));
  f.type("alpha"); f.input.emit("compositionstart"); f.type("zhong");
  await tick();
  resolve(ok(index)); await tick();
  assert.deepEqual(f.queries, []);
  assert.equal(f.box.hidden, true);
});

test("command completion still accepts Tab after loading", async () => {
  const f = fixture(); f.type("/nex"); await tick();
  assert.match(f.box.innerHTML, /\/next/);
  const event = f.input.emit("keydown", {key: "Tab"});
  assert.equal(event.defaultPrevented, true);
  assert.equal(f.input.value.trim(), "/next");
});

test("Escape cancels the deferred compositionend search", async () => {
  const f = fixture();
  f.input.emit("compositionstart");
  f.input.value = "中心极限定理";
  f.input.emit("compositionend");
  f.input.emit("keydown", {key: "Escape"});
  await new Promise(r => setTimeout(r, 10));
  assert.equal(f.requests(), 0);
  assert.equal(f.box.hidden, true);
});

test("command completion uses the catalog without downloading the passage index", async () => {
  const f = fixture(); f.type("/nex"); await tick();
  assert.equal(f.requests(), 0);
  assert.match(f.box.innerHTML, /\/next/);
  f.type("common"); await tick();
  assert.equal(f.requests(), 1);
  assert.equal(f.box.rows.length, 2);
});

test("/thm searches statement names first and /quiz filters the card deck", async () => {
  const statements = {statements: [
    {id: "a#thm-1", kind: "theorem", label: "定理", title: "Hahn–Banach 定理", name: "Hahn–Banach 定理", text: "延拓", url: "/fa/#thm-1", article: "FA", section: "", tags: []},
    {id: "b#def-1", kind: "definition", label: "定义", title: "定义 1", name: "", text: "由 Hahn–Banach 得到", url: "/fa/#def-1", article: "FA", section: "", tags: []}]};
  const quiz = {cards: [
    {id: "c#def-1", kind: "definition", label: "定义", title: "紧算子", name: "紧算子", html: "<p>body</p>", url: "/c/#def-1", article: "C", tags: ["operator-theory"]},
    {id: "d#thm-1", kind: "lemma", label: "引理", title: "Zorn", name: "Zorn", html: "<p>stmt</p>", answer_title: "证明", answer_html: "<p>proof</p>", url: "/d/#thm-1", article: "D", tags: []}]};
  const f = fixture(async url => ok(String(url).includes("quiz") ? quiz : statements));
  f.window.zddStatementsUrl = "/assets/zdd-statements.json";
  f.window.zddQuizUrl = "/assets/zdd-quiz.json";
  f.type("/thm hahn"); for (let i = 0; i < 5; i++) await tick(); f.input.emit("keydown", {key: "Enter"});
  for (let i = 0; i < 5; i++) await tick();
  const titles = [...f.box.innerHTML.matchAll(/zdd-search-title">([^<]+)</g)].map(m => m[1]);
  assert.deepEqual(titles, ["Hahn–Banach 定理", "定义 1"]);
  assert.match(f.box.innerHTML, /theorems\/\?q=hahn/);

  f.type("/quiz theorem"); for (let i = 0; i < 5; i++) await tick(); f.input.emit("keydown", {key: "Enter"});
  for (let i = 0; i < 5; i++) await tick();
  assert.match(f.box.innerHTML, /1 cards in this deck/);
  assert.match(f.box.innerHTML, /data-kind="lemma"/);
  assert.match(f.box.innerHTML, /<div class="zdd-quiz-answer md-typeset" hidden>/);

  f.type("/quiz tag:operator-theory"); for (let i = 0; i < 5; i++) await tick(); f.input.emit("keydown", {key: "Enter"});
  for (let i = 0; i < 5; i++) await tick();
  assert.match(f.box.innerHTML, /回忆这个定义的内容：<b>紧算子<\/b>/);
  assert.match(f.box.innerHTML, /紧算子/);
});
