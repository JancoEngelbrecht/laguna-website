import React from 'react';
import ProductList from '../../../components/common/ProductList';

function Products() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Our Meat Products</h1>
      <ProductList />
    </div>
  );
}

export default Products;