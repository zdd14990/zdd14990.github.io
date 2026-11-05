(function(root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (!root) return;
  root.ZddIsaacDungeon = api;
  if (!root.document) return;
  if (root.document$ && typeof root.document$.subscribe === "function") {
    root.document$.subscribe(api.mount);
  }
  if (root.document.readyState === "loading") {
    root.document.addEventListener("DOMContentLoaded", api.mount, {once: true});
  } else {
    api.mount();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function() {
  "use strict";

  var GRID_WIDTH = 13;
  var CELL_X = 92;
  var CELL_Y = 68;
  var ROOM_WIDTH = 76;
  var ROOM_HEIGHT = 52;
  var SVG_NS = "http://www.w3.org/2000/svg";

  var FLOORS = {
    MAIN: [
      {stage: 1, name: "Basement I"},
      {stage: 2, name: "Basement II"},
      {stage: 3, name: "Caves I"},
      {stage: 4, name: "Caves II"},
      {stage: 5, name: "Depths I"},
      {stage: 6, name: "Depths II"},
      {stage: 7, name: "Womb I"},
      {stage: 8, name: "Womb II"}
    ],
    ALT: [
      {stage: 1, name: "Downpour I"},
      {stage: 2, name: "Dross"},
      {stage: 3, name: "Mines I"},
      {stage: 4, name: "Ashpit"},
      {stage: 5, name: "Mausoleum I"},
      {stage: 6, name: "Gehenna"}
    ]
  };

  var ROOM_NAMES = {
    1: "Normal",
    2: "Shop",
    4: "Treasure",
    5: "Boss",
    6: "MiniBoss",
    7: "Secret",
    8: "Super Secret",
    9: "Arcade",
    10: "Curse",
    11: "Challenge",
    12: "Library",
    13: "Sacrifice",
    14: "Devil",
    15: "Angel",
    17: "Boss Rush",
    18: "Isaac's",
    19: "Barren",
    20: "Chest",
    21: "Dice",
    24: "Planetarium",
    25: "Teleporter",
    26: "Teleporter Exit",
    29: "Ultra Secret"
  };

  var ROOM_ICONS = {
    2: "shop",
    4: "treasure",
    5: "boss",
    6: "miniboss",
    7: "secret",
    8: "super_secret",
    9: "arcade",
    10: "curse",
    11: "challenge",
    12: "library",
    13: "sacrifice",
    14: "devil",
    15: "angel",
    17: "boss_rush",
    18: "isaacs",
    19: "barren",
    20: "chest",
    21: "dice",
    24: "planetarium",
    25: "teleporter",
    26: "teleporter_exit",
    29: "ultra_secret"
  };

  function normalizeSeed(value) {
    var compact = String(value || "").replace(/\s+/g, "").toUpperCase();
    return /^[A-Z0-9]{8}$/.test(compact)
      ? compact.slice(0, 4) + " " + compact.slice(4)
      : null;
  }

  function floorOptions(route) {
    return (FLOORS[String(route || "").toUpperCase()] || []).map(function(item) {
      return {stage: item.stage, name: item.name};
    });
  }

  function roomCells(room) {
    var indices = room && Array.isArray(room.occupied_grid_indices)
      ? room.occupied_grid_indices
      : [room && room.grid_index];
    return indices.filter(function(index) {
      return Number.isInteger(index) && index >= 0;
    }).map(function(index) {
      return {column: index % GRID_WIDTH, row: Math.floor(index / GRID_WIDTH)};
    });
  }

  function isSecretRoom(room) {
    return room && (room.room_type === 7 || room.room_type === 8 || room.room_type === 29);
  }

  function visibleRooms(map, revealSecrets) {
    var rooms = map && Array.isArray(map.rooms) ? map.rooms : [];
    return rooms.filter(function(room) { return revealSecrets || !isSecretRoom(room); });
  }

  function roomCenter(room) {
    var cells = roomCells(room);
    if (!cells.length) return {x: 0, y: 0};
    var columns = cells.map(function(cell) { return cell.column; });
    var rows = cells.map(function(cell) { return cell.row; });
    return {
      x: ((Math.min.apply(null, columns) + Math.max.apply(null, columns)) / 2) * CELL_X + ROOM_WIDTH / 2,
      y: ((Math.min.apply(null, rows) + Math.max.apply(null, rows)) / 2) * CELL_Y + ROOM_HEIGHT / 2
    };
  }

  function mapConnections(rooms) {
    var byId = {};
    var seen = {};
    var result = [];
    rooms.forEach(function(room) { byId[room.generation_index] = room; });
    rooms.forEach(function(room) {
      (room.connections || []).forEach(function(targetId) {
        if (!byId[targetId]) return;
        var low = Math.min(room.generation_index, targetId);
        var high = Math.max(room.generation_index, targetId);
        var key = low + ":" + high;
        if (seen[key]) return;
        seen[key] = true;
        result.push({from: byId[low], to: byId[high]});
      });
    });
    return result;
  }

  function mapBounds(rooms) {
    var cells = [];
    rooms.forEach(function(room) { cells = cells.concat(roomCells(room)); });
    if (!cells.length) return {x: 0, y: 0, width: 640, height: 420};
    var columns = cells.map(function(cell) { return cell.column; });
    var rows = cells.map(function(cell) { return cell.row; });
    var minColumn = Math.min.apply(null, columns);
    var maxColumn = Math.max.apply(null, columns);
    var minRow = Math.min.apply(null, rows);
    var maxRow = Math.max.apply(null, rows);
    return {
      x: minColumn * CELL_X - 44,
      y: minRow * CELL_Y - 44,
      width: (maxColumn - minColumn) * CELL_X + ROOM_WIDTH + 88,
      height: (maxRow - minRow) * CELL_Y + ROOM_HEIGHT + 88
    };
  }

  function createSvg(name, attributes) {
    var element = document.createElementNS(SVG_NS, name);
    Object.keys(attributes || {}).forEach(function(key) {
      element.setAttribute(key, String(attributes[key]));
    });
    return element;
  }

  // Original line icons for special rooms (24x24 grid). Plain strings are
  // ink strokes; {d, a: "fill"} paints the accent fill, {d, a: "line"} an
  // accent stroke.
  function circlePath(cx, cy, r) {
    return "M" + (cx - r) + " " + cy + "a" + r + " " + r + " 0 1 0 " + (2 * r) + " 0a" + r + " " + r + " 0 1 0 " + (-2 * r) + " 0Z";
  }

  function ellipsePath(cx, cy, rx, ry, degrees) {
    var angle = degrees * Math.PI / 180;
    var dx = Math.round(rx * Math.cos(angle) * 100) / 100;
    var dy = Math.round(rx * Math.sin(angle) * 100) / 100;
    var arc = "A" + rx + " " + ry + " " + degrees + " 1 0 ";
    return "M" + (cx - dx) + " " + (cy - dy) + arc + (cx + dx) + " " + (cy + dy) + arc + (cx - dx) + " " + (cy - dy) + "Z";
  }

  var KEYHOLE = "M12 7.5a2.6 2.6 0 0 0-1.4 4.8l-.8 4.2h4.4l-.8-4.2A2.6 2.6 0 0 0 12 7.5Z";
  var BED_FRAME = "M3 19V9.5M21 19v-4.5M3 15.5h18";

  var ROOM_ICON_SHAPES = {
    shop: [
      "M12.6 3H5a2 2 0 0 0-2 2v7.6l9.4 9.4 9.6-9.6Z",
      {d: circlePath(7.6, 7.6, 1.5), a: "fill"},
      "M11.5 13.5l3-3"
    ],
    treasure: [
      "M4 20h16",
      "M4.5 16.5 3.5 7l4.8 4 3.7-5.5 3.7 5.5 4.8-4-1 9.5Z",
      {d: circlePath(12, 13, 1.3), a: "fill"}
    ],
    boss: [
      "M5 11a7 7 0 0 1 14 0v3.5l-2 1.5v3.5H7V16l-2-1.5Z",
      {d: circlePath(9.2, 11.6, 1.6), a: "fill"},
      {d: circlePath(14.8, 11.6, 1.6), a: "fill"},
      "M10.4 19.5v-2.3M13.6 19.5v-2.3"
    ],
    miniboss: [
      "M7.5 12.5a4.5 4.5 0 0 1 9 0v2.2l-1.3 1v2.3H8.8v-2.3l-1.3-1Z",
      {d: circlePath(10.3, 12.8, 1), a: "fill"},
      {d: circlePath(13.7, 12.8, 1), a: "fill"},
      "M11 17.5v-1.3M13 17.5v-1.3"
    ],
    secret: [
      circlePath(12, 12, 9),
      KEYHOLE
    ],
    super_secret: [
      circlePath(12, 12, 9),
      KEYHOLE,
      {d: "M19 1.8l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8Z", a: "fill"}
    ],
    ultra_secret: [
      "M12 2.2 21.8 12 12 21.8 2.2 12Z",
      {d: KEYHOLE, a: "fill"}
    ],
    arcade: [
      "M5 16h14a1 1 0 0 1 1 1v3H4v-3a1 1 0 0 1 1-1Z",
      "M12 16V9.2",
      {d: circlePath(12, 6.6, 2.6), a: "fill"},
      "M16.5 13.5h1"
    ],
    curse: [
      "M12 20s-7.5-4.6-7.5-10A4.1 4.1 0 0 1 12 7.7 4.1 4.1 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z",
      {d: "M12 7.7l-1.4 3.7 2.6 2-1.7 3.6", a: "line"}
    ],
    challenge: [
      "M4.5 4.5 15 15M19.5 4.5 9 15",
      "M12.5 17.5l5-5M6.5 12.5l5 5",
      "M15.5 15.5l4 4M8.5 15.5l-4 4",
      {d: "M4.5 4.5h2.4M4.5 4.5v2.4M19.5 4.5h-2.4M19.5 4.5v2.4", a: "line"}
    ],
    library: [
      "M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5Z",
      "M12 6.5v13",
      {d: "M6 8.5c1.4-.1 2.7.1 3.8.6M6 11.5c1.4-.1 2.7.1 3.8.6M18 8.5c-1.4-.1-2.7.1-3.8.6", a: "line"}
    ],
    sacrifice: [
      "M3.5 20h17M6 20v-4.5h12V20",
      "M7.5 15.5 9 9l1.5 6.5M10.5 15.5 12 6l1.5 9.5M13.5 15.5 15 9l1.5 6.5",
      {d: circlePath(12, 3.2, 0.9), a: "fill"}
    ],
    devil: [
      circlePath(12, 14, 6),
      {d: "M7.8 9.7C5.7 8.4 4.6 6 5 3.2c1.2 2 3 3.4 5.1 4.4Z", a: "fill"},
      {d: "M16.2 9.7c2.1-1.3 3.2-3.7 2.8-6.5-1.2 2-3 3.4-5.1 4.4Z", a: "fill"},
      "M9.2 13l1.8.8M14.8 13l-1.8.8M10 17c1.3.8 2.7.8 4 0"
    ],
    angel: [
      {d: ellipsePath(12, 4.5, 4, 1.6, 0), a: "line"},
      "M11 12.5C9 8.5 5.5 7 2.5 8c.5 2 1.6 3.4 3 4.2-1 .6-1.6 1.5-1.8 2.6 1.6.6 3.2.5 4.5-.2-.2 1.3.1 2.6.8 3.6 1.8-1.2 2.5-3.2 2-5.7Z",
      "M13 12.5c2-4 5.5-5.5 8.5-4.5-.5 2-1.6 3.4-3 4.2 1 .6 1.6 1.5 1.8 2.6-1.6.6-3.2.5-4.5-.2.2 1.3-.1 2.6-.8 3.6-1.8-1.2-2.5-3.2-2-5.7Z"
    ],
    boss_rush: [
      "M6 3h12M6 21h12",
      "M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9",
      {d: "M9.3 7h5.4L12 10Z", a: "fill"},
      {d: "M9 19.5c.6-1.6 1.6-2.7 3-3.3 1.4.6 2.4 1.7 3 3.3Z", a: "fill"}
    ],
    isaacs: [
      BED_FRAME,
      {d: "M4.5 13.5v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2Z", a: "fill"},
      "M11 15.5v-4a1 1 0 0 1 1-1h7a2 2 0 0 1 2 2v3"
    ],
    barren: [
      BED_FRAME,
      "M3 12.5h18",
      "M7 12.5v3M11 12.5v3M15 12.5v3M19 12.5v3"
    ],
    chest: [
      "M3.5 10h17v9.5h-17Z",
      "M3.5 10V8a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v2",
      {d: "M10.5 11.5h3v3.5h-3Z", a: "fill"}
    ],
    dice: [
      "M6 3.5h12A2.5 2.5 0 0 1 20.5 6v12a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 18V6A2.5 2.5 0 0 1 6 3.5Z",
      {d: circlePath(8.3, 8.3, 1.2), a: "fill"},
      {d: circlePath(12, 12, 1.2), a: "fill"},
      {d: circlePath(15.7, 15.7, 1.2), a: "fill"}
    ],
    planetarium: [
      {d: circlePath(12, 12, 4.8), a: "fill"},
      ellipsePath(12, 12, 9.8, 3.2, -22),
      {d: circlePath(19.5, 4.5, 0.6), a: "fill"}
    ],
    teleporter: [
      circlePath(12, 12, 9),
      circlePath(12, 12, 5.5),
      {d: circlePath(12, 12, 2), a: "fill"}
    ],
    teleporter_exit: [
      circlePath(10, 14, 7.5),
      circlePath(10, 14, 3.5),
      {d: "M12.5 11.5 20.5 3.5M15 3.5h5.5V9", a: "line"}
    ]
  };

  function createRoomIcon(key, x, y, size) {
    var shapes = ROOM_ICON_SHAPES[key];
    if (!shapes) return null;
    var icon = createSvg("svg", {
      x: x,
      y: y,
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.6,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
      focusable: "false",
      "class": "zdd-isaac-room-icon",
      "data-icon": key
    });
    shapes.forEach(function(shape) {
      var spec = typeof shape === "string" ? {d: shape} : shape;
      var attributes = {d: spec.d};
      if (spec.a === "fill") attributes["class"] = "zdd-isaac-icon-accent";
      if (spec.a === "line") attributes["class"] = "zdd-isaac-icon-accent-line";
      icon.appendChild(createSvg("path", attributes));
    });
    return icon;
  }

  function roomName(room) {
    if (room.generation_index === 0) return "Start";
    return ROOM_NAMES[room.room_type] || String(room.room_type_name || "Room").replace(/^ROOM_/, "").replace(/_/g, " ");
  }

  function formatHex(value) {
    if (!Number.isInteger(value)) return "—";
    return "0x" + (value >>> 0).toString(16).toUpperCase().padStart(8, "0");
  }

  function mount() {
    var root = document.getElementById("zdd-isaac-lab");
    if (!root || root.dataset.bound === "true") return;
    root.dataset.bound = "true";

    var form = root.querySelector("[data-isaac-form]");
    var seedInput = root.querySelector("[data-isaac-seed]");
    var difficultyInput = root.querySelector("[data-isaac-difficulty]");
    var routeInput = root.querySelector("[data-isaac-route]");
    var floorInput = root.querySelector("[data-isaac-floor]");
    var generateButton = root.querySelector("[data-isaac-generate]");
    var randomButton = root.querySelector("[data-isaac-random]");
    var copyButton = root.querySelector("[data-isaac-copy]");
    var exportButton = root.querySelector("[data-isaac-export]");
    var revealButton = root.querySelector("[data-isaac-reveal]");
    var fitButton = root.querySelector("[data-isaac-fit]");
    var status = root.querySelector("[data-isaac-status]");
    var progress = root.querySelector("[data-isaac-progress]");
    var svg = root.querySelector("[data-isaac-map]");
    var placeholder = root.querySelector("[data-isaac-placeholder]");
    var legend = root.querySelector("[data-isaac-legend]");
    var inspectorTitle = root.querySelector("[data-isaac-inspector-title]");
    var inspectorBody = root.querySelector("[data-isaac-inspector-body]");
    var attemptsBody = root.querySelector("[data-isaac-attempts]");
    var state = {
      worker: null,
      requestId: 0,
      map: null,
      runtime: null,
      revealSecrets: true,
      selectedRoomId: null,
      bounds: null
    };

    function setStatus(message, tone) {
      status.textContent = message;
      status.dataset.tone = tone || "neutral";
    }

    function setBusy(busy) {
      root.classList.toggle("is-busy", busy);
      progress.hidden = !busy;
      generateButton.disabled = busy;
      randomButton.disabled = busy;
    }

    function setStat(name, value) {
      var target = root.querySelector('[data-isaac-stat="' + name + '"]');
      if (target) target.textContent = value === null || value === undefined || value === "" ? "—" : String(value);
    }

    function populateFloors(route, preferredStage) {
      var options = floorOptions(route);
      floorInput.replaceChildren();
      options.forEach(function(item) {
        var option = document.createElement("option");
        option.value = item.name;
        option.dataset.stage = String(item.stage);
        option.textContent = (route === "ALT" ? item.stage + "+" : item.stage) + " · " + item.name;
        if (item.stage === preferredStage) option.selected = true;
        floorInput.appendChild(option);
      });
    }

    function currentStage() {
      var selected = floorInput.options[floorInput.selectedIndex];
      return selected ? Number(selected.dataset.stage) : 1;
    }

    function startWorker() {
      if (state.worker) return state.worker;
      var workerUrl = new URL(root.dataset.workerUrl, window.location.href);
      state.worker = new Worker(workerUrl, {type: "module"});
      state.worker.addEventListener("message", function(event) {
        var message = event.data || {};
        if (message.requestId !== state.requestId) return;
        if (message.type === "progress") {
          setStatus(message.message, "loading");
          return;
        }
        if (message.type === "result") {
          state.map = message.result;
          state.runtime = message.runtime;
          state.revealSecrets = true;
          state.selectedRoomId = null;
          seedInput.value = state.map.seed;
          revealButton.textContent = "Hide secret rooms";
          revealButton.setAttribute("aria-pressed", "true");
          render();
          updateUrl();
          setBusy(false);
          setStatus("Exact floor generated locally in your browser.", "success");
          exportButton.disabled = false;
          revealButton.disabled = false;
        } else if (message.type === "error") {
          setBusy(false);
          setStatus(friendlyError(message.message), "error");
        }
      });
      state.worker.addEventListener("error", function() {
        setBusy(false);
        setStatus("The browser Python runtime could not start. Check the network and try again.", "error");
      });
      return state.worker;
    }

    function friendlyError(message) {
      var text = String(message || "Generation failed");
      if (/checksum|invalid seed|seed.*invalid/i.test(text)) return "That seed is not valid. Check all eight Isaac seed characters.";
      if (/Labyrinth|\bXL\b/i.test(text)) return "This run contains a natural Labyrinth / XL floor, which the recovered pipeline intentionally rejects.";
      if (/unsupported/i.test(text)) return "That floor is not supported by the recovered generator.";
      return "Generation failed: " + text;
    }

    function requestGeneration(randomValue) {
      var normalized = randomValue === undefined ? normalizeSeed(seedInput.value) : null;
      if (randomValue === undefined && !normalized) {
        setStatus("Enter an eight-character Isaac seed, for example B911 99AC.", "error");
        seedInput.focus();
        return;
      }
      state.requestId += 1;
      setBusy(true);
      setStatus("Starting the browser Python runtime…", "loading");
      startWorker().postMessage({
        action: "generate",
        requestId: state.requestId,
        manifestUrl: new URL(root.dataset.runtimeManifest, window.location.href).href,
        seed: normalized,
        randomValue: randomValue,
        difficulty: difficultyInput.value,
        floor: floorInput.value
      });
    }

    function updateUrl() {
      if (!state.map || !window.history || !window.URL) return;
      var url = new URL(window.location.href);
      url.searchParams.set("seed", state.map.seed);
      url.searchParams.set("difficulty", difficultyInput.value);
      url.searchParams.set("route", routeInput.value);
      url.searchParams.set("stage", String(currentStage()));
      window.history.replaceState({}, "", url);
    }

    async function copyLink() {
      if (state.map) updateUrl();
      try {
        await navigator.clipboard.writeText(window.location.href);
        setStatus("Share link copied.", "success");
      } catch (_error) {
        setStatus("Copy was blocked. Select the address from the browser bar.", "error");
      }
    }

    function exportJson() {
      if (!state.map) return;
      var blob = new Blob([JSON.stringify(state.map, null, 2)], {type: "application/json"});
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = state.map.seed.replace(/\s/g, "") + "-" + routeInput.value.toLowerCase() + "-stage" + currentStage() + ".json";
      link.click();
      setTimeout(function() { URL.revokeObjectURL(link.href); }, 0);
    }

    function render() {
      if (!state.map) return;
      var rooms = visibleRooms(state.map, state.revealSecrets);
      var roomById = {};
      rooms.forEach(function(room) { roomById[room.generation_index] = room; });
      svg.replaceChildren();

      mapConnections(rooms).forEach(function(connection) {
        var start = roomCenter(connection.from);
        var end = roomCenter(connection.to);
        svg.appendChild(createSvg("line", {
          x1: start.x,
          y1: start.y,
          x2: end.x,
          y2: end.y,
          "class": "zdd-isaac-connection"
        }));
      });

      rooms.forEach(function(room) {
        var group = createSvg("g", {
          "class": "zdd-isaac-room room-type-" + room.room_type + (state.selectedRoomId === room.generation_index ? " is-selected" : ""),
          role: "button",
          tabindex: "0",
          "aria-label": roomName(room) + ", grid " + room.grid_index + ", distance " + room.distance_from_start,
          "data-room-id": room.generation_index
        });
        var title = createSvg("title");
        title.textContent = roomName(room) + " · Grid " + room.grid_index;
        group.appendChild(title);
        roomCells(room).forEach(function(cell) {
          group.appendChild(createSvg("rect", {
            x: cell.column * CELL_X,
            y: cell.row * CELL_Y,
            width: ROOM_WIDTH,
            height: ROOM_HEIGHT,
            rx: 8,
            "class": "zdd-isaac-room-cell"
          }));
        });
        var center = roomCenter(room);
        var icon = createRoomIcon(ROOM_ICONS[room.room_type], center.x - 14, center.y - 14, 28);
        if (icon) {
          group.appendChild(icon);
        } else {
          var label = createSvg("text", {
            x: center.x,
            y: center.y + 4,
            "text-anchor": "middle",
            "class": "zdd-isaac-room-label"
          });
          label.textContent = room.generation_index === 0 ? "START" : String(room.generation_index);
          group.appendChild(label);
        }
        var order = createSvg("text", {
          x: center.x + ROOM_WIDTH / 2 - 15,
          y: center.y - ROOM_HEIGHT / 2 + 14,
          "text-anchor": "middle",
          "class": "zdd-isaac-room-order"
        });
        order.textContent = String(room.generation_index);
        group.appendChild(order);
        group.addEventListener("click", function() { selectRoom(room.generation_index); });
        group.addEventListener("keydown", function(event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectRoom(room.generation_index);
          }
        });
        svg.appendChild(group);
      });

      state.bounds = mapBounds(rooms);
      fitMap();
      placeholder.hidden = true;
      svg.hidden = false;
      renderLegend(rooms);
      renderStats(rooms);
      renderAttempts();
      if (state.selectedRoomId !== null && roomById[state.selectedRoomId]) {
        renderInspector(roomById[state.selectedRoomId]);
      } else {
        inspectorTitle.textContent = "Select a room";
        inspectorBody.textContent = "Click, focus, or tap a room to inspect its recovered configuration.";
      }
    }

    function fitMap() {
      if (!state.bounds) return;
      svg.setAttribute("viewBox", [state.bounds.x, state.bounds.y, state.bounds.width, state.bounds.height].join(" "));
    }

    function selectRoom(id) {
      state.selectedRoomId = id;
      var room = state.map.rooms.find(function(item) { return item.generation_index === id; });
      render();
      if (room) renderInspector(room);
    }

    function renderInspector(room) {
      inspectorTitle.textContent = roomName(room);
      var config = room.config
        ? "Config stage " + room.config.stage + ", mode " + room.config.mode + ", resource " + room.config.resource_index + "."
        : "No recovered room configuration.";
      inspectorBody.textContent = "Grid " + room.grid_index + " · " + room.shape_name.replace(/^ROOMSHAPE_/, "")
        + " · distance " + room.distance_from_start + ". " + config;
    }

    function renderLegend(rooms) {
      legend.replaceChildren();
      var entries = [{type: "start", name: "Start"}, {type: 1, name: "Normal"}];
      var seen = {1: true};
      rooms.forEach(function(room) {
        if (room.generation_index === 0 || seen[room.room_type]) return;
        seen[room.room_type] = true;
        entries.push({type: room.room_type, name: roomName(room)});
      });
      entries.forEach(function(entry) {
        var item = document.createElement("span");
        var swatch = document.createElement("i");
        swatch.dataset.roomType = String(entry.type);
        item.appendChild(swatch);
        item.appendChild(document.createTextNode(entry.name));
        legend.appendChild(item);
      });
    }

    function renderStats(rooms) {
      setStat("seed", state.map.seed);
      setStat("floor", state.map.floor);
      setStat("difficulty", state.map.difficulty);
      setStat("rooms", rooms.length + " / " + state.map.rooms.length);
      setStat("attempts", state.map.attempts);
      setStat("boss", state.map.boss_id);
      setStat("stage-seed", formatHex(state.map.stage_seed));
      setStat("evidence", state.map.algorithm_evidence);
      setStat("profile", state.map.generation_profile);
      setStat("runtime", state.runtime ? "Pyodide " + state.runtime.pyodideVersion + " · " + state.runtime.sourceCommit.slice(0, 8) : "—");
    }

    function renderAttempts() {
      attemptsBody.replaceChildren();
      (state.map.attempt_trace || []).forEach(function(attempt) {
        var row = document.createElement("tr");
        [attempt.attempt + 1, attempt.outcome, attempt.target_room_count, formatHex(attempt.level_rng_end)].forEach(function(value) {
          var cell = document.createElement("td");
          cell.textContent = String(value);
          row.appendChild(cell);
        });
        attemptsBody.appendChild(row);
      });
    }

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      requestGeneration();
    });
    randomButton.addEventListener("click", function() {
      var values = new Uint32Array(1);
      crypto.getRandomValues(values);
      requestGeneration(values[0]);
    });
    copyButton.addEventListener("click", copyLink);
    exportButton.addEventListener("click", exportJson);
    fitButton.addEventListener("click", fitMap);
    revealButton.addEventListener("click", function() {
      state.revealSecrets = !state.revealSecrets;
      state.selectedRoomId = null;
      revealButton.textContent = state.revealSecrets ? "Hide secret rooms" : "Reveal secret rooms";
      revealButton.setAttribute("aria-pressed", String(state.revealSecrets));
      render();
    });
    routeInput.addEventListener("change", function() { populateFloors(routeInput.value, 1); });
    root.querySelectorAll("[data-isaac-example]").forEach(function(button) {
      button.addEventListener("click", function() {
        seedInput.value = button.dataset.isaacExample;
        requestGeneration();
      });
    });

    var query = new URL(window.location.href).searchParams;
    var queryRoute = query.get("route");
    if (queryRoute === "MAIN" || queryRoute === "ALT") routeInput.value = queryRoute;
    var queryStage = Number(query.get("stage"));
    populateFloors(routeInput.value, Number.isInteger(queryStage) && queryStage > 0 ? queryStage : 1);
    var queryDifficulty = query.get("difficulty");
    if (queryDifficulty === "NORMAL" || queryDifficulty === "HARD") difficultyInput.value = queryDifficulty;
    var querySeed = normalizeSeed(query.get("seed"));
    if (querySeed) {
      seedInput.value = querySeed;
      requestGeneration();
    } else {
      setStatus("Ready. The first generation loads the cached browser Python runtime.", "neutral");
    }
  }

  return {
    FLOORS: FLOORS,
    normalizeSeed: normalizeSeed,
    floorOptions: floorOptions,
    roomCells: roomCells,
    isSecretRoom: isSecretRoom,
    visibleRooms: visibleRooms,
    roomCenter: roomCenter,
    mapConnections: mapConnections,
    mapBounds: mapBounds,
    mount: mount
  };
});
