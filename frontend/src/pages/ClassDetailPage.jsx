import React from "react";
import { useParams, Link } from "react-router-dom";
import { NavBar } from "../components/inside/NavBar";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ClassDetailPage() {
  const { id } = useParams(); // Extract 'id' from the URL
  const links = [{ url: "/regitered_class", label: "Regitered Class" }];
  const role = Cookies.get("role");
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
          `http://localhost:3001/api/student/studentClassDetail/${id}`,
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
          `http://localhost:3001/api/student/studentLessonClass/${id}`,
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
      <NavBar linkList={links} role={role} />
      <main className="page-content">
        <div className="class_info"></div>
        <div className="lesson_list">
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
              {Object.values(lessonList).map((record, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
