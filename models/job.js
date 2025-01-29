const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  jobName: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  jobSummary: {
    type: String,
    required: true
  },
  responsibility: {
    type: String,
    required: true
  },
  requirement: {
    type: String,
    required: true
  }
});

const jobs = mongoose.model("job", jobSchema);

module.exports = jobs;
