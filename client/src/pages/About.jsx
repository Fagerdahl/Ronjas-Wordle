//Static page about this project
import React, { useState } from 'react';

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Mörkt genomskinligt svart
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000, // Se till att modalen ligger över allt annat
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "90%",
  width: "500px",         // Fast bredd, men den maximeras av maxWidth
  maxHeight: "80%",
  overflowY: "auto",      // Om innehållet blir för högt, rulla vertikalt
  boxSizing: "border-box",
  textAlign: "center",
};


const About = () => {
    //State to handle modal
    const [showModal, setShowModal] = useState(false);
  
    //Functionality for modal
    const handleReadMore = () => {
      setShowModal(true);
    };
  
    //Function to close modal
    const handleCloseModal = () => {
      setShowModal(false);
    };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Welcome to my version of Wordle</h1>
      <p>
        This project was such a fun part of a Higher vocational education program at Lernia in Sweden.
        My Goal was to create a Fun & Interactive Game based on Fullstack Development.
        Built with ❤️, Sweat and a lot of Debugging.
      </p>
      
      
      <button onClick={handleReadMore}>Read More...</button>

      {/* Modal shows if showModal is true */}
      {showModal && (
        <div style={backdropStyle}>
          <div style={modalStyle}>
            <h2>Technical information</h2>
            <p style={{ color: "#000", fontSize: "1rem", margin: "10px 0" }}>
  Frontend: React<br/>
  Backend: Express and Node.js<br/>
  Programming Language: JavaScript<br/>
  Highscore-list SSR: MongoDB<br/>
  UI-design work is made in Figma
</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
