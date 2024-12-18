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
import { route } from "./routes/route";
import regexTesting from "./regexTest/regexTesting";

export default function CreateTutorPage() {
  const CREATE_TUTOR_URL =
    " https://v-academy.onrender.com/api/admission/createTutor";
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const navigate = useNavigate();
  const [success, setSuccess] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
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
          " https://v-academy.onrender.com/api/admission/subject",
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
    const { name, value } = e.target;
    setTutorInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (!regexTesting(name, value, "Tutor")) {
      setError((prev) => ({
        ...prev,
        [name]: `Invalid ${name.replace(
          "_",
          " "
        )}. Please follow the correct format.`,
      }));
    } else {
      setError((prev) => ({
        ...prev,
        [name]: "",
      })); // Clear error if input is valid
    }

    if (value.length === 0) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        " https://v-academy.onrender.com/api/admission/createTutor",
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
  console.log("Tutor Info", tutorInfo);
  console.log("err ", error);
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
              {error["tutor_name"] && (
                <p className="error-message">{error["tutor_name"]}</p>
              )}
            </div>
            <div className="form-frame-group">
              <input
                type="date"
                name="tutor_birth"
                placeholder="Birthday"
                onChange={handleChange}
                required
              />
              {error["tutor_birth"] && (
                <p className="error-message">{error["tutor_birth"]}</p>
              )}
            </div>
            <div className="form-frame-group">
              <input
                type="email"
                name="tutor_email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              {error["tutor_email"] && (
                <p className="error-message">{error["tutor_email"]}</p>
              )}
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_phone"
                placeholder="Phone Number"
                onChange={handleChange}
                required
              />
              {error["tutor_phone"] && (
                <p className="error-message">{error["tutor_phone"]}</p>
              )}
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_region"
                placeholder="Region"
                onChange={handleChange}
                required
              />
              {error["tutor_region"] && (
                <p className="error-message">{error["tutor_region"]}</p>
              )}
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_address"
                placeholder="Address"
                onChange={handleChange}
                required
              />
              {error["tutor_address"] && (
                <p className="error-message">{error["tutor_address"]}</p>
              )}
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_url"
                placeholder="URL"
                onChange={handleChange}
              />
              {error["tutor_url"] && (
                <p className="error-message">{error["tutor_url"]}</p>
              )}
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="tutor_descript"
                placeholder="Description"
                onChange={handleChange}
                required
              />
              {error["tutor_descript"] && (
                <p className="error-message">{error["tutor_descript"]}</p>
              )}
            </div>
            <div className="form-frame-group">
              <select
                name="subject_id"
                className="subject_id"
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
              {error["tutor_password"] && (
                <p className="error-message">{error["tutor_password"]}</p>
              )}
            </div>
            <button
              type="submit"
              className="submit-form-button"
              disabled={Object.values(error).some((errMsg) => errMsg)}
            >
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
