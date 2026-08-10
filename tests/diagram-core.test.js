"use strict";

var assert = require("assert");
var core = require("../docs/javascripts/diagram-core.js");

function node(id, row, col, label) {
  return {id: id, row: row, col: col, label: label};
}

function edge(id, source, target, label, style, labelPosition, bend) {
  return {
    id: id,
    source: source,
    target: target,
    label: label || "",
    style: style || "normal",
    labelPosition: labelPosition || "above",
    bend: bend || "none"
  };
}

function comparable(diagram) {
  var positions = Object.create(null);
  diagram.nodes.forEach(function(item) {
    positions[item.id] = item.row + ":" + item.col;
  });
  return {
    nodes: diagram.nodes.map(function(item) {
      return {row: item.row, col: item.col, label: item.label};
    }).sort(function(left, right) {
      return left.row - right.row || left.col - right.col || left.label.localeCompare(right.label);
    }),
    edges: diagram.edges.map(function(item) {
      return {
        source: positions[item.source],
        target: positions[item.target],
        label: item.label,
        style: item.style,
        labelPosition: item.labelPosition,
        bend: item.bend
      };
    }).sort(function(left, right) {
      return (left.source + left.target + left.label).localeCompare(right.source + right.target + right.label);
    })
  };
}

assert.strictEqual(core.directionFromDelta(0, 1), "r");
assert.strictEqual(core.directionFromDelta(0, 2), "rr");
assert.strictEqual(core.directionFromDelta(-1, 0), "u");
assert.strictEqual(core.directionFromDelta(1, 1), "dr");

var square = {
  rows: 5,
  cols: 5,
  nodes: [node("a", 0, 0, "A"), node("b", 0, 1, "B"), node("c", 1, 0, "C")],
  edges: [edge("ab", "a", "b", "f"), edge("ac", "a", "c")]
};
assert.strictEqual(core.exportTikz(square), [
  "\\begin{tikzcd}",
  "A \\arrow[d] \\arrow[r, \"f\"] & B \\\\",
  "C & ",
  "\\end{tikzcd}"
].join("\n"));

var imported = core.parseTikz([
  "\\begin{tikzcd}",
  "A \\arrow[r, \"f\"] & B \\\\",
  "C \\arrow[u, \"g\"] & D",
  "\\end{tikzcd}"
].join("\n"));
assert.strictEqual(imported.ok, true, imported.detail);
assert.deepStrictEqual(imported.diagram.nodes.map(function(item) { return item.label; }), ["A", "B", "C", "D"]);
assert.deepStrictEqual(imported.diagram.edges.map(function(item) {
  return {source: item.source, target: item.target, label: item.label};
}), [
  {source: "n1", target: "n2", label: "f"},
  {source: "n3", target: "n1", label: "g"}
]);

var roundTripSource = {
  rows: 5,
  cols: 5,
  nodes: [
    node("a", 0, 0, "A"),
    node("b", 0, 2, "B"),
    node("c", 1, 1, "C"),
    node("d", 2, 0, "D")
  ],
  edges: [
    edge("ab", "a", "b", "f", "dashed", "below", "none"),
    edge("ac", "a", "c", "g", "hook", "right", "left"),
    edge("da", "d", "a", "h", "twohead", "left", "right")
  ]
};
var roundTripTikz = core.exportTikz(roundTripSource);
var roundTripResult = core.parseTikz(roundTripTikz);
assert.strictEqual(roundTripResult.ok, true, roundTripResult.detail);
assert.deepStrictEqual(comparable(roundTripResult.diagram), comparable(roundTripSource));

var bracedLabel = {
  rows: 2,
  cols: 2,
  nodes: [node("a", 0, 0, "A"), node("b", 0, 1, "B")],
  edges: [edge("ab", "a", "b", "{f}")]
};
var bracedResult = core.parseTikz(core.exportTikz(bracedLabel));
assert.strictEqual(bracedResult.ok, true, bracedResult.detail);
assert.strictEqual(bracedResult.diagram.edges[0].label, "{f}");

var emptyResult = core.parseTikz(core.exportTikz(core.createDiagram(5, 5)));
assert.strictEqual(emptyResult.ok, true, emptyResult.detail);
assert.deepStrictEqual(emptyResult.diagram.nodes, []);
assert.deepStrictEqual(emptyResult.diagram.edges, []);

var positionedEmptyLabel = {
  rows: 2,
  cols: 2,
  nodes: [node("a", 0, 0, "A"), node("b", 0, 1, "B")],
  edges: [edge("ab", "a", "b", "", "normal", "below")]
};
var positionedResult = core.parseTikz(core.exportTikz(positionedEmptyLabel));
assert.strictEqual(positionedResult.ok, true, positionedResult.detail);
assert.strictEqual(positionedResult.diagram.edges[0].label, "");
assert.strictEqual(positionedResult.diagram.edges[0].labelPosition, "below");

var escapedAmpersand = core.parseTikz("\\begin{tikzcd} A \\& B \\arrow[r] & C \\end{tikzcd}");
assert.strictEqual(escapedAmpersand.ok, true, escapedAmpersand.detail);
assert.strictEqual(escapedAmpersand.diagram.nodes[0].label, "A \\& B");

var invalid = core.parseTikz("\\begin{tikzcd} A \\arrow[r, crossing over] & B \\end{tikzcd}");
assert.strictEqual(invalid.ok, false);
assert.match(invalid.error, /does not support yet/);
assert.match(invalid.detail, /crossing over/);

var dangling = core.parseTikz("\\begin{tikzcd} A \\arrow[r] \\end{tikzcd}");
assert.strictEqual(dangling.ok, false);
assert.match(dangling.detail, /empty or out-of-range/);

var conflicting = core.parseTikz("\\begin{tikzcd} A \\arrow[r, dashed, hook] & B \\end{tikzcd}");
assert.strictEqual(conflicting.ok, false);
assert.match(conflicting.detail, /Multiple arrow styles/);

console.log("diagram-core: all tests passed");
