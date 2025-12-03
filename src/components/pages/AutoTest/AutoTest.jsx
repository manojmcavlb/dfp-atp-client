import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaRunning,
  FaStop,
  FaSyncAlt,
  FaArrowsAltV,
  FaCircle,
} from "react-icons/fa";
import "../../../assets/styles/main.css";
import "./styles.css";

function AutoTest() {
  const navigate = useNavigate();

  const [AutoTest, setAutoTest] = useState({ name: "Remote Head" });
  const [runs, setRuns] = useState(1);
  const [activeMode, setActiveMode] = useState("full");
  const [selectAll, setSelectAll] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [healthStatus, setHealthStatus] = useState("green");
  const [groups, setGroups] = useState([
    { name: "Device Info", selected: true, status: "pending" },
    { name: "Power", selected: true, status: "pending" },
    { name: "Mainboard", selected: true, status: "pending" },
    { name: "Sensors", selected: true, status: "pending" },
    { name: "AAAAAA", selected: true, status: "pending" },
    { name: "BBBBBB", selected: true, status: "pending" },
    { name: "CCCCCC", selected: true, status: "pending" },
    { name: "DDDDDDDDDDDD...", selected: true, status: "pending" },
    { name: "EEEEEE", selected: true, status: "pending" },
  ]);

  const productName = AutoTest?.name ?? "None";
  const productOptions = ["Remote Head", "IoT Gateway", "Product C"];

  useEffect(() => {
    const allSelected = groups.every((group) => group.selected);
    setSelectAll(allSelected);
  }, [groups]);

  function handleRefresh() {
    setAutoTest(AutoTest ? null : { name: "Remote Head" });
  }

  function handleRunTest() {
    setIsRunning(!isRunning);
    alert(`Running ${runs} time(s) on ${selectAll ? "all" : "selected"} groups`);
  }

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setGroups(groups.map((group) => ({ ...group, selected: checked })));
  };

  const handleGroupChange = (index) => {
    const newGroups = [...groups];
    newGroups[index].selected = !newGroups[index].selected;
    setGroups(newGroups);
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    if (mode === "full") {
      setSelectAll(true);
      setGroups(groups.map((g) => ({ ...g, selected: true })));
    }
  };

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
            value={productName}
            onChange={(e) => setAutoTest({ name: e.target.value })}
          >
            {productOptions.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>

          <div className="status-actions">
            <button className="btn-secondary" onClick={() => navigate('/edit-device/1')}>EDIT</button>
            <button className="btn-secondary">VIEW REPORTS</button>
          </div>
        </div>

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

          <button className="btn-primary" onClick={handleRunTest}>
            {isRunning ? <FaStop /> : <FaPlay />}
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

        <div className="test-groups-table">
          {groups.map((group, index) => (
            <div key={index} className="group-item">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={group.selected}
                  onChange={() => handleGroupChange(index)}
                  disabled={activeMode === "full"}
                />
                <span>{group.name}</span>
              </label>
              <div className={`status-indicator ${group.status}`}></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export { AutoTest };