const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const comments = mongoose.model("comment", commentSchema);

module.exports = comments;
