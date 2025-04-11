// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const navStyle = {
  padding: "1rem",
  background: "#eee",
  display: "flex",
  gap: "1rem",
  justifyContent: "center"
};

const linkStyle = {
  textDecoration: "none",
  color: "black",
  fontSize: "1.2rem"
};

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      {/* Den externa länk som leder till din SSR highscore-sida */}
      <a
        href="http://localhost:5080/highscore"
        style={linkStyle}
        target="_blank"
        rel="noopener noreferrer"
      >
        Highscore
      </a>
    </nav>
  );
}

//På så sätt:

/*Din React‑SPA hanterar Home och About (och eventuella andra sidor).
Highscore-sidan renderas via Express + EJS genom att användaren klickar på länken i navbaren. 
Detta kan öppnas i en ny flik eller i samma fönster (beroende på target-attributet).*/
