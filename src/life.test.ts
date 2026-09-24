import { describe, expect, it } from "vitest"
import { countLiveNeighbors, lerpColor, nextGeneration } from "./life"

// Builds a grid from rows of "." (dead) and "#" (alive).
function parseGrid(pattern: string[]) {
  const rows = pattern.length
  const cols = pattern[0].length
  const grid = new Uint8Array(cols * rows)
  pattern.forEach((line, y) => {
    for (let x = 0; x < cols; x++) {
      if (line[x] === "#") grid[y * cols + x] = 1
    }
  })
  return { grid, cols, rows }
}

function renderGrid(grid: Uint8Array, cols: number): string[] {
  const lines: string[] = []
  for (let i = 0; i < grid.length; i += cols) {
    lines.push(
      Array.from(grid.subarray(i, i + cols), (c) => (c ? "#" : ".")).join(""),
    )
  }
  return lines
}

function tick(pattern: string[]): string[] {
  const { grid, cols, rows } = parseGrid(pattern)
  const { next } = nextGeneration(grid, grid.slice(), cols, rows, 10)
  return renderGrid(next, cols)
}

describe("lerpColor", () => {
  it("returns the start color at t=0", () => {
    expect(lerpColor("#000000", "#ffffff", 0)).toBe("rgb(0,0,0)")
  })

  it("returns the end color at t=1", () => {
    expect(lerpColor("#000000", "#ffffff", 1)).toBe("rgb(255,255,255)")
  })

  it("interpolates each channel independently", () => {
    expect(lerpColor("#ff0000", "#0000ff", 0.5)).toBe("rgb(128,0,128)")
  })
})

describe("countLiveNeighbors", () => {
  it("counts all eight neighbors", () => {
    const { grid, cols, rows } = parseGrid(["###.", "#.#.", "###.", "...."])
    expect(countLiveNeighbors(grid, cols, rows, 1, 1)).toBe(8)
  })

  it("does not count the cell itself", () => {
    const { grid, cols, rows } = parseGrid(["....", ".#..", "....", "...."])
    expect(countLiveNeighbors(grid, cols, rows, 1, 1)).toBe(0)
  })

  it("wraps around the grid edges", () => {
    const { grid, cols, rows } = parseGrid(["...#", "....", "....", "#..#"])
    expect(countLiveNeighbors(grid, cols, rows, 0, 0)).toBe(3)
  })
})

describe("nextGeneration", () => {
  it("keeps a block still life unchanged", () => {
    const block = ["....", ".##.", ".##.", "...."]
    expect(tick(block)).toEqual(block)
  })

  it("oscillates a blinker", () => {
    const horizontal = [".....", ".....", ".###.", ".....", "....."]
    const vertical = [".....", "..#..", "..#..", "..#..", "....."]
    expect(tick(horizontal)).toEqual(vertical)
    expect(tick(vertical)).toEqual(horizontal)
  })

  it("kills a lonely cell", () => {
    expect(tick(["...", ".#.", "..."])).toEqual(["...", "...", "..."])
  })

  it("kills an overcrowded cell", () => {
    const { grid, cols, rows } = parseGrid([
      ".....",
      ".###.",
      ".###.",
      ".....",
      ".....",
    ])
    const { next } = nextGeneration(grid, grid.slice(), cols, rows, 10)
    expect(next[2 * cols + 2]).toBe(0)
  })

  it("reports the live cell count", () => {
    const { grid, cols, rows } = parseGrid(["....", ".##.", ".##.", "...."])
    expect(nextGeneration(grid, grid, cols, rows, 10).liveCount).toBe(4)
  })

  it("ages survivors, capped at maxAge, and starts newborns at 1", () => {
    const { grid, cols, rows } = parseGrid([
      ".....",
      ".....",
      ".###.",
      ".....",
      ".....",
    ])
    const age = new Uint8Array(cols * rows)
    age[2 * cols + 2] = 3 // center of blinker survives
    const { nextAge } = nextGeneration(grid, age, cols, rows, 3)
    expect(nextAge[2 * cols + 2]).toBe(3) // capped at maxAge
    expect(nextAge[1 * cols + 2]).toBe(1) // newborn above
    expect(nextAge[2 * cols + 1]).toBe(0) // left end died
  })
})
