import React, { useState } from "react";
import { NavBar } from "../components/outside/NavBar";
import "../styles/pages/LoginPage.css";
import background from "../assets/background.jpg";
import Footer from "../components/outside/Footer";

export const LoginPage = () => {
  const roles = ["Student", "Turtor", "Admission"];
  const passwordVisibleActionList = ["Show", "Hide"];
  const passwordFieldTypeList = ["password", "text"];
  const [role, setRole] = useState(roles[2]);
  const [passwordFieldType, setPasswordFieldType] = useState(
    passwordFieldTypeList[0]
  );
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

  return (
    <div>
      <NavBar />
      <div className="container" style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="role-box">
          <h1>You are</h1>
          <ul className="role-list">
            {roles.map((r, i) => {
              console.log(role, r);
              return (
                <li
                  key={i}
                  className={role === r ? `${r} active` : r}
                  onClick={() => setRole(r)}
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
            <div class="form-input">
              <form action="/login" method="post">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
                <br />
                <label htmlFor="password">Password</label>
                <input
                  type={passwordFieldType}
                  name="password"
                  className="password"
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
          <div className="forgot-password">
            <a href="/forgot-password">
              Forgot password? <b>Click Here</b>
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
