import React, { useEffect, useState } from "react";

const scoreBoard = () => {
  const [scores, setScores] = useState([]);

  //Get scores from backend
  useEffect(() => {
    fetch("http://localhost:5080/api/scores")
      .then((response) => response.json()) //Convert answer to JSON
      .then((data) => {
        console.log("Fetched scores:",data);
        setScores(data); //Updating the state with fetched data
      })
      .catch((error) => console.error("Error fetching scores:", error));
  }, []);

  //React builds a virtual DOM based on this jsx
  return (
    <div>
      <h1>Scores</h1>
      <ul>
        {scores.map((score) => (
          <li key={score._id}>
            {score.username}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default scoreBoard;

//useEffect = Runs one time when component loads, gets scores from backend
//setScores = Updating state with fetched data
//render = Shows a list of scores if there are any in the db
