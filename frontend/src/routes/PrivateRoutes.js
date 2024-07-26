import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useRoles } from '../services/RoleProvider';

const PrivateRoute = ({ roles: requiredRoles }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { roles: userRoles } = useRoles();

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Check if no specific roles are required or if the user has the required roles
  const hasRequiredRole = requiredRoles === "" || requiredRoles.some(role => userRoles.includes(role));
  
  if (!hasRequiredRole) {
    return <Navigate to="/" />;
  }

  
  return <Outlet />;
};

export default PrivateRoute;