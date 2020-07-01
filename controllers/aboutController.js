const mongoose = require('mongoose');
// TODO: add mail handler
// const Message = mongoose.model('Message');
// const mail = require('../handlers/mail');

exports.aboutPage = (req, res) => {
  res.render('about', { title: 'About' });
};

exports.faqPage = (req, res) => {
  res.render('faq', { title: 'FAQ' });
};

exports.contactPage = (req, res) => {
  res.render('contact', { title: 'Contact' });
};

exports.privacyPage = (req, res) => {
  res.render('privacy', { title: 'Privacy Policy' });
};

exports.termsPage = (req, res) => {
  res.render('terms', { title: 'Terms of Use' });
};

exports.returnsPage = (req, res) => {
  res.render('returns', { title: 'Return Policy' });
};

exports.shippingPage = (req, res) => {
  res.render('shipping', { title: 'Shipping Information' });
};

exports.validateMessage = (req, res, next) => {
  req.checkBody('name', 'Please enter a name').notEmpty();
  req.checkBody('email', 'Please enter a valid email').isEmail();
  req.checkBody('message', 'Please enter a message').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('contact', { title: 'Contact', body: req.body, flashes: req.flash() });
    return;
  }
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
  await mail.send({
    fromEmail: "",
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    subject: 'New message',
    filename: 'message'
  });
  req.flash('success', `Message sent! W/we will be in touch as soon as possible.`);
  res.redirect('/');
};