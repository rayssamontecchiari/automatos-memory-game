const GameOver = (onClick) => {
  return (
    <div className="game-over">
      <h3 className="title">Você perdeu!</h3>
      <button className="button" onClick={onClick.onClick}>
        Reiniciar jogo
      </button>
    </div>
  );
};

export default GameOver;
