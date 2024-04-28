import React from 'react';
import mainCow from "../../assets/images/maincow.jpg";



const Home = () => {
  
  return (
    <div className=''>
      <img className="relative inset-0 w-screen h-screen object-cover z-0" src={mainCow}></img>
      <h1 className='absolute inset-96 text-4xl text-left text-white tracking-wide font-normal z-20'>Home Page</h1>
      <div className='relative inset-0 bg-gray-500 w-full h-96 z-10 grid grid-flow-col justify-stretch'>
        <div className='box-border  p-4 border-4'>01</div>
        <div className='box-border  p-4 border-4'>02</div>
        <div className='box-border  p-4 border-4'>03</div>
      </div>
    </div>
  );
};

export default Home;