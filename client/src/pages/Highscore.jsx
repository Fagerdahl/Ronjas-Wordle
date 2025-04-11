// pages/highscore.js
import React from "react";

// Highscore-komponenten tar emot "scores" som props
const Highscore = ({ scores }) => {
  console.log("In <Highscore />:", scores);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Highscore</h1>
      {Array.isArray(scores) && scores.length > 0 ? (
        <ul style={listStyle}>
          {scores.map((score, index) => (
            <li key={index} style={itemStyle}>
              <span style={usernameStyle}>{score.username}</span>{" "}
              <span style={timeStyle}>{score.time}sec</span>{" "}
              <span style={guessesStyle}>{score.guesses} guesses</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No highscores yet...</p>
      )}
    </div>
  );
};

export default Highscore;

// getServerSideProps hämtar highscore-data från API:et, sorterar dem baserat på "time" (stigande)
// och plockar ut de 5 bästa resultaten.
export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host;
    const apiUrl = `${protocol}://${host}/api/scores`;

    const res = await fetch(apiUrl);
    const scores = await res.json();

    // Sortera highscore-datan så att den med lägsta tid (bästa) kommer först och ta de 5 bästa.
    const bestScores = Array.isArray(scores)
      ? scores.sort((a, b) => a.time - b.time).slice(0, 5)
      : [];

    console.log("SSR fetched scores:", bestScores);
    return { props: { scores: bestScores } };
  } catch (error) {
    console.error("Error fetching scores:", error);
    return { props: { scores: [] } };
  }
}

// Inline-style-objekt för styling
const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
  textAlign: "center",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const headingStyle = {
  fontSize: "2.5rem",
  color: "#333",
  marginBottom: "20px",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#f9f9f9",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "15px",
  marginBottom: "10px",
  fontSize: "1.2rem",
  color: "#555",
};

const usernameStyle = {
  fontWeight: "bold",
  color: "#333",
};

const timeStyle = {
  color: "#27ae60", // Grön nyans, visar tid
};

const guessesStyle = {
  color: "#e67e22", // Orange nyans
};
