import { CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => (
  <div className="payment-form">
    <CardElement />
  </div>
);

export default PaymentForm;
