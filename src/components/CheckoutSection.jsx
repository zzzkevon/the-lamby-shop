import React from "react";
import CheckoutInfo from "./checkout/CheckoutInfo";
import CheckoutItemInfo from "./checkout/CheckoutItemInfo";

const CheckoutSection = () => {
  return (
    <div className="main-bg">
      <div className="grid grid-cols-2 px-16 pb-2">
        {/* Information Block */}
        <CheckoutInfo />
        {/* Items and pricing */}
        <CheckoutItemInfo />
      </div>
    </div>
  );
};

export default CheckoutSection;
