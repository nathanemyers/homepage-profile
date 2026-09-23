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
  grid-template-columns: auto 400px auto;
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
