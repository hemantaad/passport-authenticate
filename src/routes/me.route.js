const express = require("express");
const validate = require("../middleware/validate");
const { meValidation } = require("../validations");
const { meController } = require("../controllers");

const router = express.Router();

router
  .route("/verify-email")
  .post(validate(meValidation.verifyEmail), meController.verifyEmail);

module.exports = router;
