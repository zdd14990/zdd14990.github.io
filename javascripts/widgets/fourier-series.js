var DEFAULT_TERMS = 7;

function squareWave(x) {
  var sine = Math.sin(x);
  if (Math.abs(sine) < 1e-9) return 0;
  return sine > 0 ? 1 : -1;
}

function partialSum(x, terms) {
  var sum = 0;
  for (var index = 0; index < terms; index += 1) {
    var harmonic = index * 2 + 1;
    sum += Math.sin(harmonic * x) / harmonic;
  }
  return 4 / Math.PI * sum;
}

function resizeCanvas(canvas) {
  var width = Math.max(280, Math.round(canvas.parentElement.clientWidth));
  var height = Math.max(250, Math.min(440, Math.round(width * 0.49)));
  var scale = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  canvas.style.height = height + "px";
  var context = canvas.getContext("2d");
  context.setTransform(scale, 0, 0, scale, 0, 0);
  return {context: context, width: width, height: height};
}

function draw(canvas, terms) {
  var size = resizeCanvas(canvas);
  var styles = getComputedStyle(document.body);
  var line = styles.getPropertyValue("--zdd-playground-line").trim() || "rgba(94, 159, 199, .42)";
  var muted = styles.getPropertyValue("--zdd-playground-muted").trim() || "#4a6a78";
  var accent = styles.getPropertyValue("--zdd-playground-accent").trim() || "#2e7491";
  var target = "#b56b6b";
  var xMin = -Math.PI;
  var xMax = Math.PI;
  var yMin = -1.5;
  var yMax = 1.5;
  var xToPixel = function(value) { return (value - xMin) / (xMax - xMin) * size.width; };
  var yToPixel = function(value) { return size.height - (value - yMin) / (yMax - yMin) * size.height; };

  size.context.clearRect(0, 0, size.width, size.height);
  size.context.strokeStyle = line;
  size.context.lineWidth = 1;
  [-1, 0, 1].forEach(function(value) {
    size.context.beginPath();
    size.context.moveTo(0, yToPixel(value));
    size.context.lineTo(size.width, yToPixel(value));
    size.context.stroke();
  });
  [-Math.PI, -Math.PI / 2, 0, Math.PI / 2, Math.PI].forEach(function(value) {
    size.context.beginPath();
    size.context.moveTo(xToPixel(value), 0);
    size.context.lineTo(xToPixel(value), size.height);
    size.context.stroke();
  });

  size.context.fillStyle = muted;
  size.context.font = "11px sans-serif";
  size.context.fillText("−π", 5, yToPixel(0) - 6);
  size.context.fillText("0", xToPixel(0) + 5, yToPixel(0) - 6);
  size.context.fillText("π", size.width - 15, yToPixel(0) - 6);

  size.context.strokeStyle = target;
  size.context.lineWidth = 1.5;
  size.context.setLineDash([6, 5]);
  size.context.beginPath();
  var targetStarted = false;
  for (var targetIndex = 0; targetIndex <= size.width; targetIndex += 2) {
    var targetX = xMin + targetIndex / size.width * (xMax - xMin);
    var targetY = squareWave(targetX);
    if (!targetStarted) {
      size.context.moveTo(targetIndex, yToPixel(targetY));
      targetStarted = true;
    } else {
      size.context.lineTo(targetIndex, yToPixel(targetY));
    }
  }
  size.context.stroke();

  size.context.setLineDash([]);
  size.context.strokeStyle = accent;
  size.context.lineWidth = 2.2;
  size.context.lineJoin = "round";
  size.context.beginPath();
  for (var index = 0; index <= size.width; index += 1) {
    var x = xMin + index / size.width * (xMax - xMin);
    var y = partialSum(x, terms);
    if (index === 0) size.context.moveTo(index, yToPixel(y));
    else size.context.lineTo(index, yToPixel(y));
  }
  size.context.stroke();
  canvas.setAttribute("aria-label", "Square wave and Fourier partial sum using " + terms + " terms.");
}

export function mount(root, ui) {
  var frame = ui.createFrame(root, {
    title: "Square wave partial sums",
    description: "The dashed line is the target; the solid line is the Fourier partial sum.",
    controlsLabel: "Fourier series controls"
  });
  var row = ui.createControlRow(frame.controls);
  var slider = ui.createSlider(row, {
    label: "Number of terms",
    min: 1,
    max: 50,
    step: 1,
    value: DEFAULT_TERMS
  });
  ui.createResetButton(row, function() {
    slider.input.value = String(DEFAULT_TERMS);
    update();
    slider.input.focus();
  });

  var legend = document.createElement("div");
  legend.className = "zdd-interactive-legend";
  var targetLegend = document.createElement("span");
  targetLegend.className = "is-target";
  targetLegend.textContent = "Square wave";
  var sumLegend = document.createElement("span");
  sumLegend.className = "is-sum";
  sumLegend.textContent = "Partial sum";
  legend.appendChild(targetLegend);
  legend.appendChild(sumLegend);
  frame.visualization.appendChild(legend);
  var canvas = ui.createCanvas(frame.visualization, {
    label: "Square wave and Fourier partial sum.",
    width: 900,
    height: 440
  });

  function update() {
    var terms = Number(slider.input.value) || DEFAULT_TERMS;
    slider.output.value = String(terms);
    draw(canvas, terms);
    ui.setStatus(frame, "N = " + terms + ". The partial sum uses the first " + terms + " odd harmonics.");
  }

  slider.input.addEventListener("input", update);
  if (window.ResizeObserver) {
    var observer = new ResizeObserver(update);
    observer.observe(frame.visualization);
  } else {
    window.addEventListener("resize", update);
  }
  update();
}
