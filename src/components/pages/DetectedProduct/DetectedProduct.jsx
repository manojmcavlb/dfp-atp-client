import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/main.css";
import "./styles.css";

function DetectedProduct() {
  const navigate = useNavigate();

  const [detectedProduct, setDetectedProduct] = useState({ name: "Remote Head" });
  const [runs, setRuns] = useState(1);
  const [activeMode, setActiveMode] = useState("production");
  const [selectAll, setSelectAll] = useState(false);

  const productName = detectedProduct?.name ?? "None";
  const productOptions = ["Remote Head", "IoT Gateway", "Product C"];

  function handleRefresh() {
    setDetectedProduct(
      detectedProduct ? null : { name: "Remote Head" }
    );
  }

  function handleRunTest() {
    alert(`Running ${runs} time(s) on ${selectAll ? "all" : "selected"} groups`);
  }

  const groups = [
    { name: "Device Info", selected: true, status: "pending" },
    { name: "Power", selected: true, status: "pending" },
    { name: "Mainboard", selected: true, status: "pending" },
    { name: "Sensors", selected: true, status: "pending" },
    { name: "AAAAAA", selected: true, status: "pending" },
    { name: "BBBBBB", selected: true, status: "pending" },
    { name: "CCCCCC", selected: true, status: "pending" },
    { name: "DDDDDDDDDDDD...", selected: true, status: "pending" },
    { name: "EEEEEE", selected: true, status: "pending" },
  ];

  return (
    <div>
      <main className="page-wrap">
        <div className="status-row">
          <div className="status-item">
            <span className="status-icon" onClick={handleRefresh}>
              <i className="fa-solid fa-arrows-rotate"></i>
            </span>
            <span className="status-label">Rescan</span>
          </div>
          <span className="status-label">Detected Product:&nbsp;</span>
          <select
            className="select"
            value={productName}
            onChange={(e) => setDetectedProduct({ name: e.target.value })}
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
              onChange={(e) => setSelectAll(e.target.checked)}
            />
            <span>Select All</span>
          </label>

          <button className="inline-btn" onClick={handleRunTest}>
            <span className="btn-icon" aria-hidden>
              ▶ RUN TEST
            </span>
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

          <div className="mode-switch">
            <button
              className={`mode-btn ${
                activeMode === "production" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setActiveMode("production")}
            >
              PRODUCTION
            </button>
            <button
              className={`mode-btn ${
                activeMode === "customized" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setActiveMode("customized")}
            >
              CUSTOMIZED
            </button>
          </div>
        </div>

        <div className="test-groups-table">
          {groups.map((group, index) => (
            <div key={index} className="group-item">
              <label className="checkbox">
                <input type="checkbox" checked={group.selected} />
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

export { DetectedProduct };