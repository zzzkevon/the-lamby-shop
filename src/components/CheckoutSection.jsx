import React from "react";
import CheckoutInfo from "./checkout/CheckoutInfo";
import CheckoutItemInfo from "./checkout/CheckoutItemInfo";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const handleTotalChange = newTotal => {
  // Do something with the new total
  // console.log("New total is:", newTotal);
};
const CheckoutSection = () => {
  return (
    <div className="main-bg">
      <div className="grid grid-cols-2 px-16 pb-2">
        {/* Wrap this part of your app in the Elements provider */}
        <Elements stripe={stripePromise}>
          {/* Information Block */}
          <CheckoutInfo />
        </Elements>
        {/* Items and pricing */}
        <CheckoutItemInfo onTotalChange={handleTotalChange} />
      </div>
    </div>
  );
};

export default CheckoutSection;
