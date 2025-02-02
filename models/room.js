const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  bedType: {
    type: String,
    required: true,
  },
  maxUser: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  facilities: {
    type: String,
    required: true,
  },
  additionRoom: {
    type: String,
    required: true,
  },
});

const rooms = mongoose.model("room", roomSchema);

module.exports = rooms;
