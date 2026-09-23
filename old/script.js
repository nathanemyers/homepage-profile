(function () {
  'use strict';

  var canvas = document.getElementById('life-canvas');
  var ctx = canvas.getContext('2d');
  var hint = document.getElementById('hint');

  // ---- Config ----
  var CELL_SIZE_DESKTOP = 15;
  var CELL_SIZE_MOBILE = 16;
  var GEN_INTERVAL_MS = 130;      // how often the simulation advances
  var MAX_AGE = 10;               // used to fade cell color as they survive
  var SPARK_CHANCE = 0.00055;     // per-cell chance per tick of a "cosmic ray" birth when population is low
  var LOW_POP_FRACTION = 0.012;   // if live fraction drops below this, sparks kick in

  var dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  var cellSize, cols, rows, cssW, cssH;
  var current, age; // Uint8Array grids
  var lastStepTime = 0;
  var pointerDown = false;
  var rafId = null;

  function isMobile() {
    return window.innerWidth < 640 || ('ontouchstart' in window && window.innerWidth < 900);
  }

  function idx(x, y) { return y * cols + x; }

  function computeGrid() {
    cssW = window.innerWidth;
    cssH = window.innerHeight;
    cellSize = isMobile() ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP;
    cols = Math.max(4, Math.ceil(cssW / cellSize));
    rows = Math.max(4, Math.ceil(cssH / cellSize));
  }

  function resizeCanvas(preserve) {
    var oldCols = cols, oldRows = rows, oldCurrent = current, oldAge = age;
    computeGrid();

    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var newCurrent = new Uint8Array(cols * rows);
    var newAge = new Uint8Array(cols * rows);

    if (preserve && oldCurrent) {
      var copyCols = Math.min(oldCols, cols);
      var copyRows = Math.min(oldRows, rows);
      for (var y = 0; y < copyRows; y++) {
        for (var x = 0; x < copyCols; x++) {
          var oi = y * oldCols + x;
          var ni = y * cols + x;
          newCurrent[ni] = oldCurrent[oi];
          newAge[ni] = oldAge[oi];
        }
      }
    }

    current = newCurrent;
    age = newAge;
  }

  function seedRandom(density) {
    for (var i = 0; i < current.length; i++) {
      if (Math.random() < density) {
        current[i] = 1;
        age[i] = 1;
      }
    }
  }

  function countLiveNeighbors(x, y) {
    var count = 0;
    for (var dy = -1; dy <= 1; dy++) {
      for (var dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        var nx = (x + dx + cols) % cols;
        var ny = (y + dy + rows) % rows;
        count += current[idx(nx, ny)];
      }
    }
    return count;
  }

  function step() {
    var next = new Uint8Array(cols * rows);
    var nextAge = new Uint8Array(cols * rows);
    var liveCount = 0;

    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var i = idx(x, y);
        var n = countLiveNeighbors(x, y);
        var alive = current[i] === 1;
        var born = !alive && n === 3;
        var survives = alive && (n === 2 || n === 3);

        if (born || survives) {
          next[i] = 1;
          nextAge[i] = born ? 1 : Math.min(MAX_AGE, age[i] + 1);
          liveCount++;
        }
      }
    }

    // Ambient "cosmic ray" sparks so the field never stays permanently dark
    var fraction = liveCount / (cols * rows);
    if (fraction < LOW_POP_FRACTION) {
      for (var j = 0; j < next.length; j++) {
        if (next[j] === 0 && Math.random() < SPARK_CHANCE) {
          next[j] = 1;
          nextAge[j] = 1;
        }
      }
    }

    current = next;
    age = nextAge;
  }

  function lerpColor(hexA, hexB, t) {
    var a = parseInt(hexA.slice(1), 16), b = parseInt(hexB.slice(1), 16);
    var ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
    var br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
    var r = Math.round(ar + (br - ar) * t);
    var g = Math.round(ag + (bg - ag) * t);
    var bl = Math.round(ab + (bb - ab) * t);
    return 'rgb(' + r + ',' + g + ',' + bl + ')';
  }

  function styleColor(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function draw() {
    var cNew = styleColor('--cell-new') || '#f4fff9';
    var cMid = styleColor('--cell-mid') || '#6fe7c0';
    var cOld = styleColor('--cell-old') || '#1f6b5c';

    ctx.clearRect(0, 0, cssW, cssH);

    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var i = idx(x, y);
        if (!current[i]) continue;
        var a = age[i];
        var t = Math.min(1, a / MAX_AGE);
        var color = t < 0.5
          ? lerpColor(cNew, cMid, t * 2)
          : lerpColor(cMid, cOld, (t - 0.5) * 2);
        ctx.fillStyle = color;
        var px = x * cellSize;
        var py = y * cellSize;
        var size = cellSize - 1.4;
        ctx.fillRect(px + 0.7, py + 0.7, size, size);
      }
    }
  }

  function loop(ts) {
    if (!lastStepTime) lastStepTime = ts;
    if (ts - lastStepTime >= GEN_INTERVAL_MS) {
      step();
      lastStepTime = ts;
    }
    draw();
    rafId = requestAnimationFrame(loop);
  }

  // ---- Pointer painting ----
  function setCellFromEvent(clientX, clientY) {
    var rect = canvas.getBoundingClientRect();
    var x = Math.floor((clientX - rect.left) / cellSize);
    var y = Math.floor((clientY - rect.top) / cellSize);
    if (x < 0 || y < 0 || x >= cols || y >= rows) return;
    var i = idx(x, y);
    current[i] = 1;
    age[i] = 1;
  }

  function hidePointerHint() {
    if (!hint.classList.contains('fading')) {
      hint.classList.add('fading');
      hint.classList.remove('visible');
    }
  }

  canvas.addEventListener('pointerdown', function (e) {
    pointerDown = true;
    setCellFromEvent(e.clientX, e.clientY);
    hidePointerHint();
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener('pointermove', function (e) {
    if (!pointerDown) return;
    setCellFromEvent(e.clientX, e.clientY);
  });

  window.addEventListener('pointerup', function () { pointerDown = false; });
  window.addEventListener('pointercancel', function () { pointerDown = false; });

  // ---- Resize ----
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { resizeCanvas(true); }, 120);
  });

  window.addEventListener('orientationchange', function () {
    setTimeout(function () { resizeCanvas(true); }, 200);
  });

  // ---- Init ----
  function init() {
    computeGrid();
    resizeCanvas(false);
    seedRandom(0.14);

    setTimeout(function () { hint.classList.add('visible'); }, 700);
    setTimeout(hidePointerHint, 6000);

    rafId = requestAnimationFrame(loop);
  }

  init();
})();
