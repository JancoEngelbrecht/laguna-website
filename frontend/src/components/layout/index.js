import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './footer'
import UserNav from '../user/usernav'
import { useAuth0 } from "@auth0/auth0-react";

const Layout = () => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
      <UserNav />
      <Outlet />
      </>
   );
  } else { 
    return (
      <>
      <Navbar />
      <Outlet />
      <Footer />
      </>
    )}

 
}

export default Layout