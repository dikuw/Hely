const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const orderSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true
  },
  cart: {
    type: Object,
    required: true
  },
  customer: {
    type: Object,
    required: true
  },
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
  },
  total: {
    type: Number,
    reuired: true
  },
  shipping: {
    type: Object,
    required: true
  },
  shipDate: {
    type: Date
  },
});
  
module.exports = mongoose.model('Order', orderSchema);
  