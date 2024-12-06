import React from 'react'
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';
import SampleData from "../Sample/TutorSampleData.json";

function TuitorManagePage() {
  return (
    <div className="container">
      {/* Header Section */}
      <header className="tab-bar">
        <div className="logo">
            <img src={logo} alt="logo" className="logo" />
            <Link to="/home_page">Academy</Link>
        </div>
        <button className="registered-button">Teaching Classes</button>

        {/* dynamic component */}
        <div className="user-profile">
          <div className="user-initial">T</div>
          <span className="user-name">Nguyen Duc Tam</span>
        </div>
      </header>

      {/* data table */}
      <main className="content">
        <div className="content-box">
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Lessions</th>
                <th>Tutor ID</th>
                <th>Tutor Name</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default TuitorManagePage