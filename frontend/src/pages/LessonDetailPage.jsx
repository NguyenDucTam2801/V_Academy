import { useState, React, useEffect } from "react";
// import { Link } from "react-router-dom";
import "../styles/pages/DetailPageStyle.css";
import axios from "axios";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";
import { useParams } from "react-router-dom";
import { route } from "./routes/route";
import AlertStatus from "../components/alert/AlertStatus";

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
  const [lessonDetail, setLessonDetail] = useState({});

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
    const fetchLessonDetailData = async () => {
      console.log("id", id);
      console.error(
        role === "Tutor" && lessonDetail.lesson_status === "IN PROCESS"
      );
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
        console.log("Lesson Detail", res.data.lesson);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLessonDetailData();
  }, []);
  console.log("Lesson Detail", lessonDetail);
  const handleChangeStatus = async (e) => {
    const status = e.target.value;
    console.log("status", status);
    console.log("role", role);
    if (role !== "Tutor") {
      return;
    }
    try {
      console.log("id", id);
      const res = await axios.put(
        `http://localhost:3001/api/tutor/changeLessonStatus/${id}`,
        { lesson_status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Status", lessonDetail.lesson_status);
  return (
    <div>
      <NavBar
        linkList={links}
        role={role}
        username={user.admission_name || user.student_name || user.tutor_name}
      />
      <main className="detail-content">
        <div className="scrollable-frame">
          <h1>Lesson Detail</h1>
          <div className="lesson-detail-container">
            {lessonDetail && Object.keys(lessonDetail).length > 0 ? (
              <table className="lesson-table" border="1">
                <tbody>
                  <tr>
                    <th className="label">Lesson ID:</th>
                    <td className="value">{lessonDetail.lesson_id}</td>
                  </tr>
                  <tr>
                    <th className="label">Lesson Topic:</th>
                    <td className="value">{lessonDetail.lesson_topic}</td>
                  </tr>
                  <tr>
                    <th className="label">Description:</th>
                    <td className="value">{lessonDetail.lesson_descript}</td>
                  </tr>
                  <tr>
                    <th className="label">Note:</th>
                    <td className="value">{lessonDetail.lesson_note}</td>
                  </tr>
                  <tr>
                    <th className="label">URL:</th>
                    <td className="value">
                      <a
                        href={lessonDetail.lesson_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {lessonDetail.lesson_url}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="label">Period:</th>
                    <td className="value">
                      {formatDate(lessonDetail.lesson_startTime)} -{" "}
                      {formatDate(lessonDetail.lesson_endTime)}
                    </td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td className="value">
                      {/* <b>{lessonDetail.lesson_status}</b> */}
                      {/* <select
                      name="status"
                      id="status"
                      value={lessonDetail.lesson_status}
                      onChange={handleChangeStatus}
                    >
                      <option value="">{lessonDetail.lesson_status}</option>
                      <option value="TO DO">ACTIVE</option>
                      <option value="IN PROCESS">CALLING</option>
                    </select> */}
                      {role === "Tutor" &&
                      lessonDetail.lesson_status === "IN PROCESS" ? (
                        <select
                          name="status"
                          id="status"
                          value={lessonDetail.lesson_status}
                          onChange={handleChangeStatus}
                        >
                          <option value="">{lessonDetail.lesson_status}</option>
                          <option value="FINISHED">FINISHED</option>
                          <option value="CANCELED">CANCELED</option>
                        </select>
                      ) : (
                        <b>{lessonDetail.lesson_status}</b>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="no-lesson">No lesson detail</div>
            )}
          </div>
        </div>
      </main>
      {lessonDetail.length !== 0 ? (
        <AlertStatus message="Get Lesson Detail" status="success" />
      ) : (
        <AlertStatus message="Fail to get lesson detail" status="falied" />
      )}
    </div>
  );
}
