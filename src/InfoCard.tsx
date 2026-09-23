import styled from "styled-components"
import { TEXT_COLOR } from "./colors"

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${TEXT_COLOR};
  font-family: system-ui, sans-serif;
`

const Name = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
`

const Tagline = styled.p`
  margin: 0;
  font-size: 1.25rem;
  opacity: 0.8;
`

const Link = styled.a``

const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`

interface InfoCardProps {
  className?: string
}

export default function InfoCard(props: InfoCardProps) {
  return (
    <Card className={props.className}>
      <Name>Nathan Myers</Name>
      <Tagline>Software Engineer -- Chicago</Tagline>
      <Links>
        <Link
          href="https://github.com/nathanemyers"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
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
