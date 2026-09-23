import styled from "styled-components";
import { TEXT_COLOR } from "./colors";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${TEXT_COLOR};
  font-family: system-ui, sans-serif;
`;

const Name = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Tagline = styled.p`
  margin: 0;
  font-size: 1.25rem;
  opacity: 0.8;
`;

interface InfoCardProps {
  className?: string;
}

export default function InfoCard(props: InfoCardProps) {
  return (
    <Card className={props.className}>
      <Name>Nathan Myers</Name>
      <Tagline>Software Engineer</Tagline>
    </Card>
  );
}
