import React from 'react';
import axios from 'axios';
import BasketProduct from './BasketProduct';

const BasketList = ({ userId, products, loading, handleProductDelete, handleProductUpdate }) => {

  // Delete Data from the DB
  const handleDeleteClick = async (product) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/user/${userId}/products/${product._id}`);
      handleProductDelete(product);
    } catch (error) {
      console.error('Error deleting product from basket:', error);
    }
  };

  // Update Data in the DB
  const handleUpdateClick = async (productId, updatedProductData) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/${userId}/products/${productId}`, updatedProductData);
      handleProductUpdate(productId, updatedProductData);
    } catch (error) {
      console.error('Error updating product in basket:', error);
    }
  };

  // Assuming VAT calculation function
  const calculateVAT = (price) => {
    return price * 0.2; // Example VAT rate (20%)
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <BasketProduct 
            key={product._id} 
            userId={userId}
            product={product} 
            deleteFromBasket={handleDeleteClick} 
            updateBasketProduct={handleUpdateClick}
            calculateVAT={calculateVAT} // Pass VAT calculation function to child component
          />
        ))}
      </div>
    </div>
  );
}

export default BasketList;