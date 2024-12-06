import { useState, React, useEffect } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
import AlertStatus from "../components/alert/AlertStatus";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";

function StudentManagePage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  console.log("role" + role);
  const [classList, setClassList] = useState({});
  const links = [
    { url: "/regitered_class", label: "Regitered Class" }
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/student/studentClass/${user.student_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClassList(res.data.class);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(classList);
  return (
    <div className="container">
      <NavBar linkList={links} role={role} />

      {/* data table */}
      <main className="content">
<<<<<<< HEAD
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
=======
        <div className="content-box">
          {/* {
            Data.map( record => {
              return(
                <div>
                  {record.CourseID}
                  {record.CourseName}
                  {record.TutorID}
                  {record.TutorName}
                  {record.TutorPhone}
                  {record.TutorEmail}
                  {record.StartTime}
                  {record.EndTime}
                </div>
              )
            })
          } */}

          <table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Tutor ID</th>
                <th>Course ID</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(classList).map((record, index) => (
                <tr key={index}>
                  <td><Link to={"/class_detail/"+record.class_id}>{record.class_name}</Link></td>
                  <td>{record.tutor_id}</td>
                  <td>{record.course_id}</td>
>>>>>>> 96da6bef890c24101fbb0003952146ddf675b896
                </tr>
              ))}
            </tbody>
          </table>
<<<<<<< HEAD

=======
>>>>>>> 96da6bef890c24101fbb0003952146ddf675b896
        </div>
      </main>
      <AlertStatus message="Login Success" status="success" />
    </div>
  );
}

export default StudentManagePage;
