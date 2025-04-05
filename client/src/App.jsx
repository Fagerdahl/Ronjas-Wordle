//My central component that makes routing and layout for my entire app. 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Importing all my 3 pages
import Home from './pages/Home';
import Highscore from './pages/Highscore';
import About from './pages/About';
//Importing a navbar layout
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      {/*Navbar for all the pages*/}
      <Navbar />
      <Routes>
        {/* Home page where we play */}
        <Route path="/" element={<Home />} /> 
        {/* Highscore-page */}             
        <Route path="/highscore" element={<Highscore />} /> 
        {/* About-page */} 
        <Route path="/about" element={<About />} />          
      </Routes>
    </Router>
  );
};

export default App;
