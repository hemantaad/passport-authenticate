const express = require("express");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { userValidation } = require("../validations");
const { userController } = require("../controllers");

const router = express.Router();

router.route("/").get(auth(), userController.getUsers);
router
  .route("/register")
  .post(validate(userValidation.createUser), userController.createUser);

module.exports = router;
