const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  bpm: String,
  genreIdeas: String,
  bass: String,
  drums: String,
  synth: String,
  mixingTools: String,
  masteringTools: String
});

module.exports = mongoose.model('track', trackSchema);