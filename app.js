const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");


require("./startup/middleware")(app);
require("./startup/condition")(app);
require("./startup/routes.js")(app);

app.use(function(req, res, next) {
  res.render("error404");
});
app.use(compression());
app.use(helmet());

module.exports = app;
