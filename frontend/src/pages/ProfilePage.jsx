import React, { useState, useEffect } from "react";
import { NavBar } from "../components/inside/NavBar";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/ManagePage.css";
import AlertStatus from "../components/alert/AlertStatus";
import {route} from "./routes/route";

export default function ProfilePage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  let role = Cookies.get("role");
  role = role.toLowerCase();
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const navigate = useNavigate();
  const [success, setSuccess] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const links =
    role === "student"
      ? route.student_routes
      : role === "tutor"
      ? route.tutor_routes
      : route.admission_routes;
  const [userInfo, setUserInfo] = useState({
    [role + "_name"]:
      user.student_name || user.tutor_name || user.admission_name,
    [role + "_birth"]:
      user.student_birth || user.tutor_birth || user.admission_birth,
    [role + "_phone"]:
      user.student_phone || user.tutor_phone || user.admission_phone,
    [role + "_address"]:
      user.student_address || user.tutor_address || user.admission_address,
  });
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
    console.log("e target", e.target.value);
    console.log("e name", e.target.name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3001/api/${role.toLowerCase()}/update/${
          user.student_id || user.tutor_id || user.admission_id
        }`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        console.log("Modify successfully");
        setSuccess(true);
        setShowMessage(true);
        setMessage("Modify Successfully!");
        udpateUserInfo();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setShowMessage(true);
      setMessage("Modify Fail! " + error);
    }
  };

  const udpateUserInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/${role.toLowerCase()}/info/${
          user.student_id || user.tutor_id || user.admission_id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        Cookies.set("user", JSON.stringify(res?.data?.user), { path: "/" });
        console.log("user updated", res?.data.user);
        setUserInfo({
          [role + "_name"]: res.data.user[role + "_name"],
          [role + "_birth"]: res.data.user[role + "_birth"],
          [role + "_phone"]: res.data.user[role + "_phone"],
          [role + "_address"]: res.data.user[role + "_address"],
        });
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setShowMessage(true);
      setMessage("Get user info Fail! " + error);
    }
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useState(() => {
    udpateUserInfo();
  }, []);
  console.log("user info", user);
  return (
    <div>
      <NavBar linkList={links} role={role} username={user.admission_name} />
      <div className="create-tutor-container">
        <h2>
          Modify {user.student_name || user.tutor_name || user.admission_name}{" "}
          Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-frame">
            <div className="form-frame-group">
              <input
                type="text"
                name={`${role}_name`}
                placeholder="Full Name"
                onChange={handleChange}
                value={userInfo[`${role}_name`]}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="date"
                name={`${role}_birth`}
                placeholder="Birthday"
                onChange={handleChange}
                value={formatDate(userInfo[`${role}_birth`])}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name={`${role}_phone`}
                placeholder="Phone Number"
                onChange={handleChange}
                value={userInfo[`${role}_phone`]}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name={`${role}_address`}
                placeholder="Address"
                onChange={handleChange}
                value={userInfo[`${role}_address`]}
                required
              />
            </div>
            <button type="submit" className="submit-form-button">
              Accept Modification
            </button>
          </div>
        </form>
      </div>
      {showMessage && (!success ? (
        <AlertStatus message={message} status="failed" />
      ):(<AlertStatus message={message} status="success" />))}
    </div>
  );
}
