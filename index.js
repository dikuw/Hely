const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const promisify = require('es6-promisify');
//  import all models
require('./models/User');

//  use passport for authentication
const passport = require('./handlers/passport');

const db = require('./database');
const router = require('./routes');

const app = express();

//  create .env file for enviromental variables
require('dotenv').config({ path: 'variables.env' });

//  allow fileUpload to use temporary files location for upload to server before uploading to Cloudinary
app.use(fileUpload({
  useTempFiles: true
}));

//  enable CORS for all origins to allow development with local server
app.use(cors({credentials: true, origin: 'http://localhost:3002'}));
// app.use(cors({credentials: true, origin: 'https://hely.herokuapp.com'}));

// express-validator to validate data used in userController.validateRegister
app.use(expressValidator());

// use bodyParser to allow req.params and req.query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// passport.js to handle logins
app.use(passport.initialize());
app.use(passport.session());

// pass variables on all requests
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.session = req.session;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('This is the Hely Cosmetics website backend/API');
})

app.set('port', process.env.PORT || 8000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on port ${server.address().port}`);
});