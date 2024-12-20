import { React, useEffect, useState } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import AlertStatus from "../components/alert/AlertStatus";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components/inside/NavBar";
import Cookies from "js-cookie";
import axios from "axios";
import { set } from "react-hook-form";
import { route } from "./routes/route";
import { urlApi } from "./routes/URLAPI.jsx";


export default function CreateClassPage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const navigate = useNavigate();
  const admission_id = user.admission_id;
  const [success, setSuccess] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [studentList, setStudentList] = useState({});
  const [tutorList, setTutorList] = useState({});
  const [courseList, setCourseList] = useState({});
  const [createClassForm, setCreateClassForm] = useState({
    class_name: "",
    class_descript: "",
    course_id: "",
    tutor_id: "",
    student_id: "",
    admission_id: admission_id,
  });
  const links = route.admission_routes;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          urlApi.admission+`/course`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourseList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          urlApi.admission+`/studentList`,
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

  const handleChange = (e) => {
    setCreateClassForm({
      ...createClassForm,
      [e.target.name]: e.target.value,
    });
    console.log("e target value" + e.target.value);
    console.log("e target name" + e.target.name);
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        urlApi.admission+`/addClass`,
        createClassForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Create class successfully");
      console.log(res);
      setSuccess(true);
      console.log("Class Info" + JSON.stringify(createClassForm));
      setShowMessage(true);
      setMessage("Create Class Successfully!");
      console.log(res.data);
      setTimeout(() => {
        navigate("/admin_dashboard");
      }, 2000);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setShowMessage(true);
      console.log("Class Info", JSON.stringify(createClassForm));
      setMessage("Create Fail! " + error);
    }
  };

  const handleChangeCourseTutor = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (value === "") {
      return;
    }
    console.log("value", value);
    console.log("name", name);
    const subject_id = courseList.find((c) => c.course_id === value).subject_id;
    console.log("subject_id", subject_id);
    try {
      const fetchTuotrSubject = await axios.get(
        urlApi.admission+"/getTutorWithSubject/" +
          subject_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response fetch tutor subject", fetchTuotrSubject.data.data);
      setTutorList(fetchTuotrSubject.data.data);
      handleChange(e);
    } catch (err) {
      console.log("error fetch tutor subject", err);
    }
  };
  console.log("Course list " + JSON.stringify(courseList));
  console.log("Student list " + JSON.stringify(studentList));
  console.log("Tutor list " + JSON.stringify(tutorList));
  console.log("Admission ID " + admission_id);

  return (
    <div>
      <NavBar linkList={links} role={role} username={user.admission_name} />
      <div className="create-tutor-container">
        <h2>Update New Class Information</h2>
        <form onSubmit={handleCreateClass}>
          <div className="form-frame">
            <div className="form-frame-group">
              <input
                type="text"
                name="class_name"
                placeholder="Class Name"
                onChange={handleChange}
              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name="class_descript"
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
            <div className="form-frame-group">
              <select name="course_id" onChange={handleChangeCourseTutor}>
                <option value="">Select Course</option>
                {Object.values(courseList).map((course, index) => (
                  <option key={index} value={course.course_id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-frame-group">
              <select name="tutor_id" onChange={handleChange}>
                <option value="">Select Tutor</option>
                {Object.values(tutorList).map((tutor, index) => (
                  <option key={index} value={tutor.tutor_id}>
                    {tutor.tutor_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-frame-group">
              <select name="student_id" onChange={handleChange}>
                <option value="">Select Student</option>
                {Object.values(studentList).map((student, index) => (
                  <option key={index} value={student.student_id}>
                    {student.student_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-frame-group">
              <input
                type="hidden"
                name="admission_id"
                placeholder="Admission ID"
                value={admission_id}
                onChange={handleChange}
                visi
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
