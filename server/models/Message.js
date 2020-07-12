const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: { 
    type: String, 
    trim: true, 
    required: true 
  },
  messageText: {
    type: String,
    trim: false,
    required: true
  }
}, { timestamps: true });
  
module.exports = mongoose.model('Message', messageSchema);
  