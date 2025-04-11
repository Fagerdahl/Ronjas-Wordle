import React, { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import GuessInput from "../components/GuessInput";
import Confetti from "react-confetti";
import "./message.css";

const Home = () => {
  const [solution, setSolution] = useState(""); // Tom sträng först
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("");
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Hämta ett slumpat ord från DB
  const fetchRandomWord = async () => {
    try {
      const res = await fetch("http://localhost:5080/api/word?length=5"); 
      const data = await res.json();
      console.log("New word from DB:", data.word);
      setSolution(data.word);
    } catch (err) {
      console.error("Error fetching new word:", err);
      setSolution("apple"); // fallback
    }
  };

  // Hämta ordet när komponenten mountas
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

  // Efter 5 sekunders confetti, återställ spelet
  useEffect(() => {
    if (win) {
      const timer = setTimeout(() => {
        resetGame();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [win]);

  // useEffect som lyssnar på gameOver – här skickas resultatet
  useEffect(() => {
    if (gameOver) {
      // Bygg resultatet
      const gameResult = {
        username: "Anonymous", // Ersätt gärna med ett formulär om användaren ska ange sitt namn
        score: calculateScore(guesses),
        guesses: guesses.length,
      };
      submitScore(gameResult);
    }
  }, [gameOver]);

  // Funktion för att räkna ut poäng (exempel, anpassa efter behov)
  function calculateScore(guessesArray) {
    // Exempel: högre score om färre gissningar
    return Math.max(100 - (guessesArray.length - 1) * 10, 0);
  }

  // Rensa spelet och hämta ett nytt ord
  const resetGame = () => {
    setGuesses([]);
    setMessage("");
    setWin(false);
    setGameOver(false);
    fetchRandomWord(); // Hämta nytt ord
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

// Funktion för att skicka resultatet till backend
async function submitScore(result) {
  try {
    const response = await fetch("http://localhost:5080/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });
    if (!response.ok) {
      throw new Error("Kunde inte spara resultatet");
    }
    const data = await response.json();
    console.log("Resultatet sparades:", data);
  } catch (error) {
    console.error("Fel vid sparande av resultatet:", error);
  }
}

export default Home;
