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
      <main className="page-wrap">
        <h2 className="page-title">Test Suites</h2>
        <div className="table-container">
          <table className="page-table">
            <thead>
              <tr>
                <th>Test Suite Name</th>
                <th>Actions&nbsp;&nbsp;
                  <button className="btn-secondary grid-btn" onClick={() => navigate("/add-calibration")}>ADD</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {testSuiteData.map((item, index) => (
                <tr key={index}>
                  <td>{item.testSuiteName}</td>
                  <td>
                    <button className="btn-secondary grid-btn" onClick={() => navigate(`/edit-test-suite/${item.testSuiteName}`)}>EDIT</button>
                 
                    <button className="btn-secondary grid-btn" style={{ marginLeft: "1rem" }} onClick={() => navigate(`/edit-test-suite/${item.testSuiteName}`)}>DELETE</button>
                 
                    <button className="btn-secondary grid-btn"  style={{ marginLeft: "1rem" }}onClick={() => navigate(`/edit-test-suite/${item.testSuiteName}`)}>VIEW</button>
                  
                    <button className="btn-secondary grid-btn" style={{ marginLeft: "1rem" }} onClick={() => navigate(`/edit-test-suite/${item.testSuiteName}`)}>EXECUTE</button>
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