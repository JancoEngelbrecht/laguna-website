import React from 'react';
import axios from 'axios';
import BasketProduct from './BasketProduct';

const BasketList = ({ products, loading, handleProductDelete, handleProductUpdate }) => {
  // Delete Data from the DB
  const handleDeleteClick = async (product) => {
    try {
      await axios.delete(`http://localhost:4000/basket/${product._id}`);
      handleProductDelete();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClick = async (productId, updatedProductData) => {
    try {
      await axios.put(`http://localhost:4000/basket/${productId}`, updatedProductData);
      handleProductUpdate(); // Assuming this function updates the state after successful update
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <BasketProduct 
            key={product._id} 
            product={product} 
            deleteFromBasket={handleDeleteClick} 
            updateBasketProduct={handleUpdateClick}
          />
        ))}
      </div>
    </div>
  );
}

export default BasketList;