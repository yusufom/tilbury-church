const mongoose = require("mongoose");
const debug = require("debug")("app:DB");

let MongoURI;

module.exports = app => {
  
  MongoURI = process.env.DB_String;

  mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  let db = mongoose.connection;

  db.on("open", () => {
    debug("MongoDb Connected Successfully");
  });

  db.on("error", () => {
    debug("MongoDb Connection Error");
  });
};
