const express = require("express");
const path = require('path');
const compression = require("compression");
const helmet = require("helmet");
const cookieSession = require('cookie-session');
const ensureDbConnected = require("./startup/database");

const app = express();
require("./startup/middleware")(app);
require("./startup/condition")(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'fallback-secret-key'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'lax'
}));


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

app.use(function(req, res, next) {
  res.render("error404");
});
app.use(compression());
app.use(helmet());

module.exports = app;
