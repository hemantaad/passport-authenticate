const Joi = require("joi");
const { USERROLE } = require("../config/enums");

const createUser = {
  body: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string(),
    role: Joi.string()
      .valid(...USERROLE.ENUM)
      .default("user"),
    creationDate: Joi.date(),
  }),
};

module.exports = { createUser };
