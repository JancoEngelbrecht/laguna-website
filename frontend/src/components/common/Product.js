// Product.js
import React from 'react';

function Product({ product }) {
  const { name, price, image } = product;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img src={image} alt={name} className="w-full h-32 object-cover mb-4" />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600">R {price}</p>
      {/* Additional product information can be added */}
    </div>
  );
}

export default Product;