import React, { useState } from 'react';
import RemoveFromBasketBtn from '../checkout/RemoveFromBasketBtn';

function BasketProduct({ product, deleteFromBasket, updateBasketProduct }) {
  const [localProduct, setLocalProduct] = useState({ ...product });
  const { image, name, price, descript, quantity } = localProduct;
  
  const handleUpdate = (event) => {
    const { name, value } = event.target;
    setLocalProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    updateBasketProduct(product._id, { ...localProduct, [name]: value });
  };

  const handleDelete = () => {
    deleteFromBasket(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img src={image} alt={name} className="w-full h-64 object-cover rounded" />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600">R {parseFloat(price).toFixed(2)}</p>
      <p className="text-gray-600">{descript}</p>

      <div className="flex items-center mt-4">
        <input
          name="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleUpdate}
          className="mr-4 w-16 p-2 border rounded"
        />
      </div>

      <div className="flex items-center mt-4">
        <RemoveFromBasketBtn onAddClick={handleDelete} />
      </div>
    </div>
  );
}

export default BasketProduct;