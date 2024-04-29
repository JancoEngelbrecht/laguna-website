import React, {useState} from 'react';
import { useAuth } from '../../services/AuthContext';

const LoginButton = () => {
  const {login} = useAuth()

  const handleLogin = () => {
    login();
  };

  return (
    <div>
      <h1 className='flex justify-center'>User Login</h1>
      <div className='relative box-border w-full h-12 flex justify-center'>
        <button className='absolute border px-4 py-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginButton;