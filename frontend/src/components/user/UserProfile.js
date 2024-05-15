import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = () => {
  const { user } = useAuth0();

  return (
    <div>
      <h2>Logged in as {user.name}</h2>
    </div>
  );
};

export default UserProfile;