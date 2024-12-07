import { useState, React, useEffect } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
import AlertStatus from "../components/alert/AlertStatus";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";

export default function CreateStudentPage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  const [success, setSuccess] = useState(false);
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
  const links = [
    { url: "/admin_dashboard", label: "Regitered Class" },
    { url: "/create_class", label: "Create Class" },
    { url: "/create_tutor", label: "Create Tutor" },
    { url: "/create_student", label: "Create Student" },
  ];

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
        }
        }
        catch (error) {
          console.log(error);
          setSuccess(false);
          setShowMessage(true);
          setMessage("Create Fail! "+error);
        }
    }

  return <div>
    <NavBar linkList={links} role={role} />
    <div className="create-tutor-container">
    <h2>Update New Student Information</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-frame">
        <div className="form-frame-group">
          <input type="text" name="student_name" placeholder="Full Name" 
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="date" name="tutor_birth" placeholder="Birthday"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="email" name="student_email" placeholder="Email"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="text" name="student_phone" placeholder="Phone Number"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="text" name="student_address" placeholder="Address"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="text" name="student_url" placeholder="URL"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="text" name="student_descript" placeholder="Description"
          onChange={handleChange}/>
        </div>
        {/* <div className="form-frame-group">
          <input type="text" name="student_password" placeholder="Password"
          onChange={handleChange}/>
        </div> */}
      <button type="submit" className="submit-form-button">Create New</button>
      </div>
    </form>
  </div>
  </div>;
}
