import React from 'react';
import './styles.css';

const ViewReport = ({ report, onClose }) => {
  if (!report) {
    return null;
  }

  return (
    <div className="popup-view-overlay">
      <div className="popup-view-content">
        <h2 className="page-title">View Report</h2>
        <div className="popup-view-header">
          <div className="row">
            <div className="col-md-6">
              <h3 className="report-title">
                Test Results:{" "}
                <span className="product-name">{report.productType}</span>
              </h3>
            </div>
            <div className="col-md-6">
              <div className="action-btns action-btns-report">
                <button className="btn-secondary">Download</button>
                <button className="btn-secondary">Print</button>
                <button onClick={onClose} className="btn-secondary">
                  Close
                </button>
              </div>
            </div>
            <div className="col-md-12">
              <label className="label serial-info">
                Serial:{" "}
                <label className="label-value">
                  aaa-bbb-ccc-ddd, {report.date}
                </label>
              </label>
            </div>
          </div>
        </div>
        <div className="popup-view-body">
          <h4 className="section-title">Device Info</h4>
          <div className="device-info">
            <div className="row">
              <div className="col-md-6">
                <label className="label">
                  Product:{" "}
                  <label className="label-value">{report.productType}</label>
                </label>
                <label className="label">
                  Serial Number:{" "}
                  <label className="label-value">aaa-bbb-ccc-ddd</label>
                </label>
                <label className="label">
                  Manufacturer's Name:{" "}
                  <label className="label-value">ABC</label>
                </label>
                <label className="label">
                  Manufacturing Cage Code:{" "}
                  <label className="label-value">{report.productType}</label>
                </label>
                <label className="label">
                  Execute Date/Time: <label className="label-value">000</label>
                </label>
              </div>
              <div className="col-md-6">
                <label className="label">
                  Hardware Part Number:{" "}
                  <label className="label-value">DFP-XX-YYY</label>
                </label>
                <label className="label">
                  Manufacturing Date:{" "}
                  <label className="label-value">10/09/2025</label>
                </label>
                <label className="label">
                  Mod Dot: <label className="label-value">-</label>
                </label>
                <label className="label">
                  PMA Number: <label className="label-value">123456</label>
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4 className="section-title">Mainboard:</h4>
            </div>
            <div className="col-md-6">
              <button className="btn-primary btn-pass">PASS</button>
            </div>
          </div>
          <table className="results-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Expected</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>xxxxx</td>
                <td>yyyyy</td>
                <td>MATCH</td>
              </tr>
              <tr>
                <td>xxxxx</td>
                <td>yyyyy</td>
                <td>MATCH</td>
              </tr>
              <tr>
                <td>xxxxx</td>
                <td>yyyyy</td>
                <td>MATCH</td>
              </tr>
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-6">
              <h4 className="section-title">Sensors:</h4>
            </div>
            <div className="col-md-6">
              <button className="btn-primary btn-pass">PASS</button>
            </div>
          </div>
          <table className="results-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Expected</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>xxxxx</td>
                <td>yyyyy</td>
                <td>PASS</td>
              </tr>
              <tr>
                <td>xxxxx</td>
                <td>yyyyy</td>
                <td>PASS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;