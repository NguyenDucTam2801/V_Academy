import { useState, React, useEffect } from "react";
import "../styles/pages/ManagePage.css";
import logo from "../assets/logo.png";
import { route } from "./routes/route";
import { Link, useNavigate } from "react-router-dom";
// import Data from "../Sample/StdSampleData.json";
import axios from "axios";
import AlertStatus from "../components/alert/AlertStatus";
import Cookies from "js-cookie";
import { NavBar } from "../components/inside/NavBar";
import { set } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CustomerListPage() {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const role = Cookies.get("role").toLowerCase();
  console.log("role" + role);
  console.log("user" + JSON.stringify(user));
  const [customerList, setCustomerList] = useState({});
  const links = route.admission_routes;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/admission/customerContactList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Customer List " + JSON.stringify(res.data.data));
        setCustomerList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const handleChangeStatus = async (e) => {
    const id = e.target.parentNode.parentNode.children[0].innerText;
    const status = e.target.value;
    try {
      const res = await axios.put(
        `http://localhost:3001/api/admission/changeCustomerContactStatus/${id}`,
        { status },
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
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const deleteCustomer = async (e) => {
    const response = window.confirm("Are you sure you want to delete this customer?");
    if (response) {
      const id = e.target.parentNode.children[0].innerText;
      try {
        const res = await axios.delete(
          `http://localhost:3001/api/admission/deleteCustomerInfo/${id}`,
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
    }
  }
  return (
    <div className="container">
      <NavBar linkList={links} role={role} username={user.admission_name} />

      {/* data table */}
      <main className="content">
        <div className="content-box">
          {/* {
          Data.map( record => {
            return(
              <div>
                {record.CourseID}
                {record.CourseName}
                {record.TutorID}
                {record.TutorName}
                {record.TutorPhone}
                {record.TutorEmail}
                {record.StartTime}
                {record.EndTime}
              </div>
            )
          })
        } */}
          <div className="header">
            <h1>Customer List</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Birthday</th>
                <th>Description</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {customerList.length !== 0 ? (
                Object.values(customerList).map((record, index) => (
                <tr key={index}>
                  <td>{record.customer_id}</td>
                  <td>{record.customer_name}</td>
                  <td>{record.customer_email}</td>
                  <td>{record.customer_phone}</td>
                  <td>{record.customer_address}</td>
                  <td>{formatDate(record.customer_birthday)}</td>
                  <td>{record.customer_extra}</td>
                  <td>
                    <select
                      name="status"
                      id="status"
                      value={record.customer_status}
                      onChange={handleChangeStatus}
                    >
                      <option value="TO DO">ACTIVE</option>
                      <option value="IN PROCESS">CALLING</option>
                      <option value="FINISHED">FINISHED</option>
                      <option value="CANCELED">CANCELED</option>
                    </select>
                  </td>
                  <td className="delete" onClick={deleteCustomer}>
                  <FontAwesomeIcon icon="trash" />
                  </td>
                </tr>
              ))):(
                <tr>
                  <td colSpan="9">No Customer found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      {customerList.length !== 0 ? (
        <AlertStatus message="Update Customer" status="success" />
      ):(
        <AlertStatus message="Update Customer" status="falied" />
      )}
    </div>
  );
}
