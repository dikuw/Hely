require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { Strategy: TwitterStrategy } = require('passport-twitter');
const { Strategy: InstagramStrategy } = require('passport-instagram');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const providers = ['twitter', 'instagram', 'facebook'];

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `https://hely.herokuapp.com/${provider}/callback`
    : `https://localhost:8080/${provider}/callback`
});

const [twitterURL, instagramURL, facebookURL] = callbacks;

const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile);

const FACEBOOK_CONFIG = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  profileFields: ['emails', 'name'],
  callbackURL: facebookURL
};

const TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_APP_ID,
  consumerSecret: process.env.TWITTER_APP_SECRET,
  callbackURL: twitterURL,
}

const INSTAGRAM_CONFIG = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: instagramURL
}

passport.use(User.createStrategy());
passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback));
passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
passport.use(new InstagramStrategy(INSTAGRAM_CONFIG, callback));

module.exports = passport;