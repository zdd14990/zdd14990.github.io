"use strict";

var assert = require("assert");
var core = require("../docs/javascripts/dungeon-core.js");

var DIRECTIONS = [
  {name: "up", opposite: "down", dx: 0, dy: -1},
  {name: "down", opposite: "up", dx: 0, dy: 1},
  {name: "left", opposite: "right", dx: -1, dy: 0},
  {name: "right", opposite: "left", dx: 1, dy: 0}
];

function degree(room) {
  return DIRECTIONS.reduce(function(total, direction) {
    return total + (room.neighbors[direction.name] ? 1 : 0);
  }, 0);
}

function topology(dungeon) {
  return dungeon.rooms.map(function(room) {
    return room.x + "," + room.y + ":" + room.type;
  }).sort().join("|");
}

function assertDungeonInvariants(dungeon) {
  assert.strictEqual(dungeon.version, "dungeon-v1");
  assert.ok(dungeon.stats.roomCount >= 12 && dungeon.stats.roomCount <= 18);
  assert.strictEqual(dungeon.rooms.length, dungeon.stats.roomCount);
  assert.strictEqual(dungeon.stats.roomCount, dungeon.stats.targetRooms);
  assert.ok(dungeon.stats.attempts <= dungeon.stats.maxAttempts);
  assert.strictEqual(dungeon.stats.maxAttempts, dungeon.stats.targetRooms * 20);

  var roomsById = Object.create(null);
  var coordinates = Object.create(null);
  dungeon.rooms.forEach(function(room) {
    assert.ok(Number.isInteger(room.x));
    assert.ok(Number.isInteger(room.y));
    assert.ok(!coordinates[room.x + "," + room.y], "duplicate coordinate");
    assert.ok(!roomsById[room.id], "duplicate room ID");
    coordinates[room.x + "," + room.y] = true;
    roomsById[room.id] = room;
  });
  dungeon.rooms.forEach(function(room) {
    var completesSquare = coordinates[(room.x + 1) + "," + room.y]
      && coordinates[room.x + "," + (room.y + 1)]
      && coordinates[(room.x + 1) + "," + (room.y + 1)];
    assert.ok(!completesSquare, "2x2 solid room blocks are not allowed");
  });

  var starts = dungeon.rooms.filter(function(room) { return room.type === "start"; });
  var bosses = dungeon.rooms.filter(function(room) { return room.type === "boss"; });
  var treasures = dungeon.rooms.filter(function(room) { return room.type === "treasure"; });
  assert.strictEqual(starts.length, 1);
  assert.strictEqual(bosses.length, 1);
  assert.strictEqual(treasures.length, 1);
  assert.strictEqual(starts[0].x, 0);
  assert.strictEqual(starts[0].y, 0);
  assert.notStrictEqual(starts[0].id, bosses[0].id);
  assert.notStrictEqual(starts[0].id, treasures[0].id);
  assert.notStrictEqual(bosses[0].id, treasures[0].id);

  dungeon.rooms.forEach(function(room) {
    DIRECTIONS.forEach(function(direction) {
      var neighborId = room.neighbors[direction.name];
      if (!neighborId) return;
      var neighbor = roomsById[neighborId];
      assert.ok(neighbor, "connection references a missing room");
      assert.strictEqual(Math.abs(room.x - neighbor.x) + Math.abs(room.y - neighbor.y), 1);
      assert.strictEqual(neighbor.x, room.x + direction.dx);
      assert.strictEqual(neighbor.y, room.y + direction.dy);
      assert.strictEqual(neighbor.neighbors[direction.opposite], room.id);
    });
  });

  dungeon.edges.forEach(function(edge) {
    var from = roomsById[edge.from];
    var to = roomsById[edge.to];
    assert.ok(from && to);
    assert.strictEqual(Math.abs(from.x - to.x) + Math.abs(from.y - to.y), 1);
  });

  var distances = core.computeDistancesFromStart(dungeon);
  assert.strictEqual(Object.keys(distances).length, dungeon.rooms.length);
  dungeon.rooms.forEach(function(room) {
    assert.strictEqual(room.distance, distances[room.id]);
  });
  assert.strictEqual(distances[starts[0].id], 0);
  assert.strictEqual(Math.max.apply(null, Object.keys(distances).map(function(id) {
    return distances[id];
  })), dungeon.stats.maxDistance);

  var eligibleBossLeaves = dungeon.rooms.filter(function(room) {
    return room.type !== "start" && degree(room) === 1 && distances[room.id] > 1;
  });
  assert.ok(eligibleBossLeaves.length > 0);
  var farthestLeafDistance = Math.max.apply(null, eligibleBossLeaves.map(function(room) {
    return distances[room.id];
  }));
  assert.strictEqual(degree(bosses[0]), 1);
  assert.strictEqual(distances[bosses[0].id], farthestLeafDistance);
  assert.ok(distances[bosses[0].id] > 1);

  var otherLeaves = dungeon.rooms.filter(function(room) {
    return room.id !== starts[0].id && room.id !== bosses[0].id && degree(room) === 1;
  });
  if (otherLeaves.length) assert.strictEqual(degree(treasures[0]), 1);

  assert.strictEqual(core.getDungeonFingerprint(dungeon), dungeon.fingerprint);
  assert.match(dungeon.fingerprint, /^[0-9A-F]{8}$/);
  assert.ok(dungeon.steps.some(function(step) { return step.type === "start"; }));
  assert.ok(dungeon.steps.some(function(step) { return step.type === "candidate"; }));
  assert.ok(dungeon.steps.some(function(step) { return step.type === "room-added"; }));
  assert.strictEqual(dungeon.steps.filter(function(step) {
    return step.type === "boss-assigned";
  }).length, 1);
  assert.strictEqual(dungeon.steps.filter(function(step) {
    return step.type === "treasure-assigned";
  }).length, 1);
  var loggedRooms = dungeon.steps.filter(function(step) {
    return step.type === "start" || step.type === "room-added";
  }).map(function(step) {
    return step.room.x + "," + step.room.y;
  }).sort();
  assert.deepStrictEqual(loggedRooms, Object.keys(coordinates).sort());
  assert.strictEqual(dungeon.steps.filter(function(step) {
    return step.type === "candidate" && step.mode === "growth";
  }).length, dungeon.stats.attempts);
  assert.strictEqual(dungeon.steps.filter(function(step) {
    return step.type === "reject";
  }).length, dungeon.stats.rejectedCandidates);
  assert.strictEqual(dungeon.steps.find(function(step) {
    return step.type === "boss-assigned";
  }).roomId, bosses[0].id);
  assert.strictEqual(dungeon.steps.find(function(step) {
    return step.type === "treasure-assigned";
  }).roomId, treasures[0].id);
}

assert.strictEqual(core.hashSeed("hello"), 0x4f9f2cab);
assert.strictEqual(core.hashSeed("hello"), core.hashSeed("hello"));
assert.notStrictEqual(core.hashSeed("hello"), core.hashSeed("world"));
assert.strictEqual(core.hashSeed("数学"), core.hashSeed("数学"));

var randomA = core.createPRNG("ZDD14990");
var randomB = core.createPRNG("ZDD14990");
var sequenceA = Array.from({length: 8}, function() { return randomA(); });
var sequenceB = Array.from({length: 8}, function() { return randomB(); });
assert.deepStrictEqual(sequenceA, sequenceB);
var randomOther = core.createPRNG("ZDD14991");
assert.notDeepStrictEqual(sequenceA, Array.from({length: 8}, function() { return randomOther(); }));
sequenceA.forEach(function(value) { assert.ok(value >= 0 && value < 1); });

var repeated = Array.from({length: 5}, function() {
  return core.generateDungeon("ZDD14990");
});
repeated.slice(1).forEach(function(dungeon) {
  assert.deepStrictEqual(dungeon, repeated[0]);
});

var variedSeeds = ["AAA", "AAB", "hello", "world", "123", "124"];
var variedTopologies = new Set(variedSeeds.map(function(seed) {
  return topology(core.generateDungeon(seed));
}));
assert.ok(variedTopologies.size >= 4, "different seeds should influence the topology");

var simpleRooms = [
  {id: "start", x: 0, y: 0, type: "start", neighbors: {up: null, down: "middle", left: null, right: null}},
  {id: "middle", x: 0, y: 1, type: "normal", neighbors: {up: "start", down: "end", left: null, right: null}},
  {id: "end", x: 0, y: 2, type: "normal", neighbors: {up: "middle", down: null, left: null, right: null}}
];
assert.deepStrictEqual(core.computeDistancesFromStart(simpleRooms), {start: 0, middle: 1, end: 2});

var BULK_SEED_COUNT = 500;
for (var seedIndex = 0; seedIndex < BULK_SEED_COUNT; seedIndex += 1) {
  assertDungeonInvariants(core.generateDungeon("bulk-seed-" + seedIndex));
}

var knownSeeds = ["ZDD14990", "ISAAC", "HELLO-WORLD"];
var knownSummaries = knownSeeds.map(function(seed) {
  var dungeon = core.generateDungeon(seed);
  var boss = dungeon.rooms.find(function(room) { return room.type === "boss"; });
  var treasure = dungeon.rooms.find(function(room) { return room.type === "treasure"; });
  return {
    seed: seed,
    coordinates: dungeon.rooms.map(function(room) { return room.x + "," + room.y; }).sort(),
    roomCount: dungeon.stats.roomCount,
    boss: boss.x + "," + boss.y,
    treasure: treasure.x + "," + treasure.y,
    maxDistance: dungeon.stats.maxDistance,
    fingerprint: dungeon.fingerprint
  };
});

assert.deepStrictEqual(knownSummaries, [
  {
    seed: "ZDD14990",
    coordinates: [
      "-1,-1", "0,-1", "0,-2", "0,0", "0,1", "1,0", "2,0",
      "2,1", "3,-1", "3,0", "4,-1", "5,-1", "5,-2"
    ],
    roomCount: 13,
    boss: "5,-2",
    treasure: "2,1",
    maxDistance: 7,
    fingerprint: "F58C8595"
  },
  {
    seed: "ISAAC",
    coordinates: [
      "-1,1", "-2,0", "-2,1", "0,0", "0,1", "0,2", "0,4", "1,-1",
      "1,-2", "1,0", "1,2", "1,3", "1,4", "1,5", "2,-1", "2,3"
    ],
    roomCount: 16,
    boss: "0,4",
    treasure: "2,-1",
    maxDistance: 6,
    fingerprint: "CDFA4483"
  },
  {
    seed: "HELLO-WORLD",
    coordinates: [
      "-1,-1", "-1,-2", "-1,-3", "-1,0", "-2,-1", "-2,-3", "-2,-4",
      "-3,-3", "0,-2", "0,0", "1,-1", "1,0", "1,1", "1,2", "2,1",
      "3,1", "4,1"
    ],
    roomCount: 17,
    boss: "-2,-4",
    treasure: "-3,-3",
    maxDistance: 6,
    fingerprint: "8FC13D3F"
  }
]);

console.log("dungeon-core: " + BULK_SEED_COUNT + " bulk seeds and all tests passed");
