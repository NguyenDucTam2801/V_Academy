import React from "react";
import "../../styles/components/outside/NavBar.css";
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={logo} alt="logo" className="logo" />
        <Link to="/home_page">Academy</Link>
      </div>
      <div className="navbar-list-link">
        <ul className="navbar-links">
          <li className="navbar-link">
            <Link to="/cirriculum_page">Cirriculum</Link>
          </li>
          <li className="navbar-link">
            <Link to="/contact_page">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-login">
        <Link to="/login_page">Login Now</Link>
      </div>
    </nav>
  );
};
