import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticationService } from "../../../services";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../../assets/styles/main.css";
import "./styles.css";
import { COOKIE_EXPIRY_TIME } from "../../../utils/constants";

// Helper function to get a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Helper function to remove a cookie
function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sessionCookie = getCookie("session");
    if (sessionCookie) {
      try {
        // Decode and parse the cookie value
        const { expiry } = JSON.parse(decodeURIComponent(sessionCookie));
        if (new Date().getTime() < expiry) {
          navigate("/main-menu");
        } else {
          // Remove expired cookie
          removeCookie("session");
        }
      } catch (e) {
        // Remove malformed cookie
        removeCookie("session");
      }
    }
  }, [navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      setError(
        "Please enter both username and password to continue."
      );
      return;
    }
    authenticationService.login(username, password).then(
      (user) => {
        setError("");
        const expiryTime = new Date().getTime() + COOKIE_EXPIRY_TIME; // Set expiry time 30 mins
        const expiryDate = new Date(expiryTime);
        
        // Manually stringify and encode the cookie value
        const cookieValue = encodeURIComponent(JSON.stringify({ user, expiry: expiryTime }));
        
        // Manually construct the cookie string
        document.cookie = `session=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/`;
        
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

          {error && <div className="msg msg-error" role="alert">{error}</div>}

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

            <div className="action-btns">
              <a className="link" href="/reset-password">FORGET PASSWORD?</a>
            </div>
            <div className="center">
              <button className="btn-primary" type="submit">LOGIN</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export { Login };