const Winner = (onClick) => {
  return (
    <div className="winner">
      <h3 className="title">Você Ganhou!</h3>
      <button className="button" onClick={onClick.onClick}>
        Reiniciar jogo
      </button>
    </div>
  );
};

export default Winner;
