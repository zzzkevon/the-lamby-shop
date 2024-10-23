import React, { useState, useEffect } from "react";
import ItemCard from "../itemCard";
import { getCart, removeFromCart } from "../cart/cart";

const CheckoutItemInfo = ({ onTotalChange }) => {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(10); // Default flat-rate shipping cost
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartItems = getCart();
    setItems(cartItems);

    // Calculate subtotal
    const subtotalValue = cartItems.reduce(
      (acc, item) => acc + item.itemPrice * item.quantity,
      0
    );
    setSubtotal(subtotalValue);

    // Calculate tax (7.25% of subtotal)
    const taxValue = subtotalValue * 0.0725;
    setTax(taxValue);

    // Calculate shipping (free if subtotal > $50)
    const shippingValue = subtotalValue > 50 ? 0 : 10;
    setShipping(shippingValue);

    // Calculate total (subtotal + tax + shipping - discount)
    const totalValue = subtotalValue + taxValue + shippingValue - discount;
    setTotal(totalValue.toFixed(2)); // Round to 2 decimal places

    // Update the total in the parent (if applicable)
    if (onTotalChange) {
      onTotalChange(totalValue);
    }
  }, [discount]); // Only recalculate when discount changes

  const deleteItem = item => {
    const updatedItems = items.filter(
      cartItem => cartItem.itemName !== item.itemName
    );
    setItems(updatedItems);
    removeFromCart(item);

    // Recalculate subtotal
    const subtotalValue = updatedItems.reduce(
      (acc, cartItem) => acc + cartItem.itemPrice * cartItem.quantity,
      0
    );
    setSubtotal(subtotalValue);

    // Recalculate tax
    const taxValue = subtotalValue * 0.0725;
    setTax(taxValue);

    // Recalculate shipping
    const shippingValue = subtotalValue > 50 ? 0 : 10;
    setShipping(shippingValue);

    // Recalculate total
    const totalValue = subtotalValue + taxValue + shippingValue - discount;
    setTotal(totalValue.toFixed(2));

    // Update the total in the parent (if applicable)
    if (onTotalChange) {
      onTotalChange(totalValue);
    }
  };

  // Update subtotal, tax, shipping, and total when quantity changes
  const updateItemQuantity = (itemName, newQuantity) => {
    const updatedItems = items.map(item => {
      if (item.itemName === itemName) {
        return { ...item, quantity: newQuantity }; // Update the item quantity
      }
      return item;
    });
    setItems(updatedItems); // Update the local state

    // Recalculate subtotal
    const subtotalValue = updatedItems.reduce(
      (acc, item) => acc + item.itemPrice * item.quantity,
      0
    );
    setSubtotal(subtotalValue);

    // Recalculate tax
    const taxValue = subtotalValue * 0.0725;
    setTax(taxValue);

    // Recalculate shipping (free if subtotal > $50)
    const shippingValue = subtotalValue > 50 ? 0 : 10;
    setShipping(shippingValue);

    // Recalculate total
    const totalValue = subtotalValue + taxValue + shippingValue - discount;
    setTotal(totalValue.toFixed(2));

    // Update the total in the parent (if applicable)
    if (onTotalChange) {
      onTotalChange(totalValue);
    }
  };

  return (
    <div className="bg-white rounded-2xl px-4 relative mx-auto">
      <form className="max-w-lg mx-auto just-another-hand">
        <section className="p-4 bg-white rounded-2xl mb-4 relative">
          <div className="flex flex-col justify-center items-center">
            {items.map(item => (
              <ItemCard
                key={item.itemName}
                item={{ ...item }} // Pass the entire item
                onDelete={() => deleteItem(item)}
                onQuantityChange={updateItemQuantity} // Pass down the update function
              />
            ))}
          </div>
        </section>
        {/* Discount Code Block */}
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

        {/* Pricing Section */}
        <div className="flex flex-col mb-4 font-light">
          <div className="flex justify-between">
            <span className="text-2xl">subtotal:</span>
            <span className="text-2xl">${subtotal.toFixed(2)}</span>{" "}
            {/* Display subtotal */}
          </div>
          <div className="flex justify-between">
            <span className="text-2xl">tax:</span>
            <span className="text-2xl">${tax.toFixed(2)}</span>{" "}
            {/* Display tax */}
          </div>
          <div className="flex justify-between">
            <span className="text-2xl">shipping:</span>
            <span className="text-2xl">${shipping.toFixed(2)}</span>{" "}
            {/* Display shipping */}
          </div>
          <div className="flex justify-between">
            <span className="text-2xl">discount:</span>
            <span className="text-2xl">-${discount.toFixed(2)}</span>{" "}
            {/* Display discount */}
          </div>
          <div className="border-b border-gray-300 my-2"></div>
          <div className="flex justify-between font-bold">
            <span className="text-2xl">total:</span>
            <span className="text-2xl">${total}</span> {/* Display total */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutItemInfo;
