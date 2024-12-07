import { useState, React, useEffect } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
import AlertStatus from "../components/alert/AlertStatus";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";
import "../styles/pages/UpdateDataFrameStyle.css"

export default function CreateTutorPage() {
  const CREATE_TUTOR_URL = "http://localhost:3001/api/admission/createTutor";
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const [success, setSuccess] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [tutorInfo, setTutorInfo] = useState({
    tutor_name: "",
    tutor_birth: "",
    tutor_email: "",
    tutor_phone: "",
    tutor_region: "",
    tutor_address: "",
    tutor_url: "",
    tutor_descript: "",
    subject_id: "",
  });
  const [subjectList, setSubjectList] = useState([]);
  const links = [
    { url: "/admin_dashboard", label: "Regitered Class" },
    { url: "/create_class", label: "Create Class" },
    { url: "/create_tutor", label: "Create Tutor" },
    { url: "/create_student", label: "Create Student" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/admission/subject", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubjectList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    setTutorInfo({ ...tutorInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/admission/createTutor",
        tutorInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setSuccess(true);
      setShowMessage(true);
      setMessage("Create Successfully!");
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setShowMessage(true);
      setMessage("Create Fail! "+error);
    }
  };
  console.log("Subject list " + JSON.stringify(subjectList));
  return <div>
  <NavBar linkList={links} role={role} />
  <div className="create-tutor-container">
    <h2>Update New Tutor Information</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-frame">
        <div className="form-frame-group">
          <input type="text" name="tutor_name" placeholder="Full Name" 
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="date" name="tutor_birth" placeholder="Birthday"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="email" name="tutor_email" placeholder="Email"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="text" name="tutor_phone" placeholder="Phone Number"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="text" name="tutor_region" placeholder="Region"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="text" name="tutor_address" placeholder="Address"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="text" name="tutor_url" placeholder="URL"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
          <input type="text" name="tutor_descript" placeholder="Description"
          onChange={handleChange}/>
        </div>
        <div className="form-frame-group">
         <select name="subject" id="subject">
          {Object.values(subjectList).map((record, index) => (
            <option value={record.subject_id}>{record.subject_name}</option>
          ))}
         </select>

        </div>
      <button type="submit" className="submit-form-button">Create New</button>
      </div>
    </form>
  </div>
  {showMessage &&
        (success ? (
          <AlertStatus message={message} status="success" />
        ) : (
          <AlertStatus message={message} status="failed" />
        ))}
  </div>;
}