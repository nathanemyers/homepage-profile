import { afterEach, describe, expect, it, vi } from "vitest"
import { isMobile } from "./utils"

function stubWindow(innerWidth: number, touch: boolean) {
  vi.stubGlobal(
    "window",
    touch ? { innerWidth, ontouchstart: null } : { innerWidth },
  )
}

describe("isMobile", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("is true for narrow screens", () => {
    stubWindow(400, false)
    expect(isMobile()).toBe(true)
  })

  it("is false for wide non-touch screens", () => {
    stubWindow(800, false)
    expect(isMobile()).toBe(false)
  })

  it("is true for mid-width touch screens", () => {
    stubWindow(800, true)
    expect(isMobile()).toBe(true)
  })

  it("is false for wide touch screens", () => {
    stubWindow(1200, true)
    expect(isMobile()).toBe(false)
  })
})
