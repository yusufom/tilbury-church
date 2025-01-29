const mongoose = require("mongoose");

const FormSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  bussinessType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const Form = mongoose.model("form", FormSchema);

module.exports = Form;
