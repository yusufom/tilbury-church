const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  eventDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eventNote: {
    type: String,
    required: true
  },
  
  likes: {
    type: String,
    required: true
  },
  comment: {
    type: Array,
    required: true
  }
});

const events = mongoose.model("event", eventSchema);

module.exports = events