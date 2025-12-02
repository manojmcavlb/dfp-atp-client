import React, { useState } from 'react';
import '../../../assets/styles/main.css';
import './styles.css';

const ErrorLog = () => {
  const [logs, setLogs] = useState([
    {
      timestamp: '2025-12-01 14:22:11',
      type: 'Error',
      code: 'E102',
      source: 'IO-Board',
      severity: 'High',
      message: 'Voltage out of range',
      details: {
        voltage: '16.2V',
        threshold: '12V',
        interval: '10ms',
        psu: 'Running',
        testCase: 'TC-87',
        firmware: '1.0.4',
        operator: 'Admin01',
      },
    },
    {
      timestamp: '2025-12-01 14:20:07',
      type: 'Event',
      code: 'EVT23',
      source: 'Firmware Update',
      severity: 'Info',
      message: 'Update completed successfully',
      details: {},
    },
    {
      timestamp: '2025-12-01 14:18:55',
      type: 'Warning',
      code: 'W067',
      source: 'Sensor Module',
      severity: 'Medium',
      message: 'Temperature nearing limit',
      details: {},
    },
  ]);
  const [showDetails, setShowDetails] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const handleViewDetails = (log) => {
    setShowDetails(log);
  };

  const handleCloseDetails = () => {
    setShowDetails(null);
  };

  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'severity-high';
      case 'medium':
        return 'severity-medium';
      case 'info':
        return 'severity-info';
      default:
        return '';
    }
  };

  return (
    <div className="error-log-container">
      <div className="error-log-header">
        <h1>Error / Event Log</h1>
        <div className="header-buttons">
          <button className="btn-secondary">REFRESH</button>
          <button className="btn-secondary">CLEAR LOG</button>
          <button className="btn-secondary">EXPORT</button>
        </div>
      </div>

      <div className="filters-panel">
        <div className="filter-group">
          <label>Date Range:</label>
          <input
            type="date"
            className="runs-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="runs-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Log Type:</label>
          <select className="runs-input">
            <option>All</option>
            <option>Error</option>
            <option>Warning</option>
            <option>Event</option>
            <option>Debug</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Severity:</label>
          <select className="runs-input">
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Module:</label>
          <select className="runs-input">
            <option>All</option>
            {/* Add other modules here */}
          </select>
        </div>
        <div className="filter-group">
          <input type="text" placeholder="Search..." className="runs-input" />
        </div>
        <button className="inline-btn">APPLY</button>
        <button className="inline-btn">RESET</button>
      </div>

      <div className="error-log-grid">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Log Type</th>
              <th>Error/Event Code</th>
              <th>Source/Module</th>
              <th>Severity</th>
              <th>Message Summary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className={getSeverityClass(log.severity)}>
                <td>{log.timestamp}</td>
                <td>{log.type}</td>
                <td>{log.code}</td>
                <td>{log.source}</td>
                <td>{log.severity}</td>
                <td>{log.message}</td>
                <td>
                  <button className="inline-btn" onClick={() => handleViewDetails(log)}>
                    VIEW DETAILS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetails && (
        <div className="details-popup">
          <div className="details-popup-content">
            <div className="details-popup-header">
              <h2>Log Details</h2>
              <button className="inline-btn" onClick={handleCloseDetails}>CLOSE</button>
            </div>
            <div className="details-popup-body">
              <p><strong>Timestamp:</strong> {showDetails.timestamp}</p>
              <p><strong>Log Type:</strong> {showDetails.type}</p>
              <p><strong>Severity:</strong> {showDetails.severity}</p>
              <p><strong>Source/Module:</strong> {showDetails.source}</p>
              <p><strong>Error Code:</strong> {showDetails.code}</p>
              <p><strong>Message:</strong> {showDetails.message}</p>
              {Object.keys(showDetails.details).length > 0 && (
                <div className="additional-details">
                  <h3>Additional Data</h3>
                  {Object.entries(showDetails.details).map(([key, value]) => (
                    <p key={key}><strong>{key}:</strong> {value}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorLog;