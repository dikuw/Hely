const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
// const mongodbErrorHandler = require('mongoose-mongodb-errors');
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
  isAdmin: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
// userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);