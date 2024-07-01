import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const RoleContext = createContext();

const RoleProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently();
          const response = await axios.get('http://localhost:4000/auth0/user_roles', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          const userWithRoles = response.data;
          setRoles(userWithRoles.roles); // Update roles state with roles array
          // console.log('User roles:', userWithRoles.roles);
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }
    };

    fetchUserRoles();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <RoleContext.Provider value={{ roles }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRoles = () => useContext(RoleContext);

export default RoleProvider;