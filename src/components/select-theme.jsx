import { Link } from "react-router-dom";
import cerebro from "../components/assets/cerebro.gif"

const SelectTheme = (onClick) => {

  return (
    <div className="App">
      <h1 className="App-title">Jogo da memória</h1>
        <div className="select-theme">
          <img className="gif" src={cerebro} alt="cerebro" />
          <h3 className="title-theme">Escolha seu tema!</h3>
          
          <Link to="/animals"><button className="button-theme">Caes e Gatos</button></Link>
          <Link to="/hero"><button className="button-theme">Super Heróis</button></Link>
          <Link to="/game"><button className="button-theme">Games Retrô</button></Link>
        </div>
    </div>
  );
};

export default SelectTheme;
