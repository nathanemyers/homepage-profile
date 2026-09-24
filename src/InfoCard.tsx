import styled from "styled-components"
import { BACKGROUND_COLOR } from "./colors"
import profilePhoto from "./assets/profile.jpeg"

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

const INK = "#2b2a26"
const INK_MUTED = "#6b665b"

const Card = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 3.5 / 2;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr auto;
  column-gap: 1.25rem;
  padding: 1.75rem 1.75rem 1.25rem;
  border-radius: 3px;
  color: ${INK};
  font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  background:
    ${PAPER_TOOTH}, ${PAPER_FIBERS}, ${PAPER_MOTTLE},
    linear-gradient(170deg, #fcf9f2 0%, #f3eee2 100%);
`

// Slight curl at the bottom-right corner, lifting it off the surface
const Curl = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 0 0 3px 0;
  background: linear-gradient(
    315deg,
    rgba(0, 0, 0, 0.06) 0%,
    rgba(255, 255, 255, 0) 45%
  );
  pointer-events: none;
`

const Identity = styled.div`
  grid-column: 1;
  grid-row: 2;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const Label = styled.span`
  font-family: system-ui, sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${INK_MUTED};
`

// Letterpress effect: dark ink with a light highlight just below
const Name = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 5vw, 2.1rem);
  font-weight: 700;
  line-height: 1.1;
  color: ${INK};
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8),
    0 -1px 0 rgba(0, 0, 0, 0.15);
`

const Tagline = styled.p`
  margin: 0;
  font-size: clamp(0.85rem, 2.6vw, 1rem);
  font-style: italic;
  color: ${INK_MUTED};
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
`

const Rule = styled.hr`
  width: 3rem;
  margin: 0.4rem 0 0;
  border: none;
  height: 2px;
  background: ${BACKGROUND_COLOR};
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
`

// Photo printed directly onto the card, with a thin keyline border
const PhotoMount = styled.div`
  grid-column: 2;
  grid-row: 1 / span 3;
  align-self: center;
  width: clamp(5.5rem, 22vw, 8rem);
  aspect-ratio: 3 / 4;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  overflow: hidden;
`

const Photo = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
`

const Links = styled.div`
  grid-column: 1;
  grid-row: 3;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.25rem;
`

// Printed in the accent ink, like contact lines on a card
const Link = styled.a`
  font-family: system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${BACKGROUND_COLOR};
  border-bottom: 1px solid transparent;
  transition: border-color 150ms ease;

  &:hover {
    border-color: currentColor;
  }

  &:focus-visible {
    outline: 2px solid ${BACKGROUND_COLOR};
    outline-offset: 2px;
  }
`

interface InfoCardProps {
  className?: string
}

export default function InfoCard(props: InfoCardProps) {
  return (
    <Card className={props.className}>
      <Curl />
      <Identity>
        <Label>Software Engineer</Label>
        <Name>Nathan Myers</Name>
        <Tagline>Chicago, Illinois</Tagline>
        <Rule />
      </Identity>
      <PhotoMount>
        <Photo src={profilePhoto} alt="Nathan Myers" />
      </PhotoMount>
      <Links>
        <Link
          href="https://github.com/nathanemyers"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/nathan-myers-173a9719/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </Link>
      </Links>
    </Card>
  )
}
