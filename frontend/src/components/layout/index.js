import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import UserNav from '../common/private/user/usernav';
import { useAuth0 } from "@auth0/auth0-react";

const Layout = () => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <UserNav />
        <main className="flex-grow">
          <Outlet />
        </main>
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