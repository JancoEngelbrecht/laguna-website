import React, { useState, useEffect } from 'react';
import BasketList from '../../../components/checkout/BasketList';
import axios from 'axios';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Basket Data
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/basket');
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
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Fetch once on component mount

  const handleProductDelete = async () => {
    await fetchProducts(); // Refetch basket data after deletion
  };

  const handleProductUpdate = async () => {
    await fetchProducts(); // Refetch basket data after update
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
      <div>
        <BasketList
          products={products}
          loading={loading}
          handleProductDelete={handleProductDelete}
          handleProductUpdate={handleProductUpdate}
        />
      </div>
    </div>
  );
};

export default Checkout;