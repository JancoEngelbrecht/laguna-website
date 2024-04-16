import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //Change to null worked
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (storedAuthState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    console.log(isAuthenticated, "AuthContext Login");
    navigate('/user');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    console.log(isAuthenticated, "AuthContext Logout");
    navigate('/login')
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext); 