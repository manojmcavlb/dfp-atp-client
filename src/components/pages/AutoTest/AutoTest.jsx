import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaPlay,
  FaSpinner,
  FaRedo,
} from "react-icons/fa";
import "../../../assets/styles/main.css";
import "./styles.css";
import Serial from "../Drivers/Serial";

function AutoTest() {
  const navigate = useNavigate();
  const location = useLocation();

  const [detectedProduct, setDetectedProduct] = useState("None");
  const [runs, setRuns] = useState(1);
  const [activeMode, setActiveMode] = useState("production");
  const [selectAll, setSelectAll] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [healthStatus, setHealthStatus] = useState("green");
  const [showTestResult, setShowTestResult] = useState(false);
  const [devices, setDevices] = useState([
    { name: '6.2 Input Power Test', selected: true, status: 'pending', items: [] },
    { name: '6.3 Battery Type Test', selected: true, status: 'pending', items: [] },
    { name: '6.4 USB-C Port Test', selected: true, status: 'pending', items: [] },
    { name: '6.5 Software Load Security Test', selected: true, status: 'pending', items: [] },
    { name: '6.6 Part & Serial Number Storage Test', selected: true, status: 'pending', items: [] },
    { name: '6.9 Discrete Pass-Through Inputs Test', selected: true, status: 'pending', items: [] },
    { name: '6.1 Discrete Pass-Through Outputs Test', selected: true, status: 'pending', items: [] },
  ]);
  const [extractedData, setExtractedData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.extractedData) {
      setExtractedData(location.state.extractedData);
    }
  }, [location.state]);

  const handleRefresh = () => {
    setIsRunning(false);
    setShowTestResult(false);
    const initialDevices = devices.map(g => ({
      ...g,
      status: 'pending',
      loading: false,
    }));
    setDevices(initialDevices);
  };

  const handleRunTest = () => {
    setIsRunning(true);
    setShowTestResult(false);

    const newDevices = devices.map((g) => {
        if (g.name === 'AAAAAA') {
            return { ...g, loading: true };
        }
        return g;
    });
    setDevices(newDevices);

    setTimeout(() => {
      setIsRunning(false);
      setShowTestResult(true);
      const finalDevices = devices.map((g) => {
        let status = 'pending';
        if (g.name === 'Device Info' || g.name === 'Power') {
            status = 'pass';
        } else if (g.name === 'Mainboard') {
            status = 'fail';
        }
        
        if (g.name === 'AAAAAA') {
            return { ...g, loading: false, status: 'pass' };
        }

        return { ...g, status };
      });
      setDevices(finalDevices);
    }, 3000);
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setDevices(devices.map((device) => ({ ...device, selected: checked })));
  };

  const handleDeviceChange = (index) => {
    const newDevices = [...devices];
    newDevices[index].selected = !newDevices[index].selected;
    setDevices(newDevices);
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    if (mode === "production") {
      setSelectAll(true);
      setDevices(devices.map((g) => ({ ...g, selected: true })));
    }
  };

  const productOptions = ["None", "Remote Head", "IoT Gateway"];
  const noProductDetected = detectedProduct === "None";

  return (
    <div className="page-bg">
      <main className="page-wrap">
        <h2 className="page-title">Auto Test</h2>
        <div className="status-row">
          <button className="btn-secondary btn-icon">
            <FaRedo onClick={handleRefresh} />
          </button>
          <span className="status-label">Detected Product:&nbsp;</span>
          <select
            className="select"
            value={detectedProduct}
            onChange={(e) => setDetectedProduct(e.target.value)}
          >
            {productOptions.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>

          <div className="status-actions">
            {!noProductDetected && (
              <>
                <button
                  className="btn-secondary"
                  onClick={() => navigate("/edit-device/1")}
                >
                  Edit Device
                </button>
                <button className="btn-primary">Tests</button>
              </>
            )}
            <button className="btn-secondary" disabled={isRunning}>
              View Reports
            </button>
          </div>
        </div>

        {noProductDetected ? (
          <div className="no-product-message">
            <p>No Product Detected.</p>
            <p>Press Refresh button to rescan.</p>
          </div>
        ) : (
          <>
            {extractedData && (
              <div className="test-result-logs">
                <h2>Extracted Information</h2>
                <div className="device-info-box">
                  <div className="info-grid">
                    <span>Model:</span>
                    <span>{extractedData.model}</span>
                    <span>Head:</span>
                    <span>{extractedData.head}</span>
                    <span>Body:</span>
                    <span>{extractedData.body}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="controls-row">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  disabled={activeMode === "production"}
                />
                <span>Select All</span>
              </label>

              <button
                className="btn-secondary btn-icon-text"
                onClick={handleRunTest}
                disabled={isRunning}
              >
                {isRunning ? <FaSpinner /> : <FaPlay />}
                {isRunning ? "Stop Test" : "Run Test"}
              </button>

              <div className="runs-field">
                <label htmlFor="runs" className="runs-label">
                  # of Runs
                </label>
                <input
                  id="runs"
                  className="input input-no-of-runs"
                  type="number"
                  min={1}
                  max={99}
                  value={runs}
                  onChange={(e) => setRuns(Number(e.target.value))}
                />
              </div>
              <div className="mode-switch">
                <button
                  className={`mode-btn ${
                    activeMode === "production"
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                  onClick={() => handleModeChange("production")}
                >
                  Production
                </button>
                <button
                  className={`mode-btn ${
                    activeMode === "customized"
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                  onClick={() => handleModeChange("customized")}
                >
                  Customized
                </button>
              </div>
            </div>

            <div className="test-devices-table">
              {devices.map((device, index) => (
                <div key={index} className="device-item">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={device.selected}
                      onChange={() => handleDeviceChange(index)}
                      disabled={activeMode === "production"}
                    />
                    <span>{device.name}</span>
                  </label>
                  {/* <div className={`status-indicator ${device.status}`}></div> */}
                </div>
              ))}
            </div>
            {/* <Serial isTestRun={isRunning} /> */}

            {/* useContext/Redux Approach -> get back the test results of Serial Page & Display Pass/Fail*/}

            {showTestResult && (
              <div className="test-result-logs">
                <h2>Test Result Logs</h2>
                <div className="device-info-box">
                  <h3>Device Info</h3>
                  <div className="info-grid">
                    <span>Product:</span>
                    <span>Remote Head</span>
                    <span>Hardware Part Number:</span>
                    <span>DFP-XX-YYY</span>
                    <span>Serial Number:</span>
                    <span>aaa-bbb-ccc-ddd</span>
                    <span>Manufacturing Date:</span>
                    <span>10/09/2025</span>
                    <span>Manufacturer's Name:</span>
                    <span>ABC</span>
                    <span>Mod Dot:</span>
                    <span>-</span>
                    <span>Manufacturing Cage Code:</span>
                    <span>000</span>
                    <span>PMA Number:</span>
                    <span>123456</span>
                    <span>Execute Date/Time:</span>
                    <span>10 October 2025 11:00:00</span>
                  </div>
                </div>

                <div className="test-steps-box">
                  <h3>Mainboard:</h3>
                  <div className="fail-chip">FAIL</div>
                  <table>
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
                        <td>FAIL</td>
                      </tr>
                      <tr>
                        <td>xxxxx</td>
                        <td>yyyyy</td>
                        <td>FAIL</td>
                      </tr>
                      <tr>
                        <td>xxxxx</td>
                        <td>yyyyy</td>
                        <td>FAIL</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export { AutoTest };