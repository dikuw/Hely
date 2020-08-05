const mongoose = require('mongoose');
const Order = mongoose.model('Order');

//  Stripe payments setup
//  ** test key ** //
 const keySecret = process.env.SECRET_KEY_TEST;
//  ** live key ** //
// const keySecret = process.env.SECRET_KEY;
const stripe = require('stripe')(keySecret);

exports.postCreatePaymentIntent = async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd"
  });
  res.send({ clientSecret: paymentIntent.client_secret });
};