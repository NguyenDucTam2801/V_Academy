import { useState, React, useEffect } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
import AlertStatus from "../components/alert/AlertStatus";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";

function AdminManagePage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const [classList, setClassList] = useState({});
  const links = [
    { url: "/admin_dashboard", label: "Regitered Class" },
    { url: "/tutor_list", label: "Tutor List" },
    { url: "/student_list", label: "Student List" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/admission/admissionClass/${user.admission_id}`,
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
  const navigate = useNavigate();
  const createClass = () => {
    navigate("/create_class");
  }
  console.log("Class list "+JSON.stringify(classList));
  return (
    <div className="container">
      <NavBar linkList={links} role={role} username={user.admission_name}/>

      {/* data table */}
      <main className="content">
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
          <div className="header">
          <h1>Class List</h1>
          <button onClick={createClass}>Create Class</button>
        </div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <AlertStatus message="Login Success" status="success" />
    </div>
  );
}

export default AdminManagePage