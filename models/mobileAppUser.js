const mongoose = require("mongoose");

const mobileAppSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

const userModel = mongoose.model("mobileappuser", mobileAppSchema);

module.exports = userModel;
