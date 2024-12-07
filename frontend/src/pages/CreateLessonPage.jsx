import { React, useEffect, useState } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import AlertStatus from "../components/alert/AlertStatus";
import { Link } from "react-router-dom";
import {NavBar} from "../components/inside/NavBar";
import Cookies from "js-cookie";
import axios from "axios";


export default function CreateLessonPage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const [classList, setClassList] = useState({});
  const [lessonForm, setLessonForm] = useState({
    lesson_topic: "",
    lesson_descript: "",
    lesson_note: "",
    lesson_url: "",
    lesson_startTime: "",
  });
  const links = [
    { url: "/tutor_dashboard", label: "Regitered Class" },
    { url: "/create_lesson", label: "Create Lesson" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/tutor/tutorClass/${user.tutor_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClassList(res.data.class);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCreateLesson = async (class_id) => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/tutor/createLessonClass/${class_id}`,
        lessonForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Class list " + JSON.stringify(classList));
  return (
    <div>
      <NavBar linkList={links} role={role} username={user.tutor_name} />
      </div>
  )
}
