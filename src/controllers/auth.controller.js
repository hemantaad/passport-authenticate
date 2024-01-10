const catchAsync = require("../utils/catchAsync");
const { authService, tokenService, userService } = require("../services");
const { Email } = require("../services/email.service");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  await new Email(user.email).sendVerificationEmail();
  res.send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const refreshToken = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send(tokens);
});

module.exports = {
  login,
  register,
  refreshToken,
};
