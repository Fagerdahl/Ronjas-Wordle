import "./Navbar.css"; //Separate styling

const Navbar = () => {
    return (
        <nav className="navbar">
          <div className="logo">
            <h2>Ronjas Wordle</h2>
          </div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/highscore">Highscore</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      );
    };

export default Navbar;
