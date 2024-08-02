import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useRoles } from '../../services/RoleProvider';

import Navbar from './navbar';
import Footer from './footer';
import UserNav from '../common/private/user/usernav';
import Spinner from '../../components/common/global/Spinner';

const Layout = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { roles } = useRoles();

  const isOwner = roles.includes('Personnel');

  if (isLoading) {
    return <div><Spinner /></div>;
  }

  const renderNavbar = isAuthenticated && isOwner ? <UserNav /> : <Navbar />;

  return (
    <div className="flex flex-col min-h-screen">
      {renderNavbar}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;