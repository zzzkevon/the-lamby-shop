import React, { useState } from "react";
import ItemCard from "./itemCard"; // Adjust the path as necessary

const ShoppingCart = () => {
  const [items, setItems] = useState([]);

  const addItem = e => {
    e.preventDefault();
    setItems([
      ...items,
      { id: items.length + 1, name: `Item ${items.length + 1}` },
    ]);
  };

  const deleteItem = (e, id) => {
    e.preventDefault();
    setItems(items.filter(item => item.id !== id));
  };

  const [subtotal, setSubtotal] = useState(60.0);

  return (
    <div className="main-bg just-another-hand text-3xl min-w-full">
      <div className="mx-auto w-4/5 rounded-lg">
        <div className="px-2 font-normal text-5xl text-[#780000]">
          Shopping Cart
        </div>
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-center itemCards w-4/5 rounded-lg mr-4">
            <div
              className="justify-center flex-col items-center align-middle"
              style={{ display: items.length === 0 ? "flex" : "none" }}
            >
              <div>
                Your Cart is&nbsp;<b className="text-red-500">Empty!&nbsp;</b>
              </div>
              <div>
                Must add items on the cart before you proceed to checkout.
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              {items.map(item => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  onDelete={e => deleteItem(e, item.id)}
                />
              ))}
            </div>
          </div>
          <div className="checkoutPane w-1/5 rounded-lg text-center ml-4">
            <div className="bg-white rounded-[22px] border p-3 my-3">
              subtotal: ${subtotal.toFixed(2)}
            </div>
            <button
              className="w-full bg-[#780000] text-white rounded-full text-4xl hover:underline my-3"
              onClick={() => (window.location.href = "/shoppingcart/checkout")}
            >
              Check Out
            </button>
            <button
              className="bg-lime-500"
              onClick={e => {
                addItem(e);
              }}
            >
              Testing Button: Add Item
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-10"></div>
    </div>
  );
};

export default ShoppingCart;
