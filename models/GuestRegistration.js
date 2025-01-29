const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  txtDate: {
    type: String,
    required: true,
  },
  txtDate2: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: false,
  },
  homeAddress: {
    type: String,
    required: false,
  },
  userEmail: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  platform: {
    type: String,
    required: false,
  },
  
});

const courses = mongoose.model("guest", projectSchema);

module.exports = courses;
