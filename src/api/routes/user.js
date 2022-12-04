const express = require("express");
const {
  loginUser
} = require("../controllers/auth");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/login").post(loginUser);

module.exports = router;