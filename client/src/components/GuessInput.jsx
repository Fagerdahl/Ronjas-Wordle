//Inputfield for guesses
import React, { useState } from "react";

const GuessInput = ({ onSubmitGuess }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onSubmitGuess(input.trim());
    setInput(""); //Clear input
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Guess here"
      />
      <button type="submit">OK</button>
    </form>
  );
};

export default GuessInput;
