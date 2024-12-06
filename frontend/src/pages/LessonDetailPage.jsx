import { useState, React, useEffect } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
import AlertStatus from "../components/alert/AlertStatus";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";
import { useParams } from "react-router-dom";

export default function LessonDetailPage() {
  const { id } = useParams(); // Extract 'id' from the URL
  const role = Cookies.get("role");
  const links = role === "Student" 
  ? [{ url: "/student_dashboard", label: "Regitered Class" }] 
  : role === "Tutor" 
  ? [{ url: "/tutor_dashboard", label: "Regitered Class" }, { url: "/create_lesson", label: "Add Class" }] 
  : [{ url: "/admin_dashboard", label: "Regitered Class" },
    { url: "/create_class", label: "Create Class" },
    { url: "/create_tutor", label: "Create Tutor" },
    { url: "/create_student", label: "Create Student" }
  ];
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const [lessonDetail, setLessonDetail] = useState({});
  useEffect(() => {
    const fetchClassDetailData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/${role.toLowerCase()}/${role.toLowerCase()}LessonDetail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLessonDetail(res.data.lesson);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClassDetailData();
  }, []);
  console.log("lessonDetail", lessonDetail);
  return (
    <div>
      <NavBar linkList={links} role={role} username={user.admission_name || user.student_name || user.tutor_name}/>
    </div>
  )
}
