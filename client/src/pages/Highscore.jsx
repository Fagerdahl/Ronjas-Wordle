//SSR highscore list , this should not retrieve data with useEffect. This data should be retrieved as props: scores.

import React from "react";

const scoreBoard = ({ scores }) => {
  return (
    //React builds a virtual DOM based on this jsx
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

export async function getProps() {
  const res = await fetch("http://localhost:5080/api/scores");
  const scores = await res.json();

  return {
    props: {
      scores,
    },
  };
}

export default scoreBoard;
