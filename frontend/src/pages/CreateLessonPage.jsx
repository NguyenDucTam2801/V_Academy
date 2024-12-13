import { React, useEffect, useState } from "react";
import "../styles/pages/ManagePage.css";
import AlertStatus from "../components/alert/AlertStatus";
import { NavBar } from "../components/inside/NavBar";
import Cookies from "js-cookie";
import axios from "axios";
import { route } from "./routes/route";
import { useNavigate } from "react-router-dom";

export default function CreateLessonPage() {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  // console.log("role" + role);
  // console.log("user" + JSON.stringify(user));
  const [classList, setClassList] = useState({});
  const [lessonForm, setLessonForm] = useState({
    lesson_topic: "",
    lesson_descript: "",
    lesson_note: "",
    lesson_url: "",
    lesson_startTime: "",
  });
  const [class_id, setClassId] = useState("");
  const [success, setSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const links = route.tutor_routes;
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
        console.log("Fetch class list api", res.data.class);
        setClassList(res.data.class);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    console.log("lessonForm", lessonForm);
    console.log("class_id", class_id);
    try {
      const res = await axios.post(
        `http://localhost:3001/api/tutor/createLessonClass/` + class_id,
        JSON.stringify({
          lesson_topic: lessonForm.lesson_topic,
          lesson_descript: lessonForm.lesson_descript,
          lesson_note: lessonForm.lesson_note,
          lesson_url: lessonForm.lesson_url,
          lesson_startTime: lessonForm.lesson_startTime,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setSuccess(true);
        setShowMessage(true);
        setMessage("Create Lesson Successfully!");
        setTimeout(() => {
          navigate("/class_detail/" + class_id);
        }, 2000);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setShowMessage(true);
      setMessage("Create Failed! " + error.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLessonForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("Class list " + classList);
  return (
    <div>
      <NavBar linkList={links} role={role} username={user.tutor_name} />
      <div className="create-tutor-container">
        <h2>Create New Lesson</h2>
        <form onSubmit={handleCreateLesson}>
          <div className="form-frame">
            {[
              { name: "lesson_topic", type: "text", placeholder: "Topic" },
              {
                name: "lesson_descript",
                type: "text",
                placeholder: "Description",
              },
              { name: "lesson_note", type: "text", placeholder: "Note" },
              { name: "lesson_url", type: "text", placeholder: "URL" },
              {
                name: "lesson_startTime",
                type: "datetime-local",
                placeholder: "Start Time",
              },
            ].map((field) => (
              <div key={field.name} className="form-frame-group">
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={lessonForm[field.name]}
                  onChange={handleChange}
                  required
                />
                {error[field.name] && (
                  <p className="error-message">{error[field.name]}</p>
                )}
              </div>
            ))}
            <div className="form-frame-group">
              <select
                name="class_id"
                id="class_id"
                onChange={(e) => {
                  setClassId(e.target.value);
                }}
              >
                <option value="">Select Class</option>
                {Object.values(classList).map((item) => (
                  <option value={item.class_id}>
                    {item.class_name} (id: {item.student_id})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="submit-form-button"
              disabled={Object.values(error).some((errMsg) => errMsg)}
            >
              Create New
            </button>
          </div>
        </form>
      </div>
      {showMessage && (
        <AlertStatus
          message={message}
          status={success ? "success" : "failed"}
        />
      )}
    </div>
  );
}
