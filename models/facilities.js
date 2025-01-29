const mongoose = require("mongoose");

const facilitiesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  hotel: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const facilities = mongoose.model("facilitie", facilitiesSchema);

module.exports = facilities;
