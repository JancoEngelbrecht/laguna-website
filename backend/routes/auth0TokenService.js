// auth0TokenService.js
const axios = require('axios');
require('dotenv').config();

let managementToken = null;
let tokenExpiryTime = null;

const getManagementToken = async () => {
  if (managementToken && tokenExpiryTime > Date.now()) {
    return managementToken;
  }

  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
    }
  };

  try {
    const response = await axios(options);
    managementToken = response.data.access_token;
    tokenExpiryTime = Date.now() + response.data.expires_in * 1000; // Token expiry time in milliseconds
    return managementToken;
  } catch (error) {
    console.error('Error getting management token:', error.message);
    throw error;
  }
};

module.exports = {
  getManagementToken
};