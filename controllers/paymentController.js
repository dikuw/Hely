const mongoose = require('mongoose');
const User = mongoose.model('User');
const Order = mongoose.model('Order');

//  Stripe payments setup
// *** ALSO UPDATE THE KEY IN CART.PUG!! *** //
//  ** start test keys ** //
//  🧪 🔑🔑🔑🔑🔑🔑🧪  //
 const keyPublishable = process.env.PUBLISHABLE_KEY_TEST;
 const keySecret = process.env.SECRET_KEY_TEST;
//  ** end test keys/start live keys ** //
//  💵🔑🔑🔑🔑🔑🔑💵 //
// const keyPublishable = process.env.PUBLISHABLE_KEY;
// const keySecret = process.env.SECRET_KEY;
//  ** end live keys ** //
const stripe = require('stripe')(keySecret);
var customer;

exports.postCharge = async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd"
  });
  res.send({ clientSecret: paymentIntent.client_secret });
};

exports.createCustomer = async (req, res, next) => {
  //  create customer in Stripe
  customer = await stripe.customers.create({
    email:  req.body.stripeEmail,
    source: req.body.stripeToken
  });

  //  create customer in mongoDB
  // await (new Customer({
  //   user: req.user,
  //   email: req.body.stripeEmail,
  //   name: req.body.stripeBillingName,
  //   addressCountry: req.body.stripeBillingAddressCountry,
  //   addressCountryCode: req.body.stripeBillingAddressCountryCode,
  //   addressZip: req.body.stripeBillingAddressZip,
  //   addressLine1: req.body.stripeBillingAddressLine1,
  //   addressLine2: req.body.stripeBillingAddressLine2,
  //   addressCity: req.body.stripeBillingAddressCity,
  //   addressState:req.body.stripeBillingAddressState,
  //   stripeCustomerId: customer.id
  // })).save();

  next();
}

exports.collectPayment = async (req, res, next) => {
  const cart = new Cart(req.session.cart);

  const charge = await stripe.charges.create({
    amount: parseFloat(cart.totalPrice).toFixed(2) * 100,
    currency: 'usd',
    customer: customer.id
  });

  await (new Order({
    user: req.user,
    cart: cart,
    email: req.body.stripeEmail,
    billingName: req.body.stripeBillingName,
    billingAddressCountry: req.body.stripeBillingAddressCountry,
    billingAddressCountryCode: req.body.stripeBillingAddressCountryCode,
    billingAddressZip: req.body.stripeBillingAddressZip,
    billingAddressLine1: req.body.stripeBillingAddressLine1,
    billingAddressLine2: req.body.stripeBillingAddressLine2,
    billingAddressCity: req.body.stripeBillingAddressCity,
    billingAddressState:req.body.stripeBillingAddressState,
    shippingName: req.body.stripeShippingName,
    shippingAddressCountry: req.body.stripeShippingAddressCountry,
    shippingAddressCountryCode: req.body.stripeShippingAddressCountryCode,
    shippingAddressZip: req.body.stripeShippingAddressZip,
    shippingAddressLine1: req.body.stripeShippingAddressLine1,
    shippingAddressLine2: req.body.stripeShippingAddressLine2,
    shippingAddressCity: req.body.stripeShippingAddressCity,
    shippingAddressState: req.body.stripeShippingAddressState,
    paymentId: charge.id
  })).save();

  next();
}
