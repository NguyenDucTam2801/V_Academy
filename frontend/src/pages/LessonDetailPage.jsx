import { useState, React, useEffect } from "react";
// import { Link } from "react-router-dom";
import "../styles/pages/DetailPageStyle.css";
// import "../styles/pages/ManagePage.css"
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";
import { useParams } from "react-router-dom";
import {route} from "./routes/route";

export default function LessonDetailPage() {
  const { id } = useParams(); // Extract 'id' from the URL
  const role = Cookies.get("role");
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
  const [studentList, setStudentList] = useState({});
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
  // useEffect(() => {
  //   const fetchLessionDetailData = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:3001/api/${role.toLowerCase()}/${role.toLowerCase()}LessonClass/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setLessonDetail(res.data.lesson);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchLessionDetailData();
  // }, []);
  // console.log("lessonDetail", lessonDetail);

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
  }, [id, role, token]);
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
  }, [id, role, token]);
  useEffect(() => {
    const fetchStudentListData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/${role.toLowerCase()}/${role.toLowerCase()}StudentClass/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudentList(res.data.class);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentListData();
  }, [id, role, token]);
  console.log("class detail", classDetail);
  console.log("lesson list", lessonList);
  console.log("lesson list", studentList);

  return (
    <div>
      <NavBar
        linkList={links}
        role={role}
        username={user.admission_name || user.student_name || user.tutor_name}
      />
    <main className="detail-content">
      <div className="scrollable-frame">
        <div className="lesson-detail-container">
          {Object.keys(lessonList).length > 0 ? (
            Object.values(lessonList).map((record, index) => (
              <div className="lesson-box" key={index}>
                <div className="lesson-row">
                  <div className="label">Lesson ID:</div>
                  <div className="value">{record.lesson_id}</div>
                </div>
                <div className="lesson-row">
                  <div className="label">Lesson Topic:</div>
                  <div className="value">{record.lesson_topic}</div>
                </div>
                <div className="lesson-row">
                  <div className="label">Description:</div>
                  <div className="value">{record.lesson_descript}</div>
                </div>
                <div className="lesson-row">
                  <div className="label">Note:</div>
                  <div className="value">{record.lesson_note}</div>
                </div>
                <div className="lesson-row">
                  <div className="label">URL:</div>
                  <div className="value">
                    <a href={record.lesson_url} target="_blank" rel="noopener noreferrer">
                      {record.lesson_url}
                    </a>
                  </div>
                </div>
                <div className="lesson-row">
                  <div className="label">Period:</div>
                  <div className="value">
                    {formatDate(record.lesson_startTime)} - {formatDate(record.lesson_endTime)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-lesson">No lesson found</div>
          )}
        </div>
      </div>
    </main>
    </div>
  );
}
