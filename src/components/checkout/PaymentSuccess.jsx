import React from "react";
import { useLocation } from "react-router-dom"; // Use useLocation to access the passed state

const PaymentSuccess = () => {
  const location = useLocation();
  const { items, total } = location.state || { items: [], total: 0 }; // Get items and total from the state

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl mb-6">
          Thank you for your purchase. Here is your receipt:
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Items List */}
          <h2 className="text-2xl font-semibold mb-4">Items Purchased:</h2>
          <ul className="mb-4">
            {items.map((item, index) => (
              <li key={index} className="mb-2">
                <span className="font-bold">{item.itemName}</span> -{" "}
                {item.quantity} pcs
              </li>
            ))}
          </ul>

          {/* Total Section */}
          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between text-lg mb-2">
              <span>Subtotal:</span>
              <span>${(total / 1.0725).toFixed(2)}</span>{" "}
              {/* Calculate subtotal from total and tax */}
            </div>
            <div className="flex justify-between text-lg mb-2">
              <span>Tax:</span>
              <span>${(total - total / 1.0725).toFixed(2)}</span>{" "}
              {/* Display tax */}
            </div>
            <div className="flex justify-between text-lg mb-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span> {/* Display total */}
            </div>
          </div>
        </div>

        <a
          href="/"
          className="text-2xl text-blue-500 hover:underline mt-6 inline-block"
        >
          Go back to homepage
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
