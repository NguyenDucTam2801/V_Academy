import React from 'react'
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';

function AdminManagePage() {
  return (
    <div className="container">
      {/* Header Section */}
      <header className="tab-bar">
        <div className="logo">
            <img src={logo} alt="logo" className="logo" />
            <Link to="/home_page">Academy</Link>
        </div>
        <button className="registered-button">Registered Class</button>
        <button className="information-button">Information</button>

        {/* dynamic component */}
        <div className="user-profile">
          <div className="user-initial">T</div>
          <span className="user-name">Nguyen Duc Tam</span>
        </div>
      </header>

      {/* data table */}
      <main className="content">
        <div className="content-box"></div>
      </main>
    </div>
  )
}

export default AdminManagePage