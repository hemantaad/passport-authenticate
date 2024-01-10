const config = require("config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../models");

const jwtOptions = {
  secretOrKey: config.get("jwt"),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jsonWebTokenOptions: {
    ignoreExpiration: false,
  },
};

const verifyCallback = async (payload, done) => {
  try {
    console.log("verifyCallback triggred.");
    let user = await User.findOne({ _id: payload.sub })
      .select({
        name: 1,
        username: 1,
        email: 1,
        role: 1,
      })
      .lean();
    user.id = user._id.toString();
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new JwtStrategy(jwtOptions, verifyCallback);

module.exports = strategy;
