const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	User.findOne({ _id: id },	'username',	(err, user) => {
		done(null, user)
	});
});

const strategy = new LocalStrategy(
	{	usernameField: 'email'	},
	function(email, password, done) {
		User.findOne({ email: email }, (err, user) => {
			if (err) {
				return done(err);
			}
			return done(null, user);
		});
	}
);

passport.use(strategy);

module.exports = passport;