import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const { items, subtotal, tax, shipping, discount, total } =
    location.state || {
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,
    };

  return (
    <div className="flex items-center justify-center h-screen just-another-hand">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-2xl mb-6">
          Thank you for your purchase. Here is your receipt:
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-md text-3xl">
          <h2 className="text-3xl font-semibold mb-4">Items Purchased:</h2>
          <ul className="mb-6">
            {items.map((item, index) => (
              <li key={index} className="mb-2 text-4xl">
                <span className="font-bold">{item.itemName}</span> -{" "}
                {item.quantity} pc(s) at ${item.itemPrice.toFixed(2)} each
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between text-3xl mb-2 font-medium">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-3xl mb-2 font-medium">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-3xl mb-2 font-medium">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-3xl mb-2 font-medium">
              <span>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-3xl mt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <a
          href="/"
          className="text-6xl text-red-600 hover:underline mt-8 inline-block"
        >
          Go back to homepage
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
