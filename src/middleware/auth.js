const passport = require("passport");

const auth = () => async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .send(
          "Authentication failed. Please check your credentials and try again."
        )
        .end();
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
