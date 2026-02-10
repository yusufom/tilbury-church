const express = require("express");
const path = require('path');
const compression = require("compression");
const helmet = require("helmet");

const ensureDbConnected = require("./startup/database");

const app = express();
require("./startup/middleware")(app);
require("./startup/condition")(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// Fail fast on DB connectivity issues in serverless environments
app.use(async (req, res, next) => {
  try {
    await ensureDbConnected();
    next();
  } catch (err) {
    res.status(503).send("Database connection unavailable");
  }
});

require("./startup/routes.js")(app);

app.use(function (req, res, next) {
  res.render("error404");
});
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: false, // or configure it properly
}));

module.exports = app;
