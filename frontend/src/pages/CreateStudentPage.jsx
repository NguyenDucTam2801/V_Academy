import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { NavBar } from "../components/inside/NavBar";
import AlertStatus from "../components/alert/AlertStatus";
import regexTesting from "./regexTest/regexTesting";
import { route } from "./routes/route";

export default function CreateStudentPage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const [studentInfo, setStudentInfo] = useState({
    student_name: "",
    student_birth: "",
    student_email: "",
    student_phone: "",
    student_address: "",
    student_url: "",
    student_descript: "",
    student_password: "",
  });

  const links = route.admission_routes;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate input and set error message
    if (!regexTesting(name, value, "Student")) {
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

    // Ensure no errors exist before submission
    const hasErrors = Object.values(error).some((errMsg) => errMsg);
    if (hasErrors) {
      setMessage("Please fix all errors before submitting.");
      setShowMessage(true);
      return;
    }

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
      if (res.status === 200) {
        setSuccess(true);
        setShowMessage(true);
        setMessage("Create Successfully!");
        setTimeout(() => {
          navigate("/student_list");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setShowMessage(true);
      setMessage("Create Failed! " + error.message);
    }
  };

  return (
    <div>
      <NavBar linkList={links} role={role} username={user.admission_name} />
      <div className="create-tutor-container">
        <h2>Create New Student Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-frame">
            {[
              { name: "student_name", type: "text", placeholder: "Full Name" },
              { name: "student_birth", type: "date", placeholder: "Birthday" },
              { name: "student_email", type: "email", placeholder: "Email" },
              {
                name: "student_phone",
                type: "text",
                placeholder: "Phone Number",
              },
              { name: "student_address", type: "text", placeholder: "Address" },
              { name: "student_url", type: "text", placeholder: "URL" },
              {
                name: "student_descript",
                type: "text",
                placeholder: "Description",
              },
              {
                name: "student_password",
                type: "password",
                placeholder: "Password",
              },
            ].map((field) => (
              <div key={field.name} className="form-frame-group">
                {field.name !== "student_url" ? (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={studentInfo[field.name]}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={studentInfo[field.name]}
                    onChange={handleChange}
              
                  />
                )}
                {error[field.name] && (
                  <p className="error-message">{error[field.name]}</p>
                )}
              </div>
            ))}
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
      {showMessage && (
        <AlertStatus
          message={message}
          status={success ? "success" : "failed"}
        />
      )}
    </div>
  );
}
