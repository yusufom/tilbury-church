const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("express-flash");
const cookieSession = require('cookie-session');
const cors = require('cors');


module.exports = app => {
  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "../public")));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  require("../auth/passport")(passport);

  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'fallback-secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  }));
  app.use(cors())
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
};
