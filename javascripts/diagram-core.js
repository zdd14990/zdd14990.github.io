(function(root, factory) {
  "use strict";

  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.ZddDiagramCore = api;
})(typeof window !== "undefined" ? window : globalThis, function() {
  "use strict";

  var MIN_SIZE = 2;
  var MAX_SIZE = 10;
  var SUPPORTED_STYLES = ["normal", "dashed", "hook", "twohead", "equal"];
  var LABEL_POSITIONS = ["above", "below", "left", "right"];
  var BENDS = ["none", "left", "right"];

  function failure(message, detail) {
    return {ok: false, error: message, detail: detail || ""};
  }

  function clampSize(value) {
    var number = Number(value);
    if (!Number.isFinite(number)) return 5;
    return Math.max(MIN_SIZE, Math.min(MAX_SIZE, Math.floor(number)));
  }

  function createDiagram(rows, cols) {
    return {
      rows: clampSize(rows == null ? 5 : rows),
      cols: clampSize(cols == null ? 5 : cols),
      nodes: [],
      edges: []
    };
  }

  function directionFromDelta(rowDelta, colDelta) {
    var vertical = rowDelta < 0 ? "u" : "d";
    var horizontal = colDelta < 0 ? "l" : "r";
    return vertical.repeat(Math.abs(rowDelta)) + horizontal.repeat(Math.abs(colDelta));
  }

  function directionBetween(source, target) {
    if (!source || !target) return "";
    return directionFromDelta(target.row - source.row, target.col - source.col);
  }

  function deltaFromDirection(direction) {
    var value = String(direction || "").trim();
    if (!value || !/^[udlr]+$/.test(value)) return null;
    if ((value.indexOf("u") >= 0 && value.indexOf("d") >= 0)
        || (value.indexOf("l") >= 0 && value.indexOf("r") >= 0)) return null;
    var row = 0;
    var col = 0;
    for (var index = 0; index < value.length; index += 1) {
      if (value.charAt(index) === "u") row -= 1;
      if (value.charAt(index) === "d") row += 1;
      if (value.charAt(index) === "l") col -= 1;
      if (value.charAt(index) === "r") col += 1;
    }
    if (row === 0 && col === 0) return null;
    return {row: row, col: col};
  }

  function findDuplicate(values) {
    var seen = Object.create(null);
    for (var index = 0; index < values.length; index += 1) {
      if (seen[values[index]]) return values[index];
      seen[values[index]] = true;
    }
    return "";
  }

  function validateDiagram(diagram) {
    if (!diagram || !Array.isArray(diagram.nodes) || !Array.isArray(diagram.edges)) {
      return failure("Invalid diagram model.");
    }
    if (!Number.isInteger(diagram.rows) || !Number.isInteger(diagram.cols)
        || diagram.rows < MIN_SIZE || diagram.rows > MAX_SIZE
        || diagram.cols < MIN_SIZE || diagram.cols > MAX_SIZE) {
      return failure("Diagram dimensions must be between 2 and 10.");
    }

    var duplicateNodeId = findDuplicate(diagram.nodes.map(function(node) { return String(node.id); }));
    if (duplicateNodeId) return failure("Node IDs must be unique.");
    var occupied = Object.create(null);
    var nodesById = Object.create(null);
    for (var nodeIndex = 0; nodeIndex < diagram.nodes.length; nodeIndex += 1) {
      var node = diagram.nodes[nodeIndex];
      if (!node || !String(node.id || "") || !Number.isInteger(node.row) || !Number.isInteger(node.col)) {
        return failure("Each node needs an ID and a grid position.");
      }
      if (node.row < 0 || node.row >= diagram.rows || node.col < 0 || node.col >= diagram.cols) {
        return failure("A node is outside the diagram grid.");
      }
      if (!String(node.label == null ? "" : node.label).trim()) {
        return failure("Node labels cannot be empty.");
      }
      var cellKey = node.row + ":" + node.col;
      if (occupied[cellKey]) return failure("Only one node can occupy a grid cell.");
      occupied[cellKey] = true;
      nodesById[String(node.id)] = node;
    }

    var duplicateEdgeId = findDuplicate(diagram.edges.map(function(edge) { return String(edge.id); }));
    if (duplicateEdgeId) return failure("Arrow IDs must be unique.");
    var pairs = Object.create(null);
    for (var edgeIndex = 0; edgeIndex < diagram.edges.length; edgeIndex += 1) {
      var edge = diagram.edges[edgeIndex];
      if (!edge || !String(edge.id || "") || !nodesById[String(edge.source)] || !nodesById[String(edge.target)]) {
        return failure("An arrow references a missing node.");
      }
      if (String(edge.source) === String(edge.target)) return failure("Self-loop arrows are not supported.");
      var pairKey = String(edge.source) + ">" + String(edge.target);
      if (pairs[pairKey]) return failure("Multiple arrows in the same direction are not supported.");
      pairs[pairKey] = true;
      if (SUPPORTED_STYLES.indexOf(edge.style || "normal") < 0) return failure("Unsupported arrow style.");
      if (LABEL_POSITIONS.indexOf(edge.labelPosition || "above") < 0) return failure("Unsupported label position.");
      if (BENDS.indexOf(edge.bend || "none") < 0) return failure("Unsupported arrow bend.");
      if (String(edge.label || "").indexOf('"') >= 0) return failure("Arrow labels cannot contain a double quote.");
    }
    return {ok: true};
  }

  function arrowOptions(edge, direction) {
    var options = [direction];
    var style = edge.style || "normal";
    if (style === "dashed") options.push("dashed");
    if (style === "hook") options.push("hook");
    if (style === "twohead") options.push("two heads");
    if (style === "equal") options.push("equals");
    if (edge.bend === "left") options.push("bend left");
    if (edge.bend === "right") options.push("bend right");

    var label = String(edge.label || "").trim();
    var position = edge.labelPosition || "above";
    if (label || position !== "above") {
      var quoted = label.indexOf(",") >= 0 ? '"{' + label + '}"' : '"' + label + '"';
      if (position !== "above") quoted += "{" + position + "}";
      options.push(quoted);
    }
    return options;
  }

  function exportTikz(diagram) {
    var validation = validateDiagram(diagram);
    if (!validation.ok) throw new Error(validation.error);

    var nodesById = Object.create(null);
    var nodesByCell = Object.create(null);
    var lastRow = 0;
    var lastCol = 0;
    diagram.nodes.forEach(function(node) {
      nodesById[String(node.id)] = node;
      nodesByCell[node.row + ":" + node.col] = node;
      lastRow = Math.max(lastRow, node.row);
      lastCol = Math.max(lastCol, node.col);
    });

    var edgesBySource = Object.create(null);
    diagram.edges.forEach(function(edge) {
      var sourceId = String(edge.source);
      if (!edgesBySource[sourceId]) edgesBySource[sourceId] = [];
      edgesBySource[sourceId].push(edge);
    });
    Object.keys(edgesBySource).forEach(function(sourceId) {
      edgesBySource[sourceId].sort(function(left, right) {
        var leftDirection = directionBetween(nodesById[String(left.source)], nodesById[String(left.target)]);
        var rightDirection = directionBetween(nodesById[String(right.source)], nodesById[String(right.target)]);
        return leftDirection.localeCompare(rightDirection) || String(left.id).localeCompare(String(right.id));
      });
    });

    var rows = [];
    for (var row = 0; row <= lastRow; row += 1) {
      var cells = [];
      for (var col = 0; col <= lastCol; col += 1) {
        var node = nodesByCell[row + ":" + col];
        if (!node) {
          cells.push("");
          continue;
        }
        var cell = String(node.label).trim();
        (edgesBySource[String(node.id)] || []).forEach(function(edge) {
          var direction = directionBetween(node, nodesById[String(edge.target)]);
          cell += " \\arrow[" + arrowOptions(edge, direction).join(", ") + "]";
        });
        cells.push(cell);
      }
      rows.push(cells.join(" & "));
    }
    return "\\begin{tikzcd}\n" + rows.join(" \\\\\n") + "\n\\end{tikzcd}";
  }

  function splitTopLevel(source, separator) {
    var parts = [];
    var start = 0;
    var braces = 0;
    var brackets = 0;
    var quoted = false;
    for (var index = 0; index < source.length; index += 1) {
      var character = source.charAt(index);
      var escaped = index > 0 && source.charAt(index - 1) === "\\";
      if (character === '"' && !escaped) quoted = !quoted;
      if (quoted) continue;
      if (character === "{" && !escaped) braces += 1;
      else if (character === "}" && !escaped) braces -= 1;
      else if (character === "[" && !escaped) brackets += 1;
      else if (character === "]" && !escaped) brackets -= 1;
      if (braces < 0 || brackets < 0) throw new Error("Unbalanced braces or brackets.");
      if (braces !== 0 || brackets !== 0) continue;

      var matches = separator === "\\\\"
        ? character === "\\" && source.charAt(index + 1) === "\\"
        : character === separator && !escaped;
      if (!matches) continue;
      parts.push(source.slice(start, index));
      index += separator.length - 1;
      start = index + 1;
    }
    if (quoted || braces !== 0 || brackets !== 0) throw new Error("Unbalanced TikZ-CD syntax.");
    parts.push(source.slice(start));
    return parts;
  }

  function extractCell(cell) {
    var source = String(cell || "");
    var arrows = [];
    var labelEnd = source.length;
    var searchFrom = 0;
    while (searchFrom < source.length) {
      var arrowStart = source.indexOf("\\arrow", searchFrom);
      if (arrowStart < 0) break;
      if (labelEnd === source.length) labelEnd = arrowStart;
      if (source.slice(arrowStart, arrowStart + 7) !== "\\arrow[") {
        throw new Error("Only \\arrow[...] syntax is supported.");
      }
      var quoted = false;
      var braces = 0;
      var end = -1;
      for (var index = arrowStart + 7; index < source.length; index += 1) {
        var character = source.charAt(index);
        var escaped = index > 0 && source.charAt(index - 1) === "\\";
        if (character === '"' && !escaped) quoted = !quoted;
        if (quoted) continue;
        if (character === "{" && !escaped) braces += 1;
        else if (character === "}" && !escaped) braces -= 1;
        else if (character === "]" && braces === 0) {
          end = index;
          break;
        }
        if (braces < 0) throw new Error("Unbalanced arrow options.");
      }
      if (end < 0 || quoted || braces !== 0) throw new Error("Unclosed arrow options.");
      if (source.slice(searchFrom, arrowStart).trim() && arrows.length) {
        throw new Error("Arrow commands must follow the node label.");
      }
      arrows.push(source.slice(arrowStart + 7, end));
      searchFrom = end + 1;
    }
    if (arrows.length && source.slice(searchFrom).trim()) {
      throw new Error("Arrow commands must follow the node label.");
    }
    return {label: source.slice(0, labelEnd).trim(), arrows: arrows};
  }

  function unwrapLabel(value) {
    var label = value;
    if (label.length >= 2 && label.indexOf(",") >= 0
        && label.charAt(0) === "{" && label.charAt(label.length - 1) === "}") {
      label = label.slice(1, -1);
    }
    return label;
  }

  function oppositePosition(direction) {
    var delta = deltaFromDirection(direction);
    if (!delta) return "below";
    if (Math.abs(delta.col) >= Math.abs(delta.row)) return delta.col >= 0 ? "below" : "above";
    return delta.row >= 0 ? "left" : "right";
  }

  function parseArrowOptions(source) {
    var options = splitTopLevel(source, ",").map(function(option) { return option.trim(); }).filter(Boolean);
    var parsed = {direction: "", label: "", style: "normal", labelPosition: "above", bend: "none"};
    var hasLabel = false;
    var styleOption = "";
    var bendOption = "";
    var positionOption = "";
    var swappedLabel = false;

    function setStyle(value) {
      if (styleOption && styleOption !== value) throw new Error("Multiple arrow styles are not supported.");
      styleOption = value;
      parsed.style = value;
    }

    function setBend(value) {
      if (bendOption && bendOption !== value) throw new Error("Multiple arrow bends are not supported.");
      bendOption = value;
      parsed.bend = value;
    }

    function setPosition(value) {
      if (positionOption && positionOption !== value) throw new Error("Multiple label positions are not supported.");
      positionOption = value;
      parsed.labelPosition = value;
    }

    for (var index = 0; index < options.length; index += 1) {
      var option = options[index];
      if (/^[udlr]+$/.test(option)) {
        if (parsed.direction) throw new Error("Multiple arrow directions are not supported.");
        if (!deltaFromDirection(option)) throw new Error("Unsupported arrow direction: " + option);
        parsed.direction = option;
        continue;
      }
      if (option === "dashed") setStyle("dashed");
      else if (option === "hook") setStyle("hook");
      else if (option === "two heads") setStyle("twohead");
      else if (option === "equals") setStyle("equal");
      else if (option === "bend left") setBend("left");
      else if (option === "bend right") setBend("right");
      else if (LABEL_POSITIONS.indexOf(option) >= 0) setPosition(option);
      else if (option.charAt(0) === '"') {
        var match = option.match(/^"([^\"]*)"(?:\{(above|below|left|right)\})?(')?$/);
        if (!match) throw new Error("Unsupported arrow label syntax.");
        if (hasLabel) throw new Error("Multiple arrow labels are not supported.");
        if (match[2] && match[3]) throw new Error("Multiple label positions are not supported.");
        parsed.label = unwrapLabel(match[1]);
        if (match[2]) setPosition(match[2]);
        swappedLabel = Boolean(match[3]);
        hasLabel = true;
      } else {
        throw new Error("Unsupported option: " + option);
      }
    }
    if (!parsed.direction) throw new Error("Every arrow needs a direction.");
    if (swappedLabel) setPosition(oppositePosition(parsed.direction));
    return parsed;
  }

  function parseTikz(source) {
    var unsupported = "This diagram uses TikZ-CD syntax that this editor does not support yet.";
    try {
      var text = String(source || "");
      if (text.length > 50000) return failure(unsupported, "The import is too large.");
      var environment = text.match(/\\begin\{tikzcd\}([\s\S]*?)\\end\{tikzcd\}/);
      if (!environment) return failure(unsupported, "Expected a tikzcd environment.");
      var body = environment[1].trim();

      var rawRows = splitTopLevel(body, "\\\\");
      if (rawRows.length > 1 && !rawRows[rawRows.length - 1].trim()) rawRows.pop();
      if (!rawRows.length || rawRows.length > MAX_SIZE) return failure(unsupported, "The grid must contain 1 to 10 rows.");
      var rawCells = rawRows.map(function(row) { return splitTopLevel(row, "&"); });
      var widest = rawCells.reduce(function(maximum, row) { return Math.max(maximum, row.length); }, 0);
      if (widest > MAX_SIZE) return failure(unsupported, "The grid must contain at most 10 columns.");

      var diagram = createDiagram(Math.max(MIN_SIZE, rawRows.length), Math.max(MIN_SIZE, widest));
      var nodesByCell = Object.create(null);
      var pendingEdges = [];
      rawCells.forEach(function(row, rowIndex) {
        row.forEach(function(cell, colIndex) {
          var parsedCell = extractCell(cell);
          if (!parsedCell.label) {
            if (parsedCell.arrows.length) throw new Error("An arrow cannot start from an empty cell.");
            return;
          }
          var node = {id: "n" + (diagram.nodes.length + 1), row: rowIndex, col: colIndex, label: parsedCell.label};
          diagram.nodes.push(node);
          nodesByCell[rowIndex + ":" + colIndex] = node;
          parsedCell.arrows.forEach(function(arrowSource) {
            pendingEdges.push({source: node, options: parseArrowOptions(arrowSource)});
          });
        });
      });

      pendingEdges.forEach(function(pending, edgeIndex) {
        var delta = deltaFromDirection(pending.options.direction);
        var targetRow = pending.source.row + delta.row;
        var targetCol = pending.source.col + delta.col;
        var target = nodesByCell[targetRow + ":" + targetCol];
        if (!target) throw new Error("An arrow points to an empty or out-of-range cell.");
        diagram.edges.push({
          id: "e" + (edgeIndex + 1),
          source: pending.source.id,
          target: target.id,
          label: pending.options.label,
          style: pending.options.style,
          labelPosition: pending.options.labelPosition,
          bend: pending.options.bend
        });
      });

      var validation = validateDiagram(diagram);
      if (!validation.ok) return failure(unsupported, validation.error);
      return {ok: true, diagram: diagram};
    } catch (error) {
      return failure(unsupported, error && error.message ? error.message : "Unable to parse this diagram.");
    }
  }

  return {
    MIN_SIZE: MIN_SIZE,
    MAX_SIZE: MAX_SIZE,
    SUPPORTED_STYLES: SUPPORTED_STYLES.slice(),
    LABEL_POSITIONS: LABEL_POSITIONS.slice(),
    BENDS: BENDS.slice(),
    createDiagram: createDiagram,
    directionFromDelta: directionFromDelta,
    directionBetween: directionBetween,
    deltaFromDirection: deltaFromDirection,
    validateDiagram: validateDiagram,
    exportTikz: exportTikz,
    parseTikz: parseTikz
  };
});
