//Static page about this project
import React, { useState } from 'react';

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
            <p>
            Frontend: React 
            Backend: Express and Node.js
            Programming Language: JavaScript
            Highscore-list SSR MongoDB
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
