const mongoose = require("mongoose");

const jobApplicationSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  CV: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  }
});

const jobApp = mongoose.model("jobApplication", jobApplicationSchema);

module.exports = jobApp;
