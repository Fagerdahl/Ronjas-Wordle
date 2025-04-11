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
  const [startTime, setStartTime] = useState(null); // Starttid
  const [username, setUsername] = useState(""); // Användarnamn, tomt initialt
  const [hasSubmitted, setHasSubmitted] = useState(false); // För att undvika att skicka resultat flera gånger

  // Hämta ett slumpat ord från DB och sätt starttid
  const fetchRandomWord = async () => {
    try {
      const res = await fetch("http://localhost:5080/api/word?length=5");
      const data = await res.json();
      console.log("New word from DB:", data.word);
      setSolution(data.word);
      setStartTime(Date.now()); // Sätt starttid
    } catch (err) {
      console.error("Error fetching new word:", err);
      setSolution("apple"); // fallback
      setStartTime(Date.now());
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

  // När spelet är över, räkna ut den spelade tiden och skicka resultatet
  useEffect(() => {
    if (gameOver && startTime && !hasSubmitted) {
      // Om användarnamnet inte är ifyllt, kan du t.ex. använda "Anonymous" eller vänta
      const finalUsername = username.trim() !== "" ? username : "Anonymous";
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Tid i sekunder
      const gameResult = {
        username: finalUsername, // Användarens namn
        time: elapsedTime,       // Tiden i sekunder
        guesses: guesses.length,
      };
      submitScore(gameResult);
      setHasSubmitted(true); // Förhindrar dubbelpostning
    }
  }, [gameOver, startTime, username, guesses, hasSubmitted]);

  // Rensa state och hämta ett nytt ord
  const resetGame = () => {
    setGuesses([]);
    setMessage("");
    setWin(false);
    setGameOver(false);
    setHasSubmitted(false);
    fetchRandomWord(); // Hämta nytt ord och starta om tidmätningen
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

      {/* Visa ett inputfält för användarnamn när spelet är över om det inte redan är ifyllt */}
      {gameOver && !hasSubmitted && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>Skriv in ditt användarnamn så att vi kan spara din highscore:</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ditt namn"
            style={{ padding: "8px", fontSize: "1rem" }}
          />
          {/* Du kan lägga till en knapp om du vill att användaren ska bekräfta sitt namn */}
          {/* <button onClick={() => {/* Submit om inte redan gjorts *-/}}>Skicka</button> */}
        </div>
      )}
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
