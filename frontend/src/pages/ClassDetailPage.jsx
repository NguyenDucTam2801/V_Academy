import { useState, React, useEffect } from "react";
// import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
// import AlertStatus from "../components/alert/AlertStatus";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";
import { useParams } from "react-router-dom";
import "../styles/pages/DetailPageStyle.css";
import { route } from "./routes/route";

export default function ClassDetailPage() {
  const { id } = useParams(); // Extract 'id' from the URL
  const role = Cookies.get("role");
  console.log("role", role);
  const links =
    role === "Student"
      ? route.student_routes
      : role === "Tutor"
      ? route.tutor_routes
      : route.admission_routes;
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
        // console.log("Lesson response", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLessonListData();
  }, []);

  console.log("Role", role);
  console.log("User", user);
  console.log("ID", id);
  console.log("token", token);
  console.log("class detail", classDetail);
  console.log("lesson list", lessonList);
  return (
    <div className="container">
      <NavBar
        linkList={links}
        role={role}
        username={user.admission_name || user.student_name || user.tutor_name}
      />
      <div className="content">
        <div className="content-class-detail">
          <h2>Class Detail</h2>
          <table>
            {Object.keys(classDetail).length > 0 ? (
              <tbody>
                <tr>
                  <th>Class ID</th>
                  <td>{classDetail[0].class_id}</td>
                </tr>
                <tr>
                  <th>Class Name</th>
                  <td>{classDetail[0].class_name}</td>
                </tr>
                <tr>
                  <th>Class description</th>
                  <td>{classDetail[0].class_descript}</td>
                </tr>
                <tr>
                  <th>Course ID</th>
                  <td>{classDetail[0].course_id}</td>
                </tr>
                <tr>
                  <th>Tutor ID</th>
                  <td>{classDetail[0].tutor_id}</td>
                </tr>
                <tr>
                  <th>Student ID</th>
                  <td>{classDetail[0].student_id}</td>
                </tr>
                <tr>
                  <th>Admission ID</th>
                  <td>{classDetail[0].admission_id}</td>
                </tr>
              </tbody>
            ) : null}
          </table>
        </div>
        <div className="content-lesson-list">
          <h2>Lesson List</h2>
          <table>
            <thead>
              <tr>
                <th>Topic</th>
                <th>Lesson Description</th>
                <th>Note</th>
                <th>URL</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(lessonList).length > 0 ? (
                Object.values(lessonList).map((record, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={"/lesson_detail/" + record.lesson_id}>
                        {record.lesson_topic}
                      </Link>
                    </td>
                    <td>{record.lesson_descript}</td>
                    <td>{record.lesson_note}</td>
                    <td>{record.lesson_url}</td>
                    <td>{formatDate(record.lesson_startTime)}</td>
                    <td>{formatDate(record.lesson_endTime)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No lesson found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
