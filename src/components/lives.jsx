import React from "react";
import life from "./assets/life.jpeg";

function Lives(props) {
  const { numeroDeImagens } = props;

  // Array com a quantidade de vezes que a imagem será renderizada
  const imagens = Array.from({ length: numeroDeImagens }, (_, index) => index);

  return (
    <div className="life-heart">
      <span> VIDAS : </span>
      {imagens.map((indice) => (
        <img key={indice} src={life} alt={"Imagem coração"} />
      ))}
    </div>
  );
}

export default Lives;
