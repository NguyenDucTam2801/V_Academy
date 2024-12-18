import { React, useEffect, useState } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import AlertStatus from "../components/alert/AlertStatus";
import { Link } from "react-router-dom";
import { NavBar } from "../components/inside/NavBar";
import Cookies from "js-cookie";
import axios from "axios";
import { route } from "./routes/route";

function TutorManagePage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  const [classList, setClassList] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data");
      try {
        const res = await axios.get(
          ` https://v-academy.onrender.com/api/tutor/tutorClass/${user.tutor_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response: " + res);
        setClassList(res.data.class);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log("role" + role);
  console.log("Class list " + JSON.stringify(classList));
  console.log("user" + JSON.stringify(user));
  const links = route.tutor_routes;
  return (
    <div className="container">
      <NavBar linkList={links} role={role} username={user.tutor_name} />
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

          <table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Tutor ID</th>
                <th>Course ID</th>
              </tr>
            </thead>
            <tbody>
              {classList.length > 0 ? (
                Object.values(classList).map((record, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={"/class_detail/" + record.class_id}>
                        {record.class_name}
                      </Link>
                    </td>
                    <td>{record.tutor_id}</td>
                    <td>{record.course_id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No class found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <AlertStatus message="Login Success" status="success" />
    </div>
  );
}

export default TutorManagePage;
