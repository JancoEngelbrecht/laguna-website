import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { createRoot} from 'react-dom/client'; // Import createRoot from react-dom/client
import './styles.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';


// Instead of using ReactDOM.render, we'll use createRoot
const root = createRoot(document.getElementById('root'));

// We'll render our app inside the root
root.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider 
      domain = {process.env.REACT_APP_AUTH_DOMAIN}
      clientId= {process.env.REACT_APP_AUTH_CLIENT_ID}
      authorizationParams={{redirect_uri: window.location.origin}}>
        <App />  
      </Auth0Provider>
    </Router>
  </React.StrictMode>
);

