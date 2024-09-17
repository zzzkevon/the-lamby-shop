import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { itemImages } from "../items"; // Make sure this is correctly imported


const ShoppingCart = ({ cart, onDelete }) => {
  const [items, setItems] = useState(cart);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Calculate subtotal based on items in the cart
    const newSubtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  }, [items]);

  return (
    <div className="main-bg just-another-hand text-3xl min-w-full">
      <div className="mx-auto w-4/5 rounded-lg">
        <div className="px-2 font-normal text-5xl text-[#780000]">
          Shopping Cart
        </div>
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-center itemCards w-4/5 rounded-lg mr-4">
            {items.length === 0 ? (
              <div className="justify-center flex-col items-center align-middle">
                <div>
                  Your Cart is&nbsp;<b className="text-red-500">Empty!&nbsp;</b>
                </div>
                <div>
                  Must add items to the cart before you proceed to checkout.
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                {items.map((item) => (
                  <ItemCard
                    key={item.itemId}
                    item={item}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="checkoutPane w-1/5 rounded-lg text-center ml-4">
            <div className="bg-white rounded-[22px] border p-3 my-3">
              Subtotal: ${subtotal.toFixed(2)}
            </div>
            <button
              className="w-full bg-[#780000] text-white rounded-full text-4xl hover:underline my-3"
              onClick={() => (window.location.href = "/shoppingcart/checkout")}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-10"></div>
    </div>
  );
};

export default ShoppingCart;
