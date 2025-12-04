import React from "react";
import "./styles.css";

const healthStatusData = [
  { name: "AC Power Supply", status: "pass" },
  { name: "DC Power Supply", status: "fail" },
  { name: "Digital Multimeter", status: "fail" },
  { name: "Oscilloscope", status: "fail" },
  { name: "DC Load 1", status: "pass" },
  { name: "DC Load 2", status: "pass" },
  { name: "DAQ", status: "pass" },
  { name: "Matrix", status: "pass" },
];

function AtpHealthStatus() {
  return (
    <div className="page-bg">
      <main className="center-wrap">
        <div className="card form-card">
          <h2 className="card-title">ATS Health Status</h2>
          <div className="health-status-grid">
            {healthStatusData.map((item, index) => (
              <div key={index} className="health-status-item">
                <span>{item.name}</span>
                <div
                  className={`health-status ${item.status}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AtpHealthStatus;