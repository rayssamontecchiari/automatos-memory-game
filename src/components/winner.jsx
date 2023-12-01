import { Link } from "react-router-dom";

const Winner = (onClick) => {
  return (
    <div className="App">
      <div className="winner">
        <h3 className="title">Você Ganhou!</h3>
        <Link to="/automatos-jogo-memoria/"><button className="button">
          Reiniciar jogo
        </button></Link>
      </div>
    </div>
      
  );
};

export default Winner;
