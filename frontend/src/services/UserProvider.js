import React, { createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { isAuthenticated, user: auth0User } = useAuth0();

  // Extract userID if authenticated
  const userID = isAuthenticated ? auth0User.sub : null;

  return (
    <UserContext.Provider value={{ userID }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;