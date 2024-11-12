import React, { useState } from "react";
import { NavBar } from "../components/outside/NavBar";
import "../styles/pages/LoginPage.css";

export const LoginPage = () => {
  const roles = ["Student", "Turtor", "Admission"];
  const [role, setRole] = useState(roles[2]);

  return (
    <div>
      <NavBar />
      <div className="container">
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
            <form action="/login" method="post">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />
              <br />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required />
              <br />
              <input type="submit" value="Login" />
            </form>
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};
