const Joi = require("joi");

const verifyEmail = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

module.exports = { verifyEmail };
