const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: String,
    required: true,
  },
});

const boo = mongoose.model("boo", booksSchema);

module.exports = boo;
