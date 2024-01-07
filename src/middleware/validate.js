const validate = (schema) => (req, res, next) => {
  const { error } = schema.body.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  return next();
};

module.exports = validate;
