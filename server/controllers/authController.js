const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.passportLocal = (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.json({ error: err }); }
    req.logIn(user, function(err) {
      if (err) { return res.json({ error: err }); }
      return next();
    });
  })(req, res, next);
}

exports.passportFB = (req, res, next) => {
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  };
  next();
}

exports.passportIG = (req, res, next) => {
  passport.authenticate('instagram'),
  function(req, res){
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  };
  next();
}

exports.passportTW = (req, res, next) => {
  passport.authenticate('twitter'),
  function(req, res){
    // The request will be redirected to Twitter for authentication, so this
    // function will not be called.
  };
  next();
}

exports.login = (req, res) => {
  req.login(req.user, function(err) {
    if (err) { res.json({ error: err }); }
    return res.send(req.user);
  });
};

exports.logout = (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logged out' });
  } else {
    res.send({ msg: 'no user to log out' })
  };
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'You must be logged in to do that');
  res.redirect('/login');
};

exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
    return;
  }
  req.flash('error', 'You must be an admin to do that');
  res.redirect('/Devices');
};

exports.forgot = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('error', 'No user associated with that email. Please register a new account.');
    return res.redirect('/register');
  }
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();
  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  await mail.send({
    user,
    subject: 'Password Reset',
    resetURL,
    filename: 'password-reset'
  })
  req.flash('success', `You have been emailed a password reset link`);
  res.redirect('/');
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }
  res.render('reset', { title: 'Reset your Password' });
};

exports.confirmPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next();
    return;
  }
  req.flash('error', 'Passwords do not match');
  res.redirect('back');
};

exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }
  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser);
  req.flash('Success', 'Your password has been reset. You are logged in.');
  res.redirect('/');
};