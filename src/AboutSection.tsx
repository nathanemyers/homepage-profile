import styled from "styled-components"
import { BACKGROUND_COLOR } from "./colors"
import { INK, INK_MUTED, PAPER_BACKGROUND, SERIF_FONT } from "./paper"

// A letter-sized sheet of the same stock as the business card
const Sheet = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: clamp(1.75rem, 6vw, 3.5rem);
  border-radius: 2px;
  color: ${INK};
  font-family: ${SERIF_FONT};
  background: ${PAPER_BACKGROUND};
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 1px 1px rgba(0, 0, 0, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.16);
  transform: rotate(0.4deg);
`

// Printed letterhead rule across the top of the sheet
const Letterhead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 0.75rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${BACKGROUND_COLOR};
  font-family: system-ui, sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${INK_MUTED};
`

const Heading = styled.h2`
  margin: 0 0 1rem;
  font-size: clamp(1.5rem, 4vw, 1.9rem);
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
`

const Subheading = styled.h3`
  margin: 2.5rem 0 1rem;
  font-family: system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${BACKGROUND_COLOR};
`

const Body = styled.p`
  margin: 0 0 1rem;
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 38em;
`

const Interests = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 1.25rem 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Interest = styled.li`
  padding-left: 0.9rem;
  border-left: 2px solid rgba(0, 0, 0, 0.12);
`

const InterestName = styled.span`
  display: block;
  font-weight: 700;
  margin-bottom: 0.2rem;
`

const InterestDetail = styled.span`
  display: block;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${INK_MUTED};
`

const INTERESTS = [
  {
    name: "Film Photography",
    detail: "A sentence about why this interests you.",
  },
  { name: "Hiking", detail: "A sentence about why this interests you." },
  {
    name: "Gardening",
    detail: "A sentence about why this interests you.",
  },
  { name: "Gaming", detail: "A sentence about why this interests you." },
]

interface AboutSectionProps {
  className?: string
}

export default function AboutSection(props: AboutSectionProps) {
  return (
    <Sheet className={props.className} aria-labelledby="about-heading">
      <Letterhead>
        <span>Nathan Myers</span>
        <span>About</span>
      </Letterhead>
      <Heading id="about-heading">Hi, I'm Nathan.</Heading>
      <Body>
        I'm a long time software engineer who has worked small teams, big teams,
        backend, and frontend. I first got interested in programming by making
        custom Starcraft maps for my friends, and it's been a lot of fun ever
        since.
      </Body>
      <Body>
        I'm the type of person who loves to come into the office and get to know
        my coworkers. My favorite types of work is anything that helps people
        make their life easier, like data visualizations, delightful user
        interfaces, or tools that remove pain points. I'm a big believer in Test
        Driven Development (TDD), giving positive constructive feedback on PRs,
        and architecting clean solutions to tricky problems.
      </Body>
      <Subheading>Interests</Subheading>
      <Interests>
        {INTERESTS.map((interest) => (
          <Interest key={interest.name}>
            <InterestName>{interest.name}</InterestName>
            <InterestDetail>{interest.detail}</InterestDetail>
          </Interest>
        ))}
      </Interests>
    </Sheet>
  )
}
