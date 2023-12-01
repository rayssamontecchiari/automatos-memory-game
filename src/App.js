import GameAnimals from "./components/gameanimals";
import GameGames from "./components/gamegames";
import GameHero from "./components/gamehero";
import SelectTheme from "./components/select-theme";
import "./styles/App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/automatos-jogo-memoria/*" element={<SelectTheme />} />
      <Route path="/automatos-jogo-memoria/game" element={<GameGames />} />
      <Route path="/automatos-jogo-memoria/hero" element={<GameHero />} />
      <Route path="/automatos-jogo-memoria/animals" element={<GameAnimals />} />

      {/* Catch-all route for the root path */}
      <Route path="/*" element={<SelectTheme />} />
    </Routes>
  </Router>
  );
}

export default App;