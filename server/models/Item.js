const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter an item name'
  },
  description: {
    type: String,
    trim: true,
    required: 'Please enter a description'
  },
  image: {
    type: String
  },
  category: {
    type: String,
    enum: ['face', 'eyes', 'brushes'],
    required: 'You must supply a category',
    default: 'face'
  },
  available: { 
    type: Boolean, 
    default: true 
  },
  price: { 
    type: Number, 
    default: 100 
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });
  
module.exports = mongoose.model('Item', itemSchema);