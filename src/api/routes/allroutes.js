const express = require("express");

const {
  loginUser
} = require("../controllers/auth");

const {
    createRecipes,
    deleteRecipes,
    getAllRecipesForFree,
    getStepsOverview,
    getDetailsSteps,
    getSingleSteps
} = require("../controllers/recipes");

const { isLoggedIn, isAdmin, isFree, isPremium } = require("../middleware/user");
const router = express.Router();


router.route("/login").post(loginUser); // login user

router.route("/recipe").post(isLoggedIn, isAdmin, createRecipes); // create recipes
router.route("/recipe/:recipe_id").delete(isLoggedIn, isAdmin, deleteRecipes); // delete recipes

router.route("/recipe").get(isLoggedIn, getAllRecipesForFree); // Get All free recipes
router.route("/recipe/:recipe_id").get(isLoggedIn, getStepsOverview); // Get step overview by recipes id
router.route("/recipe/:recipe_id/all").get(isLoggedIn, getDetailsSteps); // Get details stpes
router.route("/recipe/:recipe_id/:step_id").get(isLoggedIn, getSingleSteps); // Get details stpes

module.exports = router;