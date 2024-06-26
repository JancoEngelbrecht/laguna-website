import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const RoleContext = createContext();

const RoleProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [roles, setRoles] = useState(['']);

  useEffect(() => {
    if (isAuthenticated && user) {
      const userRoles = user[`${process.env.REACT_APP_AUTH_DOMAIN}/roles`] || [];
      setRoles(userRoles);
    }
  }, [user, isAuthenticated]);

  return (
    <RoleContext.Provider value={{ roles }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRoles = () => useContext(RoleContext);

export default RoleProvider;



// In order to access the Aut0 roles for each user, you need to add a flow which add the user Role meta data to the user when they register. 