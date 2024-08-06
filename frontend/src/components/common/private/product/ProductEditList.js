import React, { useCallback } from 'react';
import axios from 'axios';

import ProductEdit from './ProductEdit';
import Spinner from '../../../common/global/Spinner'

const ProductEditList = ({ products, loading, error, onDelete }) => {
  
  const handleUpdate = useCallback(async (updatedProduct) => {
    try {
      // Update the product in the products collection
      await axios.put(`${process.env.REACT_APP_API_URL}/products/${updatedProduct._id}`, updatedProduct);
  
      // Fetch all users who have the product in their baskets
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/basketProducts/${updatedProduct._id}`);
      const users = response.data;

      // Update the product in all user baskets
      for (const user of users) {
        const basketItems = user.products.filter(item => item.identity === updatedProduct._id);
        for (const basketItem of basketItems) {
          await axios.put(`${process.env.REACT_APP_API_URL}/user/${user.auth0Id}/products/${basketItem._id}`, {
            name: updatedProduct.name,
            price: updatedProduct.price,
            image: updatedProduct.image,
            descript: updatedProduct.descript,
            quantity: basketItem.quantity
          });
        }
      }

      alert('Product Updated Successfully');
    } catch (error) {
      console.error('Failed to update product data:', error);
    }
  }, []); 

  const handleProductDelete = useCallback(async (productId) => {
    try {
      // Delete the product from the products collection
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/${productId}`);

      // Fetch all users who have the product in their baskets
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/basketProducts/${productId}`);
      const users = response.data;

     // Remove the product from all user baskets
    for (const user of users) {
      if (user.products) {
        const basketItems = user.products.filter(item => item.identity === productId);
        console.log(`User ${user.auth0Id} has ${basketItems.length} items with product ID ${productId} in their basket`);
        
        for (const basketItem of basketItems) {
          console.log(`Deleting basket product ${basketItem._id} from user ${user.auth0Id}'s basket`);
          await axios.delete(`${process.env.REACT_APP_API_URL}/user/${user.auth0Id}/products/${basketItem._id}`);
          console.log(`Deleted product ${basketItem._id} from user ${user.auth0Id}'s basket`);
        }
      } else {
        console.log(`User ${user.auth0Id} has no products in their basket`);
      }
    }

      alert('Product Deleted Successfully');
      onDelete(productId); // Notify parent component of successful deletion
    } catch (error) {
      console.error('Failed to delete product data:', error);
    }
  }, [onDelete]);

  if (loading) return <div className="text-center py-10"><Spinner /></div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductEdit 
            key={product._id} 
            product={product} 
            onUpdate={handleUpdate} 
            onDelete={handleProductDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductEditList;