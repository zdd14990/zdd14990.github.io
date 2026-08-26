(function() {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var DEFAULT_SEED = "ZDD14990";

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
    var ui = window.ZddDungeonUiCore;
    if (!root || !core || !ui || root.dataset.zddReady === "1") return;
    root.dataset.zddReady = "1";

    var form = root.querySelector("[data-dungeon-form]");
    var seedInput = root.querySelector("[data-dungeon-seed]");
    var status = root.querySelector("[data-dungeon-status]");
    var map = root.querySelector("[data-dungeon-map]");
    var mapShell = root.querySelector("[data-dungeon-map-shell]");
    var inspector = root.querySelector("[data-dungeon-inspector]");
    var mapCaption = root.querySelector("[data-dungeon-map-caption]");
    var revealButton = root.querySelector("[data-dungeon-reveal]");
    var results = root.querySelector("[data-dungeon-results]");
    var score = root.querySelector("[data-dungeon-score]");
    var guessHint = root.querySelector("[data-dungeon-guess-hint]");
    var dungeon = null;
    var visibleDungeon = {rooms: [], connections: [], roomIds: []};
    var revealed = false;
    var guessMode = "secret";
    var guesses = {secret: null, "super-secret": null};
    var selectedRoomId = "";
    var resizeObserver = null;
    var resizeFrame = 0;
    var observedMapWidth = 0;

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
        var timing = window.performance && window.performance.now ? window.performance.now() : 0;
        var fallback = core.hashSeed(String(Date.now()) + ":" + String(timing));
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
      if (/\d/.test(last)) return seed.slice(0, -1) + String((Number(last) + 1) % 10);
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
        url.search = "";
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
        normal: "Normal",
        boss: "Boss",
        shop: "Shop",
        treasure: "Treasure",
        curse: "Curse",
        sacrifice: "Sacrifice",
        challenge: "Challenge",
        arcade: "Arcade",
        vault: "Vault",
        library: "Library",
        planetarium: "Planetarium",
        secret: "Secret",
        "super-secret": "Super Secret"
      }[type] || "Normal";
    }

    function roomMark(type) {
      return {
        start: "S",
        boss: "B",
        shop: "$",
        treasure: "T",
        curse: "C",
        sacrifice: "\u2020",
        challenge: "!",
        arcade: "A",
        vault: "V",
        library: "L",
        planetarium: "P",
        secret: "?",
        "super-secret": "??"
      }[type] || "";
    }

    function pointFor(cell) {
      return ui.gridToSvg(cell);
    }

    function roomById(id) {
      return visibleDungeon.rooms.find(function(room) { return room.id === id; }) || null;
    }

    function currentRenderModel() {
      var guessCells = revealed ? [] : ui.getGuessableCells(dungeon, false);
      var guessMarkers = [];
      if (!revealed && guesses.secret) {
        guessMarkers.push({type: "secret", x: guesses.secret.x, y: guesses.secret.y});
      }
      if (!revealed && guesses["super-secret"]) {
        guessMarkers.push({
          type: "super-secret",
          x: guesses["super-secret"].x,
          y: guesses["super-secret"].y
        });
      }
      return {
        rooms: visibleDungeon.rooms,
        connections: visibleDungeon.connections,
        guessCells: guessCells,
        guessMarkers: guessMarkers
      };
    }

    function updateMapHeight(viewBox, measuredWidth) {
      var width = Number(measuredWidth) || mapShell.clientWidth;
      if (!width) return;
      var mobile = window.matchMedia && window.matchMedia("(max-width: 44em)").matches;
      var minimumHeight = mobile ? 360 : 420;
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 900;
      var maximumHeight = Math.max(minimumHeight, Math.min(viewportHeight * 0.75, 900));
      var height = ui.computeDungeonViewportHeight(viewBox, width, {
        minHeight: minimumHeight,
        maxHeight: maximumHeight
      });
      if (Math.abs(mapShell.getBoundingClientRect().height - height) >= 1) {
        mapShell.style.height = height + "px";
      }
    }

    function fitMap(renderModel, measuredWidth) {
      if (!dungeon) return;
      var model = renderModel || currentRenderModel();
      var viewBox = ui.computeDungeonViewBox(model.rooms, {
        guessCells: model.guessCells,
        guessMarkers: model.guessMarkers
      });
      map.setAttribute("viewBox", viewBox.value);
      updateMapHeight(viewBox, measuredWidth);
    }

    function appendConnection(connection) {
      var from = roomById(connection.from);
      var to = roomById(connection.to);
      if (!from || !to) return;
      var start = pointFor(from);
      var end = pointFor(to);
      map.appendChild(svgElement("line", {
        "class": "zdd-dungeon-connection",
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        "aria-hidden": "true"
      }));
    }

    function appendGuessCell(cell) {
      var rect = ui.getGuessCellRect(cell);
      var group = svgElement("g", {
        "class": "zdd-dungeon-guess-cell",
        "data-guess-x": cell.x,
        "data-guess-y": cell.y,
        tabindex: "0",
        role: "button",
        "aria-label": "Guess hidden room at (" + cell.x + "," + cell.y + ")"
      });
      group.appendChild(svgElement("rect", {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        rx: "3"
      }));
      map.appendChild(group);
    }

    function appendRoom(room) {
      var point = pointFor(room);
      var focusRect = ui.getFocusRect(room);
      var roomRect = ui.getRoomRect(room);
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
        x: focusRect.x,
        y: focusRect.y,
        width: focusRect.width,
        height: focusRect.height,
        rx: "4"
      }));
      group.appendChild(svgElement("rect", {
        "class": "zdd-dungeon-room-shape",
        x: roomRect.x,
        y: roomRect.y,
        width: roomRect.width,
        height: roomRect.height,
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
      var coordinate = svgElement("text", {
        "class": "zdd-dungeon-room-coordinate",
        x: point.x,
        y: point.y + 16,
        "aria-hidden": "true"
      });
      coordinate.textContent = room.x + "," + room.y;
      group.appendChild(coordinate);
      map.appendChild(group);
    }

    function appendGuessMarker(marker) {
      var point = pointFor(marker);
      var rect = ui.getGuessMarkerRect(marker);
      var group = svgElement("g", {
        "class": "zdd-dungeon-guess-marker",
        "data-guess-type": marker.type,
        "aria-hidden": "true"
      });
      group.appendChild(svgElement("rect", {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        rx: "4"
      }));
      var label = svgElement("text", {
        x: point.x,
        y: point.y,
        "aria-hidden": "true"
      });
      label.textContent = marker.type === "secret" ? "?" : "??";
      group.appendChild(label);
      map.appendChild(group);
    }

    function renderMap() {
      var renderModel = currentRenderModel();
      while (map.firstChild) map.removeChild(map.firstChild);
      fitMap(renderModel);
      renderModel.connections.forEach(appendConnection);
      renderModel.guessCells.forEach(appendGuessCell);
      renderModel.rooms.slice().sort(function(left, right) {
        return left.y - right.y || left.x - right.x;
      }).forEach(appendRoom);
      renderModel.guessMarkers.forEach(appendGuessMarker);
    }

    function renderInspector(roomId) {
      var room = roomById(roomId || selectedRoomId);
      if (!room) {
        inspector.innerHTML = '<span class="zdd-dungeon-inspector-label">Room inspector</span>'
          + "<strong>Select a room</strong><span>Hover, focus, or tap a visible room.</span>";
        return;
      }
      inspector.innerHTML = '<span class="zdd-dungeon-inspector-label">Room inspector</span>'
        + "<strong>" + roomName(room.type) + " (" + room.x + "," + room.y + ")</strong>"
        + "<span>Distance from Start: " + (room.distance == null ? "-" : room.distance) + "</span>"
        + "<span>Degree: " + room.degree + "</span>";
    }

    function coordinateText(coordinate) {
      return coordinate ? "(" + coordinate.x + "," + coordinate.y + ")" : "Not placed";
    }

    function renderGuessControls() {
      root.querySelectorAll("[data-dungeon-guess-mode]").forEach(function(button) {
        var active = button.dataset.dungeonGuessMode === guessMode;
        button.setAttribute("aria-pressed", active ? "true" : "false");
        button.disabled = revealed;
      });
      root.querySelector('[data-dungeon-guess-output="secret"]').textContent = coordinateText(guesses.secret);
      root.querySelector('[data-dungeon-guess-output="super-secret"]').textContent = coordinateText(guesses["super-secret"]);
      revealButton.disabled = revealed;
      revealButton.textContent = revealed ? "Rooms Revealed" : "Reveal Rooms";
      if (!revealed) {
        guessHint.textContent = "Guessing " + (guessMode === "secret" ? "Secret Room" : "Super Secret Room")
          + ". Select any outlined empty cell beside a visible room.";
      }
    }

    function fullRoom(id) {
      return dungeon.rooms.find(function(room) { return room.id === id; });
    }

    function resultText(correct, guess, actual) {
      if (correct) return "\u2713 Correct";
      return "\u2717 " + (guess ? "Guess " + coordinateText(guess) : "Not guessed")
        + " \u00b7 Actual " + coordinateText(actual);
    }

    function renderResults() {
      if (!revealed) {
        results.hidden = true;
        score.hidden = true;
        return;
      }
      var secret = fullRoom(dungeon.secretRoomId);
      var superSecret = fullRoom(dungeon.superSecretRoomId);
      var secretCorrect = ui.checkSecretGuess(dungeon, guesses.secret);
      var superCorrect = ui.checkSuperSecretGuess(dungeon, guesses["super-secret"]);
      var total = Number(secretCorrect) + Number(superCorrect);
      score.textContent = total + " / 2";
      score.hidden = false;
      results.hidden = false;
      root.querySelector('[data-dungeon-result="secret"]').textContent = resultText(secretCorrect, guesses.secret, secret);
      root.querySelector('[data-dungeon-result="super-secret"]').textContent = resultText(
        superCorrect, guesses["super-secret"], superSecret
      );
      root.querySelector('[data-dungeon-why="secret"]').textContent = "Secret Room: adjacent to "
        + dungeon.stats.secretNeighborCount + " rooms, the highest valid adjacency tier on this floor.";
      root.querySelector('[data-dungeon-why="super-secret"]').textContent = "Super Secret Room: dead end with one entrance. Distance from Start: "
        + superSecret.distance + ".";
    }

    function renderInfo() {
      infoValue("seed", dungeon.seed);
      infoValue("fingerprint", dungeon.fingerprint);
      infoValue("generator", dungeon.version);
      infoValue("visible-rooms", dungeon.stats.visibleRoomCount);
      infoValue("total-rooms", dungeon.stats.roomCount);
      infoValue("max-distance", dungeon.stats.maxDistance);
    }

    function renderAll() {
      visibleDungeon = ui.getVisibleDungeon(dungeon, revealed);
      if (selectedRoomId && !roomById(selectedRoomId)) selectedRoomId = "";
      mapCaption.textContent = revealed
        ? "Secret and Super Secret rooms are revealed with their connections."
        : "Secret rooms and their connections are hidden.";
      renderInfo();
      renderMap();
      renderInspector();
      renderGuessControls();
      renderResults();
    }

    function resetChallenge() {
      revealed = false;
      guessMode = "secret";
      guesses = {secret: null, "super-secret": null};
      selectedRoomId = "";
    }

    function generate(seedValue, historyMode, message) {
      var seed = usableSeed(seedValue, true);
      try {
        dungeon = core.generateDungeon(seed);
        seedInput.value = seed;
        resetChallenge();
        var start = dungeon.rooms.find(function(room) { return room.type === "start"; });
        selectedRoomId = start ? start.id : "";
        var urlUpdated = updateUrl(seed, historyMode);
        renderAll();
        if (!urlUpdated) {
          setStatus("The floor was generated, but the URL could not be updated.", "error");
        } else {
          setStatus(message || "Classic floor generated. Place two guesses before revealing the hidden rooms.", "ready");
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
        var copied = document.execCommand("copy");
        temporary.remove();
        task = copied ? Promise.resolve() : Promise.reject(new Error("Copy failed"));
      }
      task.then(function() {
        setStatus("Challenge link copied. It contains only the seed.", "ready");
      }).catch(function() {
        setStatus("Copy failed. Copy the URL from the address bar.", "error");
      });
    }

    function selectGuessCell(target) {
      if (!target || revealed) return;
      guesses[guessMode] = {
        x: Number(target.dataset.guessX),
        y: Number(target.dataset.guessY)
      };
      renderMap();
      renderGuessControls();
    }

    function selectRoom(target) {
      if (!target) return;
      selectedRoomId = target.dataset.roomId;
      renderMap();
      renderInspector();
      var selected = map.querySelector('[data-room-id="' + selectedRoomId + '"]');
      if (selected) selected.focus();
    }

    function roomTarget(event) {
      return event.target.closest && event.target.closest("[data-room-id]");
    }

    function guessTarget(event) {
      return event.target.closest && event.target.closest("[data-guess-x][data-guess-y]");
    }

    function scheduleMapFit() {
      if (!dungeon || resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(function() {
        resizeFrame = 0;
        fitMap();
      });
    }

    function handleMapResize(entries) {
      var width = entries && entries[0] ? entries[0].contentRect.width : 0;
      if (!width || Math.abs(width - observedMapWidth) < 0.5) return;
      observedMapWidth = width;
      scheduleMapFit();
    }

    function cleanupMapFit() {
      if (resizeObserver) resizeObserver.disconnect();
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = 0;
      window.removeEventListener("resize", scheduleMapFit);
    }

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      generate(seedInput.value, "push");
    });

    root.querySelector("[data-dungeon-random]").addEventListener("click", function() {
      generate(randomSeed(), "push", "New seed generated. Hidden-room guesses were reset.");
    });

    root.querySelector("[data-dungeon-mutate]").addEventListener("click", function() {
      generate(mutateSeed(seedInput.value), "push", "Seed mutated by one character. Hidden-room guesses were reset.");
    });

    root.querySelector("[data-dungeon-copy]").addEventListener("click", copyLink);

    root.querySelectorAll("[data-dungeon-example]").forEach(function(button) {
      button.addEventListener("click", function() {
        generate(button.dataset.dungeonExample, "push", "Regression seed loaded. Hidden-room guesses were reset.");
      });
    });

    root.querySelector("[data-dungeon-fit]").addEventListener("click", function() {
      fitMap();
      setStatus("Map fitted to its current rendered geometry.", "ready");
    });

    root.querySelectorAll("[data-dungeon-guess-mode]").forEach(function(button) {
      button.addEventListener("click", function() {
        if (revealed) return;
        guessMode = button.dataset.dungeonGuessMode;
        renderGuessControls();
      });
    });

    revealButton.addEventListener("click", function() {
      if (revealed) return;
      revealed = true;
      visibleDungeon = ui.getVisibleDungeon(dungeon, true);
      renderAll();
    });

    map.addEventListener("click", function(event) {
      var guessCell = guessTarget(event);
      if (guessCell) {
        selectGuessCell(guessCell);
        return;
      }
      selectRoom(roomTarget(event));
    });

    map.addEventListener("keydown", function(event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var guessCell = guessTarget(event);
      var room = roomTarget(event);
      if (!guessCell && !room) return;
      event.preventDefault();
      if (guessCell) selectGuessCell(guessCell);
      else selectRoom(room);
    });

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

    window.addEventListener("popstate", function() {
      generate(seedFromUrl(), "none", "Seed restored from browser history. Hidden-room guesses were reset.");
    });

    if (window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver(handleMapResize);
      resizeObserver.observe(mapShell);
    }
    window.addEventListener("resize", scheduleMapFit);
    window.addEventListener("pagehide", cleanupMapFit, {once: true});

    generate(seedFromUrl(), "replace");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
