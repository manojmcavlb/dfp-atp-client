import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../assets/styles/main.css";

const screens = [
  "Auto Test",
  "Self Test",
  "Health Status",
  "Test Limits",
  "Calibration Info.",
  "Instrument Settings",
  "Manage User",
  "Error/Event Log",
];

const privilegeConfig = {
    view: { label: "View", enabled: screens },
    addEdit: { label: "Add/Edit", enabled: ["Self Test", "Test Limits", "Instrument Settings", "Manage User"] },
    delete: { label: "Delete", enabled: ["Test Limits", "Manage User"] },
    execute: { label: "Execute", enabled: ["Auto Test", "Self Test"] }
};

const privilegeKeys = Object.keys(privilegeConfig);

// Corresponds to View, Add/Edit, Delete, Execute for each screen
const initialPrivilegeValues = [
  // View, Add/Edit, Delete, Execute
  [true, true, false, true],   // Auto Test
  [false, true, false, true],   // Self Test
  [true, false, false, false], // Health Status
  [false, true, true, false],  // Test Limits
  [true, false, false, false], // Calibration Info.
  [true, true, false, false], // Instrument Settings
  [true, true, true, false],  // Manage User
  [true, false, false, false], // Error/Event Log
];

const initialPrivileges = screens.reduce((acc, screen, screenIndex) => {
  acc[screen] = privilegeKeys.reduce((privs, key, privIndex) => {
    privs[key] = initialPrivilegeValues[screenIndex]?.[privIndex] || false;
    return privs;
  }, {});
  return acc;
}, {});

function AddEditUser() {
  const [username, setUsername] = useState("testuser");
  const [email, setEmail] = useState("test@example.com");
  const [role, setRole] = useState("Admin");
  const [password, setPassword] = useState("password123");
  const [confirmPassword, setConfirmPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [privileges, setPrivileges] = useState(initialPrivileges);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  const handlePrivilegeChange = (screen, privilege) => {
    setPrivileges((prev) => ({
      ...prev,
      [screen]: {
        ...prev[screen],
        [privilege]: !prev[screen][privilege],
      },
    }));
  };

  const handleSave = () => {
    // Implement save logic here
    console.log("Save user:", {
      username,
      email,
      role,
      password,
      confirmPassword,
      privileges,
    });
    navigate("/manage-user");
  };

  const handleCancel = () => {
    navigate("/manage-user");
  };

  return (
    <div className="page-bg">
      <main className="page-wrap">
        <h2 className="page-title">{isEditMode ? "Edit User" : "Add User"}</h2>
        <div className="two-column-layout">
          <div className="card card-user">
            <form className="form">
              <label className="label">
                User Name:
                <input
                  className="input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label className="label">
                Email:
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="label">
                Role:
                <select
                  className="input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Technical Operator">Technical Operator</option>
                </select>
              </label>
              <label className="label">
                Password:
                <div className="pwd-row">
                  <input
                    className="input has-icon"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </label>
              <label className="label">
                Confirm Password:
                <div className="pwd-row">
                  <input
                    className="input has-icon"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </label>
            </form>
          </div>
          <div className="card card-privilege">
            <h4 className="card-title-privileges">Screen Privileges</h4>
            <div className="table-container">
              <table className="page-table">
                <thead>
                  <tr>
                    <th>Screen Name</th>
                    {privilegeKeys.map(privKey => (
                      <th key={privKey}>{privilegeConfig[privKey].label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {screens.map((screen) => (
                    <tr key={screen}>
                      <td>{screen}</td>
                      {privilegeKeys.map(privKey => (
                        <td key={privKey} className="td-checkbox">
                          <input
                            type="checkbox"
                            checked={privileges[screen][privKey]}
                            onChange={() => handlePrivilegeChange(screen, privKey)}
                            disabled={!privilegeConfig[privKey].enabled.includes(screen)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="action-btns center">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
          >
            CANCEL
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleSave}
          >
            SAVE
          </button>
        </div>
      </main>
    </div>
  );
}

export default AddEditUser;