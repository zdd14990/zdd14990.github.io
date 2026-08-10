(function(root, factory) {
  "use strict";

  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.ZddDungeonCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function() {
  "use strict";

  var VERSION = "dungeon-v2-isaaclike";
  var DEFAULT_MIN_ROOMS = 14;
  var DEFAULT_MAX_ROOMS = 20;
  var ABSOLUTE_MIN_ROOMS = 12;
  var ABSOLUTE_MAX_ROOMS = 20;
  var MAX_LAYOUT_RETRIES = 240;
  var GRID_BOUNDS = {minX: -4, maxX: 4, minY: -3, maxY: 4};
  var DIRECTIONS = [
    {name: "up", opposite: "down", dx: 0, dy: -1},
    {name: "down", opposite: "up", dx: 0, dy: 1},
    {name: "left", opposite: "right", dx: -1, dy: 0},
    {name: "right", opposite: "left", dx: 1, dy: 0}
  ];
  var EXTRA_SPECIAL_TYPES = [
    "curse", "sacrifice", "challenge", "arcade", "vault", "library", "planetarium"
  ];

  function hashSeed(seed) {
    var text = String(seed == null ? "" : seed);
    var hash = 0x811c9dc5;

    function addByte(value) {
      hash ^= value;
      hash = Math.imul(hash, 0x01000193);
    }

    for (var index = 0; index < text.length; index += 1) {
      var codePoint = text.charCodeAt(index);
      if (codePoint >= 0xd800 && codePoint <= 0xdbff && index + 1 < text.length) {
        var low = text.charCodeAt(index + 1);
        if (low >= 0xdc00 && low <= 0xdfff) {
          codePoint = 0x10000 + ((codePoint - 0xd800) << 10) + (low - 0xdc00);
          index += 1;
        } else {
          codePoint = 0xfffd;
        }
      } else if (codePoint >= 0xdc00 && codePoint <= 0xdfff) {
        codePoint = 0xfffd;
      }

      if (codePoint <= 0x7f) {
        addByte(codePoint);
      } else if (codePoint <= 0x7ff) {
        addByte(0xc0 | (codePoint >>> 6));
        addByte(0x80 | (codePoint & 0x3f));
      } else if (codePoint <= 0xffff) {
        addByte(0xe0 | (codePoint >>> 12));
        addByte(0x80 | ((codePoint >>> 6) & 0x3f));
        addByte(0x80 | (codePoint & 0x3f));
      } else {
        addByte(0xf0 | (codePoint >>> 18));
        addByte(0x80 | ((codePoint >>> 12) & 0x3f));
        addByte(0x80 | ((codePoint >>> 6) & 0x3f));
        addByte(0x80 | (codePoint & 0x3f));
      }
    }
    return hash >>> 0;
  }

  function createPRNGFromState(initialState) {
    var state = initialState >>> 0;
    return function() {
      state = (state + 0x6d2b79f5) >>> 0;
      var value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createPRNG(seed) {
    return createPRNGFromState(hashSeed(seed));
  }

  function coordinateKey(x, y) {
    return x + "," + y;
  }

  function roomId(x, y) {
    return "room:" + coordinateKey(x, y);
  }

  function compareCoordinates(left, right) {
    return left.y - right.y || left.x - right.x;
  }

  function compareStrings(left, right) {
    return left < right ? -1 : left > right ? 1 : 0;
  }

  function clampInteger(value, minimum, maximum, fallback) {
    var number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(minimum, Math.min(maximum, Math.floor(number)));
  }

  function randomIndex(random, length) {
    return Math.floor(random() * length);
  }

  function randomInteger(random, minimum, maximum) {
    return minimum + randomIndex(random, maximum - minimum + 1);
  }

  function shuffled(values, random) {
    var result = values.slice();
    for (var index = result.length - 1; index > 0; index -= 1) {
      var swapIndex = randomIndex(random, index + 1);
      var temporary = result[index];
      result[index] = result[swapIndex];
      result[swapIndex] = temporary;
    }
    return result;
  }

  function inBounds(x, y) {
    return x >= GRID_BOUNDS.minX && x <= GRID_BOUNDS.maxX
      && y >= GRID_BOUNDS.minY && y <= GRID_BOUNDS.maxY;
  }

  function createRoom(x, y, type) {
    return {id: roomId(x, y), x: x, y: y, type: type || "normal"};
  }

  function occupiedMap(rooms) {
    var occupied = Object.create(null);
    rooms.forEach(function(room) { occupied[coordinateKey(room.x, room.y)] = room; });
    return occupied;
  }

  function occupiedNeighbors(x, y, occupied) {
    var neighbors = [];
    DIRECTIONS.forEach(function(direction) {
      var room = occupied[coordinateKey(x + direction.dx, y + direction.dy)];
      if (room) neighbors.push(room);
    });
    return neighbors.sort(compareCoordinates);
  }

  function buildConnections(rooms) {
    var occupied = occupiedMap(rooms);
    var sortedRooms = rooms.slice().sort(compareCoordinates);
    sortedRooms.forEach(function(room) {
      room.neighbors = {up: null, down: null, left: null, right: null};
    });
    sortedRooms.forEach(function(room) {
      DIRECTIONS.forEach(function(direction) {
        var neighbor = occupied[coordinateKey(room.x + direction.dx, room.y + direction.dy)];
        if (neighbor) room.neighbors[direction.name] = neighbor.id;
      });
    });
    var connections = [];
    sortedRooms.forEach(function(room) {
      ["right", "down"].forEach(function(direction) {
        if (room.neighbors[direction]) {
          connections.push({from: room.id, to: room.neighbors[direction]});
        }
      });
    });
    return connections.sort(function(left, right) {
      return compareStrings(left.from + ">" + left.to, right.from + ">" + right.to);
    });
  }

  function computeDistancesFromStart(input, requestedStartId) {
    var rooms = Array.isArray(input) ? input : input && input.rooms;
    if (!Array.isArray(rooms) || !rooms.length) return {};
    var roomsById = Object.create(null);
    var start = null;
    rooms.forEach(function(room) {
      roomsById[room.id] = room;
      if (room.id === requestedStartId
          || (!requestedStartId && (room.type === "start" || (room.x === 0 && room.y === 0)))) {
        start = room;
      }
    });
    if (!start) return {};
    var distances = {};
    var queue = [start.id];
    distances[start.id] = 0;
    for (var queueIndex = 0; queueIndex < queue.length; queueIndex += 1) {
      var room = roomsById[queue[queueIndex]];
      DIRECTIONS.forEach(function(direction) {
        var neighborId = room.neighbors && room.neighbors[direction.name];
        if (neighborId && distances[neighborId] == null && roomsById[neighborId]) {
          distances[neighborId] = distances[room.id] + 1;
          queue.push(neighborId);
        }
      });
    }
    return distances;
  }

  function roomDegree(room) {
    return DIRECTIONS.reduce(function(total, direction) {
      return total + (room.neighbors && room.neighbors[direction.name] ? 1 : 0);
    }, 0);
  }

  function generateBaseLayout(random, targetRooms) {
    var start = createRoom(0, 0, "start");
    start.baseDistance = 0;
    var rooms = [start];
    var occupied = occupiedMap(rooms);
    var queue = [start];

    for (var queueIndex = 0; queueIndex < queue.length && rooms.length < targetRooms; queueIndex += 1) {
      var source = queue[queueIndex];
      var directions = shuffled(DIRECTIONS, random);
      for (var directionIndex = 0;
        directionIndex < directions.length && rooms.length < targetRooms;
        directionIndex += 1) {
        var direction = directions[directionIndex];
        var x = source.x + direction.dx;
        var y = source.y + direction.dy;
        if (!inBounds(x, y) || occupied[coordinateKey(x, y)]) continue;
        var neighbors = occupiedNeighbors(x, y, occupied);
        if (neighbors.length !== 1 || neighbors[0].id !== source.id) continue;

        var remainingRatio = (targetRooms - rooms.length) / targetRooms;
        var chance = 0.45 + remainingRatio * 0.34;
        if (source.type === "start") chance = 0.9;
        if (source.baseDistance >= 5) chance -= 0.09;
        if (random() >= chance) continue;

        var room = createRoom(x, y, "normal");
        room.baseDistance = source.baseDistance + 1;
        rooms.push(room);
        occupied[coordinateKey(x, y)] = room;
        queue.push(room);
      }
    }
    buildConnections(rooms);
    return rooms;
  }

  function sortedDeadEnds(rooms, distances, random) {
    return rooms.filter(function(room) {
      return room.type !== "start" && roomDegree(room) === 1;
    }).map(function(room) {
      return {room: room, distance: distances[room.id], tie: random()};
    }).sort(function(left, right) {
      return right.distance - left.distance || left.tie - right.tie || compareCoordinates(left.room, right.room);
    }).map(function(item) { return item.room; });
  }

  function soleNeighborId(room) {
    for (var index = 0; index < DIRECTIONS.length; index += 1) {
      var id = room.neighbors[DIRECTIONS[index].name];
      if (id) return id;
    }
    return "";
  }

  function assignGuaranteedRooms(rooms, distances, random) {
    var ordered = sortedDeadEnds(rooms, distances, random);
    var boss = ordered.find(function(room) { return distances[room.id] > 1; });
    if (!boss) return null;
    boss.type = "boss";
    var used = Object.create(null);
    used[boss.id] = true;

    var superSecret = ordered.find(function(room) {
      return !used[room.id] && soleNeighborId(room) !== boss.id;
    });
    if (!superSecret) return null;
    if (distances[superSecret.id] < Math.max(3, Math.ceil(distances[boss.id] * 0.6))) return null;
    superSecret.type = "super-secret";
    used[superSecret.id] = true;

    var shop = ordered.find(function(room) { return !used[room.id]; });
    if (!shop) return null;
    shop.type = "shop";
    used[shop.id] = true;

    var treasure = ordered.find(function(room) { return !used[room.id]; });
    if (!treasure) return null;
    treasure.type = "treasure";
    used[treasure.id] = true;

    return {
      boss: boss,
      superSecret: superSecret,
      shop: shop,
      treasure: treasure,
      remainingDeadEnds: ordered.filter(function(room) { return !used[room.id]; })
    };
  }

  function chooseOptionalTypes(random, count) {
    var pool = [
      {type: "curse", weight: 8},
      {type: "sacrifice", weight: 7},
      {type: "challenge", weight: 8},
      {type: "arcade", weight: 5},
      {type: "vault", weight: 4},
      {type: "library", weight: 2},
      {type: "planetarium", weight: 1}
    ];
    var selected = [];
    while (selected.length < count && pool.length) {
      var total = pool.reduce(function(sum, item) { return sum + item.weight; }, 0);
      var choice = random() * total;
      var picked = pool[pool.length - 1];
      for (var index = 0; index < pool.length; index += 1) {
        choice -= pool[index].weight;
        if (choice < 0) {
          picked = pool[index];
          break;
        }
      }
      selected.push(picked.type);
      pool = pool.filter(function(item) {
        if (item.type === picked.type) return false;
        if (picked.type === "arcade" && item.type === "vault") return false;
        if (picked.type === "vault" && item.type === "arcade") return false;
        return true;
      });
    }
    return selected;
  }

  function getSecretCandidates(baseRooms) {
    var rooms = Array.isArray(baseRooms) ? baseRooms : [];
    var occupied = occupiedMap(rooms);
    var candidates = [];
    for (var y = GRID_BOUNDS.minY; y <= GRID_BOUNDS.maxY; y += 1) {
      for (var x = GRID_BOUNDS.minX; x <= GRID_BOUNDS.maxX; x += 1) {
        if (occupied[coordinateKey(x, y)]) continue;
        var neighbors = occupiedNeighbors(x, y, occupied);
        if (!neighbors.length) continue;
        if (neighbors.some(function(room) {
          return room.type === "boss" || room.type === "super-secret";
        })) continue;
        candidates.push({
          x: x,
          y: y,
          neighborCount: neighbors.length,
          neighborIds: neighbors.map(function(room) { return room.id; })
        });
      }
    }
    return candidates.sort(function(left, right) {
      return right.neighborCount - left.neighborCount || compareCoordinates(left, right);
    });
  }

  function layoutIsUsable(rooms, targetRooms, requiredDeadEnds) {
    if (rooms.length !== targetRooms) return false;
    var start = rooms.find(function(room) { return room.type === "start"; });
    if (!start || roomDegree(start) < 2) return false;
    var deadEnds = rooms.filter(function(room) { return roomDegree(room) === 1; });
    if (deadEnds.length < requiredDeadEnds) return false;
    var connections = buildConnections(rooms);
    if (connections.length !== rooms.length - 1) return false;
    var distances = computeDistancesFromStart(rooms, start.id);
    if (Object.keys(distances).length !== rooms.length) return false;
    var maxDistance = Math.max.apply(null, rooms.map(function(room) { return distances[room.id]; }));
    if (maxDistance < 4 || maxDistance > Math.ceil(targetRooms * 0.7)) return false;
    return true;
  }

  function hashToHex(hash) {
    return ("00000000" + (hash >>> 0).toString(16).toUpperCase()).slice(-8);
  }

  function getDungeonFingerprint(dungeon) {
    if (!dungeon || !Array.isArray(dungeon.rooms)) return hashToHex(hashSeed(""));
    var rooms = dungeon.rooms.slice().sort(compareCoordinates).map(function(room) {
      var neighbors = DIRECTIONS.map(function(direction) {
        return direction.name + "=" + ((room.neighbors && room.neighbors[direction.name]) || "");
      }).join(",");
      return coordinateKey(room.x, room.y) + ":" + room.type + "[" + neighbors + "]";
    });
    var connections = (dungeon.connections || []).slice().sort(function(left, right) {
      return compareStrings(left.from + ">" + left.to, right.from + ">" + right.to);
    }).map(function(connection) { return connection.from + ">" + connection.to; });
    return hashToHex(hashSeed((dungeon.version || VERSION) + "|" + rooms.join(";") + "|" + connections.join(";")));
  }

  function normalizeArguments(seed, options) {
    if (seed && typeof seed === "object" && !Array.isArray(seed)) {
      return {seed: String(seed.seed == null ? "" : seed.seed), options: seed};
    }
    return {seed: String(seed == null ? "" : seed), options: options || {}};
  }

  function generateDungeon(seed, options) {
    var normalized = normalizeArguments(seed, options);
    var seedText = normalized.seed;
    var config = normalized.options;
    var seedHash = hashSeed(seedText);
    var random = createPRNGFromState(seedHash);
    var minimumRooms = clampInteger(
      config.minRooms, ABSOLUTE_MIN_ROOMS, ABSOLUTE_MAX_ROOMS, DEFAULT_MIN_ROOMS
    );
    var maximumRooms = clampInteger(
      config.maxRooms, minimumRooms, ABSOLUTE_MAX_ROOMS, Math.max(minimumRooms, DEFAULT_MAX_ROOMS)
    );
    var targetRooms = config.targetRooms == null
      ? randomInteger(random, minimumRooms, maximumRooms)
      : clampInteger(config.targetRooms, minimumRooms, maximumRooms, minimumRooms);
    var extraSpecialCount = randomInteger(random, 1, 3);
    var requiredDeadEnds = 4 + extraSpecialCount;
    var accepted = null;
    var acceptedRetry = -1;

    for (var retry = 0; retry < MAX_LAYOUT_RETRIES; retry += 1) {
      var rooms = generateBaseLayout(random, targetRooms);
      if (!layoutIsUsable(rooms, targetRooms, requiredDeadEnds)) continue;
      var start = rooms.find(function(room) { return room.type === "start"; });
      var baseDistances = computeDistancesFromStart(rooms, start.id);
      var assigned = assignGuaranteedRooms(rooms, baseDistances, random);
      if (!assigned || assigned.remainingDeadEnds.length < extraSpecialCount) continue;
      var secretCandidates = getSecretCandidates(rooms);
      if (!secretCandidates.length || secretCandidates[0].neighborCount < 2) continue;
      accepted = {
        rooms: rooms,
        assigned: assigned,
        secretCandidates: secretCandidates,
        baseDistances: baseDistances
      };
      acceptedRetry = retry;
      break;
    }

    if (!accepted) {
      throw new Error("Unable to generate a valid classic floor within the retry limit.");
    }

    var optionalTypes = chooseOptionalTypes(random, extraSpecialCount);
    optionalTypes.forEach(function(type, index) {
      accepted.assigned.remainingDeadEnds[index].type = type;
    });
    var baseDeadEndCount = accepted.rooms.filter(function(room) {
      return roomDegree(room) === 1;
    }).length;

    var bestNeighborCount = accepted.secretCandidates[0].neighborCount;
    var bestSecretCandidates = accepted.secretCandidates.filter(function(candidate) {
      return candidate.neighborCount === bestNeighborCount;
    });
    var secretPosition = bestSecretCandidates[randomIndex(random, bestSecretCandidates.length)];
    var secret = createRoom(secretPosition.x, secretPosition.y, "secret");
    accepted.rooms.push(secret);

    var connections = buildConnections(accepted.rooms);
    var distances = computeDistancesFromStart(accepted.rooms);
    accepted.rooms.forEach(function(room) {
      room.distance = distances[room.id];
      delete room.baseDistance;
    });
    accepted.rooms.sort(compareCoordinates);

    var superSecret = accepted.assigned.superSecret;
    var visibleRoomIds = accepted.rooms.filter(function(room) {
      return room.type !== "secret" && room.type !== "super-secret";
    }).map(function(room) { return room.id; });
    var maxDistance = accepted.rooms.reduce(function(maximum, room) {
      return Math.max(maximum, room.distance);
    }, 0);
    var baseRooms = accepted.rooms.filter(function(room) { return room.id !== secret.id; });
    var result = {
      version: VERSION,
      seed: seedText,
      seedHash: seedHash,
      gridBounds: {
        minX: GRID_BOUNDS.minX,
        maxX: GRID_BOUNDS.maxX,
        minY: GRID_BOUNDS.minY,
        maxY: GRID_BOUNDS.maxY
      },
      rooms: accepted.rooms,
      visibleRoomIds: visibleRoomIds,
      secretRoomId: secret.id,
      superSecretRoomId: superSecret.id,
      connections: connections,
      stats: {
        baseRoomCount: baseRooms.length,
        roomCount: accepted.rooms.length,
        visibleRoomCount: visibleRoomIds.length,
        targetRooms: targetRooms,
        deadEndCount: baseDeadEndCount,
        maxDistance: maxDistance,
        extraSpecialCount: extraSpecialCount,
        secretNeighborCount: secretPosition.neighborCount,
        layoutRetryCount: acceptedRetry
      }
    };
    result.fingerprint = getDungeonFingerprint(result);
    return result;
  }

  return {
    VERSION: VERSION,
    GRID_BOUNDS: GRID_BOUNDS,
    MAX_LAYOUT_RETRIES: MAX_LAYOUT_RETRIES,
    EXTRA_SPECIAL_TYPES: EXTRA_SPECIAL_TYPES.slice(),
    DIRECTIONS: DIRECTIONS.slice(),
    hashSeed: hashSeed,
    createPRNG: createPRNG,
    generateDungeon: generateDungeon,
    computeDistancesFromStart: computeDistancesFromStart,
    getSecretCandidates: getSecretCandidates,
    getDungeonFingerprint: getDungeonFingerprint
  };
});
