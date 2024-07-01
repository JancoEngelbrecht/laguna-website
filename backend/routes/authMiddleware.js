// authMiddleware.js
const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config();

const checkJwt = auth({
  audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`
});

module.exports = {
  checkJwt
};