import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/styles/main.css';
import './styles.css';

function Settings() {
  const navigate = useNavigate();
  const [sessionTimeout, setSessionTimeout] = useState(5);
  const [testRunInterval, setTestRunInterval] = useState(0);
  const [maxTestRuns, setMaxTestRuns] = useState(0);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(3);

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
      <main className="page-wrap">
        <h2 className="page-title">General Settings</h2>
        <div className="settings-form">
          <div className="form-group">
            <label>Login Session Cookie Expiry Time (mins)</label>
            <input
              type="number"
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>No. of Test Runs Interval Gap (seconds)</label>
            <input
              type="number"
              value={testRunInterval}
              onChange={(e) => setTestRunInterval(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Max. Number of Test Runs</label>
            <input
              type="number"
              value={maxTestRuns}
              onChange={(e) => setMaxTestRuns(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Max Invalid Userlogin Attempt Counts</label>
            <input
              type="number"
              min="3"
              value={maxLoginAttempts}
              onChange={(e) => setMaxLoginAttempts(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button className="btn-primary" onClick={handleSave}>
              Save
            </button>
            <button className="btn-primary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;