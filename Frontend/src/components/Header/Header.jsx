// frontend/src/components/Header/Header.jsx

import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-container">

        <Link to="/" className="header-logo" onClick={closeMenu}>
          <span className="logo-mark">
            <BriefcaseBusiness size={21} />
          </span>

          <span className="logo-text">
            Intern<span>X</span>
          </span>
        </Link>

        <nav className={`header-nav ${isMenuOpen ? "active" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/internships" onClick={closeMenu}>
            Internships
          </NavLink>

          <NavLink to="/companies" onClick={closeMenu}>
            Companies
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/how-it-works" onClick={closeMenu}>
            How It Works
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

          <div className="mobile-nav-actions">
            <Link to="/login" className="header-login" onClick={closeMenu}>
              <UserRound size={17} />
              Login
            </Link>

            <Link to="/signup" className="header-signup" onClick={closeMenu}>
              Get Started
            </Link>
          </div>
        </nav>

        <div className="header-actions">
          <Link to="/internships" className="header-search">
            <Search size={19} />
          </Link>

          <Link to="/login" className="header-login">
            <UserRound size={17} />
            <span>Login</span>
          </Link>

          <Link to="/signup" className="header-signup">
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>
    </header>
  );
};

export default Header;