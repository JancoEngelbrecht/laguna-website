import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import DOMPurify from 'dompurify';
import RoleProvider from './RoleProvider';

const AuthProvider = ({ children }) => {
  const sanitizedRedirectUri = DOMPurify.sanitize(window.location.origin);

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
      authorizationParams={{ redirect_uri: sanitizedRedirectUri }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <RoleProvider>
        {children}
      </RoleProvider>
    </Auth0Provider>
  );
};

export default AuthProvider;