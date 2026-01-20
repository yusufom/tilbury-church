const app = require("..");
const user = require("../routes/user");
const admin = require("../routes/admin");
const website = require('../routes/website');

module.exports = app => {
  app.use("/", website);
  app.use("/", user);
  app.use("/admin", admin);
};
