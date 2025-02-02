const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mapLink: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  policies: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("post", blogSchema);
