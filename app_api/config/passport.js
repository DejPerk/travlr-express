// app_api/config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      try {
        // find user by email
        const user = await User.findOne({ email: username });
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        // check password using your userSchema.methods.validPassword
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        // success, send user back
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
