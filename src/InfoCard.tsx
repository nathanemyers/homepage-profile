import styled from "styled-components"
import { BACKGROUND_COLOR } from "./colors"
import { INK, INK_MUTED, PAPER_BACKGROUND, SERIF_FONT } from "./paper"
import profilePhoto from "./assets/profile.jpeg"

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
  font-family: ${SERIF_FONT};
  background: ${PAPER_BACKGROUND};
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
