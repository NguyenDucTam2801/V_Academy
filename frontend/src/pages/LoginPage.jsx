import React, { useState, useNavigate, useEffect, useRef, useContext } from "react";
import { NavBar } from "../components/outside/NavBar";
import "../styles/pages/LoginPage.css";
import background from "../assets/background.jpg";
import Footer from "../components/outside/Footer";
import { studentURL, tutorURL, admissionURL } from "../api/axios";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import AlertStatus from "../components/alert/AlertStatus";
import { set } from "react-hook-form";

export const LoginPage = () => {
  const userRef = useRef();
  const { setAuth } = useContext(AuthContext);

  const roles = ["Student", "Turtor", "Admission"];
  const passwordVisibleActionList = ["Show", "Hide"];
  const passwordFieldTypeList = ["password", "text"];
  const [role, setRole] = useState(roles[0]);
  const [formData, setFormData] = useState({
    role: role,
    email: "",
    password: "",
  });

  const LOGIN_URL =
    role === "Student"
      ? "http://localhost:3001/api/students/studentSignIn"
      : role === "Turtor"
      ? "http://localhost:3001/api/tutor/tutorSignIn"
      : "http://localhost:3001/api/admissions/admissionSignIn";
  const [success, setSuccess] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordFieldType, setPasswordFieldType] = useState(
    passwordFieldTypeList[0]
  );

  // const navigate = useNavigate();

  const [passwordVisibleAction, setPasswordVisibleAction] = useState(
    passwordVisibleActionList[0]
  );
  const [passordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passordVisibility);
    setPasswordVisibleAction(
      passwordVisibleActionList[passordVisibility ? 0 : 1]
    );
    setPasswordFieldType(passwordFieldTypeList[passordVisibility ? 0 : 1]);
  };

  const handleChangeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowMessage(false);
    setMessage("");
    setSuccess(false);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      localStorage.setItem("token", JSON.stringify(response?.data?.token));
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      setSuccess(true);
      setMessage("You logged in.");
      setShowMessage(true);
      console.log(JSON.stringify(response?.data?.token));
      console.log(JSON.stringify(response));

      // setAuth({
      //   userName: accessToken.userName,
      //   password: accessToken.password,
      //   role,
      //   accessToken,
      // });
      setFormData({
        role: roles[0],
        email: "",
        password: "",
      });
    } catch (err) {
      if (err?.response) {
        setMessage("Login Error");
        console.log(err.response);
        setSuccess(false);
      } else if (err.response?.status === 400) {
        setMessage("Invalid credentials");
        console.log(err.response);

        setSuccess(false);
      } else if (err.response?.status === 404) {
        console.log(err.response);

        setMessage("User not found");
        setSuccess(false);
      }

      setShowMessage(true);
    }
  };

  useEffect(() => {
    // userRef.current.focus();
    console.log("Show mess: ", showMessage);
    console.log("Success: ", success);
    console.log("Message: ", message);
  }, [success, showMessage, message]);

  return (
    <div>
      <NavBar />
      <div
        className="login-container"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="role-box">
          <h1>You are</h1>
          <ul className="role-list">
            {roles.map((r, i) => {
              return (
                <li
                  key={i}
                  className={role === r ? `${r} active` : r}
                  onClick={() => handleChangeRole({ target: { value: r } })}
                >
                  {r}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="login-box">
          <h1>Login {role}</h1>
          <div className="input-box">
            <div className="form-input">
              <form onSubmit={handleSignIn} method="post">
                <label htmlFor="email">Email</label>
                <input
                  ref={userRef}
                  type="email"
                  name="email"
                  value={formData.email}
                  className="email"
                  onChange={handleChangeForm}
                  required
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                  type={passwordFieldType}
                  name="password"
                  className="password"
                  value={formData.password}
                  onChange={handleChangeForm}
                  required
                />
                <div className="password-visibility">
                  <input
                    type="checkbox"
                    id="show-password"
                    onClick={togglePasswordVisibility}
                  />
                  <p>{passwordVisibleAction} Password</p>
                </div>
                <br />
                <input type="submit" value="Login" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {showMessage &&
        (success ? (
          <AlertStatus message={message} status="success" />
        ) : (
          <AlertStatus message={message} status="failed" />
        ))}
    </div>
  );
};
