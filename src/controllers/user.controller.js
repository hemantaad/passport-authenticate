const _ = require("lodash");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");

const getUsers = catchAsync(async (req, res) => {
  const user = await User.find();
  res.send(user);
});

const createUser = catchAsync(async (req, res) => {
  const data = req.body;
  let user = await User.findOne({ email: data.email });
  if (user) {
    throw new Error("The email is already registered.");
  }
  user = new User(
    _.pick(data, ["username", "email", "password", "name", "role"])
  );
  await user.save();
  res.send(user);
});

module.exports = {
  createUser,
  getUsers,
};
