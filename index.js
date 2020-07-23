const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
//  import all models
require('./models/User');
const passport = require('passport');
require('./handlers/passport');

const db = require('./database');
const router = require('./routes');

const app = express();

require('dotenv').config({ path: 'variables.env' });

app.use(fileUpload({
  useTempFiles: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// express-validator to validate data used in userController.validateRegister
app.use(expressValidator());

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

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('This is the Hely Cosmetics website backend/API');
})

app.set('port', process.env.PORT || 8000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on port ${server.address().port}`);
});