import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Load Stripe using the publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutInfo = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Step 1: Create Payment Method using Stripe Elements
      const { paymentMethod, error: paymentMethodError } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: `${firstName} ${lastName}`,
            email,
            phone: phoneNumber,
            address: {
              city,
              state,
              postal_code: zip,
              line1: address,
            },
          },
        });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        setLoading(false);
        return;
      }

      // Step 2: Call your AWS Lambda endpoint to create a payment intent
      const response = await axios.post(
        process.env.REACT_APP_STRIPE_API_URL, // Replace with your Stripe API URL
        {
          paymentMethodId: paymentMethod.id, // Send the created paymentMethodId
          amount: 5000, // will need to change this later to accept the total calculated from CheckoutItemInfojsx
        }
      );

      const { clientSecret } = response.data;

      // Step 3: Confirm the Payment Intent with Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (stripeError) {
        console.log("Error in step 3");
        setError(stripeError.message);
        setLoading(false);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        console.log("Payment successful! PaymentIntent ID:", paymentIntent.id);
      }
    } catch (err) {
      setError("An error occurred during payment processing.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto just-another-hand"
    >
      {/* Email Block */}
      <section className="p-4 bg-white rounded-2xl mb-4">
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
          placeholder="email address"
        />
      </section>

      {/* Name and location Block */}
      <section className="p-4 bg-white rounded-2xl mb-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
            placeholder="first name"
          />
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
            placeholder="last name"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            id="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
            placeholder="address"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            id="city"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
            placeholder="city"
          />
          <input
            type="text"
            id="state"
            value={state}
            onChange={e => setState(e.target.value)}
            className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
            placeholder="state"
          />
          <input
            type="text"
            id="zip"
            value={zip}
            onChange={e => setZip(e.target.value)}
            className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
            placeholder="zip code"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
            placeholder="phone number"
          />
        </div>
      </section>

      {/* Card Info Block */}
      <section className="p-4 bg-white rounded-2xl mb-4">
        <div>
          <CardElement
            className="w-full p-2 border-2 border-gray-500 text-2xl"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
      </section>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-4 bg-[#780000] text-white text-4xl rounded-full"
      >
        {loading ? "Processing..." : "Check Out"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutInfo />
    </Elements>
  );
}
