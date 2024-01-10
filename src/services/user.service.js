const _ = require("lodash");
const { User } = require("../models");

const createUser = async (userBody) => {
  const data = userBody;
  const user = new User(
    _.pick(data, ["username", "email", "password", "name", "role"])
  );
  await user.save();
  return user;
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getUserById = async (id) => {
  return User.findOne({ _id: id });
};

module.exports = { getUserByEmail, createUser, getUserById };
