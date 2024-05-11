import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const PrivateRoute = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    console.log(isAuthenticated); 
  } else {
    return (
      <>
        <Outlet />
      </>)
  }
  
};

export default PrivateRoute;