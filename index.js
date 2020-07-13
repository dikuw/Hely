const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./database');
const router = require('./routes');

const app = express();

require('dotenv').config({ path: 'variables.env' });

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('This is the Hely Cosmetics website backend/API');
})

app.set('port', process.env.PORT || 8000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on port ${server.address().port}`);
});