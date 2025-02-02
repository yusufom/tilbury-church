const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
});

const messages = mongoose.model("message", messageSchema);

module.exports = messages;
