const mongoose = require("mongoose");

const bookresturantSchema = mongoose.Schema({
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
  hotel: {
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
  country: {
    type: String,
    required: true,
  },
  plate: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
});

const bookresturants = mongoose.model("bookresturant", bookresturantSchema);

module.exports = bookresturants;
