const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: false
  },
  position: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  image1: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  }
});

const images = mongoose.model("idcard", imageSchema);

module.exports = images;
