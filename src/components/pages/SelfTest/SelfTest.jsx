import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DetectedProduct from "../../ui/DetectedProduct/DetectedProduct";
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

function SelfTest() {
  const navigate = useNavigate();
  const [product, setProduct] = useState('remote-head');
  const handleProductChange = (event) => {
      setProduct(event.target.value);
  };

  return (
    <div className="page-bg">
      <main className="page-wrap">
        <h2 className="page-title">SELF TEST - Test Suites</h2>
        <header className="status-item center">
            <DetectedProduct product={product} handleProductChange={handleProductChange} />
        </header>
        <div className="table-container">
          <table className="page-table">
            <thead>
              <tr>
                <th>Test Suite Name</th>
                <th>Actions
                  {/* &nbsp;&nbsp;
                  <button className="btn-secondary" onClick={() => navigate("/add-test-suite")}>ADD</button> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {testSuiteData.map((item, index) => (
                <tr key={index}>
                  <td>{item.testSuiteName}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => navigate(`/edit-test-suite/${item.testSuiteName}`)}>EDIT</button>
                 
                    {/* <button className="btn-secondary" style={{ marginLeft: "1rem" }} onClick={() => navigate(`/add-test-suite/${item.testSuiteName}`)}>DELETE</button> */}
                 
                    {/* <button className="btn-secondary"  style={{ marginLeft: "1rem" }}onClick={() => navigate(`/add-test-suite/${item.testSuiteName}`)}>VIEW</button> */}
                  
                    <button className="btn-secondary" style={{ marginLeft: "1rem" }} onClick={() => navigate(`/add-test-suite/${item.testSuiteName}`)}>EXECUTE</button>
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