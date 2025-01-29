const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  NOKphone: {
    type: String,
    required: true,
  },
  employement: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  secondPhone: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },

  emailAddress: {
    type: String,
    required: true,
  },

  nin: {
    type: String,
    required: true,
  },
  NOK: {
    type: String,
    required: true,
  },
  NOKAddress: {
    type: String,
    required: true,
  },
  NOKAddress: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  AccountNumber: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  }
});

const userModel = mongoose.model("originalstaff", userSchema);

module.exports = userModel;
