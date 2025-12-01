import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticationService } from "../../../services";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../assets/styles/main.css";
import "./styles.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      setError(
        "We didn't recognize the username or password you entered. Please try again."
      );
      return;
    }
    authenticationService.login(username, password).then(
      (user) => {
        setError("");
        navigate("/main-menu");
      },
      (error) => {
        setError(error);
      }
    );
  }

  return (
    <div className="page-bg">
      <main className="center-wrap">
        <div className="card login-card">
          <h2 className="card-title">Login</h2>

          {error && <div className="error-msg" role="alert">{error}</div>}

          <form onSubmit={handleSubmit} className="form">
            <label className="label">
              Username:
              <input
                className="input"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder=""
                autoComplete="username"
              />
            </label>

            <label className="label">
              Password:
              <div className="pwd-row">
                <input
                  className="input has-icon"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder=""
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? (
                    <FaEye className="eye-svg" />
                  ) : (
                    <FaEyeSlash className="eye-svg" />
                  )}
                </button>
              </div>
            </label>

            <div className="row-between">
              <a className="forgot" href="/reset-password">Forget Password?</a>
            </div>
            <div className="center">
              <button className="primary-btn" type="submit">Login</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export { Login };