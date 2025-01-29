const app = require("../server");
const user = require("../routes/user");
const admin = require("../routes/admin");
const website = require('../routes/website');
const staff = require('../routes/presken');
const PreskenId = require('../routes/preskenid')

module.exports = app => {
  app.use("/", website);
  // app.use("/", user);
  // app.use("/admin", admin);
  // app.use("/staff", staff);
  // app.use("/idcard", PreskenId);
};
