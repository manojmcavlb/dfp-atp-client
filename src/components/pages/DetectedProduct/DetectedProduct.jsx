import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../utils/auth-header";
import "./styles.css";

function DetectedProduct() {
  const navigate = useNavigate();

  // Simulated detection state; set to null for "None" or object for "Remote Head"
  const [detectedProduct, setDetectedProduct] = useState(null);
  const [runs, setRuns] = useState(1);
  const [activeMode, setActiveMode] = useState("production"); // 'production' | 'customized'
  const [selectAll, setSelectAll] = useState(false);

  const productName = detectedProduct?.name ?? "None";

  // Simulate scanning action
  function handleRefresh() {
    // Toggle for demo; replace with station detection logic
    if (detectedProduct) {
      setDetectedProduct(null);
      setActiveMode("production");
      setSelectAll(false);
    } else {
      setDetectedProduct({ name: "Remote Head" });
    }
  }

  function handleRunTest() {
    // stub action; hook your real test runner here
    alert(`Running ${runs} time(s) on ${selectAll ? "all" : "selected"} groups`);
  }

  const groups = [];

  return (
    <div className="page-bg">
      <header className="topbar">
        <img src="../images/logo.svg" alt="logo" className="logo-left" />
        <h1 className="title">IoT Eco-Sphere ATP Station</h1>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="secondary-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="product-wrap">
        {/* Status Row (matches both mocks) */}
        <div className="status-row">
          <span className="status-icon" onClick={handleRefresh}>
            🔄️
          </span>
          <span className="status-label">Detected Product:&nbsp;</span>
          {detectedProduct ? (
            // display as an anchor or span — kept anchor to mimic "clickable" device
            <a href="#device" className="detected-product">
              {productName}
            </a>
          ) : (
            <span className="status-none">None</span>
          )}

          <div className="status-actions">
            {detectedProduct ? (
              <>
                <button className="secondary-btn">Edit Device</button>
                <button className="primary-btn">Tests</button>
                <button className="secondary-btn">View Reports</button>
              </>
            ) : (
              <button className="secondary-btn">View Reports</button>
            )}
          </div>
        </div>

        {/* No station connected */}
        {!detectedProduct && (
          <section className="no-station">
            <p>No Product Detected.</p>
            <p>Press Refresh button to rescan.</p>
          </section>
        )}

        {/* Station connected */}
        {detectedProduct && (
          <>
            {/* Run controls row */}
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
                  ▶
                </span>{" "}
                Run Test
              </button>

              <div className="runs-field">
                <label htmlFor="runs" className="runs-label">
                  No: of Runs
                </label>
                <input
                  id="runs"
                  className="runs-input"
                  type="number"
                  min={1}
                  max={99}
                  value={runs}
                  onChange={(e) => setRuns(Number(e.target.value))}
                />
              </div>

              <div className="mode-switch">
                <button
                  className={`mode-btn ${activeMode === "production" ? "active" : ""}`}
                  onClick={() => setActiveMode("production")}
                >
                  Production
                </button>
                <button
                  className={`mode-btn ${activeMode === "customized" ? "active" : ""}`}
                  onClick={() => setActiveMode("customized")}
                >
                  Customized
                </button>
              </div>
            </div>

            {/* Main two-pane area */}
            <div className="two-pane">
              {/* Left: test groups */}
              <aside className="group-list">
                {groups.map((g, i) => (
                  <button
                    key={i}
                    className={`group-item ${g.highlight ? "bold" : ""}`}
                    onClick={() => {}}
                    title={g.name}
                  >
                    <span className="group-name">{g.name}</span>
                    <span className="group-meta" aria-hidden>
                      •
                    </span>
                  </button>
                ))}
              </aside>

              {/* Right: work area */}
              <section className="work-area">
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export { DetectedProduct };