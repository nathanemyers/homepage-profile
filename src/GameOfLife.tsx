import { useEffect, useRef } from "react";
import styled from "styled-components";
import { isMobile } from "./utils";
import { CELL_COLOR_NEW, CELL_COLOR_MID, CELL_COLOR_OLD } from "./colors";

const Canvas = styled.canvas`
  touch-action: none;
`;

const CELL_SIZE_DESKTOP = 15;
const CELL_SIZE_MOBILE = 16;
// how often the simulation advances
const GEN_INTERVAL_MS = 130;
// used to fade cell color as they survive
const MAX_AGE = 10;
// per-cell chance per tick of a "cosmic ray" birth when population is low
const SPARK_CHANCE = 0.00055;
// if live fraction drops below this, sparks kick in
const LOW_POP_FRACTION = 0.012;

export default function GameOfLife(props: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return startGameOfLife(canvas);
  }, []);

  return <Canvas ref={canvasRef} className={props.className} />;
}

function lerpColor(hexA: string, hexB: string, t: number): string {
  const a = parseInt(hexA.slice(1), 16);
  const b = parseInt(hexB.slice(1), 16);
  const ar = (a >> 16) & 255,
    ag = (a >> 8) & 255,
    ab = a & 255;
  const br = (b >> 16) & 255,
    bg = (b >> 8) & 255,
    bb = b & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return "rgb(" + r + "," + g + "," + bl + ")";
}

// Sets up the simulation on the given canvas and returns a cleanup function.
function startGameOfLife(canvas: HTMLCanvasElement): () => void {
  const context = canvas.getContext("2d");
  if (!context) return () => {};
  const ctx: CanvasRenderingContext2D = context;

  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  let cellSize = 0;
  let cols = 0;
  let rows = 0;
  let cssW = 0;
  let cssH = 0;
  let current = new Uint8Array(0); // Uint8Array grids
  let age = new Uint8Array(0);
  let lastStepTime = 0;
  let pointerDown = false;
  let frameId = 0;
  let resizeTimer: ReturnType<typeof setTimeout> | undefined;
  let orientationTimer: ReturnType<typeof setTimeout> | undefined;

  function idx(x: number, y: number): number {
    return y * cols + x;
  }

  function computeGrid(): void {
    cssW = window.innerWidth;
    cssH = window.innerHeight;
    cellSize = isMobile() ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP;
    cols = Math.max(4, Math.ceil(cssW / cellSize));
    rows = Math.max(4, Math.ceil(cssH / cellSize));
  }

  function resizeCanvas(preserve: boolean): void {
    const oldCols = cols;
    const oldCurrent = current;
    const oldAge = age;
    computeGrid();

    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const newCurrent = new Uint8Array(cols * rows);
    const newAge = new Uint8Array(cols * rows);

    if (preserve && oldCurrent.length > 0) {
      const oldRows = oldCurrent.length / oldCols;
      const copyCols = Math.min(oldCols, cols);
      const copyRows = Math.min(oldRows, rows);
      for (let y = 0; y < copyRows; y++) {
        for (let x = 0; x < copyCols; x++) {
          const oi = y * oldCols + x;
          const ni = y * cols + x;
          newCurrent[ni] = oldCurrent[oi];
          newAge[ni] = oldAge[oi];
        }
      }
    }

    current = newCurrent;
    age = newAge;
  }

  function seedRandom(density: number): void {
    for (let i = 0; i < current.length; i++) {
      if (Math.random() < density) {
        current[i] = 1;
        age[i] = 1;
      }
    }
  }

  function countLiveNeighbors(x: number, y: number): number {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = (x + dx + cols) % cols;
        const ny = (y + dy + rows) % rows;
        count += current[idx(nx, ny)];
      }
    }
    return count;
  }

  function step(): void {
    const next = new Uint8Array(cols * rows);
    const nextAge = new Uint8Array(cols * rows);
    let liveCount = 0;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = idx(x, y);
        const n = countLiveNeighbors(x, y);
        const alive = current[i] === 1;
        const born = !alive && n === 3;
        const survives = alive && (n === 2 || n === 3);

        if (born || survives) {
          next[i] = 1;
          nextAge[i] = born ? 1 : Math.min(MAX_AGE, age[i] + 1);
          liveCount++;
        }
      }
    }

    // Ambient "cosmic ray" sparks so the field never stays permanently dark
    const fraction = liveCount / (cols * rows);
    if (fraction < LOW_POP_FRACTION) {
      for (let j = 0; j < next.length; j++) {
        if (next[j] === 0 && Math.random() < SPARK_CHANCE) {
          next[j] = 1;
          nextAge[j] = 1;
        }
      }
    }

    current = next;
    age = nextAge;
  }

  function draw(): void {

    ctx.clearRect(0, 0, cssW, cssH);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = idx(x, y);
        if (!current[i]) continue;
        const a = age[i];
        const t = Math.min(1, a / MAX_AGE);
        const color =
          t < 0.5
            ? lerpColor(CELL_COLOR_NEW, CELL_COLOR_MID, t * 2)
            : lerpColor(CELL_COLOR_MID, CELL_COLOR_OLD, (t - 0.5) * 2);
        ctx.fillStyle = color;
        const px = x * cellSize;
        const py = y * cellSize;
        const size = cellSize - 1.4;
        ctx.fillRect(px + 0.7, py + 0.7, size, size);
      }
    }
  }

  function loop(ts: number): void {
    if (!lastStepTime) lastStepTime = ts;
    if (ts - lastStepTime >= GEN_INTERVAL_MS) {
      step();
      lastStepTime = ts;
    }
    draw();
    frameId = requestAnimationFrame(loop);
  }

  // ---- Pointer painting ----
  function setCellFromEvent(clientX: number, clientY: number): void {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((clientX - rect.left) / cellSize);
    const y = Math.floor((clientY - rect.top) / cellSize);
    if (x < 0 || y < 0 || x >= cols || y >= rows) return;
    const i = idx(x, y);
    current[i] = 1;
    age[i] = 1;
  }

  function onPointerDown(e: PointerEvent): void {
    pointerDown = true;
    setCellFromEvent(e.clientX, e.clientY);
    canvas.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: PointerEvent): void {
    if (!pointerDown) return;
    setCellFromEvent(e.clientX, e.clientY);
  }

  function onPointerEnd(): void {
    pointerDown = false;
  }

  // ---- Resize ----
  function onResize(): void {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas(true);
    }, 120);
  }

  function onOrientationChange(): void {
    clearTimeout(orientationTimer);
    orientationTimer = setTimeout(() => {
      resizeCanvas(true);
    }, 200);
  }

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerEnd);
  window.addEventListener("pointercancel", onPointerEnd);
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", onOrientationChange);

  // ---- Init ----
  resizeCanvas(false);
  seedRandom(0.14);
  frameId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(frameId);
    clearTimeout(resizeTimer);
    clearTimeout(orientationTimer);
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerEnd);
    window.removeEventListener("pointercancel", onPointerEnd);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onOrientationChange);
  };
}
