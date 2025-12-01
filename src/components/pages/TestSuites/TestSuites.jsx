import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/main.css";
const testSuiteData = [
  {
    testSuiteName: "Test Suite A",
  },
  {
    testSuiteName: "Test Suite B",
  },
  {
    testSuiteName: "Test Suite C",
  },
];

function TestSuites() {
  const navigate = useNavigate();

  return (
    <div className="page-bg">
      <main className="calibration-wrap">
        <h2 className="page-title">Test Suites</h2>
        <div className="table-container">
          <table className="calibration-table">
            <thead>
              <tr>
                <th>Test Suite Name</th>
                <th>Actions&nbsp;&nbsp;
                  <button className="grid-btn" onClick={() => navigate("/add-calibration")}>Add</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {testSuiteData.map((item, index) => (
                <tr key={index}>
                  <td>{item.testSuiteName}</td>
                  <td>
                    <button className="grid-btn" onClick={() => navigate(`/edit-test-suite/${item.testSuiteName}`)}>Edit</button>
                 
                    <button className="grid-btn" style={{ marginLeft: "1rem" }} onClick={() => navigate(`/edit-test-suite/${item.testSuiteName}`)}>Delete</button>
                 
                    <button className="grid-btn"  style={{ marginLeft: "1rem" }}onClick={() => navigate(`/edit-test-suite/${item.testSuiteName}`)}>View</button>
                  
                    <button className="grid-btn" style={{ marginLeft: "1rem" }} onClick={() => navigate(`/edit-test-suite/${item.testSuiteName}`)}>Execute</button>
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

export default TestSuites;