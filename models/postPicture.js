const mongoose = require("mongoose");

const blogPictureSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  postPicture: {
      type: String,
      required: true
  }
});

const blogPicture = module.exports = mongoose.model("pix", blogPictureSchema);
