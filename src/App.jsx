import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Role } from './utils';
import { authenticationService } from './services';
import { PrivateRoute } from './routes';
import { ResetPassword } from './components/pages/ResetPassword/ResetPassword';
import { Header } from './components/ui/Header';
import { ManageUser } from './components/pages/ManageUser';
import AddEditUser from './components/pages/ManageUser/AddEditUser';
import { Login } from './components/pages/Login';
import Drivers from './components/pages/Drivers/index';
import MainMenu from './components/pages/MainMenu/MainMenu';
import AutoTest from './components/pages/AutoTest/AutoTest';
import AddEditDevice from './components/pages/AutoTest/AddEditDevice';
import Calibration from './components/pages/Calibration';
import AddEditCalibration from './components/pages/Calibration/AddEditCalibration';
import TestSettings from './components/pages/TestSettings/TestSettings';
import AddEditTestSettings from './components/pages/TestSettings/AddEditTestSettings';
import Instrument from './components/pages/Instrument';
import SelfTest from './components/pages/SelfTest/SelfTest';
import AtpHealthStatus from './components/pages/AtpHealthStatus/AtpHealthStatus';
import ErrorLog from './components/pages/ErrorLog/ErrorLog';
import SessionExpiredAlert from './components/ui/SessionExpiredAlert/SessionExpiredAlert';
import { COOKIE_CHECK_INTERVAL } from './utils/constants';
import AddEditTestSuite from './components/pages/SelfTest/AddEditTestSuite';
import HealthStatus from './components/ui/HealthStatus';
import CalibHealthStatus from './components/ui/CalibHealthStatus';
import Settings from './components/pages/Settings/Settings';
import {
  setHealthStatusColorAtp,
  setHealthStatusColorCalib,
} from './redux/actions';
import ErrorLogDetails from './components/pages/ErrorLog/ErrorLogDetails';
import ReportHistory from './components/pages/ReportHistory/ReportHistory';
import ViewReport from './components/pages/ViewReport/ViewReport';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = authenticationService.currentUser.subscribe((x) => {
      setCurrentUser(x);
      setIsAdmin(x && x.role === Role.Admin);
    });

    const checkSession = () => {
      if (currentUser && !sessionExpired) {
        const sessionCookie = getCookie('session');
        if (sessionCookie) {
          try {
            const { expiry } = JSON.parse(decodeURIComponent(sessionCookie));
            if (new Date().getTime() > expiry) {
              setSessionExpired(true);
            }
          } catch (e) {
            setSessionExpired(true);
          }
        } else {
          setSessionExpired(true);
        }
      }
    };

    const sessionInterval = setInterval(checkSession, COOKIE_CHECK_INTERVAL);

    const colorInterval = setInterval(() => {
      const colors = ['green', 'red'];
      dispatch(
        setHealthStatusColorAtp(
          colors[Math.floor(Math.random() * colors.length)]
        )
      );
      dispatch(
        setHealthStatusColorCalib(
          colors[Math.floor(Math.random() * colors.length)]
        )
      );
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearInterval(sessionInterval);
      clearInterval(colorInterval);
    };
  }, [currentUser, sessionExpired, dispatch]);

  const handleLoginRedirect = () => {
    authenticationService.logout();
    setSessionExpired(false);
  };

  return (
    <Router>
      <div>
        {sessionExpired && (
          <SessionExpiredAlert onLoginRedirect={handleLoginRedirect} />
        )}
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
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
          <Route
            path="/test-settings"
            element={
              <PrivateRoute>
                <TestSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-test-settings"
            element={
              <PrivateRoute>
                <AddEditTestSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-test-settings/:id"
            element={
              <PrivateRoute>
                <AddEditTestSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-calibration"
            element={
              <PrivateRoute>
                <AddEditCalibration />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-calibration/:id"
            element={
              <PrivateRoute>
                <AddEditCalibration />
              </PrivateRoute>
            }
          />
          <Route
            path="/self-test"
            element={
              <PrivateRoute>
                <SelfTest />
              </PrivateRoute>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/add-test-suite"
            element={
              <PrivateRoute>
                <AddEditTestSuite />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-test-suite/:id"
            element={
              <PrivateRoute>
                <AddEditTestSuite />
              </PrivateRoute>
            }
          />
          <Route
            path="/health-status"
            element={
              <PrivateRoute>
                <AtpHealthStatus />
              </PrivateRoute>
            }
          />
          <Route
            path="/error-log"
            element={
              <PrivateRoute>
                <ErrorLog />
              </PrivateRoute>
            }
          />
          <Route
            path="/error-log/details/:id"
            element={
              <PrivateRoute>
                <ErrorLogDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/report-history"
            element={
              <PrivateRoute>
                <ReportHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-report"
            element={
              <PrivateRoute>
                <ViewReport />
              </PrivateRoute>
            }
          />
        </Routes>
        <div className="footer">
          <div className="status-bar action-btns">
            {currentUser && (
              <>
                <HealthStatus />
                <CalibHealthStatus />
              </>
            )}
          </div>
          <div className="footer-copyright">
            <span>DFP @Copyrights 2026</span>
          </div>
        </div>
      </div>
    </Router>
  );
}

export { App };
