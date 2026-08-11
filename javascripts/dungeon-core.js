(function(root, factory) {
  "use strict";

  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.ZddDungeonCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function() {
  "use strict";

  var VERSION = "dungeon-v1";
  var DEFAULT_MIN_ROOMS = 12;
  var DEFAULT_MAX_ROOMS = 18;
  var ABSOLUTE_MIN_ROOMS = 3;
  var ABSOLUTE_MAX_ROOMS = 20;
  var ATTEMPTS_PER_ROOM = 20;
  var DIRECTIONS = [
    {name: "up", opposite: "down", dx: 0, dy: -1},
    {name: "down", opposite: "up", dx: 0, dy: 1},
    {name: "left", opposite: "right", dx: -1, dy: 0},
    {name: "right", opposite: "left", dx: 1, dy: 0}
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

  function roomSnapshot(room) {
    return {id: room.id, x: room.x, y: room.y, type: room.type};
  }

  function createRoom(x, y, type) {
    return {id: roomId(x, y), x: x, y: y, type: type || "normal"};
  }

  function occupiedNeighbors(x, y, occupied) {
    var neighbors = [];
    DIRECTIONS.forEach(function(direction) {
      var room = occupied[coordinateKey(x + direction.dx, y + direction.dy)];
      if (room) neighbors.push(room);
    });
    return neighbors.sort(compareCoordinates);
  }

  function collectFrontier(rooms, occupied, rejected) {
    var cells = Object.create(null);
    rooms.forEach(function(room) {
      DIRECTIONS.forEach(function(direction) {
        var x = room.x + direction.dx;
        var y = room.y + direction.dy;
        var key = coordinateKey(x, y);
        if (!occupied[key] && (!rejected || !rejected[key])) {
          cells[key] = {x: x, y: y};
        }
      });
    });
    return Object.keys(cells).map(function(key) {
      var cell = cells[key];
      cell.neighbors = occupiedNeighbors(cell.x, cell.y, occupied);
      return cell;
    }).sort(compareCoordinates);
  }

  function completesSolidBlock(candidate, occupied) {
    for (var offsetY = -1; offsetY <= 0; offsetY += 1) {
      for (var offsetX = -1; offsetX <= 0; offsetX += 1) {
        var full = true;
        for (var y = 0; y <= 1; y += 1) {
          for (var x = 0; x <= 1; x += 1) {
            var cellX = candidate.x + offsetX + x;
            var cellY = candidate.y + offsetY + y;
            if (cellX === candidate.x && cellY === candidate.y) continue;
            if (!occupied[coordinateKey(cellX, cellY)]) full = false;
          }
        }
        if (full) return true;
      }
    }
    return false;
  }

  function createsLongStraight(candidate, occupied) {
    if (candidate.neighbors.length !== 1) return false;
    var neighbor = candidate.neighbors[0];
    var dx = neighbor.x - candidate.x;
    var dy = neighbor.y - candidate.y;
    var straightRooms = 0;
    var x = candidate.x + dx;
    var y = candidate.y + dy;
    while (occupied[coordinateKey(x, y)] && straightRooms < 4) {
      straightRooms += 1;
      x += dx;
      y += dy;
    }
    return straightRooms >= 4;
  }

  function candidateRejectionReason(candidate, occupied, random) {
    if (candidate.neighbors.length >= 3) return "too-many-neighbors";
    if (completesSolidBlock(candidate, occupied)) return "solid-block";
    if (createsLongStraight(candidate, occupied)) return "long-straight";
    if (candidate.neighbors.length === 2 && random() >= 0.2) return "multiple-neighbors";
    return "";
  }

  function addRoom(candidate, rooms, occupied, steps, mode) {
    var room = createRoom(candidate.x, candidate.y, "normal");
    rooms.push(room);
    occupied[coordinateKey(room.x, room.y)] = room;
    steps.push({
      type: "room-added",
      mode: mode,
      room: roomSnapshot(room),
      connectedTo: candidate.neighbors.map(function(neighbor) { return neighbor.id; })
    });
    return room;
  }

  function chooseFallbackCandidate(rooms, occupied, random) {
    var candidates = collectFrontier(rooms, occupied, null);
    if (!candidates.length) return null;
    var preferred = candidates.filter(function(candidate) {
      return candidate.neighbors.length === 1
        && !completesSolidBlock(candidate, occupied)
        && !createsLongStraight(candidate, occupied);
    });
    if (!preferred.length) {
      var lowestDegree = candidates.reduce(function(minimum, candidate) {
        return Math.min(minimum, candidate.neighbors.length);
      }, Infinity);
      preferred = candidates.filter(function(candidate) {
        return candidate.neighbors.length === lowestDegree;
      });
    }
    preferred.sort(compareCoordinates);
    return preferred[randomIndex(random, preferred.length)];
  }

  function buildConnections(rooms, occupied) {
    rooms.sort(compareCoordinates);
    rooms.forEach(function(room) {
      room.neighbors = {up: null, down: null, left: null, right: null};
    });
    rooms.forEach(function(room) {
      DIRECTIONS.forEach(function(direction) {
        var neighbor = occupied[coordinateKey(room.x + direction.dx, room.y + direction.dy)];
        if (neighbor) room.neighbors[direction.name] = neighbor.id;
      });
    });

    var edges = [];
    rooms.forEach(function(room) {
      ["right", "down"].forEach(function(direction) {
        if (room.neighbors[direction]) {
          edges.push({from: room.id, to: room.neighbors[direction]});
        }
      });
    });
    return edges.sort(function(left, right) {
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
      return total + (room.neighbors[direction.name] ? 1 : 0);
    }, 0);
  }

  function chooseBoss(rooms, distances, random) {
    var leaves = rooms.filter(function(room) {
      return room.type !== "start" && roomDegree(room) === 1;
    });
    var notAdjacent = leaves.filter(function(room) { return distances[room.id] > 1; });
    var candidates = notAdjacent.length ? notAdjacent : leaves;
    if (!candidates.length) {
      candidates = rooms.filter(function(room) { return room.type !== "start"; });
    }
    var maximumDistance = candidates.reduce(function(maximum, room) {
      return Math.max(maximum, distances[room.id]);
    }, -1);
    var farthest = candidates.filter(function(room) {
      return distances[room.id] === maximumDistance;
    }).sort(compareCoordinates);
    return farthest[randomIndex(random, farthest.length)];
  }

  function weightedPick(candidates, distances, random) {
    var total = candidates.reduce(function(sum, room) {
      var distance = Math.max(1, distances[room.id]);
      return sum + distance * distance;
    }, 0);
    var choice = random() * total;
    for (var index = 0; index < candidates.length; index += 1) {
      var distance = Math.max(1, distances[candidates[index].id]);
      choice -= distance * distance;
      if (choice < 0) return candidates[index];
    }
    return candidates[candidates.length - 1];
  }

  function chooseTreasure(rooms, distances, random) {
    var candidates = rooms.filter(function(room) {
      return room.type === "normal" && roomDegree(room) === 1;
    });
    if (!candidates.length) {
      candidates = rooms.filter(function(room) { return room.type === "normal"; });
    }
    candidates.sort(compareCoordinates);
    return weightedPick(candidates, distances, random);
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
    var edges = (dungeon.edges || []).slice().sort(function(left, right) {
      return compareStrings(left.from + ">" + left.to, right.from + ">" + right.to);
    }).map(function(edge) { return edge.from + ">" + edge.to; });
    return hashToHex(hashSeed((dungeon.version || VERSION) + "|" + rooms.join(";") + "|" + edges.join(";")));
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
    var maxAttempts = targetRooms * ATTEMPTS_PER_ROOM;
    var rooms = [];
    var occupied = Object.create(null);
    var rejected = Object.create(null);
    var steps = [];
    var attempts = 0;
    var rejectedCandidates = 0;
    var fallbackAdditions = 0;

    var start = createRoom(0, 0, "start");
    rooms.push(start);
    occupied[coordinateKey(0, 0)] = start;
    steps.push({type: "start", room: roomSnapshot(start)});

    while (rooms.length < targetRooms && attempts < maxAttempts) {
      var frontier = collectFrontier(rooms, occupied, rejected);
      if (!frontier.length) break;
      var candidate = frontier[randomIndex(random, frontier.length)];
      attempts += 1;
      steps.push({
        type: "candidate",
        mode: "growth",
        position: {x: candidate.x, y: candidate.y},
        fromRoomIds: candidate.neighbors.map(function(room) { return room.id; }),
        occupiedNeighborCount: candidate.neighbors.length
      });
      var reason = candidateRejectionReason(candidate, occupied, random);
      if (reason) {
        rejected[coordinateKey(candidate.x, candidate.y)] = true;
        rejectedCandidates += 1;
        steps.push({type: "reject", position: {x: candidate.x, y: candidate.y}, reason: reason});
        continue;
      }
      addRoom(candidate, rooms, occupied, steps, "growth");
    }

    for (var fallbackIndex = 0;
      rooms.length < targetRooms && fallbackIndex < targetRooms;
      fallbackIndex += 1) {
      var fallback = chooseFallbackCandidate(rooms, occupied, random);
      if (!fallback) break;
      fallbackAdditions += 1;
      steps.push({
        type: "candidate",
        mode: "fallback",
        position: {x: fallback.x, y: fallback.y},
        fromRoomIds: fallback.neighbors.map(function(room) { return room.id; }),
        occupiedNeighborCount: fallback.neighbors.length
      });
      addRoom(fallback, rooms, occupied, steps, "fallback");
    }

    var edges = buildConnections(rooms, occupied);
    var distances = computeDistancesFromStart(rooms, start.id);
    rooms.forEach(function(room) { room.distance = distances[room.id]; });

    var boss = chooseBoss(rooms, distances, random);
    boss.type = "boss";
    steps.push({
      type: "boss-assigned",
      roomId: boss.id,
      position: {x: boss.x, y: boss.y},
      distance: distances[boss.id]
    });

    var treasure = chooseTreasure(rooms, distances, random);
    treasure.type = "treasure";
    steps.push({
      type: "treasure-assigned",
      roomId: treasure.id,
      position: {x: treasure.x, y: treasure.y},
      distance: distances[treasure.id]
    });

    var deadEndCount = rooms.filter(function(room) { return roomDegree(room) === 1; }).length;
    var maxDistance = rooms.reduce(function(maximum, room) {
      return Math.max(maximum, distances[room.id]);
    }, 0);
    var result = {
      version: VERSION,
      seed: seedText,
      seedHash: seedHash,
      rooms: rooms,
      edges: edges,
      steps: steps,
      stats: {
        roomCount: rooms.length,
        targetRooms: targetRooms,
        deadEndCount: deadEndCount,
        maxDistance: maxDistance,
        attempts: attempts,
        maxAttempts: maxAttempts,
        rejectedCandidates: rejectedCandidates,
        fallbackAdditions: fallbackAdditions
      }
    };
    result.fingerprint = getDungeonFingerprint(result);
    return result;
  }

  return {
    VERSION: VERSION,
    hashSeed: hashSeed,
    createPRNG: createPRNG,
    generateDungeon: generateDungeon,
    computeDistancesFromStart: computeDistancesFromStart,
    getDungeonFingerprint: getDungeonFingerprint
  };
});
