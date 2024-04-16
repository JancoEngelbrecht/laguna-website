import React from 'react';
import { Navigate, Link} from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';

const Home = () => {
  
  return (
    <div className='border'>
      <h1 className=''>Welcome to the Home Page!</h1>
    </div>
  );
};

export default Home;