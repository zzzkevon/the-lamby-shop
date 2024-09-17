import React, { useState } from "react";
import img1 from "../images/img1.jpeg";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { itemImages } from "../items";

function ItemCard({ item, onDelete }) {
  // Destructure properties from item with default values
  const { price = 0.0, quantity = 1, name = "Unknown", size = "Unknown", itemId } = item;
  const [count, setCount] = useState(quantity);

  const incrementCount = (e) => {
    e.preventDefault();
    setCount((prev) => prev + 1);
  };

  const decrementCount = (e) => {
    e.preventDefault();
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="flex itemCard1 my-3 justify-between bg-white p-3 rounded-[22px]" key={item.itemId}>
      <img
        src={itemImages[item.imageId]}
        alt="item image"
        className="w-1/5 h-full object-cover p-4 rounded-[22px]"
      />
      <div className="relative w-4/5">
        <p>{name}</p>
        <p>Size: {size}</p>
        <div className="absolute bottom-0 left-0">${price.toFixed(2)}</div>
        <button
          className="absolute top-0 right-2 hover:underline"
          onClick={(e) => onDelete(e, itemId)}
        >
          X
        </button>
        <div className="flex justify-between absolute bottom-0 right-2 font-sans text-2xl">
          <button
            className="mx-2 text-3xl border hover:border-blue-500"
            onClick={decrementCount}
          >
            <FiMinus />
          </button>
          <div className="mx-2">{count}</div>
          <button
            className="mx-2 text-3xl border hover:border-blue-500"
            onClick={incrementCount}
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
