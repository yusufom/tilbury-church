const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  hotel: {
    type: String,
  },
});

const messages = mongoose.model("message", messageSchema);

module.exports = messages;
