const BigPromise = require("./BigPromise");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");
  console.log("req.cookies.token: ", req.cookies.token);
  console.log("token: ", token);
  if (!token) {
    return next(new Error("Login First to access the page"));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded: ", decoded)
  // req.user = await User.findById(decoded.id);

  next();
});