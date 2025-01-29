const mongoose = require("mongoose");

const professionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
  cbtTest: {
    type: String,
  },
  interviewDate: {
    type: String,
  },
  status: {
    type: String,
  },
});

const professions = mongoose.model("profession", professionSchema);

module.exports = professions;
