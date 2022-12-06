const express = require("express");

const {
  loginUser
} = require("../controllers/auth");

const {
    createRecipes,
    deleteRecipes
} = require("../controllers/recipes");

const { isLoggedIn, isAdmin } = require("../middleware/user");
const router = express.Router();


router.route("/login").post(loginUser); // login user
router.route("/recipe").post(isLoggedIn, isAdmin, createRecipes); // create recipes
router.route("/recipe/:recipe_id").delete(isLoggedIn, isAdmin, deleteRecipes); // create recipes

module.exports = router;