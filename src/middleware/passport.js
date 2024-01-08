const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../models");

const verifyCallback = async (username, password, done) => {
  try {
    let user = await User.findOne({ username });
    if (!user) {
      return done(null, false);
    }
    const isValid = await user.isPasswordMatch(password);
    if (isValid) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    if (user) done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = { strategy };
