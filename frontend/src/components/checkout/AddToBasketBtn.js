import React from "react";

const addToBasket = ({onAddClick}) => {

    return (
    <div>
        <button
              type="button"
              onClick={onAddClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >Add to Basket
        </button>
    </div>
    );
}

export default addToBasket