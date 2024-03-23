import React, {useState} from 'react';
import { useAuth } from '../../services/AuthContext';

const LogoutButton = () => {
  const {logout} = useAuth()

  const handleLogin = () => {
    logout();
  };

  return (
      <button onClick={handleLogin}>Logout</button>
  );
};

export default LogoutButton;