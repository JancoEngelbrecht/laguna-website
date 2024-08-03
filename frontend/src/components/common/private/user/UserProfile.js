import React from 'react';
import { useUser } from '../../../../services/UserProvider';

const UserProfile = () => {
  const { user } = useUser();

  return (
    <div>
      <h2>Logged in as {user.name}</h2>
    </div>
  );
};

export default UserProfile;