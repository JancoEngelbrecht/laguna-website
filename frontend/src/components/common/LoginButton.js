import React, {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import AuthProvider from '../../services/AuthProvider';

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  )
};

export default LoginButton;