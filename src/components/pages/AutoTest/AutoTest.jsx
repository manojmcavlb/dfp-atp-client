import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaRunning,
  FaStop,
  FaSyncAlt,
  FaArrowsAltV,
  FaCircle,
  FaSpinner,
} from "react-icons/fa";
import "../../../assets/styles/main.css";
import "./styles.css";
import Serial from "../Drivers/Serial";

function AutoTest() {
  const navigate = useNavigate();

  const [detectedProduct, setDetectedProduct] = useState("None");
  const [runs, setRuns] = useState(1);
  const [activeMode, setActiveMode] = useState("full");
  const [selectAll, setSelectAll] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [healthStatus, setHealthStatus] = useState("green");
  const [showTestResult, setShowTestResult] = useState(false);
  const [devices, setDevices] = useState([
    { name: 'Device Info', selected: true, status: 'pending', items: [] },
    { name: 'Power', selected: true, status: 'pending', items: [] },
    { name: 'Mainboard', selected: true, status: 'pending', items: [] },
    {
      name: 'Sensors',
      isHeader: true,
    },
    {
      name: 'AAAAAA',
      selected: true,
      status: 'pending',
      items: [],
      loading: false,
    },
    { name: 'BBBBBB', selected: false, status: 'pending', items: [] },
    { name: 'CCCCCC', selected: false, status: 'pending', items: [] },
    {
      name: 'DDDDDDDDDDDDDD...',
      selected: false,
      status: 'pending',
      items: [],
    },
    { name: 'EEEEEE', selected: false, status: 'pending', items: [] },
    { name: '---', selected: false, status: 'pending', items: [] },
  ]);

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
    const newdevices = [...devices];
    newDevices[index].selected = !newDevices[index].selected;
    setDevices(newDevices);
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    if (mode === "full") {
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
          <div className="status-item">
            <button className="btn-secondary"onClick={handleRefresh}>
              <FaSyncAlt />&nbsp;Rescan
            </button>
          </div>
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
            <button className="btn-secondary" disabled={noProductDetected} onClick={() => navigate('/edit-device/1')}>EDIT</button>
            <button className="btn-secondary" disabled={isRunning}>VIEW REPORTS</button>
          </div>
        </div>

        {noProductDetected ? (
          <div className="no-product-message">
            <p>No Product Detected.</p>
            <p>Press Refresh button to rescan.</p>
          </div>
        ) : (
          <>
            <div className="controls-row">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  disabled={activeMode === "full"}
                />
                <span>Select All</span>
              </label>

              <button className="btn-primary" onClick={handleRunTest} disabled={isRunning}>
                {isRunning ? <FaSpinner className="spinner" /> : <FaPlay />}
                &nbsp;RUN TEST
              </button>

              <div className="runs-field">
                <label htmlFor="runs" className="runs-label">
                  # of Runs
                </label>
                <input
                  id="runs"
                  className="input runs-input"
                  type="number"
                  min={1}
                  max={99}
                  value={runs}
                  onChange={(e) => setRuns(Number(e.target.value))}
                />
              </div>
              <div className="runs-field">
                <a href="#" onClick={() => navigate("/health-status")}>
                  Overall Health Status:
                </a>
                <FaCircle color={healthStatus} size={20} />
              </div>

              <div className="mode-switch">
                <button
                  className={`mode-btn ${
                    activeMode === "full" ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={() => handleModeChange("full")}
                >
                  FULL
                </button>
                <button
                  className={`mode-btn ${
                    activeMode === "customized" ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={() => handleModeChange("customized")}
                >
                  CUSTOMIZED
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
                      disabled={activeMode === "full"}
                    />
                    <span>{device.name}</span>
                  </label>
                  <div className={`status-indicator ${device.status}`}></div>
                </div>
              ))}
            </div>
            <Serial isTestRun={isRunning} />

            {/* useContext/Redux Approach -> get back the test results of Serial Page & Display Pass/Fail*/}


            {showTestResult && (
              <div className="test-result-logs">
                <h2>Test Result Logs</h2>
                <div className="device-info-box">
                  <h3>Device Info</h3>
                  <div className="info-grid">
                    <span>Product:</span><span>Remote Head</span>
                    <span>Hardware Part Number:</span><span>DFP-XX-YYY</span>
                    <span>Serial Number:</span><span>aaa-bbb-ccc-ddd</span>
                    <span>Manufacturing Date:</span><span>10/09/2025</span>
                    <span>Manufacturer's Name:</span><span>ABC</span>
                    <span>Mod Dot:</span><span>-</span>
                    <span>Manufacturing Cage Code:</span><span>000</span>
                    <span>PMA Number:</span><span>123456</span>
                    <span>Execute Date/Time:</span><span>10 October 2025 11:00:00</span>
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