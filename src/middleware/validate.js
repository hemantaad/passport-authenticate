const _ = require("lodash");
const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ["params", "query", "body"]);
  const object = _.pick(req, Object.keys(validSchema));
  const { error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  return next();
};

module.exports = validate;
