const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  hotel: {
    type: String,
    required: true,
  },
});

const reviews = mongoose.model("review", reviewSchema);

module.exports = reviews;
