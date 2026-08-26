"use strict";

var assert = require("assert");
var core = require("../docs/javascripts/dungeon-core.js");

var DIRECTIONS = core.DIRECTIONS;
var GUARANTEED_TYPES = ["start", "boss", "shop", "treasure", "secret", "super-secret"];

function edgeKey(from, to) {
  return [from, to].sort().join(">");
}

function graphData(rooms, connections) {
  var adjacency = Object.create(null);
  rooms.forEach(function(room) { adjacency[room.id] = []; });
  connections.forEach(function(connection) {
    if (!adjacency[connection.from] || !adjacency[connection.to]) return;
    adjacency[connection.from].push(connection.to);
    adjacency[connection.to].push(connection.from);
  });
  var start = rooms.find(function(room) { return room.type === "start"; });
  var distances = Object.create(null);
  var queue = start ? [start.id] : [];
  if (start) distances[start.id] = 0;
  for (var index = 0; index < queue.length; index += 1) {
    adjacency[queue[index]].forEach(function(id) {
      if (distances[id] != null) return;
      distances[id] = distances[queue[index]] + 1;
      queue.push(id);
    });
  }
  return {adjacency: adjacency, distances: distances};
}

function roomOfType(dungeon, type) {
  return dungeon.rooms.find(function(room) { return room.type === type; });
}

function topology(dungeon) {
  return dungeon.rooms.map(function(room) {
    return room.x + "," + room.y + ":" + room.type;
  }).sort().join("|");
}

function assertDungeonInvariants(dungeon) {
  assert.strictEqual(dungeon.version, "dungeon-v2-isaaclike");
  assert.strictEqual(dungeon.steps, undefined, "v2 must not return replay steps");
  assert.ok(dungeon.stats.baseRoomCount >= 14 && dungeon.stats.baseRoomCount <= 20);
  assert.strictEqual(dungeon.stats.roomCount, dungeon.stats.baseRoomCount + 1);
  assert.strictEqual(dungeon.rooms.length, dungeon.stats.roomCount);
  assert.strictEqual(dungeon.stats.visibleRoomCount, dungeon.rooms.length - 2);
  assert.ok(dungeon.stats.layoutRetryCount >= 0);
  assert.ok(dungeon.stats.layoutRetryCount < core.MAX_LAYOUT_RETRIES);

  var roomsById = Object.create(null);
  var coordinates = Object.create(null);
  dungeon.rooms.forEach(function(room) {
    assert.ok(Number.isInteger(room.x));
    assert.ok(Number.isInteger(room.y));
    assert.ok(room.x >= core.GRID_BOUNDS.minX && room.x <= core.GRID_BOUNDS.maxX);
    assert.ok(room.y >= core.GRID_BOUNDS.minY && room.y <= core.GRID_BOUNDS.maxY);
    assert.ok(!roomsById[room.id], "duplicate room ID");
    assert.ok(!coordinates[room.x + "," + room.y], "duplicate room coordinate");
    roomsById[room.id] = room;
    coordinates[room.x + "," + room.y] = room;
  });

  GUARANTEED_TYPES.forEach(function(type) {
    assert.strictEqual(dungeon.rooms.filter(function(room) { return room.type === type; }).length, 1, type);
  });
  var start = roomOfType(dungeon, "start");
  var boss = roomOfType(dungeon, "boss");
  var shop = roomOfType(dungeon, "shop");
  var treasure = roomOfType(dungeon, "treasure");
  var secret = roomOfType(dungeon, "secret");
  var superSecret = roomOfType(dungeon, "super-secret");
  assert.strictEqual(start.x, 0);
  assert.strictEqual(start.y, 0);
  assert.strictEqual(dungeon.secretRoomId, secret.id);
  assert.strictEqual(dungeon.superSecretRoomId, superSecret.id);

  var optionalRooms = dungeon.rooms.filter(function(room) {
    return core.EXTRA_SPECIAL_TYPES.indexOf(room.type) >= 0;
  });
  assert.ok(optionalRooms.length >= 1 && optionalRooms.length <= 3);
  assert.strictEqual(optionalRooms.length, dungeon.stats.extraSpecialCount);
  assert.strictEqual(new Set(optionalRooms.map(function(room) { return room.type; })).size, optionalRooms.length);
  assert.ok(!(optionalRooms.some(function(room) { return room.type === "arcade"; })
    && optionalRooms.some(function(room) { return room.type === "vault"; })));

  var connectionKeys = new Set();
  dungeon.connections.forEach(function(connection) {
    var from = roomsById[connection.from];
    var to = roomsById[connection.to];
    assert.ok(from && to, "connection references a missing room");
    assert.strictEqual(Math.abs(from.x - to.x) + Math.abs(from.y - to.y), 1);
    var key = edgeKey(connection.from, connection.to);
    assert.ok(!connectionKeys.has(key), "duplicate connection");
    connectionKeys.add(key);
  });
  dungeon.rooms.forEach(function(room) {
    DIRECTIONS.forEach(function(direction) {
      var neighborId = room.neighbors[direction.name];
      if (!neighborId) return;
      var neighbor = roomsById[neighborId];
      assert.ok(neighbor);
      assert.strictEqual(neighbor.x, room.x + direction.dx);
      assert.strictEqual(neighbor.y, room.y + direction.dy);
      assert.strictEqual(neighbor.neighbors[direction.opposite], room.id);
      assert.ok(connectionKeys.has(edgeKey(room.id, neighbor.id)));
    });
  });

  var fullGraph = graphData(dungeon.rooms, dungeon.connections);
  assert.strictEqual(Object.keys(fullGraph.distances).length, dungeon.rooms.length, "full graph must be connected");
  dungeon.rooms.forEach(function(room) {
    assert.strictEqual(room.distance, fullGraph.distances[room.id]);
  });
  assert.strictEqual(dungeon.stats.maxDistance, Math.max.apply(null, dungeon.rooms.map(function(room) {
    return room.distance;
  })));

  var baseRooms = dungeon.rooms.filter(function(room) { return room.id !== secret.id; });
  var baseConnections = dungeon.connections.filter(function(connection) {
    return connection.from !== secret.id && connection.to !== secret.id;
  });
  var baseGraph = graphData(baseRooms, baseConnections);
  assert.strictEqual(baseConnections.length, baseRooms.length - 1, "base floor must be a tree");
  assert.strictEqual(Object.keys(baseGraph.distances).length, baseRooms.length, "base floor must be connected");
  assert.ok(baseGraph.adjacency[start.id].length >= 2, "Start must not be a dead end");

  var baseDeadEnds = baseRooms.filter(function(room) {
    return baseGraph.adjacency[room.id].length === 1;
  });
  assert.ok(baseDeadEnds.length >= 4 + optionalRooms.length);
  assert.strictEqual(dungeon.stats.deadEndCount, baseDeadEnds.length);
  assert.strictEqual(baseGraph.adjacency[boss.id].length, 1);
  assert.strictEqual(baseGraph.adjacency[superSecret.id].length, 1);
  assert.strictEqual(baseGraph.adjacency[shop.id].length, 1);
  assert.strictEqual(baseGraph.adjacency[treasure.id].length, 1);
  optionalRooms.forEach(function(room) {
    assert.strictEqual(baseGraph.adjacency[room.id].length, 1);
  });
  assert.ok(baseGraph.distances[boss.id] > 1);
  assert.notStrictEqual(baseGraph.adjacency[superSecret.id][0], boss.id);
  assert.ok(baseGraph.adjacency[boss.id].indexOf(superSecret.id) < 0);

  var farthestBossDistance = Math.max.apply(null, baseDeadEnds.filter(function(room) {
    return room.type !== "start";
  }).map(function(room) { return baseGraph.distances[room.id]; }));
  assert.strictEqual(baseGraph.distances[boss.id], farthestBossDistance);
  var legalSuperDeadEnds = baseDeadEnds.filter(function(room) {
    return room.id !== boss.id && baseGraph.adjacency[room.id][0] !== boss.id;
  });
  var bestSuperDistance = Math.max.apply(null, legalSuperDeadEnds.map(function(room) {
    return baseGraph.distances[room.id];
  }));
  assert.strictEqual(baseGraph.distances[superSecret.id], bestSuperDistance);
  assert.ok(baseGraph.distances[superSecret.id] >= Math.ceil(farthestBossDistance * 0.6));

  assert.strictEqual(fullGraph.adjacency[boss.id].length, 1, "Secret must not connect to Boss");
  assert.strictEqual(fullGraph.adjacency[superSecret.id].length, 1, "Super Secret must remain a dead end");
  assert.ok(fullGraph.adjacency[secret.id].length >= 1);
  assert.ok(fullGraph.adjacency[secret.id].indexOf(boss.id) < 0);
  assert.ok(fullGraph.adjacency[secret.id].indexOf(superSecret.id) < 0);

  var secretCandidates = core.getSecretCandidates(baseRooms);
  assert.ok(secretCandidates.length > 0);
  assert.ok(secretCandidates[0].neighborCount >= 2);
  assert.strictEqual(fullGraph.adjacency[secret.id].length, secretCandidates[0].neighborCount);
  assert.strictEqual(dungeon.stats.secretNeighborCount, secretCandidates[0].neighborCount);
  assert.ok(secretCandidates.some(function(candidate) {
    return candidate.x === secret.x
      && candidate.y === secret.y
      && candidate.neighborCount === secretCandidates[0].neighborCount;
  }), "Secret must use the best available candidate tier");

  var visible = new Set(dungeon.visibleRoomIds);
  assert.ok(!visible.has(secret.id));
  assert.ok(!visible.has(superSecret.id));
  dungeon.rooms.forEach(function(room) {
    assert.strictEqual(visible.has(room.id), room.id !== secret.id && room.id !== superSecret.id);
  });

  assert.strictEqual(core.getDungeonFingerprint(dungeon), dungeon.fingerprint);
  assert.match(dungeon.fingerprint, /^[0-9A-F]{8}$/);
}

assert.strictEqual(core.hashSeed("hello"), 0x4f9f2cab);
assert.strictEqual(core.hashSeed("hello"), core.hashSeed("hello"));
assert.notStrictEqual(core.hashSeed("hello"), core.hashSeed("world"));
assert.strictEqual(core.hashSeed("\u6570\u5b66"), core.hashSeed("\u6570\u5b66"));

var randomA = core.createPRNG("ZDD14990");
var randomB = core.createPRNG("ZDD14990");
var sequenceA = Array.from({length: 8}, function() { return randomA(); });
var sequenceB = Array.from({length: 8}, function() { return randomB(); });
assert.deepStrictEqual(sequenceA, sequenceB);

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
assert.ok(variedTopologies.size >= 5, "different seeds should influence v2 floors");

var BULK_SEED_COUNT = 500;
for (var seedIndex = 0; seedIndex < BULK_SEED_COUNT; seedIndex += 1) {
  assertDungeonInvariants(core.generateDungeon("bulk-seed-" + seedIndex));
}
assertDungeonInvariants(core.generateDungeon("\u6570\u5b66 \ud83d\uddfa\ufe0f seed"));

var knownSummaries = ["ZDD14990", "ISAAC", "HELLO-WORLD"].map(function(seed) {
  var dungeon = core.generateDungeon(seed);
  function coordinateOf(type) {
    var room = roomOfType(dungeon, type);
    return room.x + "," + room.y;
  }
  return {
    seed: seed,
    roomCount: dungeon.rooms.length,
    boss: coordinateOf("boss"),
    shop: coordinateOf("shop"),
    treasure: coordinateOf("treasure"),
    secret: coordinateOf("secret"),
    superSecret: coordinateOf("super-secret"),
    fingerprint: dungeon.fingerprint
  };
});

assert.deepStrictEqual(knownSummaries, [
  {
    seed: "ZDD14990",
    roomCount: 16,
    boss: "-3,1",
    shop: "0,-3",
    treasure: "1,-2",
    secret: "1,-1",
    superSecret: "-1,4",
    fingerprint: "181E428B"
  },
  {
    seed: "ISAAC",
    roomCount: 19,
    boss: "-3,-1",
    shop: "2,-2",
    treasure: "0,4",
    secret: "0,-1",
    superSecret: "-1,3",
    fingerprint: "63C2E14A"
  },
  {
    seed: "HELLO-WORLD",
    roomCount: 20,
    boss: "-1,4",
    shop: "-2,3",
    treasure: "2,-2",
    secret: "1,1",
    superSecret: "4,1",
    fingerprint: "8243E96D"
  }
]);

console.log("dungeon-core v2: " + BULK_SEED_COUNT + " tree floors and all invariants passed");
