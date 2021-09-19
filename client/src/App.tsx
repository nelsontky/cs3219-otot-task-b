import { CssBaseline, Container } from "@mui/material";
import Demo from "./components/Demo";

function App() {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Demo />
      </Container>
    </>
  );
}

export default App;
