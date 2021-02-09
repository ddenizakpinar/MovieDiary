const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  imdbID: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
