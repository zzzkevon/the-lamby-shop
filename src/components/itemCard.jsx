import React, { useState } from "react";
import img1 from "../images/img1.jpeg";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

const ItemCard = ({ id, name, onDelete }) => {
  let itemName = ["strawberry bunny beanie"];
  let size = ["small", "medium", "large", "extra large"];
  let price = [40.0, 20.0];
  const [count, setCount] = useState(1);

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
    <div className="flex itemCard1 my-3 justify-between bg-white p-3 rounded-[22px]">
      <img
        src={img1}
        alt="item image"
        className="w-1/5 h-full object-cover p-4 rounded-[22px]"
      />
      <div className="relative w-4/5">
        <p>{itemName}</p>
        <p>size: {size[3]}</p>
        <div className="absolute bottom-0 left-0">${price[0].toFixed(2)}</div>
        <button
          className="absolute top-0 right-2 hover:underline"
          onClick={(e) => onDelete(e, id)}
        >
          X
        </button>
        <div className="flex justify-between absolute bottom-0 right-2 font-sans text-2xl">
          <button
            className="mx-2 text-3xl border hover:border-blue-500"
            onClick={(e) => decrementCount(e)}
          >
            <FiMinus />
          </button>
          <div className="mx-2">{count}</div>
          <button
            className="mx-2 text-3xl border hover:border-blue-500"
            onClick={(e) => incrementCount(e)}
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;