"use strict";

var assert = require("assert");
var core = require("../docs/javascripts/dungeon-core.js");
var replay = require("../docs/javascripts/dungeon-replay.js");

function roomSummary(rooms) {
  return rooms.map(function(room) {
    return room.x + "," + room.y + ":" + room.type;
  }).sort();
}

function edgeSummary(edges) {
  return edges.map(function(edge) {
    return [edge.from, edge.to].sort().join(">");
  }).sort();
}

var dungeon = core.generateDungeon("ZDD14990");
var empty = replay.buildReplayState(dungeon.steps, 0);
assert.deepStrictEqual(empty.rooms, []);
assert.deepStrictEqual(empty.edges, []);
assert.strictEqual(empty.candidate, null);

var startIndex = dungeon.steps.findIndex(function(step) { return step.type === "start"; });
var afterStart = replay.buildReplayState(dungeon.steps, startIndex + 1);
assert.strictEqual(afterStart.rooms.length, 1);
assert.strictEqual(afterStart.rooms[0].type, "start");
assert.strictEqual(afterStart.rooms[0].x, 0);
assert.strictEqual(afterStart.rooms[0].y, 0);

var candidateIndex = dungeon.steps.findIndex(function(step) { return step.type === "candidate"; });
var afterCandidate = replay.buildReplayState(dungeon.steps, candidateIndex + 1);
assert.strictEqual(afterCandidate.candidate.status, "candidate");
assert.strictEqual(afterCandidate.candidate.x, dungeon.steps[candidateIndex].position.x);
assert.strictEqual(afterCandidate.candidate.y, dungeon.steps[candidateIndex].position.y);

var addedIndex = dungeon.steps.findIndex(function(step) { return step.type === "room-added"; });
var beforeAdded = replay.buildReplayState(dungeon.steps, addedIndex);
var afterAdded = replay.buildReplayState(dungeon.steps, addedIndex + 1);
assert.strictEqual(afterAdded.rooms.length, beforeAdded.rooms.length + 1);
assert.strictEqual(afterAdded.candidate, null);
assert.ok(afterAdded.rooms.some(function(room) {
  return room.id === dungeon.steps[addedIndex].room.id;
}));

var rejectIndex = dungeon.steps.findIndex(function(step) { return step.type === "reject"; });
assert.ok(rejectIndex >= 0, "known replay seed should include a rejected candidate");
var beforeReject = replay.buildReplayState(dungeon.steps, rejectIndex);
var afterReject = replay.buildReplayState(dungeon.steps, rejectIndex + 1);
assert.strictEqual(afterReject.rooms.length, beforeReject.rooms.length);
assert.strictEqual(afterReject.candidate.status, "rejected");
assert.strictEqual(afterReject.candidate.reason, dungeon.steps[rejectIndex].reason);
assert.ok(!afterReject.rooms.some(function(room) {
  return room.x === afterReject.candidate.x && room.y === afterReject.candidate.y;
}), "a rejected candidate must not become a permanent room");

var bossIndex = dungeon.steps.findIndex(function(step) { return step.type === "boss-assigned"; });
var afterBoss = replay.buildReplayState(dungeon.steps, bossIndex + 1);
var bossStep = dungeon.steps[bossIndex];
assert.strictEqual(afterBoss.rooms.find(function(room) {
  return room.id === bossStep.roomId;
}).type, "boss");

var full = replay.buildReplayState(dungeon.steps, dungeon.steps.length);
assert.deepStrictEqual(roomSummary(full.rooms), roomSummary(dungeon.rooms));
assert.deepStrictEqual(edgeSummary(full.edges), edgeSummary(dungeon.edges));
assert.strictEqual(full.candidate, null);
assert.strictEqual(full.index, dungeon.steps.length);

var unicodeDungeon = core.generateDungeon("\u6570\u5b66 \ud83d\uddfa\ufe0f seed");
var unicodeFull = replay.buildReplayState(unicodeDungeon.steps, Infinity);
assert.deepStrictEqual(roomSummary(unicodeFull.rooms), roomSummary(unicodeDungeon.rooms));
assert.deepStrictEqual(edgeSummary(unicodeFull.edges), edgeSummary(unicodeDungeon.edges));

["ZDD14990", "ISAAC", "HELLO-WORLD"].forEach(function(seed) {
  var knownDungeon = core.generateDungeon(seed);
  var knownReplay = replay.buildReplayState(knownDungeon.steps, knownDungeon.steps.length);
  assert.deepStrictEqual(roomSummary(knownReplay.rooms), roomSummary(knownDungeon.rooms));
  assert.deepStrictEqual(edgeSummary(knownReplay.edges), edgeSummary(knownDungeon.edges));
});

var previous = replay.buildReplayState(dungeon.steps, candidateIndex + 1);
var snapshot = JSON.stringify(previous);
replay.applyDungeonStep(previous, dungeon.steps[candidateIndex + 1]);
assert.strictEqual(JSON.stringify(previous), snapshot, "applyDungeonStep must not mutate its input state");

assert.match(replay.describeDungeonStep({
  type: "reject",
  position: {x: 2, y: -1},
  reason: "too-many-neighbors"
}), /Rejected \(2,-1\): too many occupied neighbors/);

console.log("dungeon-replay: reducer, rejection, assignment and final invariants passed");
