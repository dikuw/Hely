const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
    required: 'Please enter an email address'
  },
  name: {
    type: String,
    required: 'Please enter a name',
    trim: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  image: {
    type: String,
    default: "default.png"
  },
  timezone: {
    type: String,
    required: 'Please select a timezone'
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  SSID: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  added: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);