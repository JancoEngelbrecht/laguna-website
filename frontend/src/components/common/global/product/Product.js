import React, { useState } from "react";
import AddToBasketBtn from "../../../checkout/AddToBasketBtn";
import { useAuth0 } from "@auth0/auth0-react";
import { useRoles } from "../../../../services/RoleProvider";

function Product({ product, addToBasket }) {
  const { name, price, image, descript } = product;
  const [productQty, setProductQty] = useState(1);
  const { isAuthenticated } = useAuth0();
  const { roles } = useRoles();

  const handleAdd = () => {
    addToBasket(product, productQty);
  };

  const isCustomer = roles.includes('customer');

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
        {isAuthenticated && isCustomer ? (
          <AddToBasketBtn onAddClick={handleAdd} />
        ) : (
          <p className="text-red-500">Only registered customers can add to basket</p>
        )}
      </div>
    </div>
  );
}

export default Product;