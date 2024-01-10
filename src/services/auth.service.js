const userService = require("./user.service");
const tokenService = require("./token.service");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      "refresh"
    );

    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.deleteOne();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please Authenticate.");
  }
};

const verifyEmail = async (email) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new Error();
    }
    if (user.email !== email) {
      throw new Error("Verification failed.");
    }
    Object.assign(user, { isEmailVerified: true });
    user.save();
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error);
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  refreshAuth,
  verifyEmail,
};
