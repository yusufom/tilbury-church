const mongoose = require("mongoose");

const volunteerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  volunteerPicture: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  }
});

const volunteers = mongoose.model("volunteer", volunteerSchema);

module.exports = volunteers;
