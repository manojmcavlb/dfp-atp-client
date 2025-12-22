import React, { useRef } from 'react';
import './styles.css';
import { downloadReportAsPDF, printReport } from '../../../utils/reportUtils';
import { mockTestSuites as mockIotTestSuites } from '../../../utils/mock';
import { mockTestSuites as mockRemoteHeadTestSuites } from '../../../utils/mockRemoteHead';

const ViewReport = ({ report, onClose }) => {
  const contentRef = useRef();

  if (!report) {
    return null;
  }

  const productTestSuites =
    report.productType === 'IoT Gateway'
      ? mockIotTestSuites
      : mockRemoteHeadTestSuites;

  const suite = productTestSuites[0];

  if (!suite || !suite.testCases) {
    return null;
  }

  return (
    <div className="popup-view-overlay">
      <div ref={contentRef} className="popup-view-content">
        <h2 className="page-title">View Report</h2>
        <div className="popup-view-header">
          <div className="row">
            <div className="col-md-6">
              <h3 className="report-title">
                Test Results:{' '}
                <span className="product-name">{report.productType}</span>
              </h3>
            </div>
            <div className="col-md-6">
              <div className="action-btns action-btns-report">
                <button
                  onClick={() => downloadReportAsPDF(contentRef.current)}
                  className="btn-secondary"
                >
                  Download
                </button>
                <button
                  onClick={() => printReport(contentRef.current)}
                  className="btn-secondary"
                >
                  Print
                </button>
                <button onClick={onClose} className="btn-secondary">
                  Close
                </button>
              </div>
            </div>
            <div className="col-md-12">
              <label className="label serial-info">
                Serial:{' '}
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
                  Product:{' '}
                  <label className="lbl-value">{report.productType}</label>
                </label>
                <label className="label lbl-text">
                  Serial Number:{' '}
                  <label className="lbl-value">DEF-456-GHI-789</label>
                </label>
                <label className="label lbl-text">
                  Manufacturer's Name:{' '}
                  <label className="lbl-value">Mock Manufacturer</label>
                </label>
                <label className="label lbl-text">
                  Manufacturing Cage Code:{' '}
                  <label className="lbl-value">CAGE123</label>
                </label>
                <label className="label lbl-text">
                  Execute Date/Time:
                  <label className="lbl-value">2024-01-01 12:00:00</label>
                </label>
              </div>
              <div className="col-md-6">
                <label className="label lbl-text">
                  Hardware Part Number:{' '}
                  <label className="lbl-value">HW-MOCK-1</label>
                </label>
                <label className="label lbl-text">
                  Manufacturing Date:{' '}
                  <label className="lbl-value">2024-01-01</label>
                </label>
                <label className="label lbl-text">
                  Mod Dot: <label className="lbl-value">MOD-MOCK-1</label>
                </label>
                <label className="label lbl-text">
                  PMA Number: <label className="lbl-value">PMA-MOCK-1</label>
                </label>
              </div>
            </div>
          </div>
          <div className="scrollable-content">
            {suite.testCases.map((testCase, index) => {
              const overallStatus = testCase.steps.every(
                (step) => step.result === 'PASS'
              )
                ? 'PASS'
                : 'FAIL';

              return (
                <React.Fragment key={index}>
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="section-title">{testCase.title}</h4>
                    </div>
                    <div className="col-md-6 btn-right">
                      <button
                        className={`btn-primary btn-${overallStatus.toLowerCase()}`}
                      >
                        {overallStatus}
                      </button>
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
                      {testCase.steps.map((step) => (
                        <tr key={step.stepId}>
                          <td>{step.stepId}</td>
                          <td>{step.action}</td>
                          <td>{step.value || 'N/A'}</td>
                          <td className={`result-${step.result.toLowerCase()}`}>
                            {step.result}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {index < suite.testCases.length - 1 && <br />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
