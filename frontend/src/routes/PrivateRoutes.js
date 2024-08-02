import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useRoles } from '../services/RoleProvider';

import Spinner from '../components/common/global/Spinner';

const PrivateRoute = ({ roles: requiredRoles = [] }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { roles: userRoles } = useRoles();

  // Show a spinner while loading authentication status
  if (isLoading) {
    return <Spinner />;
  }

  // Redirect to home if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Check if no specific roles are required or if the user has the required roles
  const hasRequiredRole = requiredRoles.length === 0 || requiredRoles.some(role => userRoles.includes(role));
  
  // Redirect to home if the user does not have the required roles
  if (!hasRequiredRole) {
    return <Navigate to="/" />;
  }

  // Render the child components if all checks pass
  return <Outlet />;
};

export default PrivateRoute;