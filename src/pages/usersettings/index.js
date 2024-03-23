import React from 'react';
import { useAuth } from '../../services/AuthContext';
import LogoutButton from '../../components/common/LogoutButton'

const UserSettings = () => {

  return (
    <div>
      <h1>Welcome to the User Settings Page!</h1>
      <LogoutButton />
    </div>
  );
};

export default UserSettings;