import React from "react";
import { set, useForm } from "react-hook-form";
import "../styles/pages/ContactPage.css";
import { NavBar } from "../components/outside/NavBar";
import Footer from "../components/outside/Footer";
import background from "../assets/background.jpg";
import axios from "axios";
import { useState } from "react";
import AlertStatus from "../components/alert/AlertStatus";

export default function ContactPage() {
  const CONTACT_URL = " https://v-academy.onrender.com/api/customer/contact";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (data) => {
    // alert(JSON.stringify(data, null, 2));
    try {
      const response = axios.post(CONTACT_URL, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setSuccess(true);
      setShowMessage(true);
      setMessage(
        "Your registration has been submitted successfully. We will contact you soon."
      );
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setShowMessage(true);
      setMessage(
        "Your registration has been failed. Please try again. " + error
      );
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="reg-full-container">
          <NavBar />
          <div className="register-container">
            <h2>Register for education</h2>
            <p>
              Please complete the form below. V-academy will contact you to
              answer any questions, completely free of charge.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full name"
                    {...register("customer_name", {
                      required: "Full name is required",
                    })}
                  />
                  {errors.fullName && (
                    <span className="error">{errors.fullName.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("customer_email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="error">{errors.email.message}</span>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Phone number"
                    {...register("customer_phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Invalid phone number (10 digits required)",
                      },
                    })}
                  />
                  {errors.phone && (
                    <span className="error">{errors.phone.message}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    placeholder="Birthday"
                    {...register("customer_birthday", {
                      required: "Birthday is required",
                    })}
                  />
                  {errors.birthday && (
                    <span className="error">{errors.birthday.message}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Address"
                  {...register("customer_address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <span className="error">{errors.address.message}</span>
                )}
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Additional description"
                  {...register("customer_extra")}
                />
              </div>
              <button type="submit" className="submit-button">
                Register
              </button>
            </form>
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
}
