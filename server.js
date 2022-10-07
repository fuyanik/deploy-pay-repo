const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://deploy-vitamu.herokuapp.com',
      changeOrigin: true,
    })
  );
};



const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51LOrQYKGr3XuaAt4d9fT0XXB8CrL4GKbBHG3t8alb1Yo1aIULBvpbUm8UwDZNWNx5YRSatAzkHJH3Jlx25qlPtow00dTA8p2Ij');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4242',
      changeOrigin: true,
    })
  );
};

console.log("asd")

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "gbp",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

console.log("asd")
app.listen(4242, () => console.log("Node server listening on port 4242!"));