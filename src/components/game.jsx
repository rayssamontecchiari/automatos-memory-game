import React, { useState, useEffect, useCallback } from "react";

import dog1 from "./assets/dog1.jpg";
import dog2 from "./assets/dog2.png";
import dog3 from "./assets/dog3.jpg";
import dog4 from "./assets/dog4.jpg";
import Lives from "../components/lives";
// import GameOver from "../components/game-over";

import "../styles/game.css"; // Estilo para as cartas

const Game = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [lives, setLives] = useState(3);

  // Função para criar a pilha (array de cartas)
  const createStack = useCallback(() => {
    const images = [dog1, dog2, dog3, dog4];
    const doubledImages = images.concat(images);
    const shuffledCards = doubledImages.sort(() => Math.random() - 0.5);

    console.log({ shuffledCards });
    return shuffledCards.map((image, index) => ({
      id: index,
      image,
      isFlipped: true, // true = imagem / false card cinza
      matched: false,
    }));
  }, []);

  const restart = useCallback(() => {
    console.log("restart");
    setLives(3);
    setCards(createStack());

    // Vire todas as cartas por 5 segundos antes do início do jogo
    const timer = setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card, index) => ({
          ...card,
          isFlipped: false,
          id: index,
        }))
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLives, setCards, createStack]);

  useEffect(() => {
    restart();
  }, [restart]);

  // Manipulador de clique da carta
  const handleCardClick = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    console.log({ clickedCard });
    if (
      !selectedCards.includes(id) &&
      selectedCards.length < 2 &&
      !clickedCard.isFlipped
    ) {
      setSelectedCards((prevSelected) => [...prevSelected, id]);
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, isFlipped: true } : card
        )
      );
    }
  };

  // Lógica do jogo ao comparar cartas selecionadas
  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;
      const firstSelectedCard = cards.find((card) => card.id === firstCard);
      const secondSelectedCard = cards.find((card) => card.id === secondCard);

      if (firstSelectedCard.image !== secondSelectedCard.image) {
        console.log("imagens diferentes");
        setLives((prevLives) => prevLives - 1);
        if (lives === 1) {
          // Game over
          // Reinicie o jogo chamando uma função para reiniciar os estados
        } else {
          console.log({ selectedCards });
          // Desvire as cartas após um intervalo de tempo (1 segundo)
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((card, index) => ({
                ...card,
                isFlipped: false,
                id: index,
              }))
            );
          }, 1500);
          setSelectedCards([]);
        }
      } else {
        // Cartas iguais, defina-as como correspondidas e limpe a seleção
        setMatchedCards([...matchedCards, firstCard, secondCard]);
        setSelectedCards([]);
      }
    }
  }, [selectedCards, cards, lives, matchedCards]);

  // Renderização das cartas
  const renderCards = () => {
    console.log(cards);
    return cards.map((card) => (
      <div
        className="card"
        key={card.id}
        onClick={() => {
          console.log("cloq");
          handleCardClick(card.id);
        }}
      >
        {card.isFlipped ? (
          <img src={card.image} className="card-flipped" alt="Card" />
        ) : (
          <div className="card-not-flipped"></div>
        )}
      </div>
    ));
  };

  return (
    <div className="App">
      {lives > 0 ? (
        <>
          <div className="board">{renderCards()}</div>
          <Lives numeroDeImagens={lives} />
        </>
      ) : (
        <>
          <h3>Você perdeu!</h3>
          <button onClick={restart()}>Reiniciar jogo</button>
        </>
      )}
    </div>
  );
};

export default Game;
