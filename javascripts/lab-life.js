(function() {
  "use strict";

  var COLUMNS = 32;
  var ROWS = 20;

  function indexOfCell(column, row) {
    return row * COLUMNS + column;
  }

  function initialBoard() {
    var board = new Uint8Array(COLUMNS * ROWS);
    var patterns = [
      [[5, 6], [6, 7], [7, 5], [7, 6], [7, 7]],
      [[19, 8], [20, 8], [21, 8], [21, 7], [20, 6]]
    ];
    patterns.forEach(function(pattern) {
      pattern.forEach(function(cell) {
        board[indexOfCell(cell[0], cell[1])] = 1;
      });
    });
    return board;
  }

  function init() {
    var root = document.getElementById("zdd-game-of-life");
    if (!root || root.dataset.zddReady === "1") return;
    root.dataset.zddReady = "1";

    var canvas = root.querySelector("[data-life-canvas]");
    var stage = canvas.parentElement;
    var toggleButton = root.querySelector("[data-life-toggle]");
    var stepButton = root.querySelector("[data-life-step]");
    var clearButton = root.querySelector("[data-life-clear]");
    var randomButton = root.querySelector("[data-life-random]");
    var resetButton = root.querySelector("[data-life-reset]");
    var speedInput = root.querySelector("#zdd-life-speed");
    var speedOutput = root.querySelector("[data-life-speed-output]");
    var generationOutput = root.querySelector("[data-life-generation]");
    var populationOutput = root.querySelector("[data-life-population]");
    var board = initialBoard();
    var generation = 0;
    var timer = 0;
    var cursor = {column: 5, row: 6};

    function population() {
      return board.reduce(function(total, cell) { return total + cell; }, 0);
    }

    function updateReadout() {
      generationOutput.textContent = "Generation " + generation;
      populationOutput.textContent = "Population " + population();
      speedOutput.value = speedInput.value + " fps";
    }

    function canvasSize() {
      var width = Math.max(288, Math.round(stage.clientWidth));
      var height = Math.round(width * ROWS / COLUMNS);
      var scale = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      canvas.style.height = height + "px";
      var context = canvas.getContext("2d");
      context.setTransform(scale, 0, 0, scale, 0, 0);
      return {context: context, width: width, height: height};
    }

    function draw() {
      var size = canvasSize();
      var styles = getComputedStyle(document.body);
      var panel = styles.getPropertyValue("--zdd-playground-panel").trim() || "#f7fcff";
      var line = styles.getPropertyValue("--zdd-playground-line").trim() || "rgba(94, 159, 199, .42)";
      var accent = styles.getPropertyValue("--zdd-playground-accent").trim() || "#2e7491";
      var columnWidth = size.width / COLUMNS;
      var rowHeight = size.height / ROWS;

      size.context.fillStyle = panel;
      size.context.fillRect(0, 0, size.width, size.height);
      size.context.strokeStyle = line;
      size.context.lineWidth = 0.65;
      for (var column = 1; column < COLUMNS; column += 1) {
        var x = Math.round(column * columnWidth) + 0.5;
        size.context.beginPath();
        size.context.moveTo(x, 0);
        size.context.lineTo(x, size.height);
        size.context.stroke();
      }
      for (var row = 1; row < ROWS; row += 1) {
        var y = Math.round(row * rowHeight) + 0.5;
        size.context.beginPath();
        size.context.moveTo(0, y);
        size.context.lineTo(size.width, y);
        size.context.stroke();
      }

      size.context.fillStyle = accent;
      board.forEach(function(cell, cellIndex) {
        if (!cell) return;
        var cellColumn = cellIndex % COLUMNS;
        var cellRow = Math.floor(cellIndex / COLUMNS);
        size.context.fillRect(
          cellColumn * columnWidth + 1,
          cellRow * rowHeight + 1,
          Math.max(1, columnWidth - 1.5),
          Math.max(1, rowHeight - 1.5)
        );
      });

      if (document.activeElement === canvas) {
        size.context.strokeStyle = accent;
        size.context.lineWidth = 2;
        size.context.strokeRect(
          cursor.column * columnWidth + 1,
          cursor.row * rowHeight + 1,
          Math.max(2, columnWidth - 2),
          Math.max(2, rowHeight - 2)
        );
      }
      updateReadout();
    }

    function nextBoard() {
      var next = new Uint8Array(board.length);
      for (var row = 0; row < ROWS; row += 1) {
        for (var column = 0; column < COLUMNS; column += 1) {
          var neighbors = 0;
          for (var rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
            for (var columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
              if (rowOffset === 0 && columnOffset === 0) continue;
              var neighborRow = row + rowOffset;
              var neighborColumn = column + columnOffset;
              if (neighborRow < 0 || neighborRow >= ROWS || neighborColumn < 0 || neighborColumn >= COLUMNS) continue;
              neighbors += board[indexOfCell(neighborColumn, neighborRow)];
            }
          }
          var alive = board[indexOfCell(column, row)] === 1;
          next[indexOfCell(column, row)] = neighbors === 3 || (alive && neighbors === 2) ? 1 : 0;
        }
      }
      board = next;
      generation += 1;
      draw();
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = 0;
      toggleButton.textContent = "Start";
      toggleButton.setAttribute("aria-pressed", "false");
    }

    function start() {
      stop();
      var framesPerSecond = Number(speedInput.value) || 5;
      timer = window.setInterval(nextBoard, Math.round(1000 / framesPerSecond));
      toggleButton.textContent = "Pause";
      toggleButton.setAttribute("aria-pressed", "true");
    }

    function toggleCell(column, row) {
      if (column < 0 || column >= COLUMNS || row < 0 || row >= ROWS) return;
      var cellIndex = indexOfCell(column, row);
      board[cellIndex] = board[cellIndex] ? 0 : 1;
      draw();
    }

    toggleButton.addEventListener("click", function() {
      if (timer) stop();
      else start();
    });
    stepButton.addEventListener("click", function() {
      stop();
      nextBoard();
    });
    clearButton.addEventListener("click", function() {
      stop();
      board = new Uint8Array(COLUMNS * ROWS);
      generation = 0;
      draw();
    });
    randomButton.addEventListener("click", function() {
      stop();
      board = new Uint8Array(COLUMNS * ROWS);
      board.forEach(function(_, cellIndex) {
        board[cellIndex] = Math.random() < 0.23 ? 1 : 0;
      });
      generation = 0;
      draw();
    });
    resetButton.addEventListener("click", function() {
      stop();
      board = initialBoard();
      generation = 0;
      draw();
    });
    speedInput.addEventListener("input", function() {
      updateReadout();
      if (timer) start();
    });
    canvas.addEventListener("pointerdown", function(event) {
      var bounds = canvas.getBoundingClientRect();
      cursor.column = Math.max(0, Math.min(COLUMNS - 1, Math.floor((event.clientX - bounds.left) / bounds.width * COLUMNS)));
      cursor.row = Math.max(0, Math.min(ROWS - 1, Math.floor((event.clientY - bounds.top) / bounds.height * ROWS)));
      toggleCell(cursor.column, cursor.row);
      canvas.focus();
    });
    canvas.addEventListener("keydown", function(event) {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "Enter"].indexOf(event.key) < 0) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") cursor.column = Math.max(0, cursor.column - 1);
      else if (event.key === "ArrowRight") cursor.column = Math.min(COLUMNS - 1, cursor.column + 1);
      else if (event.key === "ArrowUp") cursor.row = Math.max(0, cursor.row - 1);
      else if (event.key === "ArrowDown") cursor.row = Math.min(ROWS - 1, cursor.row + 1);
      else toggleCell(cursor.column, cursor.row);
      draw();
    });
    canvas.addEventListener("focus", draw);
    canvas.addEventListener("blur", draw);
    window.addEventListener("resize", draw);
    window.addEventListener("pagehide", stop, {once: true});

    draw();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
