import React from "react";
import "../../styles/components/alert/AlertStatus.css";

function AlertStatus({ message, status }) {
  return (
    <div className={`${status} alert`}>
      <span
        className="closebtn"
        onClick={(e) => {
          e.target.parentElement.style.display = "none";
        }}
      >
        &times;
      </span>
      {status == "success" && (
        <p>
          <strong>Successfully!</strong> {message}
        </p>
      )}
      {status == "failed" && (
        <p>
          <strong>Failed</strong> {message}
        </p>
      )}
    </div>
  );
}

export default AlertStatus;
