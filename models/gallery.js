const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  description: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const images = mongoose.model("image", imageSchema);

module.exports = images;
