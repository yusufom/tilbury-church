const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
        surname: {
    type: String,
    required: true,
  },
      firstName:{
    type: String,
    required: true,
  },
      ids:{
    type: String,
    required: true,
  },
      checkIn:{
    type: String,
    required: true,
  },
      checkOut: {
    type: String,
    required: true,
  },
      the: {
    type: String,
    required: true,
  },
      hotelName: {
    type: String,
    required: true,
  },
      address: {
    type: String,
    required: true,
  },
      phone1: {
    type: String,
    required: true,
  },
      phone2: {
    type: String,
    required: true,
  },
      RoomName: {
    type: String,
    required: true,
  },
      totalRoomNumber: {
    type: String,
    required: true,
  },
      roomPrice:{
    type: String,
    required: true,
  },
});

const bookings = mongoose.model("bookl", bookingSchema);

module.exports = bookings;
