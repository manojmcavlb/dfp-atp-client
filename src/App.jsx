import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Role } from "./utils";
import { authenticationService } from "./services";
import { PrivateRoute } from "./routes"; // Assuming PrivateRoute is updated for v6
import { ResetPassword } from "./components/pages/ResetPassword/ResetPassword";
import { HomePage } from "./components/pages/HomePage/HomePage";
import { ManageUser } from "./components/pages/ManageUser";
import { Login } from "./components/pages/Login";
import Drivers from "./components/pages/Drivers/index";
import { Home } from "./components/pages/Home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAdmin: false,
    };
  }

  componentDidMount() {
    this.subscription = authenticationService.currentUser.subscribe((x) =>
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin,
      })
    );
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    const { currentUser, isAdmin } = this.state;

    return (
      <Router>
        <div>
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
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <Routes>
                    {/* <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <HomePage />
                        </PrivateRoute>
                      }
                    /> */}
                    <Route
                      path="/reset-password"
                      element={
                        <ResetPassword />
                      }
                    />
                    <Route
                      path="/home"
                      element={
                        // roles={[Role.Admin]}
                        <PrivateRoute >
                            <Home />
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
                      path="/manageUser"
                      element={
                        <PrivateRoute roles={[Role.Admin]}>
                          <ManageUser />
                        </PrivateRoute>
                      }
                    />
                    {/* Add other PrivateRoutes similarly */}
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export { App };