import React from "react";
import "../../styles/components/outside/NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>V-Academy</h1>
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
