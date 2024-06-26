import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import UserNav from '../common/private/user/usernav';
import { useAuth0 } from "@auth0/auth0-react";
import { useRoles } from '../../services/RoleProvider';

const Layout = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { roles } = useRoles();

  const isOwner = roles.includes('Personnel');

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner component
  }

  if (isAuthenticated && isOwner) {
    return (
      <div className="flex flex-col min-h-screen">
        <UserNav />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Layout;