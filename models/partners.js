const mongoose = require("mongoose");

const partnerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

const partners = mongoose.model("partner", partnerSchema);

module.exports = partners;
