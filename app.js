const express = require("express");
const app = express();

require("./startup/middleware")(app);
require("./startup/condition")(app);
require("./startup/routes.js")(app);

app.use(function(req, res, next) {
  res.render("error404");
});

module.exports = app;
