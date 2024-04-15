import React from "react";

const CheckoutInfo = () => {
  return (
    <div>
      <form className="max-w-lg mx-auto">
        {/* Email Block */}
        <section className="p-4 bg-white rounded-2xl mb-4">
          {/* Email Address */}
          <div className="">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
              placeholder="email address"
            />
          </div>
        </section>

        {/* Name and location Block */}
        <section className="p-4 bg-white rounded-2xl mb-4">
          {/* Name (First and Last) */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
                placeholder="first name"
              />
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
                placeholder="last name"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <input
              type="text"
              id="address"
              name="address"
              className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
              placeholder="address 1"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="address"
              name="address"
              className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
              placeholder="address 2"
            />
          </div>

          {/* Country */}
          <div className="mb-6">
            <input
              type="text"
              id="country"
              name="country"
              className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
              placeholder="country"
            />
          </div>

          {/* Zip, City, State */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <input
                type="text"
                id="zip"
                name="zip"
                className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
                placeholder="zip code"
              />
            </div>
            <div>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
                placeholder="city"
              />
            </div>
            <div>
              <input
                type="text"
                id="state"
                name="state"
                className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
                placeholder="state"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="">
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
              placeholder="phone number"
            />
          </div>
        </section>

        {/* Card Info Block */}
        <section className="p-4 bg-white rounded-2xl">
          {/* Card Info */}
          <div className="mb-6">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
              placeholder="card number"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                id="expiration"
                name="expiration"
                className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <input
                type="text"
                id="ccv"
                name="ccv"
                className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
                placeholder="CCV"
              />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CheckoutInfo;
