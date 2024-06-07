import React, { useState } from "react";
import AddToBasketBtn from "../../../checkout/AddToBasketBtn";

function Product({ product, addToBasket }) {
  const { name, price, image, descript } = product;
  const [productQty, setProductQty] = useState(1);

  const handleAdd = () => {
    addToBasket(product, productQty);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img src={image} alt={name} className="w-full h-64 object-cover rounded" />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600">R {parseFloat(price).toFixed(2)}</p>
      <p className="text-gray-600">{descript}</p>

      <div className="flex items-center mt-4">
        <input
          type="number"
          min="1"
          value={productQty}
          onChange={(e) => setProductQty(parseInt(e.target.value))}
          className="mr-4 w-16 p-2 border rounded"
        />
      </div>
      <div className="flex items-center mt-4">
        <AddToBasketBtn onAddClick={handleAdd} />
      </div>
    </div>
  );
}

export default Product;