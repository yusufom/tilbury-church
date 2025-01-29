const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
  },
  office: {
    type: String,
  },
});

const userModel = mongoose.model("newUsera", userSchema);

module.exports = userModel;
