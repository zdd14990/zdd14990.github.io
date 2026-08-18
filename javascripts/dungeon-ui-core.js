(function(root, factory) {
  "use strict";

  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.ZddDungeonUiCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function() {
  "use strict";

  var DIRECTIONS = [
    {name: "up", opposite: "down", dx: 0, dy: -1},
    {name: "down", opposite: "up", dx: 0, dy: 1},
    {name: "left", opposite: "right", dx: -1, dy: 0},
    {name: "right", opposite: "left", dx: 1, dy: 0}
  ];
  var DUNGEON_GEOMETRY = {
    roomSize: 46,
    cellGap: 30,
    cellStep: 76,
    focusOutset: 5,
    secretGuessOutset: 2,
    superSecretGuessOutset: 6,
    padding: 84
  };

  function coordinateKey(x, y) {
    return x + "," + y;
  }

  function cloneRoom(room) {
    return {id: room.id, x: room.x, y: room.y, type: room.type};
  }

  function roomById(rooms, id) {
    return rooms.find(function(room) { return room.id === id; }) || null;
  }

  function directionBetween(from, to) {
    return DIRECTIONS.find(function(direction) {
      return from.x + direction.dx === to.x && from.y + direction.dy === to.y;
    }) || null;
  }

  function buildVisibleRooms(rooms, connections) {
    var roomsById = Object.create(null);
    rooms.forEach(function(room) {
      room.neighbors = {up: null, down: null, left: null, right: null};
      roomsById[room.id] = room;
    });
    connections.forEach(function(connection) {
      var from = roomsById[connection.from];
      var to = roomsById[connection.to];
      if (!from || !to) return;
      var direction = directionBetween(from, to);
      if (!direction) return;
      from.neighbors[direction.name] = to.id;
      to.neighbors[direction.opposite] = from.id;
    });

    var start = rooms.find(function(room) { return room.type === "start"; });
    var distances = Object.create(null);
    if (start) {
      var queue = [start.id];
      distances[start.id] = 0;
      for (var queueIndex = 0; queueIndex < queue.length; queueIndex += 1) {
        var room = roomsById[queue[queueIndex]];
        DIRECTIONS.forEach(function(direction) {
          var neighborId = room.neighbors[direction.name];
          if (!neighborId || distances[neighborId] != null) return;
          distances[neighborId] = distances[room.id] + 1;
          queue.push(neighborId);
        });
      }
    }

    rooms.forEach(function(room) {
      room.distance = distances[room.id] == null ? null : distances[room.id];
      room.degree = DIRECTIONS.reduce(function(total, direction) {
        return total + (room.neighbors[direction.name] ? 1 : 0);
      }, 0);
    });
    return rooms;
  }

  function getVisibleDungeon(dungeon, reveal) {
    var sourceRooms = dungeon && Array.isArray(dungeon.rooms) ? dungeon.rooms : [];
    var allowed = Object.create(null);
    if (reveal) {
      sourceRooms.forEach(function(room) { allowed[room.id] = true; });
    } else {
      (dungeon && dungeon.visibleRoomIds || []).forEach(function(id) { allowed[id] = true; });
    }
    var rooms = sourceRooms.filter(function(room) { return allowed[room.id]; }).map(cloneRoom);
    var connections = (dungeon && dungeon.connections || []).filter(function(connection) {
      return allowed[connection.from] && allowed[connection.to];
    }).map(function(connection) {
      return {from: connection.from, to: connection.to};
    });
    return {
      rooms: buildVisibleRooms(rooms, connections),
      connections: connections,
      roomIds: rooms.map(function(room) { return room.id; })
    };
  }

  function getGuessableCells(dungeon, reveal) {
    if (!dungeon || reveal) return [];
    var visible = getVisibleDungeon(dungeon, false);
    var occupied = Object.create(null);
    var cells = Object.create(null);
    var bounds = dungeon.gridBounds || {minX: -4, maxX: 4, minY: -3, maxY: 4};
    visible.rooms.forEach(function(room) { occupied[coordinateKey(room.x, room.y)] = true; });
    visible.rooms.forEach(function(room) {
      DIRECTIONS.forEach(function(direction) {
        var x = room.x + direction.dx;
        var y = room.y + direction.dy;
        var key = coordinateKey(x, y);
        if (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY || occupied[key]) return;
        if (!cells[key]) cells[key] = {x: x, y: y, adjacentVisibleRoomIds: []};
        cells[key].adjacentVisibleRoomIds.push(room.id);
      });
    });
    return Object.keys(cells).map(function(key) { return cells[key]; }).sort(function(left, right) {
      return left.y - right.y || left.x - right.x;
    });
  }

  function sameCoordinate(left, right) {
    return Boolean(left && right && Number(left.x) === Number(right.x) && Number(left.y) === Number(right.y));
  }

  function checkRoomGuess(dungeon, coordinate, roomId) {
    if (!dungeon || !coordinate) return false;
    var room = roomById(dungeon.rooms || [], roomId);
    return sameCoordinate(room, coordinate);
  }

  function checkSecretGuess(dungeon, coordinate) {
    return checkRoomGuess(dungeon, coordinate, dungeon && dungeon.secretRoomId);
  }

  function checkSuperSecretGuess(dungeon, coordinate) {
    return checkRoomGuess(dungeon, coordinate, dungeon && dungeon.superSecretRoomId);
  }

  function positiveNumber(value, fallback) {
    var number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : fallback;
  }

  function nonNegativeNumber(value, fallback) {
    var number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : fallback;
  }

  function getDungeonGeometry(options) {
    var config = options || {};
    var roomSize = positiveNumber(config.roomSize, DUNGEON_GEOMETRY.roomSize);
    var cellGap = config.cellGap == null && Number(config.cellStep) > roomSize
      ? Number(config.cellStep) - roomSize
      : nonNegativeNumber(config.cellGap, DUNGEON_GEOMETRY.cellGap);
    return {
      roomSize: roomSize,
      cellGap: cellGap,
      cellStep: roomSize + cellGap,
      focusOutset: nonNegativeNumber(config.focusOutset, DUNGEON_GEOMETRY.focusOutset),
      secretGuessOutset: nonNegativeNumber(
        config.secretGuessOutset, DUNGEON_GEOMETRY.secretGuessOutset
      ),
      superSecretGuessOutset: nonNegativeNumber(
        config.superSecretGuessOutset, DUNGEON_GEOMETRY.superSecretGuessOutset
      ),
      padding: nonNegativeNumber(config.padding, DUNGEON_GEOMETRY.padding)
    };
  }

  function gridToSvg(cell, options) {
    var geometry = getDungeonGeometry(options);
    return {
      x: Number(cell.x) * geometry.cellStep,
      y: Number(cell.y) * geometry.cellStep
    };
  }

  function centeredRect(cell, size, options) {
    var center = gridToSvg(cell, options);
    return {
      left: center.x - size / 2,
      right: center.x + size / 2,
      top: center.y - size / 2,
      bottom: center.y + size / 2,
      x: center.x - size / 2,
      y: center.y - size / 2,
      width: size,
      height: size,
      centerX: center.x,
      centerY: center.y
    };
  }

  function getRoomRect(room, options) {
    var geometry = getDungeonGeometry(options);
    return centeredRect(room, geometry.roomSize, geometry);
  }

  function getFocusRect(room, options) {
    var geometry = getDungeonGeometry(options);
    return centeredRect(room, geometry.roomSize + geometry.focusOutset * 2, geometry);
  }

  function getGuessCellRect(cell, options) {
    return getRoomRect(cell, options);
  }

  function getGuessMarkerRect(marker, options) {
    var geometry = getDungeonGeometry(options);
    var outset = marker.type === "super-secret"
      ? geometry.superSecretGuessOutset
      : geometry.secretGuessOutset;
    return centeredRect(marker, geometry.roomSize + outset * 2, geometry);
  }

  function includeRect(bounds, rect) {
    bounds.left = Math.min(bounds.left, rect.left);
    bounds.right = Math.max(bounds.right, rect.right);
    bounds.top = Math.min(bounds.top, rect.top);
    bounds.bottom = Math.max(bounds.bottom, rect.bottom);
  }

  function computeDungeonGeometryBounds(rooms, options) {
    var config = options || {};
    var sourceRooms = Array.isArray(rooms) && rooms.length ? rooms : [{x: 0, y: 0}];
    var bounds = {left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity};
    sourceRooms.forEach(function(room) {
      includeRect(bounds, getFocusRect(room, config));
    });
    (config.guessCells || []).forEach(function(cell) {
      includeRect(bounds, getGuessCellRect(cell, config));
    });
    (config.guessMarkers || []).forEach(function(marker) {
      includeRect(bounds, getGuessMarkerRect(marker, config));
    });
    bounds.width = bounds.right - bounds.left;
    bounds.height = bounds.bottom - bounds.top;
    return bounds;
  }

  function computeDungeonViewBox(rooms, options) {
    var geometry = getDungeonGeometry(options);
    var content = computeDungeonGeometryBounds(rooms, options);
    var left = content.left - geometry.padding;
    var top = content.top - geometry.padding;
    var width = content.width + geometry.padding * 2;
    var height = content.height + geometry.padding * 2;
    return {
      left: left,
      top: top,
      width: width,
      height: height,
      right: left + width,
      bottom: top + height,
      cellStep: geometry.cellStep,
      roomSize: geometry.roomSize,
      padding: geometry.padding,
      contentBounds: content,
      value: [left, top, width, height].join(" ")
    };
  }

  function rectFitsViewBox(rect, viewBox, epsilon) {
    var tolerance = nonNegativeNumber(epsilon, 0.000001);
    return rect.left + tolerance >= viewBox.left
      && rect.right - tolerance <= viewBox.right
      && rect.top + tolerance >= viewBox.top
      && rect.bottom - tolerance <= viewBox.bottom;
  }

  function roomFitsViewBox(room, viewBox, options) {
    return rectFitsViewBox(getFocusRect(room, options), viewBox);
  }

  function guessCellFitsViewBox(cell, viewBox, options) {
    return rectFitsViewBox(getGuessCellRect(cell, options), viewBox);
  }

  function guessMarkerFitsViewBox(marker, viewBox, options) {
    return rectFitsViewBox(getGuessMarkerRect(marker, options), viewBox);
  }

  function computeDungeonViewportHeight(viewBox, containerWidth, options) {
    var config = options || {};
    var width = positiveNumber(containerWidth, 1);
    var minimum = positiveNumber(config.minHeight, 420);
    var maximum = positiveNumber(config.maxHeight, 900);
    if (maximum < minimum) maximum = minimum;
    var ideal = width * positiveNumber(viewBox && viewBox.height, 1)
      / positiveNumber(viewBox && viewBox.width, 1);
    return Math.round(Math.max(minimum, Math.min(maximum, ideal)));
  }

  return {
    DUNGEON_GEOMETRY: {
      roomSize: DUNGEON_GEOMETRY.roomSize,
      cellGap: DUNGEON_GEOMETRY.cellGap,
      cellStep: DUNGEON_GEOMETRY.cellStep,
      focusOutset: DUNGEON_GEOMETRY.focusOutset,
      secretGuessOutset: DUNGEON_GEOMETRY.secretGuessOutset,
      superSecretGuessOutset: DUNGEON_GEOMETRY.superSecretGuessOutset,
      padding: DUNGEON_GEOMETRY.padding
    },
    getVisibleDungeon: getVisibleDungeon,
    getGuessableCells: getGuessableCells,
    checkSecretGuess: checkSecretGuess,
    checkSuperSecretGuess: checkSuperSecretGuess,
    getDungeonGeometry: getDungeonGeometry,
    gridToSvg: gridToSvg,
    getRoomRect: getRoomRect,
    getFocusRect: getFocusRect,
    getGuessCellRect: getGuessCellRect,
    getGuessMarkerRect: getGuessMarkerRect,
    computeDungeonGeometryBounds: computeDungeonGeometryBounds,
    computeDungeonViewBox: computeDungeonViewBox,
    rectFitsViewBox: rectFitsViewBox,
    roomFitsViewBox: roomFitsViewBox,
    guessCellFitsViewBox: guessCellFitsViewBox,
    guessMarkerFitsViewBox: guessMarkerFitsViewBox,
    computeDungeonViewportHeight: computeDungeonViewportHeight
  };
});
