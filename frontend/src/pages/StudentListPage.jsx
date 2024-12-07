import { useState, useEffect, React } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/ManagePage.css";
import { use } from "react";
import { route } from "./routes/route";
export default function StudentListPage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const [studentList, setStudentList] = useState({});
  const links = route.admission_routes;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/admission/studentList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudentList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const createStudent = () => {
    navigate("/create_student");
  };
  console.log("tutor list " + JSON.stringify(studentList));
  return(
    <div className="container">
    <NavBar linkList={links} role={role} username={user.admission_name} />

    {/* data table */}
    <main className="content">
      <div className="content-box">
        <div className="header">
          <h1>Student List</h1>
          <button onClick={createStudent}>Create Student</button>
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
            </tr>
          </thead>
          <tbody>
            {Object.values(studentList).map((record, index) => (
              <tr key={index}>
                <td>{record.student_id}</td>
                <td>{record.student_name}</td>
                <td>{record.student_email}</td>
                <td>{record.student_phone}</td>
                <td>{record.student_address}</td>
                <td>{record.student_url}</td>
                <td>{record.student_descript}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  </div>
  );
}
