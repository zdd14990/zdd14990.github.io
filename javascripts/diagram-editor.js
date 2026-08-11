(function() {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function(character) {
      return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[character];
    });
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function node(id, row, col, label) {
    return {id: id, row: row, col: col, label: label};
  }

  function edge(id, source, target, label, style, labelPosition, bend) {
    return {
      id: id,
      source: source,
      target: target,
      label: label || "",
      style: style || "normal",
      labelPosition: labelPosition || "above",
      bend: bend || "none"
    };
  }

  var EXAMPLES = {
    square: function() {
      return {
        rows: 5,
        cols: 5,
        nodes: [node("n1", 0, 0, "A"), node("n2", 0, 1, "B"), node("n3", 1, 0, "C"), node("n4", 1, 1, "D")],
        edges: [
          edge("e1", "n1", "n2", "f"),
          edge("e2", "n1", "n3", "g", "normal", "left"),
          edge("e3", "n2", "n4", "h", "normal", "right"),
          edge("e4", "n3", "n4", "k")
        ]
      };
    },
    triangle: function() {
      return {
        rows: 5,
        cols: 5,
        nodes: [node("n1", 0, 0, "A"), node("n2", 0, 2, "B"), node("n3", 1, 1, "C")],
        edges: [
          edge("e1", "n1", "n2", "f"),
          edge("e2", "n1", "n3", "g", "normal", "left"),
          edge("e3", "n3", "n2", "h", "normal", "right")
        ]
      };
    },
    pullback: function() {
      return {
        rows: 5,
        cols: 5,
        nodes: [
          node("n1", 0, 0, "X \\times_Z Y"),
          node("n2", 0, 1, "Y"),
          node("n3", 1, 0, "X"),
          node("n4", 1, 1, "Z")
        ],
        edges: [
          edge("e1", "n1", "n2", "p_2"),
          edge("e2", "n1", "n3", "p_1", "normal", "left"),
          edge("e3", "n2", "n4", "g", "normal", "right"),
          edge("e4", "n3", "n4", "f")
        ]
      };
    },
    exact: function() {
      return {
        rows: 5,
        cols: 5,
        nodes: [
          node("n1", 0, 0, "0"),
          node("n2", 0, 1, "A"),
          node("n3", 0, 2, "B"),
          node("n4", 0, 3, "C"),
          node("n5", 0, 4, "0")
        ],
        edges: [
          edge("e1", "n1", "n2", ""),
          edge("e2", "n2", "n3", "i", "hook"),
          edge("e3", "n3", "n4", "p", "twohead"),
          edge("e4", "n4", "n5", "")
        ]
      };
    }
  };

  function init() {
    var root = document.getElementById("zdd-diagram-editor");
    var core = window.ZddDiagramCore;
    if (!root || !core || root.dataset.zddReady === "1") return;
    root.dataset.zddReady = "1";

    var grid = root.querySelector("[data-diagram-grid]");
    var stage = root.querySelector("[data-diagram-stage]");
    var surface = root.querySelector("[data-diagram-surface]");
    var svg = root.querySelector("[data-diagram-svg]");
    var inspector = root.querySelector("[data-diagram-inspector]");
    var edgeList = root.querySelector("[data-diagram-edge-list]");
    var output = root.querySelector("[data-diagram-output]");
    var status = root.querySelector("[data-diagram-status]");
    var copyStatus = root.querySelector("[data-diagram-copy-status]");
    var sizeLabel = root.querySelector("[data-diagram-size]");
    var exampleSelect = root.querySelector("[data-diagram-example]");
    var addRowButton = root.querySelector("[data-diagram-add-row]");
    var addColButton = root.querySelector("[data-diagram-add-col]");
    var importDialog = root.querySelector("[data-diagram-import-dialog]");
    var importForm = root.querySelector("[data-diagram-import-form]");
    var importSource = root.querySelector("[data-diagram-import-source]");
    var importError = root.querySelector("[data-diagram-import-error]");

    var diagram = EXAMPLES.square();
    var selected = null;
    var connectingSource = "";
    var editing = null;
    var nodeCounter = 4;
    var edgeCounter = 4;
    var mathVersion = 0;
    var copyTimer = 0;
    var initialNotice = "";

    function findNode(id) {
      return diagram.nodes.find(function(item) { return item.id === id; }) || null;
    }

    function findEdge(id) {
      return diagram.edges.find(function(item) { return item.id === id; }) || null;
    }

    function nodeAt(row, col) {
      return diagram.nodes.find(function(item) { return item.row === row && item.col === col; }) || null;
    }

    function nextId(prefix) {
      var counter = prefix === "n" ? ++nodeCounter : ++edgeCounter;
      var exists = prefix === "n" ? findNode : findEdge;
      while (exists(prefix + counter)) counter += 1;
      if (prefix === "n") nodeCounter = counter;
      else edgeCounter = counter;
      return prefix + counter;
    }

    function syncCounters() {
      nodeCounter = diagram.nodes.reduce(function(maximum, item) {
        var match = String(item.id).match(/^n(\d+)$/);
        return match ? Math.max(maximum, Number(match[1])) : maximum;
      }, 0);
      edgeCounter = diagram.edges.reduce(function(maximum, item) {
        var match = String(item.id).match(/^e(\d+)$/);
        return match ? Math.max(maximum, Number(match[1])) : maximum;
      }, 0);
    }

    function setStatus(message, stateName) {
      status.textContent = message || "";
      status.dataset.state = stateName || "ready";
    }

    function announce(message, stateName) {
      setStatus(message, stateName);
      initialNotice = "";
    }

    function compactDiagram(value) {
      var nodes = value.nodes.slice().sort(function(left, right) {
        return left.row - right.row || left.col - right.col || String(left.id).localeCompare(String(right.id));
      });
      var edges = value.edges.slice().sort(function(left, right) {
        return String(left.source).localeCompare(String(right.source))
          || String(left.target).localeCompare(String(right.target))
          || String(left.id).localeCompare(String(right.id));
      });
      return {
        v: 1,
        r: value.rows,
        c: value.cols,
        n: nodes.map(function(item) { return [item.id, item.row, item.col, item.label]; }),
        e: edges.map(function(item) {
          return [item.id, item.source, item.target, item.label, item.style, item.labelPosition, item.bend];
        })
      };
    }

    function encodeState(value) {
      var bytes = new TextEncoder().encode(JSON.stringify(compactDiagram(value)));
      var binary = "";
      for (var index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index]);
      return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    function decodeState(value) {
      var padded = value.replace(/-/g, "+").replace(/_/g, "/");
      while (padded.length % 4) padded += "=";
      var binary = atob(padded);
      var bytes = new Uint8Array(binary.length);
      for (var index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
      var compact = JSON.parse(new TextDecoder().decode(bytes));
      if (!compact || compact.v !== 1 || !Array.isArray(compact.n) || !Array.isArray(compact.e)) {
        throw new Error("Unsupported diagram state.");
      }
      var restored = {
        rows: compact.r,
        cols: compact.c,
        nodes: compact.n.map(function(item) {
          return {id: String(item[0]), row: item[1], col: item[2], label: String(item[3] == null ? "" : item[3])};
        }),
        edges: compact.e.map(function(item) {
          return {
            id: String(item[0]),
            source: String(item[1]),
            target: String(item[2]),
            label: String(item[3] == null ? "" : item[3]),
            style: String(item[4] || "normal"),
            labelPosition: String(item[5] || "above"),
            bend: String(item[6] || "none")
          };
        })
      };
      var validation = core.validateDiagram(restored);
      if (!validation.ok) throw new Error(validation.error);
      return restored;
    }

    function restoreFromUrl() {
      if (window.location.hash.indexOf("#diagram=") !== 0) return;
      try {
        diagram = decodeState(window.location.hash.slice(9));
        syncCounters();
        initialNotice = "Diagram restored from this URL.";
      } catch (error) {
        diagram = EXAMPLES.square();
        syncCounters();
        initialNotice = "The diagram state in this URL is invalid, so the default example was loaded.";
      }
    }

    function rememberState() {
      if (!window.history || !window.history.replaceState) return;
      var validation = core.validateDiagram(diagram);
      if (!validation.ok) return;
      try {
        var encoded = encodeState(diagram);
        if (encoded.length > 7000) return;
        window.history.replaceState(null, "", window.location.pathname + window.location.search + "#diagram=" + encoded);
      } catch (error) {
        return;
      }
    }

    function defaultNodeLabel() {
      var used = Object.create(null);
      diagram.nodes.forEach(function(item) { used[item.label] = true; });
      var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (var index = 0; index < alphabet.length; index += 1) {
        if (!used[alphabet.charAt(index)]) return alphabet.charAt(index);
      }
      return "X_{" + (diagram.nodes.length + 1) + "}";
    }

    function renderGrid() {
      var version = ++mathVersion;
      if (window.MathJax && window.MathJax.typesetClear) window.MathJax.typesetClear([grid]);
      grid.style.setProperty("--zdd-diagram-cols", diagram.cols);
      grid.style.setProperty("--zdd-diagram-rows", diagram.rows);
      surface.style.width = (diagram.cols * 96) + "px";
      surface.style.height = (diagram.rows * 83.2) + "px";

      var html = "";
      for (var row = 0; row < diagram.rows; row += 1) {
        for (var col = 0; col < diagram.cols; col += 1) {
          var item = nodeAt(row, col);
          html += '<div class="zdd-diagram-cell" role="gridcell" data-row="' + row + '" data-col="' + col + '">';
          if (!item) {
            html += '<button class="zdd-diagram-cell-add" type="button" data-add-node aria-label="Add object at row '
              + (row + 1) + ", column " + (col + 1) + '">+</button>';
          } else if (editing && editing.id === item.id) {
            html += '<input class="zdd-diagram-node-input" type="text" data-node-edit="' + escapeHtml(item.id)
              + '" value="' + escapeHtml(item.label) + '" aria-label="Edit object label" spellcheck="false">';
          } else {
            var isSelected = selected && selected.type === "node" && selected.id === item.id;
            html += '<button class="zdd-diagram-node" type="button" data-node-id="' + escapeHtml(item.id)
              + '" aria-pressed="' + (isSelected ? "true" : "false") + '" data-connecting="'
              + (connectingSource === item.id ? "true" : "false") + '" aria-label="Object ' + escapeHtml(item.label)
              + " at row " + (row + 1) + ", column " + (col + 1) + '"><span class="arithmatex">\\('
              + escapeHtml(item.label) + "\\)</span></button>";
            if (isSelected) {
              [["u", "↑"], ["r", "→"], ["d", "↓"], ["l", "←"]].forEach(function(handle) {
                html += '<button class="zdd-diagram-handle" type="button" data-connect-handle="' + escapeHtml(item.id)
                  + '" data-direction="' + handle[0] + '" aria-label="Connect from ' + escapeHtml(item.label)
                  + '">' + handle[1] + "</button>";
              });
            }
          }
          html += "</div>";
        }
      }
      grid.innerHTML = html;

      var editor = grid.querySelector("[data-node-edit]");
      if (editor) {
        editor.focus();
        editor.select();
      }

      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([grid]).then(function() {
          if (version === mathVersion) renderSvg();
        }).catch(function() {
          if (version === mathVersion) renderSvg();
        });
      }
    }

    function svgElement(name, attributes) {
      var element = document.createElementNS(SVG_NS, name);
      Object.keys(attributes || {}).forEach(function(key) { element.setAttribute(key, attributes[key]); });
      return element;
    }

    function boundaryPoint(box, toward) {
      var dx = toward.x - box.x;
      var dy = toward.y - box.y;
      var halfWidth = box.width / 2 + 4;
      var halfHeight = box.height / 2 + 4;
      var scale = 1 / Math.max(Math.abs(dx) / halfWidth || 0, Math.abs(dy) / halfHeight || 0);
      return {x: box.x + dx * scale, y: box.y + dy * scale};
    }

    function nodeBox(id, surfaceRect) {
      var buttons = grid.querySelectorAll("[data-node-id]");
      for (var index = 0; index < buttons.length; index += 1) {
        if (buttons[index].dataset.nodeId !== id) continue;
        var rect = buttons[index].getBoundingClientRect();
        return {
          x: rect.left - surfaceRect.left + rect.width / 2,
          y: rect.top - surfaceRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height
        };
      }
      return null;
    }

    function markerDefinitions() {
      var defs = svgElement("defs");
      var arrowMarker = svgElement("marker", {id: "zdd-diagram-arrowhead", viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse"});
      arrowMarker.appendChild(svgElement("path", {d: "M 0 0 L 8 4 L 0 8 z", fill: "currentColor"}));
      defs.appendChild(arrowMarker);

      var doubleMarker = svgElement("marker", {id: "zdd-diagram-doublehead", viewBox: "0 0 14 8", refX: "13", refY: "4", markerWidth: "12", markerHeight: "7", orient: "auto-start-reverse"});
      doubleMarker.appendChild(svgElement("path", {d: "M 0 0 L 7 4 L 0 8 z M 7 0 L 14 4 L 7 8 z", fill: "currentColor"}));
      defs.appendChild(doubleMarker);

      var hookMarker = svgElement("marker", {id: "zdd-diagram-hook", viewBox: "0 0 9 10", refX: "1", refY: "5", markerWidth: "8", markerHeight: "9", orient: "auto"});
      hookMarker.appendChild(svgElement("path", {d: "M 8 1 C 2 1, 2 9, 8 9", fill: "none", stroke: "currentColor", "stroke-width": "1.5"}));
      defs.appendChild(hookMarker);
      return defs;
    }

    function renderSvg() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      svg.appendChild(markerDefinitions());
      var width = surface.clientWidth;
      var height = surface.clientHeight;
      if (!width || !height) return;
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      var surfaceRect = surface.getBoundingClientRect();

      diagram.edges.forEach(function(item) {
        var sourceNode = findNode(item.source);
        var targetNode = findNode(item.target);
        var sourceBox = nodeBox(item.source, surfaceRect);
        var targetBox = nodeBox(item.target, surfaceRect);
        if (!sourceNode || !targetNode || !sourceBox || !targetBox) return;

        var start = boundaryPoint(sourceBox, targetBox);
        var end = boundaryPoint(targetBox, sourceBox);
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var length = Math.sqrt(dx * dx + dy * dy) || 1;
        var perpendicular = {x: -dy / length, y: dx / length};
        var reverseExists = diagram.edges.some(function(candidate) {
          return candidate.source === item.target && candidate.target === item.source;
        });
        var bendAmount = item.bend === "left" ? -34 : item.bend === "right" ? 34 : reverseExists ? 12 : 0;
        var control = {
          x: (start.x + end.x) / 2 + perpendicular.x * bendAmount,
          y: (start.y + end.y) / 2 + perpendicular.y * bendAmount
        };
        var pathData = bendAmount
          ? "M " + start.x + " " + start.y + " Q " + control.x + " " + control.y + " " + end.x + " " + end.y
          : "M " + start.x + " " + start.y + " L " + end.x + " " + end.y;

        var group = svgElement("g", {
          "class": "zdd-diagram-edge-group",
          "data-edge-id": item.id,
          "data-selected": selected && selected.type === "edge" && selected.id === item.id ? "true" : "false"
        });
        var visible = svgElement("path", {"class": "zdd-diagram-edge", d: pathData, "data-style": item.style || "normal"});
        if (item.style !== "equal") {
          visible.setAttribute("marker-end", item.style === "twohead" ? "url(#zdd-diagram-doublehead)" : "url(#zdd-diagram-arrowhead)");
        }
        if (item.style === "hook") visible.setAttribute("marker-start", "url(#zdd-diagram-hook)");
        group.appendChild(visible);
        if (item.style === "equal") group.appendChild(svgElement("path", {"class": "zdd-diagram-edge-equal-gap", d: pathData}));

        var hit = svgElement("path", {
          "class": "zdd-diagram-edge-hit",
          d: pathData,
          tabindex: "0",
          role: "button",
          "data-edge-id": item.id,
          "aria-label": "Arrow from " + sourceNode.label + " to " + targetNode.label + (item.label ? ", label " + item.label : "")
        });
        group.appendChild(hit);

        if (item.label) {
          var labelX = (start.x + 2 * control.x + end.x) / 4;
          var labelY = (start.y + 2 * control.y + end.y) / 4;
          if (item.labelPosition === "above") labelY -= 13;
          if (item.labelPosition === "below") labelY += 13;
          if (item.labelPosition === "left") labelX -= 14;
          if (item.labelPosition === "right") labelX += 14;
          var label = svgElement("text", {
            "class": "zdd-diagram-edge-label",
            x: labelX,
            y: labelY,
            "text-anchor": "middle",
            "dominant-baseline": "central"
          });
          label.textContent = item.label;
          group.appendChild(label);
        }
        svg.appendChild(group);
      });
    }

    function optionList(values, selectedValue, labels) {
      return values.map(function(value) {
        return '<option value="' + escapeHtml(value) + '"' + (value === selectedValue ? " selected" : "") + ">"
          + escapeHtml(labels[value] || value) + "</option>";
      }).join("");
    }

    function renderInspector() {
      if (!selected) {
        inspector.innerHTML = '<p class="zdd-diagram-empty">Select an object or arrow to edit it.</p>';
        return;
      }
      if (selected.type === "node") {
        var item = findNode(selected.id);
        if (!item) {
          selected = null;
          renderInspector();
          return;
        }
        inspector.innerHTML = '<div class="zdd-diagram-inspector-fields">'
          + '<label class="zdd-diagram-inspector-field">Label<input type="text" data-inspector-node-label value="'
          + escapeHtml(item.label) + '" spellcheck="false"></label>'
          + '<span class="zdd-diagram-empty">Row ' + (item.row + 1) + ", column " + (item.col + 1) + "</span></div>"
          + '<div class="zdd-diagram-inspector-actions"><button class="zdd-lab-button" type="button" data-inspector-connect aria-pressed="'
          + (connectingSource === item.id ? "true" : "false") + '">' + (connectingSource === item.id ? "Cancel connect" : "Connect")
          + '</button><button class="zdd-lab-button" type="button" data-inspector-delete>Delete</button></div>';
        return;
      }
      var arrow = findEdge(selected.id);
      if (!arrow) {
        selected = null;
        renderInspector();
        return;
      }
      inspector.innerHTML = '<div class="zdd-diagram-inspector-fields">'
        + '<label class="zdd-diagram-inspector-field">Label<input type="text" data-inspector-edge-label value="'
        + escapeHtml(arrow.label) + '" spellcheck="false"></label>'
        + '<label class="zdd-diagram-inspector-field">Style<select data-inspector-edge-style>'
        + optionList(core.SUPPORTED_STYLES, arrow.style, {normal: "Normal", dashed: "Dashed", hook: "Hook", twohead: "Twohead", equal: "Equal"})
        + '</select></label><label class="zdd-diagram-inspector-field">Label position<select data-inspector-edge-position>'
        + optionList(core.LABEL_POSITIONS, arrow.labelPosition, {above: "Above", below: "Below", left: "Left", right: "Right"})
        + '</select></label><label class="zdd-diagram-inspector-field">Bend<select data-inspector-edge-bend>'
        + optionList(core.BENDS, arrow.bend, {none: "None", left: "Left", right: "Right"})
        + '</select></label></div><div class="zdd-diagram-inspector-actions"><button class="zdd-lab-button" type="button" data-inspector-delete>Delete arrow</button></div>';
    }

    function renderEdgeList() {
      if (!diagram.edges.length) {
        edgeList.innerHTML = '<span class="zdd-diagram-empty">No arrows yet.</span>';
        return;
      }
      edgeList.innerHTML = diagram.edges.map(function(item) {
        var source = findNode(item.source);
        var target = findNode(item.target);
        var summary = (source ? source.label : "?") + " → " + (target ? target.label : "?") + (item.label ? " · " + item.label : "");
        var isSelected = selected && selected.type === "edge" && selected.id === item.id;
        return '<button type="button" data-edge-list-id="' + escapeHtml(item.id) + '" aria-pressed="'
          + (isSelected ? "true" : "false") + '">' + escapeHtml(summary) + "</button>";
      }).join("");
    }

    function renderTikz() {
      try {
        output.textContent = core.exportTikz(diagram);
      } catch (error) {
        output.textContent = "";
        announce(error && error.message ? error.message : "Unable to export this diagram.", "error");
      }
    }

    function renderControls() {
      sizeLabel.textContent = diagram.rows + " × " + diagram.cols;
      addRowButton.disabled = diagram.rows >= core.MAX_SIZE;
      addColButton.disabled = diagram.cols >= core.MAX_SIZE;
    }

    function renderAll(options) {
      var settings = options || {};
      renderGrid();
      renderSvg();
      renderInspector();
      renderEdgeList();
      renderTikz();
      renderControls();
      if (settings.remember !== false) rememberState();
      if (initialNotice) setStatus(initialNotice, initialNotice.indexOf("invalid") >= 0 ? "error" : "ready");
    }

    function focusSelectedNode() {
      if (!selected || selected.type !== "node") return;
      var buttons = grid.querySelectorAll("[data-node-id]");
      for (var index = 0; index < buttons.length; index += 1) {
        if (buttons[index].dataset.nodeId === selected.id) buttons[index].focus();
      }
    }

    function focusSelectedEdge() {
      if (!selected || selected.type !== "edge") return;
      var paths = svg.querySelectorAll(".zdd-diagram-edge-hit");
      for (var index = 0; index < paths.length; index += 1) {
        if (paths[index].dataset.edgeId === selected.id) paths[index].focus();
      }
    }

    function startEditing(id, isNew) {
      var item = findNode(id);
      if (!item) return;
      connectingSource = "";
      selected = {type: "node", id: id};
      editing = {id: id, original: item.label, isNew: Boolean(isNew)};
      renderAll({remember: !isNew});
    }

    function removeNode(id) {
      diagram.nodes = diagram.nodes.filter(function(item) { return item.id !== id; });
      diagram.edges = diagram.edges.filter(function(item) { return item.source !== id && item.target !== id; });
      if (connectingSource === id) connectingSource = "";
      if (selected && selected.id === id) selected = null;
      if (editing && editing.id === id) editing = null;
    }

    function commitEditing(input) {
      if (!editing) return;
      var item = findNode(editing.id);
      if (!item) return;
      var label = input.value.trim();
      if (!label) {
        removeNode(item.id);
        announce("Empty object removed.", "ready");
      } else {
        item.label = label;
        selected = {type: "node", id: item.id};
        editing = null;
        announce("Object updated.", "ready");
      }
      renderAll();
      focusSelectedNode();
    }

    function cancelEditing() {
      if (!editing) return;
      var editState = editing;
      editing = null;
      if (editState.isNew) {
        removeNode(editState.id);
        announce("New object cancelled.", "ready");
      } else {
        var item = findNode(editState.id);
        if (item) item.label = editState.original;
        announce("Edit cancelled.", "ready");
      }
      renderAll();
    }

    function createNode(row, col) {
      if (nodeAt(row, col)) return;
      var item = node(nextId("n"), row, col, defaultNodeLabel());
      diagram.nodes.push(item);
      startEditing(item.id, true);
    }

    function startConnect(id) {
      if (!findNode(id)) return;
      if (connectingSource === id) {
        connectingSource = "";
        announce("Connection cancelled.", "ready");
      } else {
        connectingSource = id;
        selected = {type: "node", id: id};
        announce("Choose another object as the arrow target.", "ready");
      }
      renderAll({remember: false});
      focusSelectedNode();
    }

    function connectTo(targetId) {
      var sourceId = connectingSource;
      if (!sourceId) return false;
      if (sourceId === targetId) {
        announce("Self-loop arrows are not supported.", "error");
        return true;
      }
      var duplicate = diagram.edges.some(function(item) { return item.source === sourceId && item.target === targetId; });
      if (duplicate) {
        announce("That arrow already exists.", "error");
        return true;
      }
      var item = edge(nextId("e"), sourceId, targetId, "");
      diagram.edges.push(item);
      connectingSource = "";
      selected = {type: "edge", id: item.id};
      announce("Arrow created. Use the Inspector to add a label or style.", "ready");
      renderAll();
      focusSelectedEdge();
      return true;
    }

    function deleteSelected() {
      if (!selected) return;
      if (selected.type === "node") {
        removeNode(selected.id);
        announce("Object and its arrows deleted.", "ready");
      } else {
        diagram.edges = diagram.edges.filter(function(item) { return item.id !== selected.id; });
        selected = null;
        announce("Arrow deleted.", "ready");
      }
      renderAll();
    }

    function selectNode(id, clickCount) {
      if (connectTo(id)) return;
      if (selected && selected.type === "node" && selected.id === id && clickCount > 1) {
        startEditing(id, false);
        return;
      }
      editing = null;
      selected = {type: "node", id: id};
      renderAll({remember: false});
      focusSelectedNode();
    }

    function selectEdge(id) {
      connectingSource = "";
      editing = null;
      selected = {type: "edge", id: id};
      renderAll({remember: false});
      focusSelectedEdge();
    }

    function replaceDiagram(nextDiagram, message) {
      var validation = core.validateDiagram(nextDiagram);
      if (!validation.ok) {
        announce(validation.error, "error");
        return;
      }
      diagram = clone(nextDiagram);
      syncCounters();
      selected = null;
      connectingSource = "";
      editing = null;
      announce(message, "ready");
      renderAll();
    }

    function hasContent() {
      return diagram.nodes.length > 0 || diagram.edges.length > 0;
    }

    grid.addEventListener("click", function(event) {
      var handle = event.target.closest("[data-connect-handle]");
      if (handle) {
        startConnect(handle.dataset.connectHandle);
        return;
      }
      var nodeButton = event.target.closest("[data-node-id]");
      if (nodeButton) {
        selectNode(nodeButton.dataset.nodeId, event.detail);
        return;
      }
      var addButton = event.target.closest("[data-add-node]");
      if (addButton) {
        if (connectingSource) {
          announce("Choose an existing object as the target.", "error");
          return;
        }
        var cell = addButton.closest("[data-row][data-col]");
        createNode(Number(cell.dataset.row), Number(cell.dataset.col));
      }
    });

    grid.addEventListener("keydown", function(event) {
      var input = event.target.closest("[data-node-edit]");
      if (!input) return;
      if (event.key === "Enter") {
        event.preventDefault();
        commitEditing(input);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        cancelEditing();
      }
    });

    grid.addEventListener("focusout", function(event) {
      var input = event.target.closest("[data-node-edit]");
      if (!input || !editing) return;
      commitEditing(input);
    });

    svg.addEventListener("click", function(event) {
      var hit = event.target.closest("[data-edge-id]");
      if (hit) selectEdge(hit.dataset.edgeId);
    });

    svg.addEventListener("keydown", function(event) {
      var hit = event.target.closest("[data-edge-id]");
      if (hit && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        selectEdge(hit.dataset.edgeId);
      }
    });

    inspector.addEventListener("click", function(event) {
      if (event.target.closest("[data-inspector-delete]")) deleteSelected();
      if (event.target.closest("[data-inspector-connect]") && selected && selected.type === "node") startConnect(selected.id);
    });

    inspector.addEventListener("change", function(event) {
      if (!selected) return;
      if (event.target.matches("[data-inspector-node-label]")) {
        var item = findNode(selected.id);
        var nodeLabel = event.target.value.trim();
        if (!nodeLabel) {
          event.target.value = item.label;
          announce("Node labels cannot be empty.", "error");
          return;
        }
        item.label = nodeLabel;
        announce("Object updated.", "ready");
        renderAll();
        return;
      }
      var arrow = findEdge(selected.id);
      if (!arrow) return;
      if (event.target.matches("[data-inspector-edge-style]")) arrow.style = event.target.value;
      if (event.target.matches("[data-inspector-edge-position]")) arrow.labelPosition = event.target.value;
      if (event.target.matches("[data-inspector-edge-bend]")) arrow.bend = event.target.value;
      renderAll();
    });

    inspector.addEventListener("input", function(event) {
      if (!selected || selected.type !== "edge" || !event.target.matches("[data-inspector-edge-label]")) return;
      if (event.target.value.indexOf('"') >= 0) {
        announce("Arrow labels cannot contain a double quote.", "error");
        return;
      }
      var arrow = findEdge(selected.id);
      if (!arrow) return;
      arrow.label = event.target.value;
      if (!arrow.label) {
        arrow.labelPosition = "above";
        var positionSelect = inspector.querySelector("[data-inspector-edge-position]");
        if (positionSelect) positionSelect.value = "above";
      }
      renderSvg();
      renderEdgeList();
      renderTikz();
      rememberState();
    });

    edgeList.addEventListener("click", function(event) {
      var button = event.target.closest("[data-edge-list-id]");
      if (button) selectEdge(button.dataset.edgeListId);
    });

    root.addEventListener("keydown", function(event) {
      if (event.target.matches("input, textarea, select")) return;
      if (event.key === "Escape") {
        connectingSource = "";
        selected = null;
        editing = null;
        announce("Selection cleared.", "ready");
        renderAll({remember: false});
        return;
      }
      if ((event.key === "Delete" || event.key === "Backspace") && selected) {
        event.preventDefault();
        deleteSelected();
        return;
      }
      if (event.key === "Enter" && selected && selected.type === "node") {
        event.preventDefault();
        startEditing(selected.id, false);
      }
    });

    addRowButton.addEventListener("click", function() {
      if (diagram.rows >= core.MAX_SIZE) return;
      diagram.rows += 1;
      announce("Row added.", "ready");
      renderAll();
    });

    addColButton.addEventListener("click", function() {
      if (diagram.cols >= core.MAX_SIZE) return;
      diagram.cols += 1;
      announce("Column added.", "ready");
      renderAll();
    });

    root.querySelector("[data-diagram-clear]").addEventListener("click", function() {
      if (hasContent() && !window.confirm("Clear the current diagram?")) return;
      replaceDiagram(core.createDiagram(5, 5), "Diagram cleared.");
    });

    root.querySelector("[data-diagram-reset]").addEventListener("click", function() {
      if (hasContent() && !window.confirm("Reset to the square example?")) return;
      replaceDiagram(EXAMPLES.square(), "Square example restored.");
    });

    exampleSelect.addEventListener("change", function() {
      var key = exampleSelect.value;
      exampleSelect.value = "";
      if (!key || !EXAMPLES[key]) return;
      if (hasContent() && !window.confirm("Replace the current diagram with this example?")) return;
      replaceDiagram(EXAMPLES[key](), "Example loaded.");
    });

    root.querySelector("[data-diagram-copy]").addEventListener("click", function() {
      var tikz = output.textContent;
      var task;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        task = navigator.clipboard.writeText(tikz);
      } else {
        var temporary = document.createElement("textarea");
        temporary.value = tikz;
        temporary.setAttribute("readonly", "");
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";
        document.body.appendChild(temporary);
        temporary.select();
        task = Promise.resolve(document.execCommand("copy"));
        temporary.remove();
      }
      window.clearTimeout(copyTimer);
      task.then(function() {
        copyStatus.textContent = "Copied";
        copyStatus.dataset.state = "ready";
        copyTimer = window.setTimeout(function() { copyStatus.textContent = ""; }, 1600);
      }).catch(function() {
        copyStatus.textContent = "Copy failed. Select the source and copy it manually.";
        copyStatus.dataset.state = "error";
      });
    });

    function closeImport() {
      importError.textContent = "";
      if (typeof importDialog.close === "function") importDialog.close();
      else importDialog.removeAttribute("open");
    }

    root.querySelector("[data-diagram-import-open]").addEventListener("click", function() {
      importSource.value = "";
      importError.textContent = "";
      if (typeof importDialog.showModal === "function") importDialog.showModal();
      else importDialog.setAttribute("open", "");
      importSource.focus();
    });

    root.querySelectorAll("[data-diagram-import-close]").forEach(function(button) {
      button.addEventListener("click", closeImport);
    });

    importForm.addEventListener("submit", function(event) {
      event.preventDefault();
      var result = core.parseTikz(importSource.value);
      if (!result.ok) {
        importError.textContent = result.error + (result.detail ? " " + result.detail : "");
        importError.dataset.state = "error";
        return;
      }
      closeImport();
      replaceDiagram(result.diagram, "TikZ-CD imported.");
    });

    importDialog.addEventListener("click", function(event) {
      if (event.target === importDialog) closeImport();
    });

    if (typeof ResizeObserver === "function") {
      var resizeObserver = new ResizeObserver(renderSvg);
      resizeObserver.observe(surface);
    } else {
      window.addEventListener("resize", renderSvg, {passive: true});
    }

    restoreFromUrl();
    renderAll({remember: false});
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
