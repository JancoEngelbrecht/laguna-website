import React, { useState, useEffect, useCallback } from 'react';
import {useUser} from '../../../services/UserProvider'
import axios from 'axios';

import BasketList from '../../../components/checkout/BasketList';
import SummaryCheckout from '../../../components/checkout/SummaryCheckout';



const Checkout = () => {
  // State variables to manage products, loading state, and user authentication
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, user } = useUser();
  const VAT = 0.2;

  // Function to fetch basket data from the server
  const fetchProducts = useCallback(async () => {
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}/products`);
      // Convert price to a numeric value
      const productsWithNumericPrices = response.data.map((product) => ({
        ...product,
        price: Number(product.price),
      }));
      setProducts(productsWithNumericPrices);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Effect hook to fetch products when the component mounts or user changes
  useEffect(() => {
    if (user && userId) {
      fetchProducts();
    }
  }, [user, userId, fetchProducts]); // Depend on user and fetchProducts to refetch data when needed

  // Handler for product deletion, refetches products after deletion
  const handleProductDelete = async (product) => {
    await fetchProducts(); // Refresh the product list after deletion
  };

  // Handler for product update, refetches products after update
  const handleProductUpdate = async (productId, updatedProductData) => {
    await fetchProducts(); // Refresh the product list after update
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Your Basket:</h1>
      
      {/* Display summary checkout for mobile devices */}
      <div className="lg:hidden mb-4">
        <SummaryCheckout products={products} vatRate={VAT} />
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Basket list for desktop and mobile */}
        <div className="w-full lg:w-3/4 lg:mr-4 mb-4 lg:mb-0">
          <BasketList
            userId={userId} // Pass user ID to the basket list
            products={products}
            loading={loading}
            handleProductDelete={handleProductDelete}
            handleProductUpdate={handleProductUpdate}
          />
        </div>

        {/* Display summary checkout for desktop only */}
        <div className="hidden lg:block w-full lg:w-1/4">
          <SummaryCheckout products={products} vatRate={VAT} />
        </div>

      </div>
    </div>
  );
};

export default Checkout;