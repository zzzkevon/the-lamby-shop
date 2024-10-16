import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

const ItemCard = ({ item, onDelete, onQuantityChange }) => {
  const { id, itemName, itemPrice } = item; // Destructure the item properties
  let size = ["one size"];
  const [quantity, setQuantity] = useState(item.quantity); // Initialize quantity state

  // Update quantity state when item prop changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item]);

  const incrementCount = e => {
    e.preventDefault();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity); // Update local state
    onQuantityChange(itemName, newQuantity); // Notify parent of the change
  };

  const decrementCount = e => {
    e.preventDefault();
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity); // Update local state
      onQuantityChange(itemName, newQuantity); // Notify parent of the change
    }
  };

  const displayPrice = (itemPrice * quantity).toFixed(2); // Update total price based on quantity

  return (
    <div className="flex itemCard1 my-3 justify-between bg-white p-3 rounded-[22px]">
      <img
        src={item.signedUrl}
        alt="item image"
        className="w-1/5 h-full object-cover p-4 rounded-[22px]"
      />
      <div className="relative w-4/5">
        <p>{itemName}</p>
        <p>Size: {size}</p>
        <div className="absolute bottom-0 left-0">${displayPrice}</div>{" "}
        {/* Display total price */}
        <button
          className="absolute top-0 right-2 hover:underline"
          onClick={e => onDelete(e, id)}
        >
          X
        </button>
        <div className="flex justify-between absolute bottom-0 right-2 font-sans text-2xl">
          <button
            className="mx-2 text-3xl border hover:border-blue-500"
            onClick={e => decrementCount(e)}
          >
            <FiMinus />
          </button>
          <div className="mx-2 just-another-hand font-bold">{quantity}</div>{" "}
          {/* Display current quantity */}
          <button
            className="mx-2 text-3xl border hover:border-blue-500"
            onClick={e => incrementCount(e)}
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
