import React from 'react';
import Product from './Product';
import axios from 'axios';

function ProductList({ products, loading }) {
  const handleAddClick = async (product, quantity) => {
    if (quantity < 1) {
      alert("Please enter a valid quantity.");
      return;
    }
    const productToAdd = { ...product, quantity, identity: product._id};
    console.log(productToAdd)
    
    try {
      await axios.post("http://localhost:4000/basket", productToAdd);
    } catch (error) {
      console.error("Error adding product to basket:", error);
      alert("Failed to add product to basket.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Product key={product._id} product={product} addToBasket={handleAddClick} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;