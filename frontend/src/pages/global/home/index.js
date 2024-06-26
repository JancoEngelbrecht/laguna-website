import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import mainCow from "../../../assets/images/maincow.jpg";

const getUsers = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/auth0/users', // Your backend server URL
    headers: {
      'content-type': 'application/json'
    }
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const Home = () => {
  const { user } = useAuth0();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getUsers();
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <img className="relative inset-0 w-screen h-screen object-cover z-0" src={mainCow} alt="Main Cow" />
      <h1 className='absolute inset-96 text-4xl text-left text-white tracking-wide font-normal z-20'>
        Home Page / {user?.name} / {JSON.stringify(user?.app_metadata)}
      </h1>
      <div className='relative inset-0 bg-gray-500 w-full h-96 z-10 grid grid-flow-col justify-stretch'>
        <div className='box-border p-4 border-4'>01</div>
        <div className='box-border p-4 border-4'>02</div>
        <div className='box-border p-4 border-4'>03</div>
      </div>
      <div className='relative inset-0 bg-white w-full z-10 grid grid-flow-row'>
        <h2 className='text-2xl font-bold mb-4'>Users:</h2>
        <ul>
          {users.map(user => (
            <li key={user.user_id}>
              <strong>{user.user_id} - {user.name}</strong>: {user.roles ? user.roles.join(', ') : 'No roles'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;