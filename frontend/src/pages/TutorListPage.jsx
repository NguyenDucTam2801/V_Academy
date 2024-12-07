import { useState, useEffect, React } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/ManagePage.css";
import { use } from "react";
import { route } from "./routes/route";

export default function TutorListPage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role").toLowerCase();
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const [tutorList, setTutorList] = useState({});
  const links = route.admission_routes;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/admission/tutorList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTutorList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const createTutor = () => {
    navigate("/create_tutor");
  };
  console.log("tutor list " + JSON.stringify(tutorList));
  return (
    <div className="container">
      <NavBar linkList={links} role={role} username={user.admission_name} />

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
            <h1>Tutor List</h1>
            <button onClick={createTutor}>Create Tutor</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Adress</th>
                <th>URL</th>
                <th>Description</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(tutorList).map((record, index) => (
                <tr key={index}>
                  <td>{record.tutor_id}</td>
                  <td>{record.tutor_name}</td>
                  <td>{record.tutor_email}</td>
                  <td>{record.tutor_phone}</td>
                  <td>{record.tutor_address}</td>
                  <td>{record.tutor_url}</td>
                  <td>{record.tutor_descript}</td>
                  <td>{record.subject_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
