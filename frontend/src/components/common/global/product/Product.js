import React, { useState } from "react";
import AddToBasketBtn from "../../../checkout/AddToBasketBtn";
import { useAuth0 } from "@auth0/auth0-react";

function Product({ product, addToBasket }) {
  const { name, price, image, descript } = product;
  const [productQty, setProductQty] = useState(1);
  const { isAuthenticated } = useAuth0();

  const handleAdd = () => {
    addToBasket(product, productQty);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <img src={image} alt={name} className="w-full h-64 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-2 mb-2">{name}</h2>
      <p className="text-gray-600">R {parseFloat(price).toFixed(2)}</p>
      <p className="text-gray-600">{descript}</p>
      
      <div className="flex-grow"></div> {/* This pushes content to the bottom */}
      
      <div className="flex flex-col mt-4">
        {isAuthenticated && (
          <input
            type="number"
            min="1"
            value={productQty}
            onChange={(e) => setProductQty(parseInt(e.target.value, 10))}
            className="w-16 p-2 border rounded mb-4"
          />
        )}
        {isAuthenticated ? (
          <AddToBasketBtn onAddClick={handleAdd} />
        ) : (
          <p className="text-red-600">Login and submit your order.</p>
        )}
      </div>
    </div>
  );
}

export default Product;