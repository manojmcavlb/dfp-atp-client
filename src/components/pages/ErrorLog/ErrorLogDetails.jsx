import React from 'react';
import './styles.css';

const ErrorLogDetails = ({ log, onClose }) => {
  if (!log) {
    return null;
  }

  return (
    <div className="details-popup">
      <div className="details-popup-content">
        <div className="details-popup-header">
            <h2 className="page-title">Error Log - View Details</h2>
          <button onClick={onClose} className="btn-close">&times;</button>
        </div>
        <div className="details-popup-body">
          <p><strong>Timestamp:</strong> {log.timestamp}</p>
          <p><strong>Log Type:</strong> {log.type}</p>
          <p><strong>Error/Event Code:</strong> {log.code}</p>
          <p><strong>Severity:</strong> {log.severity}</p>
          <p><strong>Source/Module:</strong> {log.source}</p>
          <p><strong>Error Code:</strong> {log.code}</p>
          <p><strong>Message:</strong> {log.message}</p>
          {Object.keys(log.details).length > 0 && (
            <div className="additional-details">
              <h2>Additional Details:</h2>
              {Object.entries(log.details).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorLogDetails;