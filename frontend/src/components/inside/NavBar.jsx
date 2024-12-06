import React from "react";
import "../../styles/components/outside/NavBar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export const NavBar = ({ linkList, role, username = "Null" }) => {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo inside-page-navbar">
        <img src={logo} alt="logo" className="logo" />
        <h1>Academy</h1>
      </div>
      <div className="navbar-list-link">
        <ul className="navbar-links">
          {linkList.map((link) => (
            <li className="navbar-link">
              <Link to={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="account-box">
        <p className="account-name">
          <b
            style={{
              backgroundColor: getRandomColor(),
            }}
          >
            {username.charAt(0)}
          </b>
          {username}
        </p>
        <div className="dropdown">
          <Link to="/edit_profile" className="account-link">
            Edit Profile
          </Link>
          <Link to="/" onClick={handleLogout} className="account-link">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};
