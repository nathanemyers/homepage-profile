import { describe, expect, it } from "vitest"
import {
  BACKGROUND_COLOR,
  CELL_COLOR_MID,
  CELL_COLOR_NEW,
  CELL_COLOR_OLD,
  TEXT_COLOR,
} from "./colors"

describe("colors", () => {
  it("exports every color as a 6-digit hex string", () => {
    for (const color of [
      CELL_COLOR_NEW,
      CELL_COLOR_MID,
      CELL_COLOR_OLD,
      BACKGROUND_COLOR,
      TEXT_COLOR,
    ]) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })
})
