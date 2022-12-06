const express = require("express");

const {
  loginUser
} = require("../controllers/auth");

const {
    createRecipes,
    deleteRecipes,
    getAllRecipesForFree,
    getStepsOverview,
    getDetailsSteps
} = require("../controllers/recipes");

const { isLoggedIn, isAdmin, isFree } = require("../middleware/user");
const router = express.Router();


router.route("/login").post(loginUser); // login user

router.route("/recipe").post(isLoggedIn, isAdmin, createRecipes); // create recipes
router.route("/recipe/:recipe_id").delete(isLoggedIn, isAdmin, deleteRecipes); // create recipes

router.route("/recipe").get(isLoggedIn, isFree, getAllRecipesForFree); // create recipes
router.route("/recipe/:recipe_id").get(isLoggedIn, isFree, getStepsOverview); // create recipes
router.route("/recipe/:recipe_id/all").get(isLoggedIn, isFree, getDetailsSteps); // create recipes

module.exports = router;