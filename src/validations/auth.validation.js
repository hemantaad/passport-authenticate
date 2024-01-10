const Joi = require("joi");
const { USERROLE } = require("../config/enums");

const register = {
  body: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string(),
    role: Joi.string()
      .valid(...USERROLE.ENUM)
      .default("user"),
  }),
};

const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const refreshToken = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = { login, register, refreshToken };
