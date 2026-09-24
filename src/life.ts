export function lerpColor(hexA: string, hexB: string, t: number): string {
  const a = parseInt(hexA.slice(1), 16)
  const b = parseInt(hexB.slice(1), 16)
  const ar = (a >> 16) & 255,
    ag = (a >> 8) & 255,
    ab = a & 255
  const br = (b >> 16) & 255,
    bg = (b >> 8) & 255,
    bb = b & 255
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bl = Math.round(ab + (bb - ab) * t)
  return "rgb(" + r + "," + g + "," + bl + ")"
}

// Counts live neighbors of (x, y) on a toroidal (wrapping) grid.
export function countLiveNeighbors(
  grid: Uint8Array,
  cols: number,
  rows: number,
  x: number,
  y: number,
): number {
  let count = 0
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      const nx = (x + dx + cols) % cols
      const ny = (y + dy + rows) % rows
      count += grid[ny * cols + nx]
    }
  }
  return count
}

// Applies one generation of Conway's rules (B3/S23). Surviving cells age up
// to maxAge; newborn cells start at age 1.
export function nextGeneration(
  current: Uint8Array,
  age: Uint8Array,
  cols: number,
  rows: number,
  maxAge: number,
): {
  next: Uint8Array<ArrayBuffer>
  nextAge: Uint8Array<ArrayBuffer>
  liveCount: number
} {
  const next = new Uint8Array(cols * rows)
  const nextAge = new Uint8Array(cols * rows)
  let liveCount = 0

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x
      const n = countLiveNeighbors(current, cols, rows, x, y)
      const alive = current[i] === 1
      const born = !alive && n === 3
      const survives = alive && (n === 2 || n === 3)

      if (born || survives) {
        next[i] = 1
        nextAge[i] = born ? 1 : Math.min(maxAge, age[i] + 1)
        liveCount++
      }
    }
  }

  return { next, nextAge, liveCount }
}
