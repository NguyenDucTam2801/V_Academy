import React from 'react'
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';
import Data from '../Sample/StdSampleData.json';

function StudentManagePage() {
  return (
    <div className="container">
      {/* Header Section */}
      <header className="tab-bar">
        <div className="logo">
            <img src={logo} alt="logo" className="logo" />
            <Link to="/home_page">Academy</Link>
        </div>
        <button className="registered-button">Registered Class</button>

        {/* dynamic component */}
        <div className="user-profile">
          <div className="user-initial">T</div>
          <span className="user-name">Nguyen Duc Tam</span>
        </div>
      </header>

      {/* data table */}
      <main className="content">
        <div className="content-box" >
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Class Name</th>
                <th>Lessions</th>
                <th>Tutor ID</th>
                <th>Tutor Name</th>
                <th>Tutor Email</th>
                <th>Tutor Phone</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((record, index) => (
                <tr key={index}>
                  <td>{record.CourseID}</td>
                  <td>{record.CourseName}</td>
                  <td>{record.Lessions}</td>
                  <td>{record.TutorID}</td>
                  <td>{record.TutorName}</td>
                  <td>{record.TutorEmail}</td>
                  <td>{record.TutorPhone}</td>
                  <td>{record.StartTime}</td>
                  <td>{record.EndTime}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </main>
    </div>
  )
}

export default StudentManagePage