// import React, { useState } from "react";
// import {
//   CardElement,
//   useStripe,
//   useElements,
//   Elements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";

// // Load Stripe using the publishable key
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// const CheckoutInfo = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zip, setZip] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       setError("Stripe.js has not loaded yet.");
//       setLoading(false);
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     try {
//       // Step 1: Create Payment Intent from backend
//       const response = await axios.post("/create-payment-intent", {
//         email,
//         amount: 5000, // example amount in cents (50 USD)
//       });
//       const { clientSecret } = response.data;

//       // Step 2: Confirm Card Payment with Stripe
//       const { paymentIntent, error: stripeError } =
//         await stripe.confirmCardPayment(clientSecret, {
//           payment_method: {
//             card: cardElement,
//             billing_details: {
//               name: `${firstName} ${lastName}`,
//               email,
//               phone: phoneNumber,
//               address: {
//                 city,
//                 state,
//                 postal_code: zip,
//                 line1: address,
//               },
//             },
//           },
//         });

//       if (stripeError) {
//         setError(stripeError.message);
//       } else if (paymentIntent.status === "succeeded") {
//         alert("Payment successful!");
//         console.log("Payment successful! PaymentIntent ID:", paymentIntent.id);
//       }
//     } catch (err) {
//       setError("An error occurred during payment processing.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto just-another-hand"
//     >
//       {/* Email Block */}
//       <section className="p-4 bg-white rounded-2xl mb-4">
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
//           placeholder="email address"
//         />
//       </section>

//       {/* Name and location Block */}
//       <section className="p-4 bg-white rounded-2xl mb-4">
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <input
//             type="text"
//             id="firstName"
//             value={firstName}
//             onChange={e => setFirstName(e.target.value)}
//             className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
//             placeholder="first name"
//           />
//           <input
//             type="text"
//             id="lastName"
//             value={lastName}
//             onChange={e => setLastName(e.target.value)}
//             className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
//             placeholder="last name"
//           />
//         </div>
//         <div className="mb-6">
//           <input
//             type="text"
//             id="address"
//             value={address}
//             onChange={e => setAddress(e.target.value)}
//             className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
//             placeholder="address"
//           />
//         </div>
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <input
//             type="text"
//             id="city"
//             value={city}
//             onChange={e => setCity(e.target.value)}
//             className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
//             placeholder="city"
//           />
//           <input
//             type="text"
//             id="state"
//             value={state}
//             onChange={e => setState(e.target.value)}
//             className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
//             placeholder="state"
//           />
//           <input
//             type="text"
//             id="zip"
//             value={zip}
//             onChange={e => setZip(e.target.value)}
//             className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
//             placeholder="zip code"
//           />
//         </div>
//         <div className="mb-6">
//           <input
//             type="text"
//             id="phoneNumber"
//             value={phoneNumber}
//             onChange={e => setPhoneNumber(e.target.value)}
//             className="w-full p-2 border-2 border-gray-500 just-another-hand text-2xl"
//             placeholder="phone number"
//           />
//         </div>
//       </section>

//       {/* Card Info Block */}
//       <section className="p-4 bg-white rounded-2xl mb-4">
//         <div>
//           <CardElement
//             className="w-full p-2 border-2 border-gray-500 text-2xl"
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                 },
//               },
//               hidePostalCode: true,
//             }}
//           />
//         </div>
//       </section>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full p-4 bg-[#780000] text-white text-4xl rounded-full"
//       >
//         {loading ? "Processing..." : "Check Out"}
//       </button>

//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </form>
//   );
// };

// export default function Checkout() {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutInfo />
//     </Elements>
//   );
// }

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutInfo = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    // Call your backend API to create a payment intent
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: 5000, // Example amount in cents (50 USD)
      }),
    });

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: { name, email },
        },
      }
    );

    if (error) {
      console.log(error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful!");
    }

    setLoading(false);
  };

  const handlePayment = async () => {
    const stripe = useStripe();
    const elements = useElements();

    const cardElement = elements.getElement(CardElement);

    const clientSecret = await createPaymentIntent(5000); // Amount in cents

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: "Customer Name",
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful");
      }
    }
  };

  const createPaymentIntent = async amount => {
    try {
      const { data } = await axios.post(
        "https://your-api-gateway-url/create-payment-intent",
        {
          amount,
          currency: "usd",
        }
      );

      return data.clientSecret;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <CardElement />
      <button disabled={loading || !stripe}>Pay</button>
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
