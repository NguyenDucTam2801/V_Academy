import { useState, React, useEffect } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
import AlertStatus from "../components/alert/AlertStatus";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";
import "../styles/pages/UpdateDataFrameStyle.css";
import {route} from "./routes/route";

export default function CreateTutorPage() {
  const CREATE_TUTOR_URL = "http://localhost:3001/api/admission/createTutor";
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const navigate = useNavigate();
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
    subject_id: "eng_sub",
    tutor_password: "",
  });
  const [subjectList, setSubjectList] = useState([]);
  const links = route.admission_routes;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/admission/subject",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubjectList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    setTutorInfo({ ...tutorInfo, [e.target.name]: e.target.value });
    console.log("e trget name", e.target.name);
    console.log("e trget value", e.target.value);
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
      console.log("Tutor Info", tutorInfo);
      setShowMessage(true);
      setMessage("Create Successfully!");
      setTimeout(() => {
        navigate("/tutor_list");
      }, 2000);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setShowMessage(true);
      console.log("Tutor Info", tutorInfo);
      setMessage("Create Fail! " + error);
    }
  };
  console.log("Subject list " + JSON.stringify(subjectList));
  return (
    <div>
      <NavBar linkList={links} role={role} username={user.admission_name} />
      <div className="create-tutor-container">
        <h2>Update New Tutor Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-frame">
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_name"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="date"
                name="tutor_birth"
                placeholder="Birthday"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="email"
                name="tutor_email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_phone"
                placeholder="Phone Number"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_region"
                placeholder="Region"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_address"
                placeholder="Address"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_url"
                placeholder="URL"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_descript"
                placeholder="Description"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-frame-group">
              <select
                name="subject_id"
                id="subject_id"
                onChange={handleChange}
                required
              >
                <option value="">Select Subject</option>
                {Object.values(subjectList).map((record, index) => {
                  console.log("record", record.subject_id);
                  return (
                    <option key={index} value={record.subject_id}>
                      {record.subject_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-frame-group">
              <input
                type="password"
                name="tutor_password"
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
