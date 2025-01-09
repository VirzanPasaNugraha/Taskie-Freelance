import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm"; // Import CheckoutForm component
import newRequest from "../../utils/newRequest";

const OrderPaymentWithStripe = ({ orderId }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the client secret from the backend to initiate payment
    const fetchClientSecret = async () => {
      try {
        const res = await newRequest.post(`/orders/create-payment-intent/${orderId}`);
        setClientSecret(res.data.clientSecret); // Set the client secret from the backend
      } catch (err) {
        console.error("Error fetching client secret", err);
        // Handle error if fetching fails
      }
    };

    if (orderId) {
      fetchClientSecret();
    }
  }, [orderId]);

  // Check if clientSecret is available, show a loading message until it's available
  if (!clientSecret) {
    return <div>Loading payment...</div>; // This should only show until clientSecret is set
  }

  // Stripe public key (replace with your actual key)
  const stripePromise = loadStripe("sk_test_51QSLrWFoaanHjgImJorMYoZWTcpfU01ma4yX5os7EGJiBMBDQnOnqs7z3s6ewDHxZrcT2bOGEgndFf6FdAt8oRTF00AgsmTUEg");

  return (
    <div className="order-payment">
      <h2>Order Payment</h2>
      {/* Ensure JSX comment is outside of the return block */}
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm orderId={orderId} /> {/* Pass orderId to CheckoutForm */}
      </Elements>
    </div>
  );
};

export default OrderPaymentWithStripe;
