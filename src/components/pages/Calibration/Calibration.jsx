import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/main.css";
import { FaPlus, FaEdit } from 'react-icons/fa';
import './styles.css';

const formatDateToDMY = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const twoMonthsFromNow = new Date();
twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

const calibrationData = [
  {
    deviceName: "AC Power Supply",
    partNumber: "61061",
    serialNumber: "CN64277284",
    calibrationDate: "01/01/2025",
    calibrationDueDate: "01/12/2026",
    status: "status-red",
  },
  {
    deviceName: "DC Power Supply",
    partNumber: "Z60-3.5-lan-u",
    serialNumber: "MY57015959",
    calibrationDate: "01/12/2025",
    calibrationDueDate: "01/06/2026",
    status: "status-yellow",
  },
  {
    deviceName: "Radio Communication tester",
    partNumber: "CMP180",
    serialNumber: "MY57015960",
    calibrationDate: "01/11/2026",
    calibrationDueDate: "01/05/2026",
    status: "status-green",
  },
  {
    deviceName: "Vector Network Analyzer",
    partNumber: "ZNL14",
    serialNumber: "MY57015961",
    calibrationDate: "01/10/2025",
    calibrationDueDate: "01/01/2026",
    status: "status-red",
  },
  {
    deviceName: "Digital Multimeter",
    partNumber: "34460A",
    serialNumber: "MY57015963",
    calibrationDate: "01/12/2025",
    calibrationDueDate: "01/02/2026",
    status: "status-yellow",
  },
  {
    deviceName: "DC Electronic Load 600W Channel 5",
    partNumber: "N3306A",
    serialNumber: "MY57015390",
    calibrationDate: "01/11/2025",
    calibrationDueDate: "01/03/2026",
    status: "status-green",
  },
  {
    deviceName: "DC Electronic Load 600W Channel 1A",
    partNumber: "N3306A",
    serialNumber: "MY57015389",
    calibrationDate: "12/1/2025",
    calibrationDueDate: "12/1/2026",
    status: "status-red",
  },
  {
    deviceName: "AC Power Supply",
    partNumber: "AC68038",
    serialNumber: "JPEW002934",
    calibrationDate: "12/1/2025",
    calibrationDueDate: "12/1/2026",
    status: "status-red",
  },
  {
    deviceName: "DC Power Supply",
    partNumber: "N6974A",
    serialNumber: "MY63000127",
    calibrationDate: "12/1/2025",
    calibrationDueDate: "12/1/2026",
    status: "status-red",
  },
  {
    deviceName: "Digital Multi Meter",
    partNumber: "34461A",
    serialNumber: "MY64006122",
    calibrationDate: "12/1/2025",
    calibrationDueDate: "12/1/2026",
    status: "status-green",
  },
  {
    deviceName: "Battery Simulator",
    partNumber: "PSB10060-120",
    serialNumber: "2987630002",
    calibrationDate: "12/1/2025",
    calibrationDueDate: "12/1/2026",
    status: "status-green",
  },
];

// function getStatus(calibDate, dueDate) {
//   const parseDMY = (dateString) => {
//     if (!dateString || typeof dateString !== 'string') {
//       return new Date(0);
//     }
//     const parts = dateString.split('-');
//     if (parts.length !== 3) {
//       return new Date(0);
//     }
//     const [day, month, year] = parts.map(Number);
//     if (isNaN(day) || isNaN(month) || isNaN(year) || month < 1 || month > 12 || day < 1 || day > 31) {
//       return new Date(0);
//     }
//     return new Date(year, month - 1, day);
//   };

//   const now = new Date();
//   now.setHours(0, 0, 0, 0);
//   const due = parseDMY(dueDate);
//   due.setHours(0, 0, 0, 0);

//   console.log("due", due)

//   const oneMonthFromNow = new Date(now);
//   oneMonthFromNow.setMonth(now.getMonth() + 1);

//   const threeMonthsFromNow = new Date(now);
//   threeMonthsFromNow.setMonth(now.getMonth() + 3);

//   if (due <= oneMonthFromNow) {
//     return { text: 'Due', className: 'status-red' };
//   } else if (due <= threeMonthsFromNow) {
//     return { text: 'Warning', className: 'status-yellow' };
//   } else {
//     return { text: 'OK', className: 'status-green' };
//   }
// }

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
                <th>Calib Date<br/>(DD-MM-YYYY)</th>
                <th>Due Date<br/>(DD-MM-YYYY)</th>
                <th>Status</th>
                <th>Actions
                  {/* &nbsp;&nbsp;
                  <button className="btn-secondary" onClick={() => navigate("/add-calibration")}>ADD</button> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {calibrationData.map((item, index) => {
                // const status = getStatus(item.calibrationDueDate);
                return (
                  <tr key={index}>
                    <td>{item.deviceName}</td>
                    <td>{item.partNumber}</td>
                    <td>{item.serialNumber}</td>
                    <td>{item.calibrationDate}</td>
                    <td>{item.calibrationDueDate}</td>
                    <td>
                      <span className={`health-status-due ${item.status}`}></span>
                    </td>
                    <td className="">
                      <button className="btn-secondary" onClick={() => navigate(`/edit-calibration/${item.serialNumber}`)}>EDIT</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Calibration;