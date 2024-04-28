import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './footer'
import { useAuth } from '../../services/AuthContext'
import UserNav from '../user/usernav'

const Layout = () => {
  
  const { isAuthenticated } = useAuth();

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