import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import "../../../assets/styles/main.css";

const SessionExpiredAlert = ({ onLoginRedirect }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    if (onLoginRedirect) {
      onLoginRedirect();
    }
    navigate("/login");
  };

  return (
    <div className="session-expired-container">
      <div className="session-expired-alert">
        <h2 className="page-title">Session Expired</h2>
        <p>Your session has expired. Please log in again.</p>
        <button className="btn-primary" onClick={handleLoginRedirect}>Login</button>
      </div>
    </div>
  );
};

export default SessionExpiredAlert;