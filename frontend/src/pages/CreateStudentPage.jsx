import { useState, React, useEffect } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
import AlertStatus from "../components/alert/AlertStatus";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";
import { route } from "./routes/route";

export default function CreateStudentPage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  const navigate = useNavigate();
  const [success, setSuccess] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [studentInfo, setStudentInfo] = useState({
    student_name: "",
    student_birth: "",
    student_email: "",
    student_phone: "",
    student_address: "",
    student_url: "",
    student_descript: "",
    // student_password: "",
  });
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const links = route.admission_routes;

  const handleChange = (e) => {
    setStudentInfo({
      ...studentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/api/admission/createStudent`,
        studentInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        console.log("Create student successfully");
        console.log(res);
        setSuccess(true);
        console.log("studentInfo" + JSON.stringify(studentInfo));
        setShowMessage(true);
        setMessage("Create Successfully!");
        setTimeout(() => {
          navigate("/student_list");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setShowMessage(true);
      console.log("Student Info", studentInfo);
      setMessage("Create Fail! " + error);
    }
  };

  return (
    <div>
      <NavBar linkList={links} role={role} username={user.admission_name} />
      <div className="create-tutor-container">
        <h2>Update New Student Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-frame">
            <div className="form-frame-group">
              <input
                type="text"
                name="student_name"
                placeholder="Full Name"
                onChange={handleChange}
                required

              />
            </div>
            <div className="form-frame-group">
              <input
                type="date"
                name="student_birth"
                placeholder="Birthday"
                onChange={handleChange}
                required

              />
            </div>
            <div className="form-frame-group">
              <input
                type="email"
                name="student_email"
                placeholder="Email"
                onChange={handleChange}
                required

              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="student_phone"
                placeholder="Phone Number"
                onChange={handleChange}
                required

              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="student_address"
                placeholder="Address"
                onChange={handleChange}
                required

              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="student_url"
                placeholder="URL"
                onChange={handleChange}
                required

              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="student_descript"
                placeholder="Description"
                onChange={handleChange}
                required

              />
            </div>
            <div className="form-frame-group">
              <input
                type="password"
                name="student_password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-form-button">
              Create New
            </button>
          </div>
        </form>
      </div>
      {showMessage &&
        (success ? (
          <AlertStatus message={message} status="success" />
        ) : (
          <AlertStatus message={message} status="failed" />
        ))}
    </div>
  );
}
