const express = require("express");
const validate = require("../middleware/validate");
const { userValidation } = require("../validations");
const { userController } = require("../controllers");

const router = express.Router();

router
  .route("/register")
  .get(userController.registerUser)
  .post(validate(userValidation.createUser), userController.createUser);

module.exports = router;
