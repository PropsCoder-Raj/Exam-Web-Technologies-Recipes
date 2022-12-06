require("dotenv").config();
const BigPromise = require("./BigPromise");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return next(new Error("Login First to access the page"));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.id;
  next();
});


exports.isAdmin = BigPromise(async (req, res, next) => {
  // Save Cards in the database
  User.getUserUsingId(req.userId, async(err, userdata) => {
    if (err)
      return next(new Error(err.message || "Some error occurred while getting the user."));
    else
      if (userdata.length == 0) {
        return next(new Error("User not found"));
      }

    if (userdata[0].UserType != "admin") {
      return next(new Error("Only admin are allowed to this APIs"));
    }

    next();
  });
});

exports.isFree = BigPromise(async (req, res, next) => {
  // Save Cards in the database
  User.getUserUsingId(req.userId, async(err, userdata) => {
    if (err)
      return next(new Error(err.message || "Some error occurred while getting the user."));
    else
      if (userdata.length == 0) {
        return next(new Error("User not found"));
      }

    if (userdata[0].UserType != "free") {
      return next(new Error("Only admin are allowed to this APIs"));
    }

    next();
  });
});

exports.isPremium = BigPromise(async (req, res, next) => {
  // Save Cards in the database
  User.getUserUsingId(req.userId, async(err, userdata) => {
    if (err)
      return next(new Error(err.message || "Some error occurred while getting the user."));
    else
      if (userdata.length == 0) {
        return next(new Error("User not found"));
      }

    if (userdata[0].UserType != "premium") {
      return next(new Error("Only admin are allowed to this APIs"));
    }

    next();
  });
});