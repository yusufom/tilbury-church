const mongoose = require("mongoose");

const resturantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  lunchTime: {
    type: String,
  },
  dinnerTime: {
    type: String,
  },
  barTime: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
});

const resturants = mongoose.model("resturant", resturantSchema);

module.exports = resturants;
