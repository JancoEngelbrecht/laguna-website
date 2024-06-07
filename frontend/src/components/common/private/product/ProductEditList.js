import React, { useCallback } from 'react';
import ProductEdit from './ProductEdit';

const ProductEditList = ({ products, loading, error, onDelete }) => {
  
  const handleUpdate = useCallback(() => {
    console.log("Product Updated");
  }, []); 

  const handleDelete = useCallback((productId) => {
    onDelete(productId);
    console.log("Product Deleted");
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
            onDelete={() => handleDelete(product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductEditList;