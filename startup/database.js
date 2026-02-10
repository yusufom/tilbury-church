const mongoose = require("mongoose");
const debug = require("debug")("app:DB");

mongoose.set("bufferCommands", false);

let isConnected = false;
let connectPromise = null;

async function connectOnce() {
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
    // Re-throw so callers can fail fast (and we can retry next time)
    throw err;
  }
}

async function ensureDbConnected() {
  if (isConnected) return;
  if (!connectPromise) {
    connectPromise = connectOnce().finally(() => {
      connectPromise = null;
    });
  }
  await connectPromise;
}

module.exports = ensureDbConnected;
