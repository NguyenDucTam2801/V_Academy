import React from "react";
import "../../styles/components/outside/NavBar.css";
import logo from "../../assets/logo.png"

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={logo} alt="logo" className="logo" />
        <a href="/homepage"> Academy</a>
      </div>
      <div className="navbar-list-link">
        <ul className="navbar-links">
          <li className="navbar-link">
            <a href="/Cirriculum">Cirriculum</a>
          </li>
          <li className="navbar-link">
            <a href="/Contact">Contact Us</a>
          </li>
        </ul>
      </div>
      <div className="navbar-login">
        <a href="">Login Now</a>
      </div>
    </nav>
  );
};
