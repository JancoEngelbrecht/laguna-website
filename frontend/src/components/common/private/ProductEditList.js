import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductEdit from './ProductEdit';

const ProductEditList = ({onAdd}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // useCallback to manage their execution. It will not be executed on page render or re-render, only when called. 
  const handleUpdate = useCallback(() => {
    console.log("Product Updated");
  }, []); 

  const handleDelete = () => {
    console.log("Product Deleted");
  }

  // Fetch Data for the Product List with every render/re-render
  useEffect(() => {
    axios.get('http://localhost:4000/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch products data');
        setLoading(false);
      });
  }, [onAdd, handleDelete]); // 1.

 
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductEdit key={product._id} product={product} onUpdate={handleUpdate} onDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
};

export default ProductEditList;

//1. ProductAdd.js --> Added Success 
//    |
//   UserSettings/Index.js --> SetProducts
//    |
//   ProductEditList.js --> Fetch New Products due to the change of Dependency