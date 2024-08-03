import React from 'react';
import Product from './Product';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from '../Spinner'

function ProductList({ products, loading}) {
  const { user } = useAuth0();
  const handleAddClick = async (product, quantity) => {
    if (quantity < 1) {
      alert("Please enter a valid quantity.");
      return;
    }
    
    // Ensure the price is a number
    const price = parseFloat(product.price);
  
    const productToAdd = { ...product, price, quantity, identity: product._id };
  
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/${user.sub}/products`, productToAdd);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product to user basket:", error);
      alert("Failed to add product to user basket.");
    }
  };

  if (loading) return <div className="text-center py-10"><Spinner /></div>;

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