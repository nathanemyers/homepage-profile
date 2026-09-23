import styled from "styled-components";
import GameOfLife from "./GameOfLife";
import { BACKGROUND_COLOR } from "./colors";

const Container = styled.div`
  background-color: ${BACKGROUND_COLOR};
`;

function App() {
  return (
    <Container>
      <GameOfLife />
    </Container>
  );
}

export default App;
