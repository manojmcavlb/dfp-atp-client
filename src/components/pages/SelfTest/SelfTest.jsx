import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";
import DetectedProduct from "../../ui/DetectedProduct/DetectedProduct";
import "../../../assets/styles/main.css";
import "../AutoTest/styles.css";

const initialTestSuiteData = [
    { id: "6.2", testSuiteName: "Input Power Test" },
    { id: "6.3", testSuiteName: "Battery Type Test" },
    { id: "6.4", testSuiteName: "USB-C Port Test" },
    { id: "6.5", testSuiteName: "Software Load Security Test" },
    { id: "6.6", testSuiteName: "Part & Serial Number Storage Test" },
    { id: "6.9", testSuiteName: "Discrete Pass-Through Inputs Test" },
    { id: "6.1", testSuiteName: "Discrete Pass-Through Outputs Test" },
];

function SelfTest() {
  const navigate = useNavigate();
  const [product, setProduct] = useState('remote-head');
  const [testSuiteData, setTestSuiteData] = useState(initialTestSuiteData);

  const handleProductChange = (event) => {
      setProduct(event.target.value);
  };

  const handleRefresh = () => {
    setTestSuiteData(initialTestSuiteData);
  };

  return (
    <div className="page-bg">
      <main className="page-wrap">
        <h2 className="page-title">SELF TEST - Test Suites</h2>
        <div className="status-row">
          <div className="rescan-icon">
            <button className="btn-primary" onClick={handleRefresh}>
              <FaSyncAlt />
            </button>
          </div>
          <header className="status-item center">
              <DetectedProduct product={product} handleProductChange={handleProductChange} />
          </header>
        </div>
        <div className="table-container">
          <table className="page-table">
            <thead>
              <tr>
                <th>TEST ID</th>
                <th>Test Suite Name</th>
                <th>Actions
                  {/* &nbsp;&nbsp;
                  <button className="btn-primary" onClick={() => navigate("/add-test-suite")}>ADD</button> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {testSuiteData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.testSuiteName}</td>
                  <td>
                    <button className="btn-primary" onClick={() => navigate(`/edit-test-suite/${item.testSuiteName}`)}>EDIT</button>
                 
                    {/* <button className="btn-primary" style={{ marginLeft: "1rem" }} onClick={() => navigate(`/add-test-suite/${item.testSuiteName}`)}>DELETE</button> */}
                 
                    {/* <button className="btn-primary"  style={{ marginLeft: "1rem" }}onClick={() => navigate(`/add-test-suite/${item.testSuiteName}`)}>VIEW</button> */}
                  
                    <button className="btn-primary" style={{ marginLeft: "1rem" }} onClick={() => navigate(`/add-test-suite/${item.testSuiteName}`)}>EXECUTE</button>
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

export default SelfTest;