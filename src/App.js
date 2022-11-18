import "./App.css";
import { ThemeProvider } from "./ThemeContext";
import Game from "./components/Game";

function App() {
  return (
    <ThemeProvider>
      <Game />
    </ThemeProvider>
  );
}

export default App;
