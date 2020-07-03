const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId
  },
  cart: {
    type: Object,
    required: true
  },
  email: { type: String, trim: true, required: true },
  billingName: { type: String, trim: true, required: true },
  billingAddressCountry: { type: String, trim: true, required: true },
  billingAddressCountryCode: { type: String, trim: true, required: true },
  billingAddressZip: { type: String, trim: true, required: true },
  billingAddressLine1: { type: String, trim: true, required: true },
  billingAddressLine2: { type: String, trim: true, required: false },
  billingAddressCity: { type: String, trim: true, required: true },
  billingAddressState: { type: String, trim: true, required: true },
  shippingName: { type: String, trim: true, required: true },
  shippingAddressCountry: { type: String, trim: true, required: true },
  shippingAddressCountryCode: { type: String, trim: true, required: true },
  shippingAddressZip: { type: String, trim: true, required: true },
  shippingAddressLine1: { type: String, trim: true, required: true },
  shippingAddressLine2: { type: String, trim: true, required: false },
  shippingAddressCity: { type: String, trim: true, required: true },
  shippingAddressState: { type: String, trim: true, required: true },
  paymentId: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    default: "In progress"
  }
});
  
module.exports = mongoose.model('Order', orderSchema);
  