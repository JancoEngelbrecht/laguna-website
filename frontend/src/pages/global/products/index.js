import React, { useState, useEffect } from 'react';
import ProductList from '../../../components/common/global/product/ProductList';
import axios from 'axios';

function Products({ userId }) {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch products data when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make an API call to get products
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        // Ensure that the price is numeric
        const productsWithNumericPrices = response.data.map(product => ({
          ...product,
          price: Number(product.price),
        }));

        setProducts(productsWithNumericPrices);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchProducts function so that it runs when the component mounts
    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Laguna's Meat Products</h1>
      {/* Render an error message if there's an error */}
      {error ? (
        <div className="text-red-500">Failed to load products. Please try again later.</div>
      ) : (
        // Render the ProductList component with fetched products and loading state
        <ProductList products={products} loading={loading} userId={userId} />
      )}
    </div>
  );
}

export default Products;