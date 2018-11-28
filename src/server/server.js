// require statements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Track = require('./schemas/trackSchema');
// const path = require('path');

const PORT = 3000;

// use statements
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, '/../../dist')));

require('dotenv').config();
// mongoose connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}, (err) => {
  if (err) console.log(err);
  else console.log('Connected to database!');
});

// ROUTES 
app.post('/track', (req, res) => {
  Track.create(req.body).then((data) => {
    res.json(data); // send back data in json format
  });
});

app.use(express.static(__dirname + '/../../dist'));

// listen --> where server is going to run
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Listening on port ${PORT}!!!`);
});