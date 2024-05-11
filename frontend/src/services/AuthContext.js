//AUTHCONTEXT --> Not using Auth0
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return localStorage.getItem('isAuthenticated') === 'true';
//   });
//   const navigate = useNavigate();
  
  // const login = () => {
  //   setIsAuthenticated(true);
  //   localStorage.setItem('isAuthenticated', 'true');
  //   navigate('/user');
  // };

  // const logout = () => {
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('isAuthenticated');
  //   navigate('/login');
  // };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}> 
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export const useAuth = () => useContext(AuthContext); 