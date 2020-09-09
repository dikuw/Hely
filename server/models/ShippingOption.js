const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const shippingOptionSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: 'Please enter an item number'
  },
  name: {
    type: String,
    trim: true,
    required: 'Please enter an item name'
  },
  available: { 
    type: Boolean, 
    default: true 
  },
  duration: { 
    type: Number, 
    default: 3 
  },
  price: { 
    type: Number, 
    default: 100 
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
}, { timestamps: true });
  
module.exports = mongoose.model('ShippingOption', shippingOptionSchema);