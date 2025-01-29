const mongoose = require("mongoose");

const logoSchema = mongoose.Schema({
  logo: {
    type: String,
    required: true
  }
});

const logos = mongoose.model("logo", logoSchema);

module.exports = logos;
