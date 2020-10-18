import React from "react";
import "./App.css";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "bootswatch/dist/darkly/bootswatch.min.css";

const stripePromise = loadStripe(
  "pk_test_51HS5e3ANxbOptkcMrMxGYN3B4rTSQ9zaUUpazfEsGeWzvIDWkM8KNZcbojxb3DIa8i0Cdk1cBF14l3Ti26V1eTyd00a4X0GkdY"
);

const MyCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.priventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement></CardElement>
      <button>BUY</button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <MyCheckoutForm />
    </Elements>
  );
}

export default App;
