import React from 'react';

const AddProductButton = ({ onAddClick }) => {
  return (
    <div className="flex justify-center my-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"

        onClick={onAddClick} // When you click the AddProductButton, the Product Add Form Hides or Shows
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProductButton;