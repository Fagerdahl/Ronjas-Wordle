//The visual Game Board with the grid
import React from "react";
import "./GameBoard.css"; //Separate styling

const GameBoard = ({ guesses, solution }) => {
  const rows = 6;
  const columns = solution.length;

  const boardRows = [];
  for (let i = 0; i < rows; i++) {
    boardRows.push(i);
  }

  return (
    <div className="board-container">
      {boardRows.map((rowIndex) => {
        const guess = guesses[rowIndex] || "";
        return (
          <div className="board-row" key={rowIndex}>
            {[...Array(columns)].map((_, colIndex) => {
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
  if (letter === solution[colIndex]) {
    return "#538d4e";
  }

  if (solution.includes(letter)) {
    return "#b59f3b";
  }
  return "#3a3a3c";
}

export default GameBoard;
