const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Function to get Auth0 Management API token
const getManagementToken = async () => {
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
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting management token:', error.message);
    throw error;
  }
};

// Route to get users from Auth0
router.get('/auth0/users', async (req, res) => {
  try {
    const token = await getManagementToken();
    const options = {
      method: 'GET',
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    };

    const response = await axios(options);
    const users = response.data;

    // Fetch roles for each user concurrently using Promise.all
    const usersWithRoles = await Promise.all(users.map(async (user) => {
      const rolesOptions = {
        method: 'GET',
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user.user_id}/roles`,
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      };
      try {
        const rolesResponse = await axios(rolesOptions);
        const roles = rolesResponse.data.map(role => role.name);

        return {
          user_id: user.user_id,
          name: user.name,
          roles: roles
        };
      } catch (error) {
        console.error(`Error fetching roles for user ${user.user_id}:`, error.message);
        return {
          user_id: user.user_id,
          name: user.name,
          roles: []
        };
      }
    }));

    res.json(usersWithRoles); // Send users with roles data back to client
  } catch (error) {
    console.error('Error fetching users or roles:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;