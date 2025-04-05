import React from "react";

const Feedback = ({ guess, solution }) => {
  const feedback = getFeedback(guess, solution);

  return (
    <div style={{ display: "flex" }}>
      {feedback.map((color, index) => (
        <div
          key={index}
          style={{
            width: 40,
            height: 40,
            backgroundColor: color,
            margin: 5,
            textAlign: "center",
            lineHeight: "40px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {guess[index]}
        </div>
      ))}
    </div>
  );
};

export default Feedback;
