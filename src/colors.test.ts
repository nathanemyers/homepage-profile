import { describe, expect, it } from "vitest"
import { CELL_COLOR_NEW, CELL_COLOR_MID, CELL_COLOR_OLD } from "./colors"

describe("colors", () => {
  it("should have color values", () => {
    expect(CELL_COLOR_NEW).toBeDefined()
    expect(CELL_COLOR_MID).toBeDefined()
    expect(CELL_COLOR_OLD).toBeDefined()
  })
})
