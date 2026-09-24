import styled from "styled-components"
import GameOfLife from "./GameOfLife"
import { BACKGROUND_COLOR } from "./colors"
import InfoCard from "./InfoCard"

const AppContainer = styled.div`
  background-color: ${BACKGROUND_COLOR};
  min-height: 100vh;
`

const Container = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr min(520px, calc(100vw - 2rem)) 1fr;
  grid-template-rows: 20vh 1fr;
  z-index: 1;
  pointer-events: none;
`

const StyledGameOfLife = styled(GameOfLife)`
  top: 0;
  position: fixed;
`

const StyledInfoCard = styled(InfoCard)`
  grid-column: 2;
  grid-row: 2;
  pointer-events: auto;

  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 1px 1px rgba(0, 0, 0, 0.15),
    0 3px 6px rgba(0, 0, 0, 0.12),
    0 12px 24px rgba(0, 0, 0, 0.16);
  transform: rotate(-1.5deg);
  transition:
    transform 250ms ease,
    box-shadow 250ms ease;

  &:hover {
    transform: rotate(0deg) translateY(-4px);
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.04),
      0 2px 2px rgba(0, 0, 0, 0.12),
      0 8px 14px rgba(0, 0, 0, 0.12),
      0 20px 36px rgba(0, 0, 0, 0.18);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

function App() {
  return (
    <AppContainer>
      <StyledGameOfLife />
      <Container>
        <StyledInfoCard />
      </Container>
    </AppContainer>
  )
}

export default App
