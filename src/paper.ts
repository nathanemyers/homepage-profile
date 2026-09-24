// Wraps an SVG filter in a tile that can be used as a CSS background layer
const svgTexture = (size: number, filter: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><filter id='f' x='0' y='0' width='100%' height='100%'>${filter}</filter><rect width='100%' height='100%' filter='url(#f)'/></svg>`,
  )}")`

// Paper tooth: fine noise lit from the top-left so the surface looks bumpy.
// Shadowed pits become translucent brown; lit peaks stay clear.
const PAPER_TOOTH = svgTexture(
  220,
  `<feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/>
   <feDiffuseLighting surfaceScale='1.2' lighting-color='#fff'><feDistantLight azimuth='225' elevation='55'/></feDiffuseLighting>
   <feColorMatrix values='0 0 0 0 0.32  0 0 0 0 0.27  0 0 0 0 0.2  -0.45 0 0 0 0.4'/>`,
)

// Cloudy variation in pulp density, visible only as faint mottling
const PAPER_MOTTLE = svgTexture(
  480,
  `<feTurbulence type='fractalNoise' baseFrequency='0.008' numOctaves='3' seed='7' stitchTiles='stitch'/>
   <feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.25  0 0 0 -0.25 0.14'/>`,
)

// Short, sparse fibers embedded in the stock
const PAPER_FIBERS = svgTexture(
  300,
  `<feTurbulence type='fractalNoise' baseFrequency='0.03 0.45' numOctaves='2' seed='3' stitchTiles='stitch'/>
    <feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.34  0 0 0 0 0.24  0 0 0 1 0'/>
    <feComponentTransfer><feFuncA type='table' tableValues='0 0 0 0 0 0 0 0 0 0 0.05 0.12 0.2 0.28 0.3 0.3'/></feComponentTransfer>`,
)

export const INK = "#2b2a26"
export const INK_MUTED = "#6b665b"

// Full card-stock background: texture layers over a warm off-white base
export const PAPER_BACKGROUND = `${PAPER_TOOTH}, ${PAPER_FIBERS}, ${PAPER_MOTTLE},
  linear-gradient(170deg, #fcf9f2 0%, #f3eee2 100%)`

export const SERIF_FONT = `"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif`
