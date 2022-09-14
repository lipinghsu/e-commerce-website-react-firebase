const SECRET_KEY = ""
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(SECRET_KEY);

const app = express();



app.use(cors({
  origin: true,
}));

app.use(express.json());

app.post("/payments/create" , async (request, response) => {
  try{
    const { amount, shipping } = request.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: "usd",
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    });
    console.log(paymentIntent.client_secret)
    response.status(200).send(paymentIntent.client_secret);
  } catch (error){
    response.status(500).json({
      statusCode: 500,
      message: error.message
    });
  }
})

app.get("*", (request, response) => {
  response.status(404).send("404, Not Found. >___<");
});

exports.api = functions.https.onRequest(app);
