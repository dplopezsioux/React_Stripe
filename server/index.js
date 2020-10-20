const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();

const stripe = new Stripe(
  "sk_test_51HS5e3ANxbOptkcMgjTeAy7xPD5ZZw0BBD7VVy1WLBpJzjccfCkrNUYfVg7xqTUQ0kOfY0MxBxyH7AzO1eVUTiMn00Kljqhofb"
);

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Silverado",
      payment_method: id,
      confirm: true,
    });

    res.send({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.send({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server at:", 3001);
});
