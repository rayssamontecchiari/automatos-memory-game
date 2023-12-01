import { Link } from "react-router-dom";

const GameOver = (onClick) => {
  return (
    <div className="App">
      <div className="game-over">
        <h3 className="title">Você perdeu!</h3>
        <Link to="/"><button className="button" onClick={onClick.onClick}>
          Reiniciar jogo
        </button></Link>
      </div>
    </div>
  );
};

export default GameOver;
