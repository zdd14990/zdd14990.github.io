"use strict";

var assert = require("assert");
var core = require("../docs/javascripts/zdd-search-core.js");

var index = {
  scope: "public",
  version: 2,
  documents: [
    {
      id: "doc-1",
      sourceType: "blog-post",
      contentType: "article",
      title: "Probability Notes",
      subtitle: "Probability Theory",
      url: "/blog/probability/",
      date: "2026-08-11",
      tags: ["martingale"],
      categories: ["Mathematics"]
    },
    {
      id: "doc-2",
      sourceType: "blog-post",
      contentType: "article",
      title: "Statistics Notes",
      subtitle: "Mathematical Statistics",
      url: "/blog/statistics/",
      tags: ["distribution"],
      categories: ["Mathematics"]
    }
  ],
  passages: [
    {
      id: "doc-1:martingale:0",
      documentId: "doc-1",
      section: "鞅收敛定理",
      breadcrumb: ["随机过程", "鞅收敛定理"],
      text: "这一段开头先介绍一致可积性。经过若干推导以后，鞅收敛定理（martingale convergence）给出几乎处处收敛，并说明条件期望的作用。",
      url: "/blog/probability/#martingale-convergence",
      location: {anchor: "martingale-convergence", headingLevel: 2, passageIndex: 1, chunkIndex: 0}
    },
    {
      id: "doc-1:location:0",
      documentId: "doc-1",
      section: "Location Family",
      breadcrumb: ["Distributions", "Location Family"],
      text: "A location family shifts a standard density while preserving its overall shape.",
      url: "/blog/probability/#location-family",
      location: {anchor: "location-family", headingLevel: 2, passageIndex: 2, chunkIndex: 0}
    },
    {
      id: "doc-1:martingale-applications:0",
      documentId: "doc-1",
      section: "Martingale Applications",
      breadcrumb: ["Applications", "Martingale Applications"],
      text: "Martingale convergence also supports stopping-time arguments and repeated applications.",
      url: "/blog/probability/#martingale-applications",
      location: {anchor: "martingale-applications", headingLevel: 2, passageIndex: 3, chunkIndex: 0}
    },
    {
      id: "doc-2:convergence:0",
      documentId: "doc-2",
      section: "Convergence in Distribution",
      breadcrumb: ["Asymptotics", "Convergence in Distribution"],
      text: "Distributional convergence is compared with convergence in probability.",
      url: "/blog/statistics/#convergence-in-distribution",
      location: {anchor: "convergence-in-distribution", headingLevel: 2, passageIndex: 1, chunkIndex: 0}
    }
  ]
};

var chinese = core.search(index, "鞅收敛", {limit: 10});
assert.strictEqual(chinese.length, 1);
assert.strictEqual(chinese[0].section, "鞅收敛定理");
assert.match(chinese[0].snippet, /鞅收敛/);
assert.strictEqual(chinese[0].location.anchor, "martingale-convergence");
assert.strictEqual(chinese[0].url, "/blog/probability/?zdd-highlight=%E9%9E%85%E6%94%B6%E6%95%9B#martingale-convergence");

var english = core.search(index, "LOCATION FAMILY", {limit: 10});
assert.strictEqual(english.length, 1);
assert.strictEqual(english[0].section, "Location Family");

var multiTerm = core.search(index, "martingale convergence", {limit: 10});
assert.ok(multiTerm.length >= 2);
assert.ok(multiTerm.every(function(result) {
  var combined = (result.title + " " + result.section + " " + result.snippet).toLowerCase();
  return combined.indexOf("martingale") >= 0 && combined.indexOf("convergence") >= 0;
}));

var capped = core.search(index, "convergence", {limit: 10, perDocument: 2});
assert.ok(capped.some(function(result) { return result.documentId === "doc-2"; }));
assert.ok(capped.filter(function(result) { return result.documentId === "doc-1"; }).length <= 2);

var middle = core.makeSnippet(
  "Preface text that should not dominate the result. ".repeat(8) + "the actual middle match" + " trailing context".repeat(20),
  ["middle"],
  180
);
assert.match(middle, /middle/);
assert.ok(middle.startsWith("…"));

var phraseFirst = core.makeSnippet(
  "A family appears near the beginning. " + "unrelated context ".repeat(20) + "The location family is the intended multi-term match.",
  ["location", "family"],
  150
);
assert.match(phraseFirst.toLowerCase(), /location family/);

var nearbyTerms = core.makeSnippet(
  "A family appears near the beginning. " + "unrelated context ".repeat(20) + "The location-scale family is the intended nearby match.",
  ["location", "family"],
  150
);
assert.match(nearbyTerms.toLowerCase(), /location-scale family/);

var highlighted = core.highlightParts("概率 Probability theory", ["概率", "probability"]);
assert.deepStrictEqual(highlighted.filter(function(part) { return part.highlighted; }).map(function(part) { return part.text; }), ["概率", "Probability"]);
assert.deepStrictEqual(core.search({scope: "private", documents: [], passages: []}, "secret"), []);

console.log("search-core: all tests passed");
