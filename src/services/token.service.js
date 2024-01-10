const config = require("config");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const jwtSecret = config.get("jwt");
const jwtAccessExpirationMinutes = config.get("jwtAccessExpirationMinutes");
const jwtRefreshExpirationDays = config.get("jwtRefreshExpirationDays");
const { Token } = require("../models");

const saveToken = async (token, userId, expires, type) => {
  let tokenDoc = new Token({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
  });
  tokenDoc = await tokenDoc.save();
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, jwtSecret);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
  });

  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

const generateToken = (userId, expires) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, jwtSecret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    jwtAccessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(user.id, accessTokenExpires);

  const refreshTokenExpires = moment().add(jwtRefreshExpirationDays, "days");
  const refreshToken = generateToken(user.id, refreshTokenExpires);
  await saveToken(refreshToken, user.id, refreshTokenExpires, "refresh");

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateToken,
  verifyToken,
  generateAuthTokens,
};
