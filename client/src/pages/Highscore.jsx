//SSR highscore list , this should not retrieve data with useEffect. This data should be retrieved as props: scores.

import React, { useEffect, useState } from "react";

const Highscore = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5080/api/highscore")
      .then(res => res.json())
      .then(data => setScores(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Highscore</h1>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.name} - {score.time}s - {score.guesses} guesses
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Highscore;
