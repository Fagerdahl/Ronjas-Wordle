//My central component that makes routing and layout for my entire app. 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Importing all my 3 pages
import Home from './pages/Home';
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
        {/* About-page */} 
        <Route path="/About" element={<About />} />          
      </Routes>
    </Router>
  );
};

export default App;


//Genom att inte definiera en <Route path="/Highscore" element={<Highscore />} /> i 
// <Routes> låter du inte React Router hantera highscore-sidan. 
// Detta är viktigt om du vill att Express/EJS-sidan (som ligger på en separat port, t.ex. 5080) 
// ska hantera all rendering av highscore.