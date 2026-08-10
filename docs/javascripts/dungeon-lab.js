(function() {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var DEFAULT_SEED = "ZDD14990";
  var GRID_SIZE = 76;
  var ROOM_SIZE = 46;
  var MAP_PADDING = 42;

  function svgElement(name, attributes) {
    var element = document.createElementNS(SVG_NS, name);
    Object.keys(attributes || {}).forEach(function(key) {
      element.setAttribute(key, attributes[key]);
    });
    return element;
  }

  function init() {
    var root = document.getElementById("zdd-dungeon-lab");
    var core = window.ZddDungeonCore;
    var replay = window.ZddDungeonReplay;
    if (!root || !core || !replay || root.dataset.zddReady === "1") return;
    root.dataset.zddReady = "1";

    var form = root.querySelector("[data-dungeon-form]");
    var seedInput = root.querySelector("[data-dungeon-seed]");
    var status = root.querySelector("[data-dungeon-status]");
    var map = root.querySelector("[data-dungeon-map]");
    var inspector = root.querySelector("[data-dungeon-inspector]");
    var stepInput = root.querySelector("[data-dungeon-step]");
    var stepLabel = root.querySelector("[data-dungeon-step-label]");
    var stepKind = root.querySelector("[data-dungeon-step-kind]");
    var stepDescription = root.querySelector("[data-dungeon-step-description]");
    var speedSelect = root.querySelector("[data-dungeon-speed]");
    var firstButton = root.querySelector("[data-dungeon-first]");
    var previousButton = root.querySelector("[data-dungeon-previous]");
    var playButton = root.querySelector("[data-dungeon-play]");
    var nextButton = root.querySelector("[data-dungeon-next]");
    var lastButton = root.querySelector("[data-dungeon-last]");
    var resetButton = root.querySelector("[data-dungeon-reset]");
    var dungeon = null;
    var replayState = replay.buildReplayState([], 0);
    var replayIndex = 0;
    var playTimer = 0;
    var selectedRoomId = "";
    var lastBounds = null;

    function setStatus(message, stateName) {
      status.textContent = message || "";
      status.dataset.state = stateName || "ready";
    }

    function infoValue(name, value) {
      var target = root.querySelector('[data-dungeon-info="' + name + '"]');
      if (target) target.textContent = value;
    }

    function randomSeed() {
      var alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
      var values = new Uint8Array(8);
      if (window.crypto && window.crypto.getRandomValues) {
        window.crypto.getRandomValues(values);
      } else {
        var fallback = core.hashSeed(String(Date.now()) + ":" + String(window.performance && performance.now()));
        for (var index = 0; index < values.length; index += 1) {
          values[index] = (fallback >>> ((index % 4) * 8)) & 255;
          fallback = core.hashSeed(String(fallback) + ":" + index);
        }
      }
      var text = "";
      for (var valueIndex = 0; valueIndex < values.length; valueIndex += 1) {
        if (valueIndex === 4) text += "-";
        text += alphabet.charAt(values[valueIndex] % alphabet.length);
      }
      return text;
    }

    function usableSeed(value, useRandomForEmpty) {
      var seed = String(value == null ? "" : value);
      if (seed.trim()) return seed;
      return useRandomForEmpty ? randomSeed() : DEFAULT_SEED;
    }

    function mutateSeed(value) {
      var seed = usableSeed(value, true);
      var last = seed.charAt(seed.length - 1);
      if (/\d/.test(last)) {
        return seed.slice(0, -1) + String((Number(last) + 1) % 10);
      }
      if (/[A-Y]/.test(last)) return seed.slice(0, -1) + String.fromCharCode(last.charCodeAt(0) + 1);
      if (last === "Z") return seed.slice(0, -1) + "A";
      if (/[a-y]/.test(last)) return seed.slice(0, -1) + String.fromCharCode(last.charCodeAt(0) + 1);
      if (last === "z") return seed.slice(0, -1) + "a";
      return seed + "1";
    }

    function seedFromUrl() {
      try {
        var rawQuery = window.location.search || "";
        if (/%(?![0-9a-f]{2})/i.test(rawQuery)) return DEFAULT_SEED;
        var value = new URL(window.location.href).searchParams.get("seed");
        if (value && value.indexOf("\ufffd") >= 0 && rawQuery.indexOf("%") >= 0) return DEFAULT_SEED;
        return usableSeed(value, false);
      } catch (error) {
        return DEFAULT_SEED;
      }
    }

    function updateUrl(seed, mode) {
      if (mode === "none") return true;
      if (!window.history || !window.history.replaceState) return false;
      try {
        var url = new URL(window.location.href);
        url.searchParams.set("seed", seed);
        var next = url.pathname + url.search + url.hash;
        if (mode === "push" && window.history.pushState) window.history.pushState(null, "", next);
        else if (mode === "replace") window.history.replaceState(null, "", next);
        return true;
      } catch (error) {
        return false;
      }
    }

    function roomName(type) {
      return {
        start: "Start",
        boss: "Boss",
        treasure: "Treasure",
        normal: "Normal"
      }[type] || "Normal";
    }

    function roomMark(type) {
      return {start: "S", boss: "B", treasure: "T"}[type] || "";
    }

    function roomById(id) {
      return replayState.rooms.find(function(room) { return room.id === id; }) || null;
    }

    function coordinate(room) {
      return {x: room.x * GRID_SIZE, y: room.y * GRID_SIZE};
    }

    function calculateBounds() {
      var cells = dungeon && dungeon.rooms ? dungeon.rooms.slice() : [];
      if (replayState.candidate) cells.push(replayState.candidate);
      if (!cells.length) cells.push({x: 0, y: 0});
      var minimumX = cells.reduce(function(value, room) { return Math.min(value, room.x); }, Infinity);
      var maximumX = cells.reduce(function(value, room) { return Math.max(value, room.x); }, -Infinity);
      var minimumY = cells.reduce(function(value, room) { return Math.min(value, room.y); }, Infinity);
      var maximumY = cells.reduce(function(value, room) { return Math.max(value, room.y); }, -Infinity);
      var left = minimumX * GRID_SIZE - ROOM_SIZE / 2 - MAP_PADDING;
      var top = minimumY * GRID_SIZE - ROOM_SIZE / 2 - MAP_PADDING;
      var width = (maximumX - minimumX) * GRID_SIZE + ROOM_SIZE + MAP_PADDING * 2;
      var height = (maximumY - minimumY) * GRID_SIZE + ROOM_SIZE + MAP_PADDING * 2;
      return {
        left: left,
        top: top,
        width: Math.max(width, 180),
        height: Math.max(height, 180),
        centerX: left + Math.max(width, 180) / 2,
        centerY: top + Math.max(height, 180) / 2
      };
    }

    function fitMap() {
      if (!dungeon) return;
      lastBounds = calculateBounds();
      map.setAttribute("viewBox", [
        lastBounds.left,
        lastBounds.top,
        lastBounds.width,
        lastBounds.height
      ].join(" "));
    }

    function appendConnection(edge, className) {
      var from = roomById(edge.from);
      var to = roomById(edge.to);
      if (!from || !to) return;
      var start = coordinate(from);
      var end = coordinate(to);
      map.appendChild(svgElement("line", {
        "class": className || "zdd-dungeon-connection",
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        "aria-hidden": "true"
      }));
    }

    function appendCandidateConnections(candidate) {
      (candidate.fromRoomIds || []).forEach(function(roomId) {
        var from = roomById(roomId);
        if (!from) return;
        var start = coordinate(from);
        var end = coordinate(candidate);
        map.appendChild(svgElement("line", {
          "class": "zdd-dungeon-candidate-connection",
          x1: start.x,
          y1: start.y,
          x2: end.x,
          y2: end.y,
          "aria-hidden": "true"
        }));
      });
    }

    function appendRoom(room) {
      var point = coordinate(room);
      var group = svgElement("g", {
        "class": "zdd-dungeon-room" + (selectedRoomId === room.id ? " is-selected" : ""),
        "data-room-id": room.id,
        "data-room-type": room.type,
        tabindex: "0",
        role: "button",
        "aria-pressed": selectedRoomId === room.id ? "true" : "false",
        "aria-label": roomName(room.type) + " room at (" + room.x + "," + room.y + ")"
      });
      group.appendChild(svgElement("rect", {
        "class": "zdd-dungeon-room-focus",
        x: point.x - ROOM_SIZE / 2 - 5,
        y: point.y - ROOM_SIZE / 2 - 5,
        width: ROOM_SIZE + 10,
        height: ROOM_SIZE + 10,
        rx: "4"
      }));
      group.appendChild(svgElement("rect", {
        "class": "zdd-dungeon-room-shape",
        x: point.x - ROOM_SIZE / 2,
        y: point.y - ROOM_SIZE / 2,
        width: ROOM_SIZE,
        height: ROOM_SIZE,
        rx: "3"
      }));
      var mark = svgElement("text", {
        "class": "zdd-dungeon-room-label",
        x: point.x,
        y: point.y - 3,
        "aria-hidden": "true"
      });
      mark.textContent = roomMark(room.type);
      group.appendChild(mark);
      var label = svgElement("text", {
        "class": "zdd-dungeon-room-coordinate",
        x: point.x,
        y: point.y + 16,
        "aria-hidden": "true"
      });
      label.textContent = room.x + "," + room.y;
      group.appendChild(label);
      map.appendChild(group);
    }

    function appendCandidate(candidate) {
      var point = coordinate(candidate);
      var group = svgElement("g", {
        "class": "zdd-dungeon-candidate",
        "data-status": candidate.status,
        "aria-hidden": "true"
      });
      group.appendChild(svgElement("rect", {
        "class": "zdd-dungeon-candidate-shape",
        x: point.x - ROOM_SIZE / 2,
        y: point.y - ROOM_SIZE / 2,
        width: ROOM_SIZE,
        height: ROOM_SIZE,
        rx: "3"
      }));
      var mark = svgElement("text", {
        "class": "zdd-dungeon-candidate-mark",
        x: point.x,
        y: point.y,
        "aria-hidden": "true"
      });
      mark.textContent = candidate.status === "rejected" ? "\u00d7" : "+";
      group.appendChild(mark);
      map.appendChild(group);
    }

    function renderMap() {
      while (map.firstChild) map.removeChild(map.firstChild);
      fitMap();
      replayState.edges.forEach(function(edge) {
        appendConnection(edge, "zdd-dungeon-connection");
      });
      if (replayState.candidate) appendCandidateConnections(replayState.candidate);
      replayState.rooms.slice().sort(function(left, right) {
        return left.y - right.y || left.x - right.x;
      }).forEach(appendRoom);
      if (replayState.candidate) appendCandidate(replayState.candidate);
      if (!replayState.rooms.length && lastBounds) {
        var empty = svgElement("text", {
          "class": "zdd-dungeon-map-empty",
          x: lastBounds.centerX,
          y: lastBounds.centerY
        });
        empty.textContent = "Replay is at step 0";
        map.appendChild(empty);
      }
    }

    function replayDistances() {
      var adjacency = Object.create(null);
      replayState.rooms.forEach(function(room) { adjacency[room.id] = []; });
      replayState.edges.forEach(function(edge) {
        if (!adjacency[edge.from] || !adjacency[edge.to]) return;
        adjacency[edge.from].push(edge.to);
        adjacency[edge.to].push(edge.from);
      });
      var start = replayState.rooms.find(function(room) { return room.type === "start"; });
      var distances = Object.create(null);
      if (!start) return distances;
      var queue = [start.id];
      distances[start.id] = 0;
      for (var index = 0; index < queue.length; index += 1) {
        adjacency[queue[index]].forEach(function(neighborId) {
          if (distances[neighborId] != null) return;
          distances[neighborId] = distances[queue[index]] + 1;
          queue.push(neighborId);
        });
      }
      return distances;
    }

    function renderInspector(roomId) {
      var room = roomById(roomId || selectedRoomId);
      if (!room) {
        inspector.innerHTML = '<span class="zdd-dungeon-inspector-label">Room inspector</span>'
          + "<strong>Select a room</strong><span>Hover, focus, or tap a room to inspect it.</span>";
        return;
      }
      var degree = replayState.edges.reduce(function(total, edge) {
        return total + (edge.from === room.id || edge.to === room.id ? 1 : 0);
      }, 0);
      var distance = replayDistances()[room.id];
      inspector.innerHTML = '<span class="zdd-dungeon-inspector-label">Room inspector</span>'
        + "<strong>" + roomName(room.type) + " (" + room.x + "," + room.y + ")</strong>"
        + "<span>Distance from Start: " + (distance == null ? "-" : distance) + "</span>"
        + "<span>Degree: " + degree + "</span>";
    }

    function renderInfo() {
      if (!dungeon) return;
      infoValue("seed", dungeon.seed);
      infoValue("fingerprint", dungeon.fingerprint);
      infoValue("generator", dungeon.version);
      infoValue("rooms", dungeon.stats.roomCount);
      infoValue("dead-ends", dungeon.stats.deadEndCount);
      infoValue("max-distance", dungeon.stats.maxDistance);
    }

    function renderReplay() {
      if (!dungeon) return;
      var total = dungeon.steps.length;
      var currentStep = replayIndex > 0 ? dungeon.steps[replayIndex - 1] : null;
      stepInput.max = total;
      stepInput.value = replayIndex;
      stepLabel.textContent = "Step " + replayIndex + " / " + total;
      stepKind.textContent = currentStep ? currentStep.type.replace(/-/g, " ") : "Ready";
      stepKind.dataset.kind = currentStep ? currentStep.type : "ready";
      stepDescription.textContent = replay.describeDungeonStep(currentStep);
      firstButton.disabled = replayIndex === 0;
      previousButton.disabled = replayIndex === 0;
      nextButton.disabled = replayIndex >= total;
      lastButton.disabled = replayIndex >= total;
      resetButton.disabled = replayIndex === 0;
      playButton.disabled = total === 0;
      playButton.textContent = playTimer ? "Pause" : "Play";
      playButton.setAttribute("aria-pressed", playTimer ? "true" : "false");
    }

    function renderAll() {
      renderInfo();
      renderMap();
      renderReplay();
      renderInspector();
    }

    function pause() {
      if (playTimer) window.clearInterval(playTimer);
      playTimer = 0;
      if (dungeon) renderReplay();
    }

    function showReplayIndex(value, keepPlaying) {
      if (!dungeon) return;
      if (!keepPlaying) pause();
      replayIndex = Math.max(0, Math.min(dungeon.steps.length, Math.floor(Number(value) || 0)));
      replayState = replay.buildReplayState(dungeon.steps, replayIndex);
      if (selectedRoomId && !roomById(selectedRoomId)) selectedRoomId = "";
      renderAll();
    }

    function startPlaying() {
      if (!dungeon || playTimer || !dungeon.steps.length) return;
      if (replayIndex >= dungeon.steps.length) showReplayIndex(0, true);
      var interval = Math.max(80, Number(speedSelect.value) || 350);
      playTimer = window.setInterval(function() {
        if (!dungeon || replayIndex >= dungeon.steps.length) {
          pause();
          return;
        }
        showReplayIndex(replayIndex + 1, true);
        if (replayIndex >= dungeon.steps.length) pause();
      }, interval);
      renderReplay();
    }

    function generate(seedValue, historyMode, message) {
      pause();
      var seed = usableSeed(seedValue, true);
      try {
        dungeon = core.generateDungeon(seed);
        seedInput.value = seed;
        replayIndex = dungeon.steps.length;
        replayState = replay.buildReplayState(dungeon.steps, replayIndex);
        var start = replayState.rooms.find(function(room) { return room.type === "start"; });
        selectedRoomId = start ? start.id : "";
        var urlUpdated = updateUrl(seed, historyMode);
        renderAll();
        if (!urlUpdated) {
          setStatus("The floor was generated, but the URL could not be updated.", "error");
        } else {
          setStatus(message || "Generated " + dungeon.stats.roomCount + " rooms from this seed.", "ready");
        }
      } catch (error) {
        setStatus(error && error.message ? error.message : "Unable to generate this floor.", "error");
      }
    }

    function copyLink() {
      var text = window.location.href;
      var task;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        task = navigator.clipboard.writeText(text);
      } else {
        var temporary = document.createElement("textarea");
        temporary.value = text;
        temporary.setAttribute("readonly", "");
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";
        document.body.appendChild(temporary);
        temporary.select();
        task = Promise.resolve(document.execCommand("copy"));
        temporary.remove();
      }
      task.then(function() {
        setStatus("Link copied to clipboard.", "ready");
      }).catch(function() {
        setStatus("Copy failed. Copy the URL from the address bar.", "error");
      });
    }

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      generate(seedInput.value, "push");
    });

    root.querySelector("[data-dungeon-random]").addEventListener("click", function() {
      generate(randomSeed(), "push", "Generated a new random seed string and replayed it through dungeon-core.");
    });

    root.querySelector("[data-dungeon-mutate]").addEventListener("click", function() {
      generate(mutateSeed(seedInput.value), "push", "Mutated one character and generated the resulting floor.");
    });

    root.querySelector("[data-dungeon-copy]").addEventListener("click", copyLink);

    root.querySelectorAll("[data-dungeon-example]").forEach(function(button) {
      button.addEventListener("click", function() {
        generate(button.dataset.dungeonExample, "push", "Loaded regression seed " + button.dataset.dungeonExample + ".");
      });
    });

    root.querySelector("[data-dungeon-fit]").addEventListener("click", function() {
      fitMap();
      setStatus("Map fitted to the current floor.", "ready");
    });

    firstButton.addEventListener("click", function() { showReplayIndex(0); });
    previousButton.addEventListener("click", function() { showReplayIndex(replayIndex - 1); });
    playButton.addEventListener("click", function() {
      if (playTimer) pause();
      else startPlaying();
    });
    nextButton.addEventListener("click", function() { showReplayIndex(replayIndex + 1); });
    lastButton.addEventListener("click", function() { showReplayIndex(dungeon.steps.length); });
    resetButton.addEventListener("click", function() { showReplayIndex(0); });
    stepInput.addEventListener("input", function() { showReplayIndex(stepInput.value); });
    speedSelect.addEventListener("change", function() {
      var wasPlaying = Boolean(playTimer);
      pause();
      if (wasPlaying) startPlaying();
    });

    function roomTarget(event) {
      return event.target.closest && event.target.closest("[data-room-id]");
    }

    map.addEventListener("pointerover", function(event) {
      var target = roomTarget(event);
      if (target) renderInspector(target.dataset.roomId);
    });

    map.addEventListener("pointerout", function(event) {
      var target = roomTarget(event);
      if (!target || target.contains(event.relatedTarget)) return;
      renderInspector();
    });

    map.addEventListener("focusin", function(event) {
      var target = roomTarget(event);
      if (target) renderInspector(target.dataset.roomId);
    });

    map.addEventListener("focusout", function(event) {
      var target = roomTarget(event);
      if (!target || target.contains(event.relatedTarget)) return;
      renderInspector();
    });

    function selectRoom(target) {
      if (!target) return;
      selectedRoomId = target.dataset.roomId;
      renderMap();
      renderInspector();
      var selected = map.querySelector('[data-room-id="' + selectedRoomId + '"]');
      if (selected) selected.focus();
    }

    map.addEventListener("click", function(event) {
      selectRoom(roomTarget(event));
    });

    map.addEventListener("keydown", function(event) {
      var target = roomTarget(event);
      if (target && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        selectRoom(target);
      }
    });

    function stopForPageExit() {
      pause();
    }

    document.addEventListener("visibilitychange", function() {
      if (document.hidden) pause();
    });
    window.addEventListener("pagehide", stopForPageExit);

    if (typeof ResizeObserver === "function") {
      var resizeObserver = new ResizeObserver(fitMap);
      resizeObserver.observe(root.querySelector("[data-dungeon-map-shell]"));
    } else {
      window.addEventListener("resize", fitMap, {passive: true});
    }

    window.addEventListener("popstate", function() {
      generate(seedFromUrl(), "none", "Restored the seed from browser history.");
    });

    generate(seedFromUrl(), "replace");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
