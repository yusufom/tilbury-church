const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = async function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (em, password, done) => {
      let email = em.toLowerCase();
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "No User with that email" });
          } else if (user.activate == false) {
            return done(null, false, {
              message: "Please kindly check your Email to activate your account"
            });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec(); // `exec()` returns a promise
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
