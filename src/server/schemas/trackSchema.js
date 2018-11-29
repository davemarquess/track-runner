const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  Name: String,
  BPM: String,
  Genres: String,
  Bass: String,
  Drums: String,
  Synths: String,
});

module.exports = mongoose.model('track', trackSchema);