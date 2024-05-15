// ProductList.js
import React, {useState, useEffect} from 'react';
import Product from './Product';
import axios from 'axios'

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:4000/products');
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        console.log(error.response)
        setLoading(false)
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;