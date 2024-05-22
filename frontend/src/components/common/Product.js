// Product.js
import React from 'react';

function Product({ product }) {
  const { name, price, image, descript } = product;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img src={image} alt={name} className="w-full h-64 object-cover rounded" />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600">R {parseFloat(price).toFixed(2)}</p>
      <p className="text-gray-600">{descript}</p>
    </div>
  );
}

export default Product;