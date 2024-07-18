const express = require('express');
const axios = require('axios');

const router = express.Router();

// Function to fetch user ID from Auth0 using the token
const fetchUserIdFromToken = async (token) => {
  const response = await axios.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.sub;
};



// Middleware function to authenticate user
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const userId = await fetchUserIdFromToken(token);
    req.auth = {
      userId: userId // Get user ID from the token response
    };
    next();
  } catch (error) {
    console.error('Error fetching user ID from token:', error.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Route to get roles for the authenticated user
router.get('/auth0/user_roles', authenticateUser, async (req, res) => {
  try {
    const userId = req.auth.userId; // Get user ID from authenticated request
    const token = process.env.AUTH0_MGT_TOKEN; // Get the management token

    const rolesOptions = {
      method: 'GET',
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    };

    const rolesResponse = await axios(rolesOptions);
    const roles = rolesResponse.data.map(role => role.name);

    res.json({ user_id: userId, roles });
  } catch (error) {
    console.error('Error fetching user roles:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;