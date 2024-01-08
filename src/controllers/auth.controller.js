const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid email or password.");
  }
  const validPassword = await user.isPasswordMatch(password);
  if (!validPassword) throw new Error("Invalid email or password.");
  res.send("Login successful");
});

module.exports = {
  login,
};
