const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require("../tokens");
const verify = require("../verifyToken");
//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    isAdmin: req.body.isAdmin,
  });
  try {
    const user = await newUser.save();
    const { refreshToken, password, ...info } = user._doc;
    res.status(201).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});
//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username");
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username");

    // 3. Create Refresh- and Accesstoken
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // 4. Store Refreshtoken with user in "db"
    // Could also use different version numbers instead.
    // Then just increase the version number on the revoke endpoint
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          refreshToken: refreshToken,
        },
      },
      { new: true }
    );

    // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, updatedUser, accessToken);
  } catch (error) {
    res.status(500).json(error);
  }
});
// 5. Get a new access token with a refresh token
router.get("/refresh_token", verify, async (req, res) => {
  const cookieRefreshToken = req.cookies.refreshToken;
  const user = await User.findOne({ _id: req.user.id });
  if (!user) return res.status(404).send("User not found");
  // user exist, check if refreshtoken exist on user
  if (user.refreshToken !== cookieRefreshToken)
    return res.status(401).send("invalid refresh token");
  // token exist, create new Refresh- and accesstoken
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  // update refreshtoken on user in db
  // Could have different versions instead!

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        refreshToken: refreshToken,
      },
    },
    { new: true }
  );
  // All good to go, send new refreshtoken and accesstoken
  sendRefreshToken(res, refreshToken);
  sendAccessToken(res, updatedUser, accessToken);
});

//  Logout a user
router.post("/logout", verify, async (req, res) => {
  res.clearCookie("refreshToken", { path: "/api/auth/refresh_token" });
  // Logic here for also remove refreshtoken from db
  await User.findByIdAndUpdate(req.user.id, {
    $set: {
      refreshToken: "",
    },
  });
  return res.send({
    message: "Logged out",
  });
});
module.exports = router;
