const mongoose = require('mongoose');
const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a message',
    });
  }

  const message = new Message(body);

  if (!message) {
    return res.status(400).json({ success: false, error: err });
  }

  await message.save();
    
  return res.status(201).json({
    success: true,
    id: message._id,
    message: 'Message created!',
  })
}
// TODO: add mail handler
// const Message = mongoose.model('Message');
// const mail = require('../handlers/mail');

exports.validateMessage = (req, res, next) => {
  console.log('validating message...');
  // req.checkBody('name', 'Please enter a name').notEmpty();
  // req.checkBody('email', 'Please enter a valid email').isEmail();
  // req.checkBody('message', 'Please enter a message').notEmpty();
  // const errors = req.validationErrors();
  // if (errors) {
  //   req.flash('error', errors.map(err => err.msg));
  //   res.render('contact', { title: 'Contact', body: req.body, flashes: req.flash() });
  //   return;
  // }
  next();
}; 

exports.saveMessage = async (req, res, next) => {
  const message = {
    name: req.body.name,
    email: req.body.email,
    messageText: req.body.message
  }
  await (new Message(message)).save();
  next();
}

//  TODO: Specify fromEmail
exports.sendMessage = async (req, res) => {
  console.log('sending email...');
  // await mail.send({
  //   fromEmail: "",
  //   name: req.body.name,
  //   email: req.body.email,
  //   message: req.body.message,
  //   subject: 'New message',
  //   filename: 'message'
  // });
  // req.flash('success', `Message sent! W/we will be in touch as soon as possible.`);
  // res.redirect('/');
};