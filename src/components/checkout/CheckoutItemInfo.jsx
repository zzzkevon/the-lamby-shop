import React, { useState, useEffect } from "react";
import ItemCard from "../itemCard";
import { getCart, removeFromCart } from "../cart/cart";

const CheckoutItemInfo = () => {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartItems = getCart();
    setItems(cartItems);

    const subtotalValue = cartItems.reduce(
      (acc, item) => acc + item.itemPrice * item.quantity,
      0
    );
    setSubtotal(subtotalValue);

    const taxValue = subtotalValue * 0.0725;
    setTax(taxValue);

    const shippingValue = subtotalValue > 50 ? 0 : 10;
    setShipping(shippingValue);

    const totalValue = subtotalValue + taxValue + shippingValue - discount;
    setTotal(totalValue.toFixed(2));
  }, []);
  const deleteItem = item => {
    const updatedItems = items.filter(
      cartItem => cartItem.itemName !== item.itemName
    );
    setItems(updatedItems);
    removeFromCart(item);

    const total = updatedItems.reduce(
      (acc, cartItem) => acc + cartItem.itemPrice * cartItem.quantity,
      0
    );
    setSubtotal(total);
  };

  const updateItemQuantity = (itemName, newQuantity) => {
    const updatedItems = items.map(item => {
      if (item.itemName === itemName) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setItems(updatedItems);

    const subtotalValue = updatedItems.reduce(
      (acc, item) => acc + item.itemPrice * item.quantity,
      0
    );
    setSubtotal(subtotalValue);

    // Recalculate tax
    const taxValue = subtotalValue * 0.0725;
    setTax(taxValue);

    const shippingValue = subtotalValue > 50 ? 0 : 10;
    setShipping(shippingValue);

    const totalValue = subtotalValue + taxValue + shippingValue - discount;
    setTotal(totalValue.toFixed(2));
  };

  return (
    <div className="bg-white rounded-2xl px-4 relative mx-auto text-2xl">
      <form className="max-w-lg mx-auto just-another-hand">
        <section
          className="p-4 bg-white rounded-2xl mb-4 relative"
          style={{ minHeight: "300px" }}
        >
          <div className="flex flex-col justify-center items-center">
            {items.length > 0 ? (
              items.map(item => (
                <ItemCard
                  key={item.itemName}
                  item={{ ...item }}
                  onDelete={() => deleteItem(item)}
                  onQuantityChange={updateItemQuantity}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>
        </section>

        <div className="mb-4">
          <div className="flex">
            <input
              type="text"
              className="border border-gray-300 rounded-l-md p-2 flex-1 text-2xl"
              placeholder="Discount code"
            />
            <button className="bg-[#898989] text-black px-6 rounded-r-md text-3xl">
              apply
            </button>
          </div>
        </div>

        <div className="flex flex-col mb-4 font-light">
          <div className="flex justify-between">
            <span className="text-2xl">subtotal:</span>
            <span className="text-2xl">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-2xl">tax:</span>
            <span className="text-2xl">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-2xl">shipping:</span>
            <span className="text-2xl">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-2xl">discount:</span>
            <span className="text-2xl">-${discount.toFixed(2)}</span>
          </div>
          <div className="border-b border-gray-300 my-2"></div>
          <div className="flex justify-between font-bold">
            <span className="text-2xl">total:</span>
            <span className="text-2xl">${total}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutItemInfo;
