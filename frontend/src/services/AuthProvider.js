import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider
    domain = {process.env.REACT_APP_AUTH_DOMAIN}
    clientId= {process.env.REACT_APP_AUTH_CLIENT_ID}
    authorizationParams={{redirect_uri: window.location.origin}}
    useRefreshTokens={true}
    cacheLocation='localstorage'
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;