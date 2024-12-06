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
import "../styles/pages/ManagePage.css";

export default function ClassDetailPage() {
  const { id } = useParams(); // Extract 'id' from the URL
  const role = Cookies.get("role");
  console.log("role", role);
  const links =
    role === "Student"
      ? [{ url: "/student_dashboard", label: "Regitered Class" }]
      : role === "Tutor"
      ? [
          { url: "/tutor_dashboard", label: "Regitered Class" },
          { url: "/create_lesson", label: "Create Lesson" },
        ]
      : [
          { url: "/admin_dashboard", label: "Regitered Class" },
          { url: "/create_class", label: "Create Class" },
          { url: "/create_tutor", label: "Create Tutor" },
          { url: "/create_student", label: "Create Student" },
        ];
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const [classDetail, setClassDetail] = useState({});
  const [lessonList, setLessonList] = useState({});

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    console.log("date", date);

    // Extract the components
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Format the output
    const formattedDate = `${day}/${month}/${year} (${hours}:${minutes}${period})`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchClassDetailData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/${role.toLowerCase()}/${role.toLowerCase()}ClassDetail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClassDetail(res.data.class);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClassDetailData();
  }, []);
  useEffect(() => {
    const fetchLessonListData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/${role.toLowerCase()}/${role.toLowerCase()}LessonClass/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLessonList(res.data.class);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLessonListData();
  }, []);
  console.log("class detail", classDetail);
  console.log("lesson list", lessonList);
  return (
    <div className="class_detail_page">
      <NavBar linkList={links} role={role} username={user.admission_name || user.student_name || user.tutor_name} />
      <main className="page-content">
        <div className="class_info"></div>
        <div className="content-box">
          <table>
            <thead>
              <tr>
                <th>Lesson Topic</th>
                <th>Description</th>
                <th>Note</th>
                <th>URL</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody>
              {!Object.keys(lessonList).length==0 ? (Object.values(lessonList).map((record, index) => (
                <tr key={index}>
                  <td>
                    <Link to={"/lesson_detail/" + record.lesson_id}>
                      {record.lesson_topic}
                    </Link>
                  </td>
                  <td>{record.lesson_descript}</td>
                  <td>{record.lesson_note}</td>
                  <td>{record.lesson_url}</td>
                  <td>
                    {formatDate(record.lesson_startTime)} -{" "}
                    {formatDate(record.lesson_endTime)}
                  </td>
                </tr>
              )))
              : (
                <tr>
                  <td colSpan="5" style={{textAlign:"center"}}>No lesson found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
