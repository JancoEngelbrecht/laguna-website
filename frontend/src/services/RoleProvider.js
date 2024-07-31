import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const RoleContext = createContext();

const RoleProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!isAuthenticated) return;

      setLoading(true);
      setError(null);

      try {
        const accessToken = await getAccessTokenSilently();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth0/user_roles`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setRoles(response.data.roles);
      } catch (error) {
        setError('Error fetching user roles');
        console.error('Error fetching user roles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, [isAuthenticated, getAccessTokenSilently]);

  const contextValue = useMemo(() => ({ roles, loading, error }), [roles, loading, error]);

  return (
    <RoleContext.Provider value={contextValue}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRoles = () => useContext(RoleContext);

export default RoleProvider;