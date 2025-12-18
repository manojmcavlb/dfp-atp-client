import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaPlay,
  FaSpinner,
  FaRedo,
  FaStop,
} from "react-icons/fa";
import "../../../assets/styles/main.css";
import "./styles.css";
import Serial from "../Drivers/Serial";
import ReportHistory from "../ReportHistory/ReportHistory";
import { mockTestSuites } from "../../../utils/mock";

function AutoTest() {
  const navigate = useNavigate();
  const location = useLocation();
  const stopFlag = useRef(false);

  const [detectedProduct, setDetectedProduct] = useState("None");
  const [runs, setRuns] = useState(1);
  const [activeMode, setActiveMode] = useState("production");
  const [selectAll, setSelectAll] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [showTestResult, setShowTestResult] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [activeView, setActiveView] = useState("tests");
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

  const handleRunTest = async () => {
    if (isRunning) {
      setShowStopModal(true);
      return;
    }

    stopFlag.current = false;
    setIsRunning(true);
    setShowTestResult(false);

    const devicesWithPending = devices.map((g) => ({
      ...g,
      status: g.selected ? "pending" : g.status,
    }));
    setDevices(devicesWithPending);

    const devicesToRun = devicesWithPending.filter((d) => d.selected);

    for (const device of devicesToRun) {
      if (stopFlag.current) {
        break;
      }

      setDevices((prev) =>
        prev.map((d) =>
          d.name === device.name ? { ...d, status: "running" } : d
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (stopFlag.current) {
        break;
      }

      setDevices((prev) =>
        prev.map((d) =>
          d.name === device.name
            ? { ...d, status: Math.random() > 0.3 ? "pass" : "fail" }
            : d
        )
      );
    }

    if (!stopFlag.current) {
      setShowCompletionModal(true);
    }

    setIsRunning(false);
    setShowTestResult(true);
  };

  const handleStopTest = (stop) => {
    if (stop) {
      stopFlag.current = true;
      setIsRunning(false);
      setShowTestResult(false);
      const initialDevices = devices.map((g) => ({
        ...g,
        status: "pending",
        loading: false,
      }));
      setDevices(initialDevices);
    }
    setShowStopModal(false);
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
                <button
                  className={activeView === "tests" ? "btn-primary" : "btn-secondary"}
                  onClick={() => setActiveView("tests")}
                >
                  Tests
                </button>
              </>
            )}
            <button
              className={activeView === "reports" ? "btn-primary" : "btn-secondary"}
              onClick={() => setActiveView("reports")}
              disabled={isRunning}
            >
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
            {activeView === "tests" && (
              <>
                {showStopModal && (
                  <div className="popup-overlay">
                    <div className="popup-content">
                      <h2>Testing in Progress.</h2>
                      <p>Are you sure you want to stop the test?</p>
                      <div className="popup-actions">
                        <button className="btn-secondary" onClick={() => handleStopTest(false)}>No</button>
                        <button className="btn-primary" onClick={() => handleStopTest(true)}>Yes</button>
                      </div>
                    </div>
                  </div>
                )}
                {showCompletionModal && (
                  <div className="popup-overlay">
                    <div className="popup-content">
                      <h2>The test run has completed.</h2>
                      <div className="popup-actions">
                        <button className="btn-primary" onClick={() => setShowCompletionModal(false)}>OK</button>
                      </div>
                    </div>
                  </div>
                )}
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
                      disabled={activeMode === "production" || isRunning}
                    />
                    <span>Select All</span>
                  </label>

                  <button
                    className="btn-secondary btn-icon-text"
                    onClick={handleRunTest}
                  >
                    {isRunning ? <FaStop /> : <FaPlay />}
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
                      className={
                        activeMode === "production"
                          ? "btn-primary"
                          : "btn-secondary"
                      }
                      onClick={() => handleModeChange("production")}
                    >
                      Production
                    </button>
                    <button
                      className={
                        activeMode === "customized"
                          ? "btn-primary"
                          : "btn-secondary"
                      }
                      onClick={() => handleModeChange("customized")}
                    >
                      Customized
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 layout-test-case">
                    <table className="table-devices">
                      <tbody>
                        {devices.map((device, index) => (
                          <tr key={index} className="device-item">
                            <td>
                              <label className="checkbox">
                                <input
                                  type="checkbox"
                                  checked={device.selected}
                                  onChange={() => handleDeviceChange(index)}
                                  disabled={activeMode === "production" || isRunning}
                                />
                                <span>{device.name}</span>
                              </label>
                            </td>
                            <td>
                              {device.status === 'running' ? (
                                <FaSpinner className="spinner" />
                              ) : (
                                <div
                                  className={`status-test ${device.status}`}
                                ></div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-8 layout-test-result">
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

                        {mockTestSuites.map((suite, index) => (
                          <React.Fragment key={index}>
                            <div className="row">
                              <div className="col-md-6">
                                <h4 className="section-title">{suite.title}</h4>
                              </div>
                              <div className="col-md-6 btn-right">
                                <button className={`btn-primary btn-${suite.status.toLowerCase()}`}>{suite.status}</button>
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
                                {suite.results.map((test) => (
                                  <tr key={test.id}>
                                    <td>{test.id}</td>
                                    <td>{test.name}</td>
                                    <td>{test.value}</td>
                                    <td>{test.result}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {index < mockTestSuites.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            {activeView === "reports" && <ReportHistory />}
            {/* <Serial isTestRun={isRunning} /> */}

            {/* useContext/Redux Approach -> get back the test results of Serial Page & Display Pass/Fail */}
          </>
        )}
      </main>
    </div>
  );
}

export default AutoTest;