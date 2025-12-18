import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "../../../utils/users.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../assets/styles/main.css";
import "./styles.css";
/* ---------- utils ---------- */
function hasSequentialString(s, length = 3) {
  if (!s) return false;
  const seq = "abcdefghijklmnopqrstuvwxyz0123456789";
  const lower = s.toLowerCase();
  for (let i = 0; i <= seq.length - length; i++) {
    const sub = seq.slice(i, i + length);
    if (lower.includes(sub)) return true;
  }
  return false;
}

function ResetPassword() {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [localUsers, setLocalUsers] = useState(usersData.users);
  const navigate = useNavigate();

  const getValidationState = (p) => ({
    minLength: p.length >= 12,
    maxLength: p.length <= 64,
    uppercase: /[A-Z]/.test(p),
    lowercase: /[a-z]/.test(p),
    digit: /[0-9]/.test(p),
    special: /[!@#$%^&*.()_+\-=[\]{};':"\\|,.<>/?`~]/.test(p),
    sequential: !hasSequentialString(p, 4),
  });

  const [validationState, setValidationState] = useState(getValidationState(pwd));

  useEffect(() => {
    setValidationState(getValidationState(pwd));
  }, [pwd]);

  function validatePassword(p) {
    const errors = [];
    if (p.length < 12) errors.push("Minimum length of 12 characters.");
    if (p.length > 64) errors.push("Maximum length of 64 characters.");
    if (!/[A-Z]/.test(p)) errors.push("At least 1 uppercase letter.");
    if (!/[a-z]/.test(p)) errors.push("At least 1 lowercase letter.");
    if (!/[0-9]/.test(p)) errors.push("At least 1 digit.");
    if (!/[!@#$%/\\&*()_+\-=\[\]{};:'\"|,.<>/?`~]/.test(p)) errors.push("At least 1 special character.");
    if (hasSequentialString(p, 4)) errors.push("Avoid simple sequential strings.");
    return errors;
  }

  function handleReset(e) {
    e.preventDefault();
    const errs = validatePassword(pwd);
    if (errs.length) {
      setMessage(errs.join(" "));
      return;
    }
    if (pwd !== confirm) {
      setMessage("Password and confirm password do not match.");
      return;
    }
    // Update in-memory users list
    const idx = localUsers.findIndex(u => u.username === username);
    let updated;
    if (idx >= 0) {
      updated = [...localUsers];
      updated[idx].password = pwd;
      setLocalUsers(updated);
    } else {
      updated = [...localUsers, { username, password: pwd }];
      setLocalUsers(updated);
    }

    setMessage("");
    setShowSuccessModal(true);

    // Prepare downloadable JSON
    const payload = { users: updated };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const rules = [
    { id: "minLength", text: "Minimum length of 12 characters." },
    { id: "maxLength", text: "Maximum length of 64 characters." },
    { id: "uppercase", text: "At least 1 uppercase letter." },
    { id: "lowercase", text: "At least 1 lowercase letter." },
    { id: "digit", text: "At least 1 digit." },
    { id: "special", text: "At least 1 special character." },
    { id: "sequential", text: "Exclude sequential characters." },
  ];

  return (
    <div className="page-bg">
      <main className="center-wrap">
        {showSuccessModal ? (
          <div className="card" style={{ textAlign: 'center', padding: '2rem 4rem', margin: 'auto', maxWidth: '450px' }}>
            <div style={{ fontSize: '48px', color: '#222', marginBottom: '1rem', fontWeight: '200' }}>✓</div>
            <h2 className="card-title" style={{ marginBottom: '1rem' }}>Password Changed!</h2>
            <p style={{ marginBottom: '2rem', color: '#555' }}>Your password has been changed successfully.</p>
            <button className="btn-primary" style={{ padding: '0.5rem 2rem' }} onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        ) : (
          <div className="split-wrap">
            {/* LEFT: Reset Password card */}
            <div className="card form-card">
              <h2 className="card-title">Reset Password</h2>

              <form onSubmit={handleReset} className="form">
                <label className="label">
                  Username:
                  <input
                    className="input"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </label>

                <label className="label">
                  Password:
                  <div className="pwd-row">
                    <input
                      className="input has-icon"
                      type={showPwd ? "text" : "password"}
                      value={pwd}
                      onChange={e => setPwd(e.target.value)}
                    />
                    <button
                      type="button"
                      className="pwd-eye"
                      aria-label={showPwd ? "Hide password" : "Show password"}
                      title={showPwd ? "Hide password" : "Show password"}
                      onClick={() => setShowPwd(s => !s)}
                    >
                      {showPwd ? (
                        <FaEye />
                      ) : (
                        <FaEyeSlash />
                      )}
                    </button>
                  </div>
                </label>

                <label className="label">
                  Confirm Password:
                  <div className="pwd-row">
                    <input
                      className="input has-icon"
                      type={showConfirmPwd ? "text" : "password"}
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                    />
                    <button
                      type="button"
                      className="pwd-eye"
                      aria-label={showConfirmPwd ? "Hide password" : "Show password"}
                      title={showConfirmPwd ? "Hide password" : "Show password"}
                      onClick={() => setShowConfirmPwd(s => !s)}
                    >
                      {showConfirmPwd ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </label>

                <div className="action-btns center">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => navigate("/login")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">Reset</button>
                </div>

                {message && <div className="msg msg-error">{message}</div>}
              </form>
            </div>

            {/* Reset Password - Rules Overlay’ */}
            <aside className="card card-rules-overlay">
              <div className="rule-title">Password must:</div>
              <ul className="rule-list">
                {rules.map((rule) => {
                  const isMet = validationState[rule.id];
                  const statusClass = pwd.length === 0 ? "" : isMet ? "met" : "unmet";
                  const tickSymbol = pwd.length > 0 && !isMet ? "✗" : "✓";
                  return (
                    <li key={rule.id}>
                      <span className={`rule-check ${statusClass}`} aria-hidden="true">
                        {tickSymbol}
                      </span>
                      <span>{rule.text}</span>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export { ResetPassword };