import React from 'react';
import './styles.css';

const SessionExpiredAlert = ({ onLogin }) => {
  return (
    <div className="session-expired-alert-overlay">
      <div className="session-expired-alert">
        <p>Your session has expired. Please login again.</p>
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  );
};

export default SessionExpiredAlert;