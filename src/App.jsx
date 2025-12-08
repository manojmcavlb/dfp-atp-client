import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Role } from "./utils";
import { authenticationService } from "./services";
import { PrivateRoute } from "./routes"; // Assuming PrivateRoute is updated for v6
import { ResetPassword } from "./components/pages/ResetPassword/ResetPassword";
// import { HomePage } from "./components/pages/HomePage/HomePage";
import { Header } from "./components/ui/Header";
import { ManageUser } from "./components/pages/ManageUser";
import AddEditUser from "./components/pages/ManageUser/AddEditUser";
import { Login } from "./components/pages/Login";
import Drivers from "./components/pages/Drivers/index";
import MainMenu from "./components/pages/MainMenu/MainMenu";
import { AutoTest } from "./components/pages/AutoTest";
import AddEditDevice from "./components/pages/AutoTest/AddEditDevice";
import Calibration from "./components/pages/Calibration";
import AddEditCalibration from "./components/pages/Calibration/AddEditCalibration";
import TestSettings from "./components/pages/TestSettings/TestSettings";
import AddEditTestSettings from "./components/pages/TestSettings/AddEditTestSettings";
import Instrument from "./components/pages/Instrument";
import SelfTest from "./components/pages/SelfTest/SelfTest";
import AtpHealthStatus from "./components/pages/AtpHealthStatus/AtpHealthStatus";
import ErrorLog from "./components/pages/ErrorLog/ErrorLog";
import SessionExpiredAlert from "./components/ui/SessionExpiredAlert/SessionExpiredAlert";
import { COOKIE_CHECK_INTERVAL } from "./utils/constants";
import AddEditTestSuite from "./components/pages/SelfTest/AddEditTestSuite";

// Helper function to get a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAdmin: false,
      sessionExpired: false,
    };
  }

  componentDidMount() {
    this.subscription = authenticationService.currentUser.subscribe((x) =>
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin,
      })
    );
    this.sessionInterval = setInterval(this.checkSession, COOKIE_CHECK_INTERVAL); // Check session every 1 min
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
    clearInterval(this.sessionInterval);
  }

  checkSession = () => {
    if (this.state.currentUser && !this.state.sessionExpired) {
      const sessionCookie = getCookie("session");
      if (sessionCookie) {
        try {
          const { expiry } = JSON.parse(decodeURIComponent(sessionCookie));
          if (new Date().getTime() > expiry) {
            this.setState({ sessionExpired: true });
          }
        } catch (e) {
          this.setState({ sessionExpired: true });
        }
      } else {
        this.setState({ sessionExpired: true });
      }
    }
  };

  handleLoginRedirect = () => {
    authenticationService.logout();
    this.setState({ sessionExpired: false });
  };

  render() {
    const { currentUser, isAdmin, sessionExpired } = this.state;

    // const statusBarStyle = {
    //   backgroundColor: "#11182F",
    //   color: "#fff",
    //   borderTop: "1px solid #e7e7e7",
    //   textAlign: "center",
    //   padding: "2px",
    //   position: "fixed",
    //   left: "0",
    //   bottom: "0",
    //   width: "100%",
    // };

    return (
      <Router>
        <div>
          {sessionExpired && <SessionExpiredAlert onLoginRedirect={this.handleLoginRedirect} />}
          <Header />
          {/* {currentUser && (
            <nav
              className="navbar navbar-expand navbar-dark"
              style={{ backgroundColor: "#11182F" }}
            >
              <div className="navbar-nav">
                <Link to="/" className="navbar-brand bg-light">
                  <img src={require("./assets/logo.svg").default} alt="" />
                </Link>
                <Link to="/" className="nav-item nav-link">
                  Home
                </Link>
                {isAdmin && (
                  <Link to="/drivers" className="nav-item nav-link">
                    Drivers
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/manageUser" className="nav-item nav-link">
                    Manage User
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/controlIndicationPanel"
                    className="nav-item nav-link"
                  >
                    Control & Indication Panel
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/calibration" className="nav-item nav-link">
                    Calibration Screen
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/productionTesting" className="nav-item nav-link">
                    Production Testing
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/singleTest" className="nav-item nav-link">
                    Single Test Screen
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/dataVisualization" className="nav-item nav-link">
                    Data Visualization
                  </Link>
                )}
                {isAdmin && (
                  <Link to="/errorHandling" className="nav-item nav-link">
                    Error Handling & Reporting
                  </Link>
                )}
                <a
                  onClick={this.logout}
                  className="nav-item nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </a>
              </div>
            </nav>
          )} */}
          <Routes>
            {/* <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            /> */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/reset-password"
              element={
                <ResetPassword />
              }
            />
            <Route
              path="/main-menu"
              element={
                <PrivateRoute>
                  <MainMenu />
                </PrivateRoute>
              }
            />
            <Route
              path="/drivers"
              element={
                <PrivateRoute roles={[Role.Admin]}>
                  <Drivers />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage-user"
              element={
                <PrivateRoute roles={[Role.Admin]}>
                  <ManageUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-user"
              element={
                <PrivateRoute roles={[Role.Admin]}>
                  <AddEditUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-user/:id"
              element={
                <PrivateRoute roles={[Role.Admin]}>
                  <AddEditUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-device"
              element={
                <PrivateRoute>
                  <AddEditDevice />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-device/:id"
              element={
                <PrivateRoute>
                  <AddEditDevice />
                </PrivateRoute>
              }
            />
            <Route
              path="/auto-test"
              element={
                <PrivateRoute>
                  <AutoTest />
                </PrivateRoute>
              }
            />
            <Route
              path="/auto-test?product=remote-head"
              element={
                <PrivateRoute>
                  <AutoTest product="remote-head" />
                </PrivateRoute>
              }
            />
            <Route
              path="/auto-test?product=iot-gateway"
              element={
                <PrivateRoute>
                  <AutoTest product="iot-gateway" />
                </PrivateRoute>
              }
            />
            <Route
              path="/calibration"
              element={
                <PrivateRoute>
                  <Calibration />
                </PrivateRoute>
              }
            />
            <Route
              path="/instrument"
              element={
                <PrivateRoute>
                  <Instrument />
                </PrivateRoute>
              }
            />
            <Route path="/test-settings" element={<PrivateRoute><TestSettings /></PrivateRoute>} />
            <Route path="/add-test-settings" element={<PrivateRoute><AddEditTestSettings /></PrivateRoute>} />
            <Route path="/edit-test-settings/:id" element={<PrivateRoute><AddEditTestSettings /></PrivateRoute>} />
            <Route path="/add-calibration" element={<PrivateRoute><AddEditCalibration /></PrivateRoute>} />
            <Route path="/edit-calibration/:id" element={<PrivateRoute><AddEditCalibration /></PrivateRoute>} />
            <Route path="/self-test" element={<PrivateRoute><SelfTest /></PrivateRoute>} />
            <Route path="/add-test-suite" element={<PrivateRoute><AddEditTestSuite /></PrivateRoute>} />
            <Route path="/edit-test-suite/:id" element={<PrivateRoute><AddEditTestSuite /></PrivateRoute>} />
            <Route path="/health-status" element={<PrivateRoute><AtpHealthStatus /></PrivateRoute>} />
            <Route path="/error-log" element={<PrivateRoute><ErrorLog /></PrivateRoute>} />
            {/* <Route path="/add-self-test" element={<PrivateRoute><AddEditTestSuite /></PrivateRoute>} />
            <Route path="/edit-self-test/:id" element={<PrivateRoute><AddEditTestSuite /></PrivateRoute>} /> */}
          </Routes>
          {/* <div style={statusBarStyle}>
            DFP @Copyrights
          </div> */}
        </div>
      </Router>
    );
  }
}

export { App };