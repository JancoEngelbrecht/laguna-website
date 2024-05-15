import React, { useState } from 'react';
import UserProfile from '../../../components/user/UserProfile';
import ProductEditList from '../../../components/common/private/ProductEditList';
import ProductAdd from '../../../components/common/private/ProductAdd';
import AddProductButton from '../../../components/common/private/AddProductButton';

const UserSettings = () => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => {
    setIsAdding(!isAdding);  // Toggle the state on each click
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Settings Page</h1>
      <UserProfile />
      <div className="flex justify-center mb-4">
        <AddProductButton onAddClick={handleAddClick} />
      </div>
      {isAdding && <ProductAdd onAdd={() => setIsAdding(false)} onClose={() => setIsAdding(false)} />}
      <ProductEditList />
    </div>
  );
};

export default UserSettings;