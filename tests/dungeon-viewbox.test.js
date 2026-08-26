"use strict";

var assert = require("assert");
var core = require("../docs/javascripts/dungeon-core.js");
var ui = require("../docs/javascripts/dungeon-ui-core.js");

var EPSILON = 0.000001;

function roomId(x, y) {
  return "fixture:" + x + "," + y;
}

function roomsFrom(coordinates) {
  return coordinates.map(function(coordinate) {
    return {id: roomId(coordinate[0], coordinate[1]), x: coordinate[0], y: coordinate[1]};
  });
}

function assertClose(actual, expected, message) {
  assert.ok(Math.abs(actual - expected) <= EPSILON,
    message + ": expected " + expected + ", received " + actual);
}

function assertRectContained(rect, viewBox, label) {
  assert.ok(rect.left >= viewBox.left - EPSILON, label + " left edge outside viewBox");
  assert.ok(rect.right <= viewBox.right + EPSILON, label + " right edge outside viewBox");
  assert.ok(rect.top >= viewBox.top - EPSILON, label + " top edge outside viewBox");
  assert.ok(rect.bottom <= viewBox.bottom + EPSILON, label + " bottom edge outside viewBox");
}

function assertRenderedGeometry(rooms, options) {
  var config = options || {};
  var viewBox = ui.computeDungeonViewBox(rooms, config);
  rooms.forEach(function(room) {
    assertRectContained(ui.getFocusRect(room, config), viewBox, "room " + room.x + "," + room.y);
    assert.ok(ui.roomFitsViewBox(room, viewBox, config));
  });
  (config.guessCells || []).forEach(function(cell) {
    assertRectContained(ui.getGuessCellRect(cell, config), viewBox, "guess cell " + cell.x + "," + cell.y);
    assert.ok(ui.guessCellFitsViewBox(cell, viewBox, config));
  });
  (config.guessMarkers || []).forEach(function(marker) {
    assertRectContained(ui.getGuessMarkerRect(marker, config), viewBox,
      marker.type + " marker " + marker.x + "," + marker.y);
    assert.ok(ui.guessMarkerFitsViewBox(marker, viewBox, config));
  });
  var content = ui.computeDungeonGeometryBounds(rooms, config);
  assertClose(viewBox.left, content.left - viewBox.padding, "left padding");
  assertClose(viewBox.right, content.right + viewBox.padding, "right padding");
  assertClose(viewBox.top, content.top - viewBox.padding, "top padding");
  assertClose(viewBox.bottom, content.bottom + viewBox.padding, "bottom padding");
  assert.ok(viewBox.width > 0);
  assert.ok(viewBox.height > 0);
  return viewBox;
}

function assertConnectionsContained(dungeon, presentation, viewBox) {
  var roomsById = Object.create(null);
  presentation.rooms.forEach(function(room) { roomsById[room.id] = room; });
  presentation.connections.forEach(function(connection) {
    var from = ui.gridToSvg(roomsById[connection.from]);
    var to = ui.gridToSvg(roomsById[connection.to]);
    [from, to].forEach(function(point) {
      assert.ok(point.x >= viewBox.left - EPSILON && point.x <= viewBox.right + EPSILON);
      assert.ok(point.y >= viewBox.top - EPSILON && point.y <= viewBox.bottom + EPSILON);
    });
  });
  assert.ok(dungeon);
}

function gridSpan(rooms) {
  var xs = rooms.map(function(room) { return room.x; });
  var ys = rooms.map(function(room) { return room.y; });
  return {
    x: Math.max.apply(null, xs) - Math.min.apply(null, xs) + 1,
    y: Math.max.apply(null, ys) - Math.min.apply(null, ys) + 1
  };
}

var single = roomsFrom([[0, 0]]);
var singleBox = assertRenderedGeometry(single);
var singleFocus = ui.getFocusRect(single[0]);
assertClose(singleBox.contentBounds.left, singleFocus.left, "single-room actual left bound");
assertClose(singleBox.contentBounds.bottom, singleFocus.bottom, "single-room actual bottom bound");

var verticalSeven = roomsFrom([[0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3]]);
var verticalEight = roomsFrom([[0, -4], [0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3]]);
var asymmetricTall = roomsFrom([
  [0, -4], [0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [1, 1], [1, 2]
]);
var wide = roomsFrom([[-4, 0], [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
var negative = roomsFrom([[-4, -3], [-3, -3], [-3, -2], [-2, -2]]);
var extremes = roomsFrom([[-4, 0], [4, 0], [0, -3], [0, 4], [0, 0]]);

assertRenderedGeometry(verticalSeven);
assertRenderedGeometry(verticalEight);
assertRenderedGeometry(asymmetricTall);
assertRenderedGeometry(wide);
assertRenderedGeometry(negative);
assertRenderedGeometry(extremes);

var focusOnlyBox = assertRenderedGeometry(single, {padding: 0});
assertClose(focusOnlyBox.left, singleFocus.left, "focus outline left edge");
assertClose(focusOnlyBox.right, singleFocus.right, "focus outline right edge");
assertClose(focusOnlyBox.top, singleFocus.top, "focus outline top edge");
assertClose(focusOnlyBox.bottom, singleFocus.bottom, "focus outline bottom edge");

var guessCells = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}];
var guessMarkers = [
  {type: "secret", x: -1, y: 0},
  {type: "super-secret", x: 0, y: 1}
];
assertRenderedGeometry(single, {guessCells: guessCells, guessMarkers: guessMarkers});

var visibleRooms = roomsFrom([[0, 0], [0, 1], [1, 1]]);
var visibleBox = assertRenderedGeometry(visibleRooms);
var revealedRooms = visibleRooms.concat(roomsFrom([[0, -3], [2, 1]]));
var revealedBox = assertRenderedGeometry(revealedRooms);
assert.ok(revealedBox.top < visibleBox.top, "reveal must expand upward for a newly visible hidden room");
assert.ok(revealedBox.right > visibleBox.right, "reveal must expand right for a newly visible hidden room");

var landscapeHeight = ui.computeDungeonViewportHeight({width: 1000, height: 300}, 800, {
  minHeight: 420,
  maxHeight: 900
});
var squareHeight = ui.computeDungeonViewportHeight({width: 600, height: 600}, 800, {
  minHeight: 420,
  maxHeight: 900
});
var portraitHeight = ui.computeDungeonViewportHeight({width: 300, height: 1000}, 800, {
  minHeight: 420,
  maxHeight: 900
});
assert.ok(portraitHeight > squareHeight);
assert.ok(squareHeight > landscapeHeight);
assert.strictEqual(landscapeHeight, 420);
assert.strictEqual(portraitHeight, 900);

var generatedRegressions = [
  {seed: "fit-seed-532", expectedSpan: {x: 3, y: 8}},
  {seed: "fit-seed-74", expectedSpan: {x: 9, y: 3}},
  {seed: "fit-seed-1365", expectedSpan: {x: 8, y: 8}}
];

generatedRegressions.forEach(function(regression) {
  var dungeon = core.generateDungeon(regression.seed);
  var visible = ui.getVisibleDungeon(dungeon, false);
  assert.deepStrictEqual(gridSpan(visible.rooms), regression.expectedSpan);
  var cells = ui.getGuessableCells(dungeon, false);
  var markers = cells.length ? [
    {type: "secret", x: cells[0].x, y: cells[0].y},
    {type: "super-secret", x: cells[cells.length - 1].x, y: cells[cells.length - 1].y}
  ] : [];
  var visibleViewBox = assertRenderedGeometry(visible.rooms, {
    guessCells: cells,
    guessMarkers: markers
  });
  assertConnectionsContained(dungeon, visible, visibleViewBox);

  var revealed = ui.getVisibleDungeon(dungeon, true);
  var revealedViewBox = assertRenderedGeometry(revealed.rooms);
  assertConnectionsContained(dungeon, revealed, revealedViewBox);
});

console.log("dungeon-viewbox: actual geometry, aspect height and generated regressions passed");
