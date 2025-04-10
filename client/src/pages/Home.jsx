import React, { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import GuessInput from "../components/GuessInput";
import Confetti from "react-confetti";
import "./message.css";

const Home = () => {
  const [solution, setSolution] = useState(""); //Empty string first
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("");
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  //Fetch random word from DB
  const fetchRandomWord = async () => {
    try {
      const res = await fetch("http://localhost:5080/api/word?length=5"); 
      const data = await res.json();
      //Fallback
      console.log("New word from DB:", data.word);
      setSolution(data.word);
    } catch (err) {
      console.error("Error fetching new word:", err);
      setSolution("apple"); // fallback
    }
  };

  // Get word when component mounts 
  useEffect(() => {
    fetchRandomWord();
  }, []); 

  const handleAddGuess = (guess) => {
    if (!gameOver && guesses.length < 6) {
      const newGuesses = [...guesses, guess];
      setGuesses(newGuesses);

      if (guess.toLowerCase() === solution.toLowerCase()) {
        setMessage("Well done!");
        setWin(true);
        setGameOver(true);
      } else if (newGuesses.length === 6) {
        setMessage(`Game over! The word was: ${solution}`);
        setGameOver(true);
      }
    }
  };

  //5 sec confetti
  useEffect(() => {
    if (win) {
      const timer = setTimeout(() => {
        resetGame();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [win]);

  //Clean state and get a new word 
  const resetGame = () => {
    setGuesses([]);
    setMessage("");
    setWin(false);
    setGameOver(false);
    fetchRandomWord(); //Get new word
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
      {message && (
  <div className={`message ${message.startsWith("Well done") ? "success" : "error"}`}>
    {message}
  </div>
)}
      <GuessInput onSubmitGuess={handleAddGuess} disabled={gameOver} />
    </div>
  );
};

export default Home;
