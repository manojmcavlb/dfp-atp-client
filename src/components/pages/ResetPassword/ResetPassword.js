import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "../../../utils/users.json";
import SessionExpiredAlert from "../../ui/SessionExpiredAlert";
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

/* ---------- icons ---------- */
const EyeIcon = ({ className }) => (
  <svg className={className} width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor"
      d="M12 5c-5.5 0-9.5 5.5-9.5 7s4 7 9.5 7 9.5-5.5 9.5-7S17.5 5 12 5zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5
         5 2.2 5 5-2.2 5-5 5zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg className={className} width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor"
      d="M2 5.27 3.27 4 20 20.73 18.73 22l-2.29-2.29C15.2 20.23 13.66 21 12 21
         6.5 21 2.5 15.5 2.5 14c0-.76 1.48-3.47 4.46-5.44l-4.96-3.29zM12 7c5.5 0 9.5 5.5 9.5 7
         0 .59-.87 2.29-2.63 4l-2.36-2.36A5 5 0 0 0 12 8c-.34 0-.67.03-.98.1L9.59 6.67
         C10.36 6.23 11.16 6 12 6zm0 4a3 3 0 0 1 3 3c0 .42-.09.82-.25 1.18L10.82 10.25
         A2.96 2.96 0 0 1 12 11z"/>
  </svg>
);

function ResetPassword() {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [message, setMessage] = useState("");
  const [localUsers, setLocalUsers] = useState(usersData.users);
  const [showSessionExpiredAlert, setShowSessionExpiredAlert] = useState(false);
  const navigate = useNavigate();

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
      setMessage("Password updated in session. Download updated users.json to persist.");
    } else {
      updated = [...localUsers, { username, password: pwd }];
      setLocalUsers(updated);
      setMessage("User created in session. Download updated users.json to persist.");
    }
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

  const handleLoginRedirect = () => {
    setShowSessionExpiredAlert(false);
    navigate("/login");
  };

  const rules = [
    "Minimum length of 12 characters.",
    "Maximum length of 64 characters.",
    "At least 1 uppercase letter.",
    "At least 1 lowercase letter.",
    "At least 1 digit.",
    "At least 1 special character.",
    "Exclude sequential characters."
  ];

  return (
    <div className="page-bg">
      <header className="topbar">
        <img src="./images/logo.svg" alt="logo" className="logo-left" />
        <h1 className="title">IoT Eco-Sphere ATP Station</h1>
      </header>

      <main className="center-wrap">
        {showSessionExpiredAlert && (
          <SessionExpiredAlert onLogin={handleLoginRedirect} />
        )}
        {/* NEW: side-by-side container */}
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
                    className="eye-btn"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                    title={showPwd ? "Hide password" : "Show password"}
                    onClick={() => setShowPwd(s => !s)}
                  >
                    {showPwd ? <EyeOffIcon className="eye-svg" /> : <EyeIcon className="eye-svg" />}
                  </button>
                </div>
              </label>

              <label className="label">
                Confirm Password:
                <div className="pwd-row">
                  <input
                    className="input has-icon"
                    type={showPwd ? "text" : "password"}
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                    title={showPwd ? "Hide password" : "Show password"}
                    onClick={() => setShowPwd(s => !s)}
                  >
                    {showPwd ? <EyeOffIcon className="eye-svg" /> : <EyeIcon className="eye-svg" />}
                  </button>
                </div>
              </label>

              <div className="row-between">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => navigate("/login")}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">Reset</button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setShowSessionExpiredAlert(true)}
                >
                  Test Session Expiry
                </button>
              </div>

              {message && <div className="info-msg">{message}</div>}
            </form>
          </div>

          {/* RIGHT: Password rules card */}
          <aside className="card rule-card">
            <div className="rule-card-title">Password must:</div>
            <ul className="rule-list">
              {rules.map((r, i) => (
                <li key={i}>
                  <span className="rule-check" aria-hidden="true">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
    </div>
  );
}

export { ResetPassword };