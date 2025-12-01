import React from "react";
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
import { DetectedProduct } from "./components/pages/DetectedProduct";
import AddEditDevice from "./components/pages/DetectedProduct/AddEditDevice";
import Calibration from "./components/pages/Calibration";
import AddEditCalibration from "./components/pages/Calibration/AddEditCalibration";
import TestSettings from "./components/pages/TestSettings/TestSettings";
import AddEditTestSettings from "./components/pages/TestSettings/AddEditTestSettings";
import Instrument from "./components/pages/Instrument";
import TestSuites from "./components/pages/TestSuites/TestSuites";

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
                      path="/detected-product"
                      element={
                        <PrivateRoute>
                          <DetectedProduct />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/detected-product?product=remote-head"
                      element={
                        <PrivateRoute>
                          <DetectedProduct product="remote-head" />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/detected-product?product=iot-gateway"
                      element={
                        <PrivateRoute>
                          <DetectedProduct product="iot-gateway" />
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
                    <Route path="/test-suite" element={<PrivateRoute><TestSuites /></PrivateRoute>} />
                    {/* <Route path="/add-test-suite" element={<PrivateRoute><AddEditTestSuite /></PrivateRoute>} />
                    <Route path="/edit-test-suite/:id" element={<PrivateRoute><AddEditTestSuite /></PrivateRoute>} /> */}
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