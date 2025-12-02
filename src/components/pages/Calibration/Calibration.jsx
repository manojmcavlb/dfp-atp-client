import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/main.css";
import "./styles.css";

const calibrationData = [
  {
    deviceName: "Oscilloscope",
    partNumber: "DSOX1204G",
    serialNumber: "CN64277284",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
  {
    deviceName: "DC Electronic Load 150W Channel 1",
    partNumber: "N3302A",
    serialNumber: "MY57015959",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
  {
    deviceName: "DC Electronic Load 150W Channel 2",
    partNumber: "N3302A",
    serialNumber: "MY57015960",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
  {
    deviceName: "DC Electronic Load 150W Channel 3",
    partNumber: "N3302A",
    serialNumber: "MY57015961",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
  {
    deviceName: "DC Electronic Load 150W Channel 4",
    partNumber: "N3302A",
    serialNumber: "MY57015963",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
  {
    deviceName: "DC Electronic Load 600W Channel 5",
    partNumber: "N3306A",
    serialNumber: "MY57015390",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
  {
    deviceName: "DC Electronic Load 600W Channel 1A",
    partNumber: "N3306A",
    serialNumber: "MY57015389",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
  {
    deviceName: "AC Power Supply",
    partNumber: "AC68038",
    serialNumber: "JPEW002934",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
  {
    deviceName: "DC Power Supply",
    partNumber: "N6974A",
    serialNumber: "MY63000127",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
  {
    deviceName: "Digital Multi Meter",
    partNumber: "34461A",
    serialNumber: "MY64006122",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
  {
    deviceName: "Battery Simulator",
    partNumber: "PSB10060-120",
    serialNumber: "2987630002",
    calibrationDate: "12/1/2024",
    calibrationDueDate: "12/1/2025",
    status: "OK",
  },
];

function Calibration() {
  const navigate = useNavigate();

  return (
    <div className="page-bg">
      <main className="page-wrap">
        <h2 className="page-title">Calibration Information</h2>
        <div className="table-container">
          <table className="page-table">
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Part Number</th>
                <th>Serial Number</th>
                <th>Calibration Date</th>
                <th>Calibration Due Date</th>
                <th>Status</th>
                <th>Actions&nbsp;&nbsp;
                  <button className="btn-secondary grid-btn" onClick={() => navigate("/add-calibration")}>Add</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {calibrationData.map((item, index) => (
                <tr key={index}>
                  <td>{item.deviceName}</td>
                  <td>{item.partNumber}</td>
                  <td>{item.serialNumber}</td>
                  <td>{item.calibrationDate}</td>
                  <td>{item.calibrationDueDate}</td>
                  <td>
                    <span className={`status-box status-${item.status.toLowerCase()}`}>{item.status}</span>
                  </td>
                  <td className="action-cell">
                    <button className="btn-secondary grid-btn" onClick={() => navigate(`/edit-calibration/${item.serialNumber}`)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Calibration;