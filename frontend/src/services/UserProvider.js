import React, { createContext, useContext, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Create a context with a default value
const UserContext = createContext({ userID: null });

const UserProvider = ({ children }) => {
  const { isAuthenticated, user: auth0User } = useAuth0();

  // Extract userID if authenticated
  const userID = useMemo(() => (isAuthenticated ? auth0User?.sub : null), [isAuthenticated, auth0User]);

  return (
    <UserContext.Provider value={{ userID }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using user context
export const useUser = () => useContext(UserContext);

export default UserProvider;