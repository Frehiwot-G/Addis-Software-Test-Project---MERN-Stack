const mongoose =  require('mongoose');

const musicSchema = new mongoose.Schema({
    Title: String,
    Artist: String,
    Album: String,
    Gener: String
  });

  const music = mongoose.model('music', musicSchema);

  module.exports = music;