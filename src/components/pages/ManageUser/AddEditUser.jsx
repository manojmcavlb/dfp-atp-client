import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../assets/styles/main.css";

function AddEditUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = id !== undefined;

  const handleSave = () => {
    // Implement save logic here
    console.log("Save user:", {
      username,
      email,
      role,
      password,
      confirmPassword,
    });
    navigate("/manage-user");
  };

  const handleCancel = () => {
    navigate("/manage-user");
  };

  return (
    <div className="page-bg">
      <main className="center-wrap">
        <div className="card form-card">
          <h2 className="card-title">
            {isEditMode ? "Edit User" : "Add User"}
          </h2>
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
              <input
                className="input"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
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
                  {showPassword ? (
                    <FaEye/>
                  ) : (
                    <FaEyeSlash/>
                  )}
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
                  {showConfirmPassword ? (
                    <FaEye/>
                  ) : (
                    <FaEyeSlash/>
                  )}
                </button>
              </div>
            </label>
            <div className="row-between">
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
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddEditUser;