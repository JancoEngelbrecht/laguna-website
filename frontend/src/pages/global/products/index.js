import React, {useState, useEffect} from 'react';
import ProductList from '../../../components/common/ProductList';
import axios from 'axios'

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

   // Fetch Company Product Data
   useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:4000/products');
        const productsWithNumericPrices = response.data.map(product => ({
          ...product,
          price: Number(product.price), // Convert price to number
        }));
        setProducts(productsWithNumericPrices);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Our Meat Products</h1>
      <ProductList products={products} loading={loading} />
    </div>
  );
}

export default Products;