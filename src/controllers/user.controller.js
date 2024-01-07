const path = require("path");
const catchAsync = require("../utils/catchAsync");

const createUser = catchAsync(async (req, res) => {
  console.log("jdahdjas");
  res.send("User created successfully.");
});

const registerUser = catchAsync(async (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/register.html"));
});

module.exports = {
  createUser,
  registerUser,
};
