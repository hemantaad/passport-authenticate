const express = require("express");

const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const meRoute = require("./me.route");

const router = express.Router();

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/me", meRoute);

module.exports = router;
