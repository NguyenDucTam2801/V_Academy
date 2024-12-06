import { useState, React, useEffect } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
import AlertStatus from "../components/alert/AlertStatus";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";

export default function CreateTutorPage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role");
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const [tutorInfo, setTutorInfo] = useState({
    tutor_name: "",
    tutor_birth: "",
    tutor_email: "",
    tutor_phone: "",
    tutor_region: "",
    tutor_address: "",
    tutor_url: "",
    tutor_descript: "",
    subject_id: "",
  });
  const [subjectList, setSubjectList] = useState([]);
  const links = [
    { url: "/admin_dashboard", label: "Regitered Class" },
    { url: "/create_class", label: "Create Class" },
    { url: "/create_tutor", label: "Create Tutor" },
    { url: "/create_student", label: "Create Student" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/admission/subject", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubjectList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    setTutorInfo({ ...tutorInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/admission/createTutor",
        tutorInfo,
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
  console.log("Subject list " + JSON.stringify(subjectList));
  return <div>
  <NavBar linkList={links} role={role} />
  </div>;
}
