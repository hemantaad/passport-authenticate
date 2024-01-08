const express = require("express");
const passport = require("passport");
const validate = require("../middleware/validate");
const { authValidation } = require("../validations");

const router = express.Router();

router
  .route("/login")
  .post(
    validate(authValidation.login),
    passport.authenticate("local", { failureRedirect: "/login" })
  );

module.exports = router;
