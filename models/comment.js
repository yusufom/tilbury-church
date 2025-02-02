const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const comments = mongoose.model("comment", commentSchema);

module.exports = comments;
