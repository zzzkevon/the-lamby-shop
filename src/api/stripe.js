import axios from 'axios';

export const createPaymentIntent = async (data) => {
  return await axios.post('/api/stripe/payment', data);
};
