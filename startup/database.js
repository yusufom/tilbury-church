const mongoose = require("mongoose");
const debug = require("debug")("app:DB");

let isConnected = false;

module.exports = async () => {
  try {
    if (isConnected) {
      return;
    }

    const MongoURI = process.env.DB_String;

    if (!MongoURI) {
      debug("DB_String is not set – skipping DB connection");
      return;
    }

    await mongoose.connect(MongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    debug("MongoDb Connected Successfully");
  } catch (err) {
    debug("MongoDb Connection Error", err.message);
  }
};
