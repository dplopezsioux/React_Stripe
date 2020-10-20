import React from "react";
import "./App.css";
import axios from "axios";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import "bootswatch/dist/darkly/bootstrap.min.css";

const stripePromise = loadStripe(
  "pk_test_51HS5e3ANxbOptkcMrMxGYN3B4rTSQ9zaUUpazfEsGeWzvIDWkM8KNZcbojxb3DIa8i0Cdk1cBF14l3Ti26V1eTyd00a4X0GkdY"
);

const MyCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("!await stripe.createPaymentMethod({");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log(" ->>> if (!error) {", paymentMethod, error);

    if (!error) {
      const { id } = paymentMethod;

      console.log("const { data } = await axios.post(, {");

      const { data } = await axios.post("http://localhost:3001/api/checkout", {
        id,
        //amount: 32000 * 100, example
        amount: 2 * 100,
      });

      console.log(data);

      elements.getElement(CardElement).clear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://www.cstatic-images.com/car-pictures/xl/usd10cht279b021001.png"
        className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
        alt=""
      ></img>
      <h3 className="text-center my-2">ONLY 32K $</h3>
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <button className="btn btn-success">BUY</button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <MyCheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
