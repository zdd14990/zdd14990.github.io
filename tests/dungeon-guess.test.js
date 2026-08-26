"use strict";

var assert = require("assert");
var core = require("../docs/javascripts/dungeon-core.js");
var ui = require("../docs/javascripts/dungeon-ui-core.js");

function edgeTouches(edge, roomId) {
  return edge.from === roomId || edge.to === roomId;
}

var dungeon = core.generateDungeon("ZDD14990");
var original = JSON.stringify(dungeon);
var secret = dungeon.rooms.find(function(room) { return room.id === dungeon.secretRoomId; });
var superSecret = dungeon.rooms.find(function(room) { return room.id === dungeon.superSecretRoomId; });
var hiddenIds = new Set([secret.id, superSecret.id]);

var visible = ui.getVisibleDungeon(dungeon, false);
assert.ok(!visible.rooms.some(function(room) { return hiddenIds.has(room.id); }));
assert.ok(!visible.connections.some(function(connection) {
  return hiddenIds.has(connection.from) || hiddenIds.has(connection.to);
}));
visible.rooms.forEach(function(room) {
  var expectedDegree = visible.connections.filter(function(connection) {
    return edgeTouches(connection, room.id);
  }).length;
  assert.strictEqual(room.degree, expectedDegree, "visible degree must exclude hidden connections");
  Object.keys(room.neighbors).forEach(function(direction) {
    assert.ok(!hiddenIds.has(room.neighbors[direction]), "visible neighbors must not leak a hidden room ID");
  });
});

var secretNeighborIds = dungeon.connections.filter(function(connection) {
  return edgeTouches(connection, secret.id);
}).map(function(connection) {
  return connection.from === secret.id ? connection.to : connection.from;
});
secretNeighborIds.forEach(function(roomId) {
  var fullRoom = dungeon.rooms.find(function(room) { return room.id === roomId; });
  var visibleRoom = visible.rooms.find(function(room) { return room.id === roomId; });
  var fullDegree = dungeon.connections.filter(function(connection) { return edgeTouches(connection, roomId); }).length;
  assert.strictEqual(visibleRoom.degree, fullDegree - 1);
  assert.ok(visibleRoom.distance == null || visibleRoom.distance >= 0);
  assert.ok(fullRoom);
});

var guessable = ui.getGuessableCells(dungeon, false);
assert.ok(guessable.some(function(cell) { return cell.x === secret.x && cell.y === secret.y; }));
assert.ok(guessable.some(function(cell) { return cell.x === superSecret.x && cell.y === superSecret.y; }));
guessable.forEach(function(cell) {
  assert.ok(cell.adjacentVisibleRoomIds.length >= 1);
  assert.ok(!visible.rooms.some(function(room) { return room.x === cell.x && room.y === cell.y; }));
});

assert.strictEqual(ui.checkSecretGuess(dungeon, {x: secret.x, y: secret.y}), true);
assert.strictEqual(ui.checkSecretGuess(dungeon, {x: superSecret.x, y: superSecret.y}), false);
assert.strictEqual(ui.checkSuperSecretGuess(dungeon, {x: superSecret.x, y: superSecret.y}), true);
assert.strictEqual(ui.checkSuperSecretGuess(dungeon, {x: secret.x, y: secret.y}), false);
assert.strictEqual(ui.checkSecretGuess(dungeon, null), false);

var revealed = ui.getVisibleDungeon(dungeon, true);
assert.strictEqual(revealed.rooms.length, dungeon.rooms.length);
assert.deepStrictEqual(revealed.connections, dungeon.connections);
assert.ok(revealed.rooms.some(function(room) { return room.id === secret.id; }));
assert.ok(revealed.rooms.some(function(room) { return room.id === superSecret.id; }));
assert.deepStrictEqual(ui.getGuessableCells(dungeon, true), []);
assert.strictEqual(JSON.stringify(dungeon), original, "visibility and guessing helpers must be pure");

for (var seedIndex = 0; seedIndex < 100; seedIndex += 1) {
  var sample = core.generateDungeon("guess-seed-" + seedIndex);
  var sampleSecret = sample.rooms.find(function(room) { return room.id === sample.secretRoomId; });
  var sampleSuper = sample.rooms.find(function(room) { return room.id === sample.superSecretRoomId; });
  var cells = ui.getGuessableCells(sample, false);
  assert.ok(cells.some(function(cell) { return cell.x === sampleSecret.x && cell.y === sampleSecret.y; }));
  assert.ok(cells.some(function(cell) { return cell.x === sampleSuper.x && cell.y === sampleSuper.y; }));
}

console.log("dungeon-guess: hidden graph, guess cells and correctness invariants passed");
