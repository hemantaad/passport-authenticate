const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send(message);
};

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, err.stack);
  }
  next(error);
};

module.exports = { errorHandler, errorConverter };
