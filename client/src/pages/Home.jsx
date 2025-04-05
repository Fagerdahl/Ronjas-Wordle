//This is where we play the Game
import React, { useState } from "react";
import GameBoard from "../components/GameBoard";
import GuessInput from "../components/GuessInput";

const Game = () => {
  const [solution, setSolution] = useState("apple"); // exempellösning
  const [guesses, setGuesses] = useState([]);

  // Om du vill hämta ord från backend:
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/word?length=5")
  //     .then(res => res.json())
  //     .then(data => setSolution(data.word))
  //     .catch(err => console.error(err));
  // }, []);

  const handleAddGuess = (guess) => {
    //Maximum 6 guesses
    if (guesses.length < 6) {
      setGuesses((prev) => [...prev, guess]);
    }
  };

  return (
    <div>
      <h1>Wordle Game</h1>
      <GameBoard guesses={guesses} solution={solution} />
      <GuessInput onSubmitGuess={handleAddGuess} />
    </div>
  );
};

export default Game;
