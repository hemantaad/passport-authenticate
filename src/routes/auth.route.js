const express = require("express");
const validate = require("../middleware/validate");
const { authValidation } = require("../validations");
const { authController } = require("../controllers");

const router = express.Router();

router
  .route("/register")
  .post(validate(authValidation.register), authController.register);
router
  .route("/login")
  .post(validate(authValidation.login), authController.login);
router
  .route("/refresh-token")
  .post(validate(authValidation.refreshToken), authController.refreshToken);

module.exports = router;
