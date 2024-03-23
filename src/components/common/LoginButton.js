import React, {useState} from 'react';
import { useAuth } from '../../services/AuthContext';

const LoginButton = () => {
  const {login} = useAuth()

  const handleLogin = () => {
    login();
  };

  return (
      <button onClick={handleLogin}>Login</button>
  );
};

export default LoginButton;