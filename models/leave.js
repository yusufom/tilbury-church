const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({
  leaveType: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
      type: String,
      required: true
  }
});

const comments = mongoose.model("leave", leaveSchema);

module.exports = comments;
