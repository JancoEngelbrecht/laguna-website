import React from "react";
import { FaTrash } from "react-icons/fa";

const RemoveFromBasket = ({ onAddClick }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onAddClick}
        className="bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
      >
        <FaTrash className="text-white" />
      </button>
    </div>
  );
};

export default RemoveFromBasket;