import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    // Logic for user authentication (e.g., fetching user data from server)
    setIsAuthenticated(true);
    navigate('/usersettings');
  };

  const logout = () => {
    // Logic for user logout
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext); 