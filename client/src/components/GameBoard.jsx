//The visual Game Board with the grid. this file renders the gameboard
import React from "react";
import "./GameBoard.css";

const GameBoard = ({ guesses, solution }) => {
  const rows = 6;
  const columns = solution.length;

  return (
    <div className="board-container">
      {Array.from({ length: rows }, (_, rowIndex) => {
        const guess = guesses[rowIndex] || "";
        return (
          <div className="board-row" key={rowIndex}>
            {Array.from({ length: columns }, (_, colIndex) => {
              const letter = guess[colIndex] || "";
              const color = getCellColor(letter, colIndex, guess, solution);
              return (
                <div
                  className="board-cell"
                  key={colIndex}
                  style={{ backgroundColor: color }}
                >
                  {letter.toUpperCase()}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

function getCellColor(letter, colIndex, guess, solution) {
  if (!letter) return "#3a3a3c";
  if (letter.toLowerCase() === solution[colIndex].toLowerCase()) {
    return "#538d4e";
  }
  if (solution.toLowerCase().includes(letter.toLowerCase())) {
    return "#b59f3b";
  }
  return "#3a3a3c"; 
}

export default GameBoard;
