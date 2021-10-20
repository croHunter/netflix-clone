const { sign } = require("jsonwebtoken");

// Create tokens
// ----------------------------------
const createAccessToken = (user) => {
  return sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "15m",
    }
  );
};

const createRefreshToken = (user) => {
  return sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

// Send tokens
// ----------------------------------
const sendAccessToken = (res, user, accessToken) => {
  const { refreshToken, password, ...info } = user._doc;
  console.log(accessToken);
  res.status(200).json({ ...info, accessToken });
};

const sendRefreshToken = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    path: "/auth/refresh_token",
    // secure: true,
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
