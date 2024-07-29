import React, { useState } from 'react';
import RemoveFromBasketBtn from '../checkout/RemoveFromBasketBtn';

function BasketProduct({ userId, product, deleteFromBasket, updateBasketProduct, calculateVAT }) {
  const [localProduct, setLocalProduct] = useState({ ...product });

  const { _id, image, name, price, descript, quantity } = localProduct;

  const handleUpdate = (event) => {
    const { name, value } = event.target;
    const updatedProduct = { ...localProduct, [name]: value };
    setLocalProduct(updatedProduct);
    updateBasketProduct(_id, updatedProduct);
  };

  const handleDelete = () => {
    deleteFromBasket(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <img src={image} alt={name} className="w-full h-64 object-cover rounded" />
      <h2 className="text-xl font-semibold mb-2 mt-4">{name}</h2>
      <p className="text-gray-600 mb-2">R {parseFloat(price).toFixed(2)}</p>
      <p className="text-gray-600">{descript}</p>

      <div className="flex-grow"></div> {/* This pushes the input and button to the bottom */}
      
      <div className="flex flex-col mt-4">
        <input
          name="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleUpdate}
          className="mr-4 w-16 p-2 border rounded mb-4" // Add margin to separate from the button
        />
        <RemoveFromBasketBtn onAddClick={handleDelete} />
      </div>
    </div>
  );
}

export default BasketProduct;