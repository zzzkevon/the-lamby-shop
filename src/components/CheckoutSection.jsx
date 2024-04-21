import React from "react";
import CheckoutInfo from "./content/shopping/CheckoutInfo";
import img1 from "../images/img1.jpeg";

const CheckoutSection = () => {
  return (
    <div className="main-bg">
      <div className="grid grid-cols-2 px-16 pb-2">
        {/* Information Block */}
        <CheckoutInfo />
        {/* Items and pricing */}
        <div className="bg-white rounded px-4">
          <form className="max-w-lg mx-auto">
            <section className="p-4 bg-white rounded-2xl mb-4">
              <div>
                <img
                  src={img1}
                  className="w-1/5 rounded-md border-white border mr-8"
                  alt="Nature"
                />
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSection;
