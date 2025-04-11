//SSR highscore list , this should not retrieve data with useEffect. This data should be retrieved as props: scores.

// pages/highscore.js
import React from "react";

const Highscore = ({ scores }) => {
  // Debug: Skriv ut scores i serverns/klientens konsol
  console.log("In <Highscore />:", scores);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Highscore</h1>
      {Array.isArray(scores) && scores.length > 0 ? (
        <ul style={listStyle}>
          {scores.map((score, index) => (
            <li key={index} style={itemStyle}>
              <span style={usernameStyle}>{score.username}</span> -{" "}
              <span style={timeStyle}>{score.score}p</span> -{" "}
              <span style={guessesStyle}>{score.guesses} guesses</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga highscore än...</p>
      )}
    </div>
  );
};

// pages/highscore.js

export async function getServerSideProps(context) {
  try {
    // Exempel: Bygg URL dynamiskt
    const { req } = context;
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host;
    const apiUrl = `${protocol}://${host}/api/scores`;

    const res = await fetch(apiUrl);
    const scores = await res.json();

    // LOGGA i serverns terminal, inte bara i webbläsarens devtools
    console.log("SSR fetched scores:", scores);

    // Returnera data som props om det är en array; annars en tom array
    return { props: { scores: Array.isArray(scores) ? scores : [] } };
  } catch (error) {
    console.error("Error fetching scores:", error);
    return { props: { scores: [] } };
  }
}






export default Highscore;

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
  color: "#27ae60", // Grön nyans
};

const guessesStyle = {
  color: "#e67e22", // Orange nyans
};


