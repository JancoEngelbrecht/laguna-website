import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';

// Instead of using ReactDOM.render, we'll use createRoot
const root = createRoot(document.getElementById('root'));

// We'll render our app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

