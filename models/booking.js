const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  guestName: {
    type: String,
    required: true,
  },
  receiptNumber: {
    type: String,
    required: true,
  },
  roomRate: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    required: true,
  },
  pos: {
    type: String,
    required: true,
  },
  cash: {
    type: String,
    required: true,
  },
  bankTransfer: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const bookings = mongoose.model("booking", bookingSchema);

module.exports = bookings;
