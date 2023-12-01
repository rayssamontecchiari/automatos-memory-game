import GameAnimals from "./components/gameanimals";
import GameGames from "./components/gamegames";
import GameHero from "./components/gamehero";
import SelectTheme from "./components/select-theme";
import "./styles/App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<SelectTheme/>} />
          <Route exact path="/game" element={<GameGames/>} />
          <Route exact path="/hero" element={<GameHero/>} />
          <Route exact path="/animals" element={<GameAnimals/>} />
        </Routes>
      </Router>
  );
}

export default App;
