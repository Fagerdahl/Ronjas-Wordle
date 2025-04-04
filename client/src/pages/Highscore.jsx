import React, { useEffect, useState } from "react";

const scoreBoard = () => {
  const [scores, setScores] = useState([]);

  //Get scores from backend
  useEffect(() => {
    fetch("http://localhost:5080/api/scores")
      .then((response) => response.json()) //Convert answer to JSON
      .then((data) => {
        console.log(data);
        setScores(data); //Updating the state with fetched data
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Scores</h1>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.username}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default scoreBoard;
