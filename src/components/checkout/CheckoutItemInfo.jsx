import React from "react";
import img1 from "../../images/img1.jpeg";

const CheckoutItemInfo = () => {
  return (
    <div className="bg-white rounded-2xl px-4 relative mx-auto">
      <form className="max-w-lg mx-auto just-another-hand">
        <section className="p-4 bg-white rounded-2xl mb-4 relative">
          <div className="flex items-center">
            {/* First Image */}
            <div className="flex items-center relative">
              {/* Pricing */}
              <p className="absolute top-0 right-0 font-bold text-2xl">
                $40.00
              </p>
              <img
                src={img1}
                className="w-1/3 rounded-2xl border-white border mr-8"
                alt="Nature"
              />
              {/* Item Description */}
              <div>
                <h2 className="font-bold mb-2 text-3xl">Item Name</h2>
                <p className="mb-2 text-xl">Size: OS</p>
              </div>
              {/* Quantity Selector */}
              <div className="absolute bottom-4 right-4 flex items-center">
                <button className="text-xl px-1 py-1">-</button>
                <input
                  type="text"
                  className="w-12 px-1 py-1 text-center"
                  value="1"
                />
                <button className="text-xl px-1 py-1">+</button>
              </div>
            </div>
          </div>
        </section>

        {/* Second Image */}
        <section className="p-4 bg-white rounded-2xl mb- relative">
          <div className="flex items-center">
            {/* First Image */}
            <div className="flex items-center relative">
              {/* Pricing */}
              <p className="absolute top-0 right-0 font-bold text-2xl">
                $40.00
              </p>
              <img
                src={img1}
                className="w-1/3 rounded-2xl border-white border mr-8"
                alt="Nature"
              />
              {/* Item Description */}
              <div>
                <h2 className="font-bold mb-2 text-3xl">Item Name</h2>
                <p className="mb-2 text-xl">Size: OS</p>
              </div>
              {/* Quantity Selector */}
              <div className="absolute bottom-4 right-4 flex items-center">
                <button className="text-xl px-1 py-1">-</button>
                <input
                  type="text"
                  className="w-12 px-1 py-1 text-center"
                  value="1"
                />
                <button className="text-xl px-1 py-1">+</button>
              </div>
            </div>
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
            <span className="text-2xl">$X.XX</span>
          </div>
          <div className="flex justify-between">
            <span className="text-2xl">tax:</span>
            <span className="text-2xl">$X.XX</span>
          </div>
          <div className="flex justify-between">
            <span className="text-2xl">shipping:</span>
            <span className="text-2xl">$X.XX</span>
          </div>
          <div className="flex justify-between">
            <span className="text-2xl">discount:</span>
            <span className="text-2xl">-$X.XX</span>
          </div>
          <div className="border-b border-gray-300 my-2"></div>
          <div className="flex justify-between font-bold">
            <span className="text-2xl">total:</span>
            <span className="text-2xl">$X.XX</span>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="flex justify-center">
          <button className="bg-[#780000] text-white px-10 py-2 rounded-full text-4xl">
            CHECK&nbsp;OUT
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutItemInfo;
