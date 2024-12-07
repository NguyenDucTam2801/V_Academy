import React, { useState, useEffect } from 'react'
import { NavBar } from "../components/inside/NavBar";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/ManagePage.css";

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
    const links = [
        { url: "/tutor_list", label: "Tutor List" },
        { url: "/student_list", label: "Student List" },
      ];
    const [userInfo, setUserInfo]=useState({
        [role+"_name"]: "",
        [role+"_birth"]: "",
        [role+"_phone"]: "",
        [role+"_address"]: "",
    })
    const handleChange = (e) => {
        setUserInfo({
          ...userInfo,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.put(
            `http://localhost:3001/api/${role.toLowerCase()}/update/${user.student_id || user.tutor_id || user.admission_id}`,
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
            }
            }
            catch (error) {
              console.log(error);
              setSuccess(false);
              setShowMessage(true);
              setMessage("Modify Fail! "+error);
            }
        }
        useEffect(()=>{
            const fetchData = async () => {
                try {
                  const res = await axios.get(
                    `http://localhost:3001/api/${role.toLowerCase()}/info/${user.student_id || user.tutor_id || user.admission_id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  setUserInfo(res.data.class);
                } catch (error) {
                  console.log(error);
                }
              };
              fetchData();
        })
  return (
    <div>
        <NavBar linkList={links} role={role} username={user.admission_name}/>
        <div className="create-tutor-container">
        <h2>Modify {user.student_name||user.tutor_name||user.admission_name} Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-frame">
            <div className="form-frame-group">
              <input
                type="text"
                name={`${role}_name`}
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-frame-group">
              <input
                type="date"
                name={`${role}_birth`}
                placeholder="Birthday"
                onChange={handleChange}
                required

              />
            </div>
            <div className="form-frame-group">
              <input
                type="email"
                name={`${role}_phone`}
                placeholder="Email"
                onChange={handleChange}
                required

              />
            </div>
            <div className="form-frame-group">
              <input
                type="text"
                name={`${role}_address`}
                placeholder="Phone Number"
                onChange={handleChange}
                required

              />
            </div>
            <button type="submit" className="submit-form-button">
              Accept Modification
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
