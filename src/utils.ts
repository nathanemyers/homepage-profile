export function isMobile(): boolean {
  return (
    window.innerWidth < 640 ||
    ("ontouchstart" in window && window.innerWidth < 900)
  )
}
