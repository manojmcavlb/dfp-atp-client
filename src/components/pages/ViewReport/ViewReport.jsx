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
                <label className="lbl-value">
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
                <label className="label lbl-text">
                  Product:{" "}
                  <label className="lbl-value">{report.productType}</label>
                </label>
                <label className="label lbl-text">
                  Serial Number:{" "}
                  <label className="lbl-value">aaa-bbb-ccc-ddd</label>
                </label>
                <label className="label lbl-text">
                  Manufacturer's Name:{" "}
                  <label className="lbl-value">ABC</label>
                </label>
                <label className="label lbl-text">
                  Manufacturing Cage Code:{" "}
                  <label className="lbl-value">{report.productType}</label>
                </label>
                <label className="label lbl-text">
                  Execute Date/Time: <label className="lbl-value">000</label>
                </label>
              </div>
              <div className="col-md-6">
                <label className="label lbl-text">
                  Hardware Part Number:{" "}
                  <label className="lbl-value">DFP-XX-YYY</label>
                </label>
                <label className="label lbl-text">
                  Manufacturing Date:{" "}
                  <label className="lbl-value">10/09/2025</label>
                </label>
                <label className="label lbl-text">
                  Mod Dot: <label className="lbl-value">-</label>
                </label>
                <label className="label lbl-text">
                  PMA Number: <label className="lbl-value">123456</label>
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4 className="section-title">1. Input Power Test:</h4>
            </div>
            <div className="col-md-6 btn-right">
              <button className="btn-primary btn-pass">PASS</button>
            </div>
          </div>
          <table className="results-table">
            <thead>
              <tr>
                <th>Test ID</th>
                <th>Test Name</th>
                <th>Measured Value</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.1</td>
                <td>Apply nominal input voltage (28VDC)</td>
                <td>2.9 V</td>
                <td>PASS</td>
              </tr>
              <tr>
                <td>1.2</td>
                <td>Measure current draw during boot-up</td>
                <td>1.2 A</td>
                <td>PASS</td>
              </tr>
              <tr>
                <td>1.3</td>
                <td>Verify total power consumption (≤ 42W expected)</td>
                <td>33 W</td>
                <td>PASS</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <div className="row">
            <div className="col-md-6">
              <h4 className="section-title">2. 0 to –10 VDC Output Test:</h4>
            </div>
            <div className="col-md-6 btn-right">
              <button className="btn-primary btn-pass">PASS</button>
            </div>
          </div>
          <table className="results-table">
            <thead>
              <tr>
                <th>Test ID</th>
                <th>Test Name</th>
                <th>Measured Value</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2.1</td>
                <td>Apply input reference signal</td>
                <td>-2.8 V</td>
                <td>PASS</td>
              </tr>
              <tr>
                <td>2.2</td>
                <td>Sweep input across range</td>
                <td>-7.5 V</td>
                <td>PASS</td>
              </tr>
              <tr>
                <td>2.3</td>
                <td>Verify stability and accuracy</td>
                <td>-9.6 V</td>
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