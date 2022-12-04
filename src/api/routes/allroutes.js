const express = require("express");

const {
  loginUser
} = require("../controllers/auth");

const {
    createRecipes
} = require("../controllers/recipes");

const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/login").post(loginUser); // login user


router.route("/login").post(loginUser); // login user

module.exports = router;