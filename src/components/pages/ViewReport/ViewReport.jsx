import React, { useRef } from 'react';
import './styles.css';
import html2pdf from 'html2pdf.js';
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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    let contentHTML = contentRef.current.innerHTML;
    contentHTML = contentHTML
      .replace(/<button/g, '<span')
      .replace(/<\/button>/g, '</span>');
    printWindow.document.write('<html><head><title>View Report</title><style>');
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; margin: 20px; }
      .popup-view-content { padding: 10px; }
      .page-title { font-size: 1.5rem; font-weight: 400; margin-bottom: 20px; }
      .report-title { font-size: 1.2rem; font-weight: 400; }
      .product-name { color: #3498db; font-weight: 700; }
      .serial-info { color: #3498db; margin-bottom: 1.5rem; }
      .action-btns { display: none; }
      .scrollable-content { max-height: none; overflow: visible; }
      .row { display: block; margin-bottom: 10px; }
      .col-md-6 { width: 100%; padding: 0 15px; }
      .col-md-12 { width: 100%; padding: 0 15px; }
      .section-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
      .device-info { margin-bottom: 15px; }
      .label { display: block; margin-bottom: 5px; }
      .lbl-text { font-weight: 700; }
      .lbl-value { font-weight: 500; padding-left: 10px; }
      table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; font-weight: 600; }
      .btn-right { text-align: right; }
      span.btn-primary { display: inline-block; padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; margin-top: 10px; }
      .btn-pass { background-color: #28a745; }
      .btn-fail { background-color: #dc3545; }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(contentHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handleDownload = () => {
    const element = contentRef.current;
    const scrollable = element.querySelector('.scrollable-content');
    const originalMaxHeight = scrollable.style.maxHeight;
    const originalOverflow = scrollable.style.overflow;
    scrollable.style.maxHeight = 'none';
    scrollable.style.overflow = 'visible';
    html2pdf()
      .from(element)
      .save()
      .then(() => {
        scrollable.style.maxHeight = originalMaxHeight;
        scrollable.style.overflow = originalOverflow;
      });
  };

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
                <button onClick={handleDownload} className="btn-secondary">
                  Download
                </button>
                <button onClick={handlePrint} className="btn-secondary">
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
                          <td>{step.result}</td>
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
