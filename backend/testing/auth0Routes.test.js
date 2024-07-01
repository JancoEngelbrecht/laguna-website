const express = require('express');
const request = require('supertest');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const auth0Routes = require('./path/to/your/auth0Routes'); // Adjust the path as needed

const app = express();
app.use(express.json());
app.use('/api', auth0Routes);

const mock = new MockAdapter(axios);

// Mock environment variables
process.env.AUTH0_DOMAIN = 'your-auth0-domain';
process.env.AUTH0_MGT_TOKEN = 'your-management-token';

describe('Auth0 Routes', () => {
  beforeEach(() => {
    mock.reset();
  });

  describe('GET /auth0/user_roles', () => {
    it('should return user roles for authenticated user', async () => {
      const token = 'test-token';
      const userId = 'auth0|test-user-id';

      mock.onGet(`https://${process.env.AUTH0_DOMAIN}/userinfo`).reply(200, { sub: userId });
      mock.onGet(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`).reply(200, [
        { name: 'role1' },
        { name: 'role2' }
      ]);

      const response = await request(app)
        .get('/api/auth0/user_roles')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        user_id: userId,
        roles: ['role1', 'role2']
      });
    });

    it('should return 401 if user is not authenticated', async () => {
      const response = await request(app).get('/api/auth0/user_roles');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Unauthorized' });
    });
  });

  describe('GET /auth0/users', () => {
    it('should return users with their roles', async () => {
      const token = 'test-token';
      const users = [
        { user_id: 'auth0|user1', name: 'User One' },
        { user_id: 'auth0|user2', name: 'User Two' }
      ];

      mock.onGet(`https://${process.env.AUTH0_DOMAIN}/userinfo`).reply(200, { sub: 'auth0|admin' });
      mock.onGet(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`).reply(200, users);

      mock.onGet(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/auth0|user1/roles`).reply(200, [
        { name: 'role1' }
      ]);

      mock.onGet(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/auth0|user2/roles`).reply(200, [
        { name: 'role2' }
      ]);

      const response = await request(app)
        .get('/api/auth0/users')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { user_id: 'auth0|user1', name: 'User One', roles: ['role1'] },
        { user_id: 'auth0|user2', name: 'User Two', roles: ['role2'] }
      ]);
    });

    it('should return 401 if user is not authenticated', async () => {
      const response = await request(app).get('/api/auth0/users');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Unauthorized' });
    });
  });
});