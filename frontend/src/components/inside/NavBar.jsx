import React from "react";
import "../../styles/components/outside/NavBar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export const NavBar = ({linkList, role}) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo inside-page-navbar">
        <img src={logo} alt="logo" className="logo" />
        <h1>Academy</h1>
      </div>
      <div className="navbar-list-link">
        <ul className="navbar-links">
          {/* <li className="navbar-link">
            <Link to="/cirriculum_page"></Link>
          </li>
          <li className="navbar-link">
            <Link to="/contact_page">Contact Us</Link>
          </li> */}
          {linkList.map((link) => (
            <li className="navbar-link">
              <Link to={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="navbar-login">
        <Link to="/login_page">Login Now</Link>
      </div> */}
    </nav>
  );
};
