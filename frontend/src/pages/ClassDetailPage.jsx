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
import{route} from "./routes/route";

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
  const [studentList, setStudentList] = useState({});

  // const formatDate = (timestamp) => {
  //   const date = new Date(timestamp);
  //   console.log("date", date);

  //   // Extract the components
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  //   const year = date.getFullYear();

  //   let hours = date.getHours();
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   const period = hours >= 12 ? "PM" : "AM";

  //   // Convert to 12-hour format
  //   hours = hours % 12 || 12;

  //   // Format the output
  //   const formattedDate = `${day}/${month}/${year} (${hours}:${minutes}${period})`;
  //   return formattedDate;
  // };

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
    <div className="container">
      <NavBar linkList={links} role={role} username={user.admission_name || user.student_name || user.tutor_name} />
        <main className="detail-content">
          <div className="scrollable-frame">
            <div className="lesson-detail-container">
              {Object.keys(classDetail).length > 0 ? (
                Object.values(classDetail).map((record, index) => (
                  <div className="lesson-box" key={index}>
                    <div className="lesson-row">
                      <div className="label">Class Name:</div>
                      <div className="value">
                      <Link to={"/lesson_detail/" + record.lesson_id}>
                          {record.class_name}
                        </Link>
                      </div>
                    </div>
                    <div className="lesson-row">
                      <div className="label">Class Description:</div>
                      <div className="value">{record.class_descript}</div>
                    </div>
                    <div className="lesson-row">
                      <div className="label">Course ID:</div>
                      <div className="value">{record.course_id}</div>
                    </div>
                    <div className="lesson-row">
                      <div className="label">Tutor ID:</div>
                      <div className="value">{record.tutor_id}</div>
                    </div>
                    <div className="lesson-row">
                      <div className="label">Student ID:</div>
                      <div className="value">{record.student_id}</div>
                    </div>
                    <div className="lesson-row">
                      <div className="label">Admission ID:</div>
                      <div className="value">{record.admission_id}</div>
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

    // <div className="container">
    //   <NavBar linkList={links} role={role} username={user.admission_name || user.student_name || user.tutor_name} />
    //   <main className="content">
    //     <div className="class_info"></div>
    //     <div className="content-box">
    //       <table>
    //         <thead>
    //           {/* <tr>
    //             <th>Class Name</th>
    //             <th>Class Description</th>
    //             <th>Course ID</th>
    //             <th>Tuotr ID</th>
    //             <th>Student ID</th>
    //             <th>Admission ID</th>
    //           </tr> */}
    //         </thead>
    //         <tbody>
    //           {Object.keys(classDetail).length > 0 || Object.keys(lessonList).length > 0 || Object.keys(studentList).length > 0 ? (
    // Object.keys(classDetail).length > 0 &&
    // Object.values(classDetail).map((record, index) => (
    //             <tr key={index}>
    //               <tr><th>Class Name</th><td>
    //                 <Link to={"/lesson_detail/" + record.class_id}>
    //                   {record.class_name}
    //                 </Link>
    //               </td></tr>
                  
    //               <tr><th>Class Description</th>
    //               <td>{record.class_descript}</td></tr>
    //               <tr><th>Course ID</th>
    //                 <td>{record.course_id}</td>
    //               </tr>
    //               <tr><th>Tutor ID</th>
    //                 <td>{record.tutor_id}</td>
    //               </tr>
    //               <tr><th>Student ID</th>
    //                 <td>{record.student_id}</td>
    //               </tr>
    //               <tr><th>Admission ID</th>
    //                 <td>{record.admission_id}</td>
    //               </tr>
    //             </tr>
    //           )))
    //           : (
    //             <tr>
    //               <td colSpan="5" style={{textAlign:"center"}}>No lesson found</td>
    //             </tr>
    //           )}
              
    //         </tbody>
    //       </table>
    //     </div>
    //   </main>
    // </div>
  );
}
