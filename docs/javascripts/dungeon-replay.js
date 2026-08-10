(function(root, factory) {
  "use strict";

  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.ZddDungeonReplay = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function() {
  "use strict";

  function emptyState() {
    return {
      index: 0,
      rooms: [],
      edges: [],
      candidate: null,
      lastStep: null
    };
  }

  function cloneRoom(room) {
    return {id: room.id, x: room.x, y: room.y, type: room.type};
  }

  function cloneCandidate(candidate) {
    if (!candidate) return null;
    return {
      x: candidate.x,
      y: candidate.y,
      mode: candidate.mode || "growth",
      status: candidate.status || "candidate",
      reason: candidate.reason || "",
      fromRoomIds: (candidate.fromRoomIds || []).slice()
    };
  }

  function cloneState(state) {
    var source = state || emptyState();
    return {
      index: Number.isFinite(source.index) ? source.index : 0,
      rooms: (source.rooms || []).map(cloneRoom),
      edges: (source.edges || []).map(function(edge) {
        return {from: edge.from, to: edge.to};
      }),
      candidate: cloneCandidate(source.candidate),
      lastStep: source.lastStep || null
    };
  }

  function edgeKey(from, to) {
    return from < to ? from + ">" + to : to + ">" + from;
  }

  function addEdge(edges, from, to) {
    if (!from || !to || from === to) return;
    var key = edgeKey(from, to);
    var exists = edges.some(function(edge) {
      return edgeKey(edge.from, edge.to) === key;
    });
    if (!exists) edges.push({from: from, to: to});
  }

  function upsertRoom(rooms, room) {
    var index = rooms.findIndex(function(item) { return item.id === room.id; });
    var nextRoom = cloneRoom(room);
    if (index >= 0) rooms[index] = nextRoom;
    else rooms.push(nextRoom);
  }

  function assignRoomType(rooms, roomId, type) {
    return rooms.map(function(room) {
      if (room.id !== roomId) return room;
      return {id: room.id, x: room.x, y: room.y, type: type};
    });
  }

  function applyDungeonStep(inputState, step) {
    var state = cloneState(inputState);
    state.index += 1;
    state.lastStep = step || null;
    if (!step || !step.type) return state;

    if (step.type === "start" && step.room) {
      upsertRoom(state.rooms, step.room);
      state.candidate = null;
      return state;
    }

    if (step.type === "candidate" && step.position) {
      state.candidate = {
        x: step.position.x,
        y: step.position.y,
        mode: step.mode || "growth",
        status: "candidate",
        reason: "",
        fromRoomIds: (step.fromRoomIds || []).slice()
      };
      return state;
    }

    if (step.type === "reject" && step.position) {
      var previous = state.candidate;
      state.candidate = {
        x: step.position.x,
        y: step.position.y,
        mode: previous && previous.mode || "growth",
        status: "rejected",
        reason: step.reason || "rejected",
        fromRoomIds: previous && previous.fromRoomIds ? previous.fromRoomIds.slice() : []
      };
      return state;
    }

    if (step.type === "room-added" && step.room) {
      upsertRoom(state.rooms, step.room);
      (step.connectedTo || []).forEach(function(roomId) {
        addEdge(state.edges, roomId, step.room.id);
      });
      state.candidate = null;
      return state;
    }

    if (step.type === "boss-assigned") {
      state.rooms = assignRoomType(state.rooms, step.roomId, "boss");
      state.candidate = null;
      return state;
    }

    if (step.type === "treasure-assigned") {
      state.rooms = assignRoomType(state.rooms, step.roomId, "treasure");
      state.candidate = null;
    }
    return state;
  }

  function buildReplayState(steps, requestedIndex) {
    var source = Array.isArray(steps) ? steps : [];
    var number = Number(requestedIndex);
    var limit = Number.isFinite(number) ? Math.floor(number) : source.length;
    limit = Math.max(0, Math.min(source.length, limit));
    var state = emptyState();
    for (var index = 0; index < limit; index += 1) {
      state = applyDungeonStep(state, source[index]);
    }
    state.index = limit;
    return state;
  }

  function coordinates(position) {
    if (!position) return "(?,?)";
    return "(" + position.x + "," + position.y + ")";
  }

  function roomIdCoordinates(id) {
    var match = String(id || "").match(/^room:(-?\d+),(-?\d+)$/);
    return match ? "(" + match[1] + "," + match[2] + ")" : String(id || "unknown room");
  }

  function rejectionReason(reason) {
    var labels = {
      "too-many-neighbors": "too many occupied neighbors",
      "solid-block": "would create a 2\u00d72 block",
      "long-straight": "would extend a long straight",
      "multiple-neighbors": "multiple occupied neighbors"
    };
    return labels[reason] || String(reason || "rejected").replace(/-/g, " ");
  }

  function describeDungeonStep(step) {
    if (!step || !step.type) return "Before generation. Press Next or Play to begin.";
    if (step.type === "start") {
      return "Placed Start room at " + coordinates(step.room) + ".";
    }
    if (step.type === "candidate") {
      var origins = (step.fromRoomIds || []).map(roomIdCoordinates);
      var origin = origins.length ? " from " + origins.join(", ") : "";
      return "Trying " + coordinates(step.position) + origin + ".";
    }
    if (step.type === "reject") {
      return "Rejected " + coordinates(step.position) + ": " + rejectionReason(step.reason) + ".";
    }
    if (step.type === "room-added") {
      return "Added room at " + coordinates(step.room) + ".";
    }
    if (step.type === "boss-assigned") {
      return "Assigned Boss to " + coordinates(step.position) + ".";
    }
    if (step.type === "treasure-assigned") {
      return "Assigned Treasure to " + coordinates(step.position) + ".";
    }
    return "Applied generation step: " + String(step.type).replace(/-/g, " ") + ".";
  }

  return {
    applyDungeonStep: applyDungeonStep,
    buildReplayState: buildReplayState,
    describeDungeonStep: describeDungeonStep,
    rejectionReason: rejectionReason
  };
});
