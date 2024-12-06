import { React, useEffect, useState } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import AlertStatus from "../components/alert/AlertStatus";
import { Link } from "react-router-dom";
import { NavBar } from "../components/inside/NavBar";
import Cookies from "js-cookie";
import axios from "axios";
import { set } from "react-hook-form";

export default function CreateClassPage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const admission_id = user.admission_id;
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
  const links = [
    { url: "/admin_dashboard", label: "Regitered Class" },
    { url: "/create_class", label: "Create Class" },
    { url: "/create_tutor", label: "Create Tutor" },
    { url: "/create_student", label: "Create Student" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/admission/course`,
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

  const handleCreateClass=async()=>{
    try {
      const res = await axios.post(
        `http://localhost:3001/api/admission/addClass`,
        createClassForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log("Course list " + JSON.stringify(courseList));
  console.log("Student list " + JSON.stringify(studentList));
  console.log("Tutor list " + JSON.stringify(tutorList));
  console.log("Admission ID " + admission_id);
  return (
    <div>
      <NavBar linkList={links} role={role} />
    </div>
  );
}
