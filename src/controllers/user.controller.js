const _ = require("lodash");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const { userService } = require("../services");

const getUsers = catchAsync(async (req, res) => {
  const user = await User.find();
  res.send(user);
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.send(user);
});

module.exports = {
  createUser,
  getUsers,
};
