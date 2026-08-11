(function() {
  "use strict";

  var DEFAULT_EXPRESSION = "sin(x)";
  var FUNCTIONS = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    sinh: Math.sinh,
    cosh: Math.cosh,
    tanh: Math.tanh,
    sqrt: Math.sqrt,
    abs: Math.abs,
    exp: Math.exp,
    log: Math.log,
    ln: Math.log,
    floor: Math.floor,
    ceil: Math.ceil,
    round: Math.round,
    sign: Math.sign
  };
  var CONSTANTS = {pi: Math.PI, e: Math.E};

  function tokenize(source) {
    if (!source.trim()) throw new Error("Enter an expression to draw.");
    if (source.length > 240) throw new Error("Keep the expression under 240 characters.");

    var tokens = [];
    var index = 0;
    while (index < source.length) {
      var rest = source.slice(index);
      var whitespace = rest.match(/^\s+/);
      if (whitespace) {
        index += whitespace[0].length;
        continue;
      }
      var number = rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i);
      if (number) {
        tokens.push({type: "number", value: Number(number[0])});
        index += number[0].length;
        continue;
      }
      var name = rest.match(/^[A-Za-z]+/);
      if (name) {
        tokens.push({type: "name", value: name[0].toLowerCase()});
        index += name[0].length;
        continue;
      }
      var character = source.charAt(index);
      if ("+-*/^()".indexOf(character) >= 0) {
        tokens.push({type: character === "(" || character === ")" ? character : "operator", value: character});
        index += 1;
        continue;
      }
      throw new Error('Unexpected character "' + character + '" at position ' + (index + 1) + ".");
    }

    var expanded = [];
    tokens.forEach(function(token) {
      var previous = expanded[expanded.length - 1];
      var previousEndsValue = previous && (previous.type === "number" || previous.type === "name" || previous.type === ")");
      var tokenStartsValue = token.type === "number" || token.type === "name" || token.type === "(";
      var isFunctionCall = previous && previous.type === "name" && FUNCTIONS[previous.value] && token.type === "(";
      if (previousEndsValue && tokenStartsValue && !isFunctionCall) {
        expanded.push({type: "operator", value: "*"});
      }
      expanded.push(token);
    });
    expanded.push({type: "eof", value: ""});
    return expanded;
  }

  function parse(source) {
    var tokens = tokenize(source);
    var position = 0;

    function current() {
      return tokens[position];
    }

    function consume(type, value) {
      var token = current();
      if (token.type !== type || (value && token.value !== value)) {
        throw new Error(value ? 'Expected "' + value + '".' : "Unexpected expression.");
      }
      position += 1;
      return token;
    }

    function parsePrimary() {
      var token = current();
      if (token.type === "number") {
        position += 1;
        return {type: "number", value: token.value};
      }
      if (token.type === "name") {
        position += 1;
        if (FUNCTIONS[token.value]) {
          consume("(", "(");
          var argument = parseAdditive();
          consume(")", ")");
          return {type: "function", name: token.value, argument: argument};
        }
        if (token.value === "x") return {type: "variable"};
        if (Object.prototype.hasOwnProperty.call(CONSTANTS, token.value)) {
          return {type: "number", value: CONSTANTS[token.value]};
        }
        throw new Error('Unknown name "' + token.value + '".');
      }
      if (token.type === "(") {
        position += 1;
        var expression = parseAdditive();
        consume(")", ")");
        return expression;
      }
      throw new Error("Expected a number, x, function, or parenthesized expression.");
    }

    function parsePower() {
      var left = parsePrimary();
      if (current().type === "operator" && current().value === "^") {
        position += 1;
        return {type: "binary", operator: "^", left: left, right: parseUnary()};
      }
      return left;
    }

    function parseUnary() {
      var token = current();
      if (token.type === "operator" && (token.value === "+" || token.value === "-")) {
        position += 1;
        return {type: "unary", operator: token.value, argument: parseUnary()};
      }
      return parsePower();
    }

    function parseMultiplicative() {
      var node = parseUnary();
      while (current().type === "operator" && (current().value === "*" || current().value === "/")) {
        var operator = current().value;
        position += 1;
        node = {type: "binary", operator: operator, left: node, right: parseUnary()};
      }
      return node;
    }

    function parseAdditive() {
      var node = parseMultiplicative();
      while (current().type === "operator" && (current().value === "+" || current().value === "-")) {
        var operator = current().value;
        position += 1;
        node = {type: "binary", operator: operator, left: node, right: parseMultiplicative()};
      }
      return node;
    }

    var tree = parseAdditive();
    if (current().type !== "eof") throw new Error('Unexpected token "' + current().value + '".');
    return tree;
  }

  function evaluate(node, x) {
    if (node.type === "number") return node.value;
    if (node.type === "variable") return x;
    if (node.type === "function") return FUNCTIONS[node.name](evaluate(node.argument, x));
    if (node.type === "unary") {
      var unaryValue = evaluate(node.argument, x);
      return node.operator === "-" ? -unaryValue : unaryValue;
    }
    var left = evaluate(node.left, x);
    var right = evaluate(node.right, x);
    if (node.operator === "+") return left + right;
    if (node.operator === "-") return left - right;
    if (node.operator === "*") return left * right;
    if (node.operator === "/") return left / right;
    return Math.pow(left, right);
  }

  function niceStep(span) {
    var rough = span / 8;
    var power = Math.pow(10, Math.floor(Math.log10(rough || 1)));
    var fraction = rough / power;
    var nice = fraction < 1.5 ? 1 : fraction < 3.5 ? 2 : fraction < 7.5 ? 5 : 10;
    return nice * power;
  }

  function init() {
    var root = document.getElementById("zdd-function-plotter");
    if (!root || root.dataset.zddReady === "1") return;
    root.dataset.zddReady = "1";

    var form = root.querySelector("[data-plot-form]");
    var input = root.querySelector("#zdd-plot-expression");
    var rangeInput = root.querySelector("#zdd-plot-range");
    var rangeOutput = root.querySelector("[data-plot-range-output]");
    var resetButton = root.querySelector("[data-plot-reset]");
    var canvas = root.querySelector("[data-plot-canvas]");
    var stage = canvas.parentElement;
    var status = root.querySelector("#zdd-plot-status");
    var summary = root.querySelector("[data-plot-summary]");
    var resizeTimer = 0;

    function setStatus(message, state) {
      status.textContent = message || "";
      status.dataset.state = state || "ready";
    }

    function rememberExpression(expression) {
      if (!window.history || !window.history.replaceState || expression.length > 800) return;
      var url = new URL(window.location.href);
      if (expression && expression !== DEFAULT_EXPRESSION) url.searchParams.set("expression", expression);
      else url.searchParams.delete("expression");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }

    function canvasSize() {
      var width = Math.max(280, Math.round(stage.clientWidth));
      var height = Math.max(260, Math.min(480, Math.round(width * 0.53)));
      var scale = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      canvas.style.height = height + "px";
      var context = canvas.getContext("2d");
      context.setTransform(scale, 0, 0, scale, 0, 0);
      return {context: context, width: width, height: height};
    }

    function drawGrid(context, width, height, xMin, xMax, yMin, yMax) {
      var styles = getComputedStyle(document.body);
      var line = styles.getPropertyValue("--zdd-playground-line").trim() || "rgba(94, 159, 199, .42)";
      var muted = styles.getPropertyValue("--zdd-playground-muted").trim() || "#4a6a78";
      var xToPixel = function(value) { return (value - xMin) / (xMax - xMin) * width; };
      var yToPixel = function(value) { return height - (value - yMin) / (yMax - yMin) * height; };
      var xStep = niceStep(xMax - xMin);
      var yStep = niceStep(yMax - yMin);

      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;
      context.strokeStyle = line;
      context.fillStyle = muted;
      context.font = "11px sans-serif";

      for (var xTick = Math.ceil(xMin / xStep) * xStep; xTick <= xMax; xTick += xStep) {
        var xPixel = xToPixel(xTick);
        context.beginPath();
        context.moveTo(xPixel, 0);
        context.lineTo(xPixel, height);
        context.stroke();
        if (Math.abs(xTick) > xStep / 10) context.fillText(Number(xTick.toPrecision(4)), xPixel + 4, yToPixel(0) - 5);
      }
      for (var yTick = Math.ceil(yMin / yStep) * yStep; yTick <= yMax; yTick += yStep) {
        var yPixel = yToPixel(yTick);
        context.beginPath();
        context.moveTo(0, yPixel);
        context.lineTo(width, yPixel);
        context.stroke();
        if (Math.abs(yTick) > yStep / 10) context.fillText(Number(yTick.toPrecision(4)), xToPixel(0) + 5, yPixel - 4);
      }

      context.strokeStyle = muted;
      context.lineWidth = 1.4;
      if (xMin <= 0 && xMax >= 0) {
        context.beginPath();
        context.moveTo(xToPixel(0), 0);
        context.lineTo(xToPixel(0), height);
        context.stroke();
      }
      if (yMin <= 0 && yMax >= 0) {
        context.beginPath();
        context.moveTo(0, yToPixel(0));
        context.lineTo(width, yToPixel(0));
        context.stroke();
      }
    }

    function draw() {
      var source = input.value.trim();
      var range = Number(rangeInput.value) || 10;
      rangeOutput.value = "±" + range;
      rememberExpression(source);

      try {
        var tree = parse(source);
        var size = canvasSize();
        var samples = [];
        var sampleCount = Math.max(360, Math.round(size.width * 1.2));
        for (var index = 0; index <= sampleCount; index += 1) {
          var x = -range + (index / sampleCount) * range * 2;
          var y = evaluate(tree, x);
          samples.push({x: x, y: Number.isFinite(y) ? y : null});
        }
        var finite = samples.filter(function(point) { return point.y !== null && Math.abs(point.y) < 1e8; });
        if (!finite.length) throw new Error("The expression has no finite values in this range.");

        var values = finite.map(function(point) { return point.y; }).sort(function(a, b) { return a - b; });
        var low = values[Math.floor(values.length * 0.02)];
        var high = values[Math.floor(values.length * 0.98)];
        var yMin = Math.min(0, low);
        var yMax = Math.max(0, high);
        if (Math.abs(yMax - yMin) < 1e-9) {
          yMin -= 1;
          yMax += 1;
        } else {
          var padding = (yMax - yMin) * 0.1;
          yMin -= padding;
          yMax += padding;
        }

        drawGrid(size.context, size.width, size.height, -range, range, yMin, yMax);
        var xToPixel = function(value) { return (value + range) / (range * 2) * size.width; };
        var yToPixel = function(value) { return size.height - (value - yMin) / (yMax - yMin) * size.height; };
        var accent = getComputedStyle(document.body).getPropertyValue("--zdd-playground-accent").trim() || "#2e7491";
        size.context.strokeStyle = accent;
        size.context.lineWidth = 2;
        size.context.lineJoin = "round";
        size.context.beginPath();
        var drawing = false;
        var previousPixel = null;
        samples.forEach(function(point) {
          if (point.y === null || point.y < yMin * 2 - yMax || point.y > yMax * 2 - yMin) {
            drawing = false;
            previousPixel = null;
            return;
          }
          var pixel = {x: xToPixel(point.x), y: yToPixel(point.y)};
          if (!drawing || (previousPixel && Math.abs(pixel.y - previousPixel.y) > size.height * 0.7)) {
            size.context.moveTo(pixel.x, pixel.y);
            drawing = true;
          } else {
            size.context.lineTo(pixel.x, pixel.y);
          }
          previousPixel = pixel;
        });
        size.context.stroke();

        setStatus("Drawn successfully.", "ready");
        summary.textContent = "y = " + source + " on [−" + range + ", " + range + "]";
      } catch (error) {
        var sizeOnError = canvasSize();
        sizeOnError.context.clearRect(0, 0, sizeOnError.width, sizeOnError.height);
        setStatus(error && error.message ? error.message : "Unable to parse this expression.", "error");
        summary.textContent = "The plot is unavailable until the expression is valid.";
      }
    }

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      draw();
    });
    rangeInput.addEventListener("input", draw);
    resetButton.addEventListener("click", function() {
      input.value = DEFAULT_EXPRESSION;
      rangeInput.value = "10";
      draw();
      input.focus();
    });
    root.querySelectorAll("[data-expression]").forEach(function(button) {
      button.addEventListener("click", function() {
        input.value = button.getAttribute("data-expression") || DEFAULT_EXPRESSION;
        draw();
        input.focus();
      });
    });
    window.addEventListener("resize", function() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(draw, 100);
    });

    var expressionFromUrl = new URLSearchParams(window.location.search).get("expression");
    if (expressionFromUrl) input.value = expressionFromUrl;
    draw();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
