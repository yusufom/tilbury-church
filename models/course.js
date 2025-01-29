const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDate: {
    type: String,
    required: true,
  },
  projectNote: {
    type: String,
    required: true,
  },
  projectPicture: {
    type: String,
    required: true,
  },
  likes: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  comment: {
    type: Array,
    required: true,
  },
});

const courses = mongoose.model("course", projectSchema);

module.exports = courses;
