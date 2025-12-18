import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../../assets/styles/main.css';
import './styles.css';

function Settings() {
  const navigate = useNavigate();
  const [sessionTimeout, setSessionTimeout] = useState(5);
  const [testRunInterval, setTestRunInterval] = useState(0);
  const [maxTestRuns, setMaxTestRuns] = useState(0);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(3);
  const [senderEmail, setSenderEmail] = useState('noreply@delta.com');
  const [smtpUser, setSmtpUser] = useState('smtp_user@delta.com');
  const [password, setPassword] = useState('1234567890');
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    // Implement save logic here
    console.log('Settings saved:', {
      sessionTimeout,
      testRunInterval,
      maxTestRuns,
      maxLoginAttempts,
    });
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="page-bg">
      <main className="center-wrap">
        <div className="card form-card-settings">
          <h2 className="card-title">General Settings</h2>
          <form className="form">
            <div className="row">
              <div className="col-md-12">
                <label className="label">
                  Login Session Timeout Duration (minutes)
                  <input
                    className="input"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  />
                </label>
                <label className="label">
                  Maximum Login Attempts Before Lockout
                  <input
                    className="input"
                    type="number"
                    min="3"
                    value={maxLoginAttempts}
                    onChange={(e) => setMaxLoginAttempts(e.target.value)}
                  />
                </label>
                <label className="label">
                  Test Execution Interval (seconds)
                  <input
                    className="input"
                    type="number"
                    value={testRunInterval}
                    onChange={(e) => setTestRunInterval(e.target.value)}
                  />
                </label>
                <label className="label">
                  Maximum Allowed Test Runs
                  <input
                    className="input"
                    type="number"
                    value={maxTestRuns}
                    onChange={(e) => setMaxTestRuns(e.target.value)}
                  />
                </label>
                <label className="label">
                  Sender Email Address for Password Reset
                  <input
                    className="input"
                    value={senderEmail}
                  />
                </label>
                <label className="label">
                  SMTP Authentication Username(for Sender Email)
                  <input
                    className="input"
                    value={smtpUser}
                  />
                </label>
                <label className="label">
                  SMTP Authentication Password(for Sender Email)
                  <div className="pwd-row">
                    <input
                      className="input has-icon"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="pwd-eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </label>
              </div>
            </div>
            <div className="action-btns action-btns-save center">
              <button type="button" className="btn-primary" onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Settings;