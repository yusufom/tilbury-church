const mongoose = require("mongoose");

const settingSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  companyCaption: {
    type: String,
    required: true
  },
  projectCounter: {
    type: String,
    required: true
  },
  volunteerCounter: {
    type: String,
    required: true
  },
  donorCounter: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  instagram: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  facebook: {
    type: String,
    required: true
  }
});

const settings = mongoose.model("setting", settingSchema);

module.exports = settings;
