"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const core = require("../docs/javascripts/zdd-search-core.js");

function indexFor(text) {
  return {
    scope: "public",
    documents: [{id: "article", title: "Notes", url: "/article/"}],
    passages: [{
      id: "article:section:0", documentId: "article", section: "Details",
      text: text, url: "/article/#details",
      location: {anchor: "details", passageIndex: 0}
    }]
  };
}

test("cached search fields refresh when an index replaces or extends its passages", function() {
  const index = indexFor("First content");
  assert.equal(core.search(index, "First").length, 1);
  assert.equal(core.search(index, "missing").length, 0);
  index.passages = [{...index.passages[0], text: "Second content"}];
  assert.equal(core.search(index, "First").length, 0);
  assert.equal(core.search(index, "Second").length, 1);
  index.passages.push({...index.passages[0], id: "added", text: "Added content"});
  assert.equal(core.search(index, "Added").length, 1);
});

test("exact symbols remain searchable and highlighted", function() {
  ["unbroadcast_f", "multiple_part_symbol", "__init__"].forEach(function(symbol) {
    const results = core.search(indexFor("Use `" + symbol + "` here."), symbol);
    assert.equal(results.length, 1, symbol);
    assert.deepEqual(core.queryTerms(symbol), [symbol]);
    assert.ok(results[0].snippet.includes(symbol));
    assert.deepEqual(
      core.highlightParts(results[0].snippet, results[0].highlights)
        .filter(part => part.highlighted).map(part => part.text),
      [symbol]
    );
    assert.equal(new URL(results[0].url, "https://example.test").searchParams.get("zdd-highlight"), symbol);
  });
});

test("base token still matches an underscore symbol", function() {
  const results = core.search(indexFor("Use unbroadcast_f here."), "unbroadcast");
  assert.equal(results.length, 1);
  assert.deepEqual(
    core.highlightParts(results[0].snippet, results[0].highlights).filter(part => part.highlighted),
    [{text: "unbroadcast", highlighted: true}]
  );
});

test("plain English matching remains case insensitive", function() {
  assert.equal(core.search(indexFor("Gradient accumulation"), "GRADIENT").length, 1);
  assert.equal(core.search(indexFor("Gradient accumulation"), "missing").length, 0);
});

test("Chinese and symbol queries retain AND matching", function() {
  const text = "\u5e7f\u64ad unbroadcast_f";
  const query = "\u5e7f\u64ad unbroadcast_f";
  const results = core.search(indexFor(text), query);
  assert.equal(results.length, 1);
  assert.equal(core.search(indexFor("unbroadcast_f"), query).length, 0);
  assert.equal(core.search(indexFor("\u5e7f\u64ad"), query).length, 0);
  assert.deepEqual(
    core.highlightParts(results[0].snippet, results[0].highlights)
      .filter(part => part.highlighted).map(part => part.text),
    ["\u5e7f\u64ad", "unbroadcast_f"]
  );
});

test("inequalities survive search-field and snippet cleaning", function() {
  const text = "x < y and z > w";
  assert.equal(core.cleanText(text), text);
  assert.equal(core.search(indexFor(text), "z > w").length, 1);
  assert.equal(core.makeSnippet(text, core.queryTerms("z > w")), text);
  assert.equal(core.cleanText("> quoted text"), "quoted text");
});

test("ordinary title and body ranking stays unchanged", function() {
  const index = indexFor("gradient");
  index.documents.push({id: "title", title: "Gradient", url: "/title/"});
  index.passages.push({id: "title:0", documentId: "title", text: "Other text", location: {passageIndex: 0}});
  assert.deepEqual(core.search(index, "gradient").map(result => [result.documentId, result.score]), [
    ["title", 55], ["article", 34]
  ]);
});


test("math display is readable while matching, scores, URLs and deduplication stay unchanged", function() {
  const base = indexFor("中心极限定理 $\\frac X_1+X_2 \\sqrt n $ and x < y");
  const display = structuredClone(base);
  display.passages[0].displayText = String.raw`中心极限定理 $\frac{X_1+X_2}{\sqrt{n}}$ and x < y`;
  for (const query of ["中心极限定理", "\\frac", "x < y", "中心极限定理 x"]) {
    const before = core.search(base, query);
    const after = core.search(display, query);
    assert.deepEqual(after.map(({snippet, ...rest}) => rest), before.map(({snippet, ...rest}) => rest));
  }
  const result = core.search(display, "中心极限定理")[0];
  assert.match(result.snippet, /中心极限定理 〔公式〕/);
  assert.ok(!result.snippet.includes('\\frac'));
  assert.ok(core.search(display, "\\frac")[0].snippet.includes(String.raw`$\frac{X_1+X_2}{\sqrt{n}}$`));
});

test("short matching math and mixed-language symbols retain their complete reason", function() {
  for (const [source, query, expected] of [
    [String.raw`条件 $x<y$ 成立`, '<', '$x<y$'],
    [String.raw`方差 \(\sigma^2>0\)`, '\\sigma', String.raw`\(\sigma^2>0\)`],
    [String.raw`范围 \[a>b\]`, '>', String.raw`\[a>b\]`],
    [String.raw`广播 unbroadcast_f 的条件 $x<y$`, '广播 unbroadcast_f', 'unbroadcast_f']
  ]) {
    const snippet = core.makeDisplaySnippet(source, core.queryTerms(query));
    assert.ok(snippet.includes(expected), snippet);
    assert.ok(core.highlightParts(snippet, core.queryTerms(query)).some(p => p.highlighted));
  }
});

test("snippet boundaries never cut a retained math expression", function() {
  const formula = String.raw`$\frac{x_1+x_2+x_3}{\sqrt{n}}$`;
  for (const padding of [30, 60, 90, 150]) {
    const snippet = core.makeDisplaySnippet('前'.repeat(padding) + formula + '后'.repeat(180), ['\\frac'], 80);
    assert.ok(snippet.includes(formula), snippet);
    assert.equal((snippet.match(/\$/g) || []).length, 2);
  }
});

test("very long matching math reports whole matching tokens instead of broken LaTeX", function() {
  const formula = '$$' + 'x+'.repeat(200) + String.raw`\sigma^2$$`;
  const snippet = core.makeDisplaySnippet('方差 ' + formula + ' 完成', ['\\sigma']);
  assert.ok(snippet.includes('〔公式中匹配：\\sigma〕'));
  assert.ok(!snippet.includes('$$'));
  assert.ok(snippet.length < 100);
});

test("display-only compression cannot merge distinct ranked passages", function() {
  const index = indexFor('定理 $a+b$');
  index.passages[0].displayText = String.raw`定理 $\frac{a}{b}$`;
  index.passages.push({...index.passages[0], id:'article:section:1', text:'定理 $c+d$'});
  assert.equal(core.search(index, '定理').length, 2);
});

test("omitted math does not pull distant prose into the snippet", function() {
  const text = '中心极限定理 ' + String.raw`$\frac{a+b+c+d}{n}$ `.repeat(30) + '遥远的其他主题';
  const snippet = core.makeDisplaySnippet(text, ['中心极限定理']);
  assert.ok(snippet.includes('中心极限定理'));
  assert.ok(!snippet.includes('遥远的其他主题'));
});
