import { useState } from 'react';
import { processPayment } from '../services/stripeService';

const useStripe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (paymentData) => {
    setLoading(true);
    try {
      const result = await processPayment(paymentData);
      // Handle success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handlePayment };
};

export default useStripe;
