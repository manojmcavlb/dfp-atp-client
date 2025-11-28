import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticationService } from "../../../services";
import usersData from "../../../utils/users.json";
import "./styles.css";

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
    <div>
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
                  aria-label={showPwd ? "Hide password" : "Show password"}
                  title={showPwd ? "Hide password" : "Show password"}
                  onClick={() => setShowPwd(s => !s)}
                >
                  {showPwd ? <EyeOffIcon className="eye-svg" /> : <EyeIcon className="eye-svg" />}
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