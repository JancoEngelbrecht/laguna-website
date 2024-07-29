import React from "react";
import { FaCartPlus } from "react-icons/fa";

const AddToBasket = ({ onAddClick }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onAddClick}
        className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center group"
      >
        <FaCartPlus className="text-white transition duration-300 group-hover:hidden" />
        <span className="hidden group-hover:inline-block transition duration-300 ml-2">Add to Basket</span>
      </button>
    </div>
  );
};

export default AddToBasket;