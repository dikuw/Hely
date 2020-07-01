const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

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
  messageDate: {
    type: Date,
    default: Date.now
  },
  messageText: {
    type: String,
    trim: false,
    required: true
  }
}, { timestamps: true });
  
module.exports = mongoose.model('Message', messageSchema);
  