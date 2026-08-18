(function() {
  "use strict";

  var script = document.currentScript || document.querySelector('script[src*="interactive-widgets.js"]');
  var moduleBase = script && script.src
    ? new URL("widgets/", script.src)
    : new URL("/javascripts/widgets/", window.location.origin);
  var modules = {
    "fourier-series": "fourier-series.js"
  };
  var imports = {};
  var idCounter = 0;

  function element(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function createFrame(root, options) {
    var settings = options || {};
    root.textContent = "";
    root.classList.add("zdd-interactive-frame");

    var header = element("header", "zdd-interactive-header");
    var heading = element("h2", "zdd-interactive-title", settings.title || "Interactive demo");
    var description = element("p", "zdd-interactive-description", settings.description || "");
    header.appendChild(heading);
    if (settings.description) header.appendChild(description);

    var controls = element("div", "zdd-interactive-controls");
    controls.setAttribute("aria-label", settings.controlsLabel || "Interactive controls");
    var visualization = element("div", "zdd-interactive-visualization");
    var status = element("p", "zdd-interactive-status");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    root.appendChild(header);
    root.appendChild(controls);
    root.appendChild(visualization);
    root.appendChild(status);
    return {
      root: root,
      header: header,
      controls: controls,
      visualization: visualization,
      status: status
    };
  }

  function createControlRow(parent) {
    var row = element("div", "zdd-interactive-control-row");
    parent.appendChild(row);
    return row;
  }

  function createSlider(parent, options) {
    var settings = options || {};
    var id = settings.id || "zdd-widget-slider-" + (++idCounter);
    var wrapper = element("label", "zdd-interactive-slider");
    wrapper.setAttribute("for", id);
    var label = element("span", "zdd-interactive-control-label", settings.label || "Value");
    var input = document.createElement("input");
    input.type = "range";
    input.id = id;
    input.min = String(settings.min === undefined ? 0 : settings.min);
    input.max = String(settings.max === undefined ? 100 : settings.max);
    input.step = String(settings.step === undefined ? 1 : settings.step);
    input.value = String(settings.value === undefined ? input.min : settings.value);
    var output = element("output", "zdd-interactive-control-value", input.value);
    output.setAttribute("for", id);
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(output);
    parent.appendChild(wrapper);
    return {root: wrapper, input: input, output: output};
  }

  function createResetButton(parent, onReset) {
    var button = element("button", "zdd-interactive-reset", "Reset");
    button.type = "button";
    button.addEventListener("click", onReset);
    parent.appendChild(button);
    return button;
  }

  function createCanvas(parent, options) {
    var settings = options || {};
    var canvas = document.createElement("canvas");
    canvas.className = "zdd-interactive-canvas";
    canvas.width = settings.width || 900;
    canvas.height = settings.height || 440;
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", settings.label || "Interactive visualization");
    parent.appendChild(canvas);
    return canvas;
  }

  function setStatus(frame, message, state) {
    frame.status.textContent = message || "";
    frame.status.dataset.state = state || "ready";
  }

  var api = {
    createFrame: createFrame,
    createControlRow: createControlRow,
    createSlider: createSlider,
    createResetButton: createResetButton,
    createCanvas: createCanvas,
    setStatus: setStatus
  };

  function loadWidget(name) {
    if (!modules[name]) return Promise.reject(new Error('Unknown widget "' + name + '".'));
    if (!imports[name]) imports[name] = import(new URL(modules[name], moduleBase).href);
    return imports[name];
  }

  function showMountError(root, error) {
    root.textContent = "";
    root.classList.add("zdd-interactive-frame", "zdd-interactive-error");
    var message = element("p", "", error && error.message ? error.message : "This interactive demo could not be loaded.");
    message.setAttribute("role", "status");
    root.appendChild(message);
  }

  function scan(scope) {
    (scope || document).querySelectorAll("[data-zdd-widget]").forEach(function(root) {
      if (root.dataset.zddWidgetState) return;
      var name = root.getAttribute("data-zdd-widget") || "";
      root.dataset.zddWidgetState = "loading";
      root.setAttribute("aria-busy", "true");
      loadWidget(name).then(function(widgetModule) {
        if (!widgetModule || typeof widgetModule.mount !== "function") {
          throw new Error('Widget module "' + name + '" has no mount function.');
        }
        widgetModule.mount(root, api);
        root.dataset.zddWidgetState = "ready";
        root.removeAttribute("aria-busy");
      }).catch(function(error) {
        root.dataset.zddWidgetState = "error";
        root.removeAttribute("aria-busy");
        showMountError(root, error);
      });
    });
  }

  window.zddInteractiveWidgets = {
    scan: scan,
    ui: api
  };

  if (window.document$ && document$.subscribe) document$.subscribe(scan);
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function() { scan(document); });
  else scan(document);
})();
