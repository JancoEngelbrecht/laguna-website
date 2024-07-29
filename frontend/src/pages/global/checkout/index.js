import React, { useState, useEffect, useCallback } from 'react';
import BasketList from '../../../components/checkout/BasketList';
import SummaryCheckout from '../../../components/checkout/SummaryCheckout';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();

  // Fetch Basket Data
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${user.sub}/products`);
      const productsWithNumericPrices = response.data.map((product) => ({
        ...product,
        price: Number(product.price),
      }));
      setProducts(productsWithNumericPrices);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.sub) {
      fetchProducts();
    }
  }, [user, fetchProducts]); // Add fetchProducts to the dependency array

  const handleProductDelete = async (product) => {
    await fetchProducts(); // Refetch basket data after deletion
  };

  const handleProductUpdate = async (productId, updatedProductData) => {
    await fetchProducts(); // Refetch basket data after update
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Your Basket:</h1>
      <div className="lg:hidden mb-4">
        <SummaryCheckout products={products} vatRate={0.2} />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 lg:mr-4 mb-4 lg:mb-0">
          <BasketList
            userId={user.sub} // Pass user.sub as userId
            products={products}
            loading={loading}
            handleProductDelete={handleProductDelete}
            handleProductUpdate={handleProductUpdate}
          />
        </div>
        <div className="hidden lg:block w-full lg:w-1/4">
          <SummaryCheckout products={products} vatRate={0.2} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;