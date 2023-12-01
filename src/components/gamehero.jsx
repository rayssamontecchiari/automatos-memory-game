import React, { useState, useEffect, useCallback } from "react";
import Stack from "./stack"


// import GameOver from "../components/game-over";

import "../styles/hero.css"; // Estilo para as cartas
import GameOver from "./game-over";
import Winner from "./winner";
import hero1 from "./assets/hero1.jpg";
import hero2 from "./assets/hero2.jpg";
import hero3 from "./assets/hero3.jpg";
import hero4 from "./assets/hero4.jpg";
import Lives from "../components/lives";

const GameHero = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [lives, setLives] = useState(3);
  const [step, setStep] = useState("initial");
  const { stack, setStack, pushToStack, popFromStack } = Stack()
  const [countStack, setCountStack] = useState(0)

  // Função para criar a pilha (array de cartas)
  const createStack = useCallback(() => {
    const images = [hero1, hero2, hero3, hero4];
    const doubledImages = images.concat(images);
    const shuffledCards = doubledImages.sort(() => Math.random() - 0.5);

    //console.log({ shuffledCards });
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
    setStep("initial");
    setMatchedCards([]);
    setStack([]);
    setCountStack(0);

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
    if(selectedCards.length == 0 && countStack == 0){
      cards.find((card) => { if (card.id === id) {
          pushToStack(card.image);
        }
      })
    } else if(selectedCards.length % 2 == 0) {
        cards.find((card) => { if (card.id === id) {
          if(popFromStack() != card.image){
            pushToStack(card.image);
          } else {
            popFromStack();
            pushToStack(card.image);
          }
        }})
    }

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
      const fcard = popFromStack()
      const firstSelectedCard = cards.find((card) => card.id === firstCard);
      const secondSelectedCard = cards.find((card) => card.id === secondCard);
      console.log(firstSelectedCard)
      console.log(secondSelectedCard)
      console.log(fcard)
      if(fcard === secondSelectedCard.image) {
          setMatchedCards([...matchedCards, firstCard, secondCard]);
          setSelectedCards([]);
      } else {
        if(stack.length == 1){
          pushToStack(firstSelectedCard.image)
          setCountStack(1)
        }
        setLives((prevLives) => prevLives - 1);
        if (lives === 1) {
          setStep("lose");
        } else {
          console.log({ selectedCards });
          // Desvire as cartas selecionadas após um intervalo de tempo (1 segundo)
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((card) => {
                if (card.id === firstCard || card.id === secondCard) {
                  return {
                    ...card,
                    isFlipped: false,
                  };
                }
                return card;
              })
            );
          }, 1000);
          setSelectedCards([]);
        }
      }

    }
  }, [selectedCards, cards, lives, matchedCards]);

  // Renderização das cartas
  const renderCards = () => {
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

  useEffect(() => {
    if (cards.length !== 0 && matchedCards.length === cards.length) {
      setStep("winner");
    }
  }, [matchedCards, cards]);

  return (
    <>
      {step === "initial" && (
        <div className="Apphero">
          <Lives numeroDeImagens={lives} />
          <div className="board">
            {renderCards()}
          </div>
          
          <div className="pilha">
            <h2 className="pilha-title">Pilha:</h2>
            <ul className="pilha-list">
              {stack.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {step === "lose" && <GameOver onClick={restart} />}
      {step === "winner" && <Winner onClick={restart} />}
    </>
  );
};

export default GameHero;
