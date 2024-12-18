import React, { useState, useEffect } from "react";
import { NavBar } from "../components/inside/NavBar";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/ManagePage.css";
import AlertStatus from "../components/alert/AlertStatus";
import { route } from "./routes/route";
import regexTesting from "./regexTest/regexTesting";

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
  const [error, setError] = useState({});
  const links =
    role === "student"
      ? route.student_routes
      : role === "tutor"
      ? route.tutor_routes
      : route.admission_routes;
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

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
  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
    if (!regexTesting(name, value, role)) {
      setError((prev) => ({
        ...prev,
        [name]: `Invalid ${name.replace(
          "_",
          " "
        )}. Please follow the correct format.`,
      }));
    } else {
      setError((prev) => ({
        ...prev,
        [name]: "",
      })); // Clear error if input is valid
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    console.log("e target", e.target.value);
    console.log("e name", e.target.name);
    if (!regexTesting(name, value, "Tutor")) {
      setError((prev) => ({
        ...prev,
        [name]: `Invalid ${name.replace(
          "_",
          " "
        )}. Please follow the correct format.`,
      }));
    } else {
      setError((prev) => ({
        ...prev,
        [name]: "",
      })); // Clear error if input is valid
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        ` https://v-academy.onrender.com/api/${role.toLowerCase()}/update/${
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

  const changePassword = async (e) => {
    e.preventDefault();

    if (password.new !== password.confirm) {
      setSuccess(false);
      setShowMessage(true);
      setMessage("New password and confirmation password do not match.");
      return;
    }

    try {
      console.log("Changing password", password);

      const res = await axios.put(
        ` https://v-academy.onrender.com/api/${role.toLowerCase()}/changePassword/${
          user.student_id || user.tutor_id || user.admission_id
        }`,
        {
          current_password: password.current,
          new_password: password.new,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        console.log("Password updated successfully");
        setMessage("Password updated successfully");
        setShowMessage(true);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Clear form fields
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setSuccess(false);
      setShowMessage(true);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to update password. Please try again.";
      setMessage(errorMessage);
    }
  };

  const udpateUserInfo = async () => {
    try {
      const res = await axios.get(
        ` https://v-academy.onrender.com/api/${role.toLowerCase()}/info/${
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
      <NavBar
        linkList={links}
        role={role}
        username={user.admission_name || user.tutor_name || user.student_name}
      />
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
              {error[`${role.toLowerCase()}_name`] && (
                <p className="error-message">
                  {error[`${role.toLowerCase()}_name`]}
                </p>
              )}
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
              {error[`${role.toLowerCase()}_birth`] && (
                <p className="error-message">
                  {error[`${role.toLowerCase()}_birth`]}
                </p>
              )}
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
              {error[`${role.toLowerCase()}_phone`] && (
                <p className="error-message">
                  {error[`${role.toLowerCase()}_phone`]}
                </p>
              )}
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
              {error[`${role.toLowerCase()}_address`] && (
                <p className="error-message">
                  {error[`${role.toLowerCase()}_address`]}
                </p>
              )}
            </div>
            <button type="submit" className="submit-form-button">
              Accept Modification
            </button>
          </div>
        </form>
        <hr></hr>
        <div className="change-password-form">
          <h2>Change Password</h2>
          <form onSubmit={changePassword}>
            <div className="form-frame">
              <div className="form-frame-group">
                <input
                  type="password"
                  placeholder="Current Password"
                  id="currentPassword"
                  name="current"
                  value={password.current}
                  onChange={handleChangePassword}
                  required
                />
              </div>
              <div className="form-frame-group">
                <input
                  type="password"
                  placeholder="New Password"
                  id="newPassword"
                  name="new"
                  value={password.new}
                  onChange={handleChangePassword}
                  required
                />
              </div>
              <div className="form-frame-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  name="confirm"
                  value={password.confirm}
                  onChange={handleChangePassword}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-form-button">
              Change Password
            </button>
          </form>
        </div>
      </div>
      {showMessage &&
        (!success ? (
          <AlertStatus message={message} status="failed" />
        ) : (
          <AlertStatus message={message} status="success" />
        ))}
    </div>
  );
}
