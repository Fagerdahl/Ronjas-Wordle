import React, { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import GuessInput from "../components/GuessInput";
import Confetti from "react-confetti";

const Home = () => {
  const [solution, setSolution] = useState(""); // börja med tom sträng
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("");
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Hämta slumpat ord från din backend
  const fetchRandomWord = async () => {
    try {
      const res = await fetch("http://localhost:5080/api/word?length=5"); 
      const data = await res.json();
      // Se till att data.word inte är "apple" om inte databasen är tom
      console.log("Nytt ord från DB:", data.word);
      setSolution(data.word);
    } catch (err) {
      console.error("Error fetching new word:", err);
      setSolution("apple"); // fallback
    }
  };

  // Hämta ord när komponenten mountar
  useEffect(() => {
    fetchRandomWord();
  }, []); // tom array => körs en gång

  const handleAddGuess = (guess) => {
    if (!gameOver && guesses.length < 6) {
      const newGuesses = [...guesses, guess];
      setGuesses(newGuesses);

      if (guess.toLowerCase() === solution.toLowerCase()) {
        setMessage("Well done! Du gissade rätt!");
        setWin(true);
        setGameOver(true);
      } else if (newGuesses.length === 6) {
        setMessage(`Spelet över! Ordet var: ${solution}`);
        setGameOver(true);
      }
    }
  };

  // Visa confetti i 5 sekunder, sen starta om spelet
  useEffect(() => {
    if (win) {
      const timer = setTimeout(() => {
        resetGame();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [win]);

  // Rensa state och hämta nytt slumpat ord
  const resetGame = () => {
    setGuesses([]);
    setMessage("");
    setWin(false);
    setGameOver(false);
    fetchRandomWord(); // hämta nytt ord
  };

  return (
    <div>
      <h1>Wordle Game</h1>
      {win && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.4}
        />
      )}
      <GameBoard guesses={guesses} solution={solution} />
      {message && <div className="message">{message}</div>}
      <GuessInput onSubmitGuess={handleAddGuess} disabled={gameOver} />
    </div>
  );
};

export default Home;
