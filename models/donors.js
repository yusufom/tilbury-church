const mongoose = require("mongoose");

const donorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  picture: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const donors = mongoose.model("donor", donorSchema);

module.exports = donors;
