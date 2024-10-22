import React, { useState, useEffect } from "react";
import ItemCard from "../itemCard";
import { getCart } from "../cart/cart";

const CheckoutItemInfo = ({ onTotalChange }) => {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
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

    // Calculate total
    const totalValue = subtotalValue + taxValue + shippingValue;
    setTotal(totalValue);

    // Notify parent about the total
    onTotalChange(totalValue);
  }, [items]);

  return (
    <div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}

      <div>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Shipping: ${shipping.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CheckoutItemInfo;
