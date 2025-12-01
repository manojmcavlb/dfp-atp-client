import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import "../../../styles/main.css";

function AddEditUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="label">
              Confirm Password:
              <input
                className="input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <div className="row-between">
              <button
                type="button"
                className="secondary-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="primary-btn"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddEditUser;