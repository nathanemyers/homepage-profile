import styled from "styled-components"
import GameOfLife from "./GameOfLife"
import { BACKGROUND_COLOR } from "./colors"
import InfoCard from "./InfoCard"
import Resume from "./Resume"

const AppContainer = styled.div`
  background-color: ${BACKGROUND_COLOR};
  min-height: 100vh;
`

const Container = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr min(520px, calc(100vw - 2rem)) 1fr;
  grid-template-rows: 20vh 1fr;
  min-height: 100vh;
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
`

// Pulled up so its top edge lands 70% down the initial viewport,
// overlapping the tail end of the hero section.
const ResumeWrapper = styled.div`
  position: relative;
  margin-top: -30vh;
  display: flex;
  justify-content: center;
  padding: 0 1rem 4rem;
  z-index: 1;
`

const StyledResume = styled(Resume)`
  pointer-events: auto;
`

function App() {
  return (
    <AppContainer>
      <StyledGameOfLife />
      <Container>
        <StyledInfoCard />
      </Container>
      <ResumeWrapper>
        <StyledResume />
      </ResumeWrapper>
    </AppContainer>
  )
}

export default App
