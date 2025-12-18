import React from 'react';
import { Navigate } from 'react-router-dom';
import { authenticationService } from '../services';

export const PrivateRoute = ({ children, roles }) => {
  const currentUser = authenticationService.currentUserValue;

  if (!currentUser) {
    // not logged in so redirect to login page
    return <Navigate to="/login" />;
  }

  // check if route is restricted by role
  if (roles && roles.indexOf(currentUser.role) === -1) {
    // role not authorized so redirect to home page
    return <Navigate to="/login" />;
  }

  // authorized so return child components
  return children;
};
