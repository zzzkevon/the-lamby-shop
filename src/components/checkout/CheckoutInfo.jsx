import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { clearCart, getCart } from "../cart/cart";
import axios from "axios";

const CheckoutInfo = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Define state for each form field
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

  // Checkout summary variables
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(10); // Default shipping cost
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Fetch items from the cart and calculate totals
    const cartItems = getCart(); // getCart should be imported or defined to fetch cart items
    setItems(cartItems);

    // Calculate subtotal, tax, shipping, and total
    const subtotalValue = cartItems.reduce(
      (acc, item) => acc + item.itemPrice * item.quantity,
      0
    );
    setSubtotal(subtotalValue);

    const taxValue = subtotalValue * 0.0725;
    setTax(taxValue);

    const shippingValue = subtotalValue > 50 ? 0 : 10;
    setShipping(shippingValue);

    const totalValue = subtotalValue + taxValue + shippingValue - discount;
    setTotal(totalValue);
  }, [discount]);

  const sendEmailReceipt = async (
    clientEmail,
    items,
    subtotal,
    tax,
    shipping,
    discount,
    total
  ) => {
    // Define the payload
    const payload = {
      body: {
        clientEmail: clientEmail, // Customer's email address
        ownerEmail: "thelambyshop@gmail.com", // Owner's email address
        items: items, // Array of purchased items
        subtotal: subtotal,
        tax: tax,
        shipping: shipping,
        discount: discount,
        total: total,
      },
    };

    console.log(payload);

    try {
      // Make the POST request to your AWS API Gateway endpoint
      const response = await axios.post(
        "https://ikc2uhcqo2.execute-api.us-west-2.amazonaws.com/dev/putReceipt", // Replace with your API Gateway endpoint
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check the response
      if (response.status === 200) {
        console.log("Email sent successfully:", response.data);
      } else {
        console.error("Failed to send email:", response.data);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

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
          type: "card",
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

      // Step 2: Call your AWS Lambda backend via API Gateway to create payment intent
      const response = await axios.post(
        "https://g3ygonyv9k.execute-api.us-west-2.amazonaws.com/dev", // Replace with your endpoint
        {
          paymentMethodId: paymentMethod.id,
          amount: Math.round(total * 100), // Amount in cents
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { clientSecret } = response.data;

      // Step 3: Confirm the Payment Intent with Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
      } else if (paymentIntent.status === "succeeded") {
        // clear local storage cart
        clearCart();

        // email to client and owner
        await sendEmailReceipt(
          email, // Customer's email
          items, // Purchased items
          subtotal,
          tax,
          shipping,
          discount,
          total
        );

        // Navigate to PaymentSuccess with all necessary data
        navigate("/payment-success", {
          state: {
            items,
            subtotal,
            tax,
            shipping,
            discount,
            total,
          },
        });
      }
    } catch (err) {
      setError("An error occurred during payment processing.");
      // console.error(err);
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

export default CheckoutInfo;
