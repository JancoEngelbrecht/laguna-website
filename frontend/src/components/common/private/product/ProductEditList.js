import React, { useCallback } from 'react';
import ProductEdit from './ProductEdit';
import axios from 'axios';

const ProductEditList = ({ products, loading, error, onDelete }) => {
  
  const handleUpdate = useCallback(async (updatedProduct) => {
    try {
      // Update the product in the products collection
      await axios.put(`http://localhost:4000/products/${updatedProduct._id}`, updatedProduct);
  
      // Fetch all users who have the product in their baskets
      const response = await axios.get(`http://localhost:4000/users/basketProducts/${updatedProduct._id}`);
      const users = response.data;

      // Update the product in all user baskets
      for (const user of users) {
        const basketItems = user.products.filter(item => item.identity === updatedProduct._id);
        for (const basketItem of basketItems) {
          await axios.put(`http://localhost:4000/user/${user.auth0Id}/products/${basketItem._id}`, {
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
      await axios.delete(`http://localhost:4000/products/${productId}`);

      // Fetch all users who have the product in their baskets
      const response = await axios.get(`http://localhost:4000/users/basketProducts/${productId}`);
      const users = response.data;

     // Remove the product from all user baskets
    for (const user of users) {
      if (user.products) {
        const basketItems = user.products.filter(item => item.identity === productId);
        console.log(`User ${user.auth0Id} has ${basketItems.length} items with product ID ${productId} in their basket`);
        
        for (const basketItem of basketItems) {
          console.log(`Deleting basket product ${basketItem._id} from user ${user.auth0Id}'s basket`);
          await axios.delete(`http://localhost:4000/user/${user.auth0Id}/products/${basketItem._id}`);
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
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