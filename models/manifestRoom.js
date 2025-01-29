const mongoose = require("mongoose");

const manifestRoomSchema = mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  hotel: {
    type: String,
    required: true,
  },
});

const roomed = mongoose.model("manifestRoom", manifestRoomSchema);

module.exports = roomed;
