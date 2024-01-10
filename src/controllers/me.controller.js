const catchAsync = require("../utils/catchAsync");
const { authService } = require("../services");

const verifyEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  await authService.verifyEmail(email);
  res.status(200).json({ message: "Email verified" });
});

module.exports = {
  verifyEmail,
};
