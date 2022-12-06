const BigPromise = require("../middleware/BigPromise");
const { isValidSteps, isValidIngredients } = require("../services/validation");
const Recipes = require("../models/recipes");
const Ingredients = require("../models/ingredients");
const Steps = require("../models/steps");

exports.createRecipes = BigPromise((req, res, next) => {
  const { name, category, ingredients, steps } = req.body;

  if (!name || !category || !ingredients || !steps) {
    return next(new Error("all fields are mendatory."));
  }

  if (!isValidIngredients(ingredients)) {
    return next(new Error("invalid ingredients data."));
  }

  if (!isValidSteps(steps)) {
    return next(new Error("invalid steps data."));
  }

  // Create a Recipes
  const recipes = new Recipes({
    Name: name,
    Category: category,
  });

  // Save Recipes in the database
  Recipes.create(recipes, (err, recipesData) => {
    if (err)
      return next(
        new Error(
          err.message || "Some error occurred while creating the Recipes."
        )
      );

    Ingredients.craeteMulti(
      ingredients,
      recipesData.data.Id,
      (err, ingredientsData) => {
        if (err)
          return next(
            new Error(
              err.message ||
              "Some error occurred while creating the ingredients."
            )
          );

        if (ingredientsData.status === true) {
          Steps.craeteMulti(steps, recipesData.data.Id, (err, stepsData) => {
            if (err)
              return next(
                new Error(
                  err.message || "Some error occurred while creating the steps."
                )
              );

            if (stepsData.status === true) {
              return res.status(200).json({
                success: true,
                message: "Successfully created the recipes",
              });
            }
          });
        }
      }
    );
  });
});

exports.deleteRecipes = BigPromise((req, res, next) => {
  const { recipe_id } = req.params;

  if (!recipe_id) {
    return next(new Error("Please provide the recipe id."));
  }

  Recipes.findById(recipe_id, (err, result) => {
    if (err) return next(new Error(err.message || "Recipe not found."));

    Recipes.deleteById(recipe_id, (err, resultRecipe) => {
      if (err) return next(new Error(err.message || "Recipe not found."));

      Ingredients.deleteByRecipeId(recipe_id, (err, resultIngredients) => {
        if (err) return next(new Error(err.message || "Some error occurred while deleteing the Ingredients."));

        Steps.deleteByRecipeId(recipe_id, (err, resultSteps) => {
          if (err) return next(new Error(err.message || "Some error occurred while deleteing the Ingredients."));

          if (resultSteps.status === true) {
            return res.status(200).json({
              success: true,
              message: "Successfully Deleted the recipes with id " + recipe_id,
            });
          }
        });
      });
    });
  });
});

exports.getAllRecipesForFree = BigPromise((req, res, next) => {
  Recipes.getAllFreeRecipes((err, resultRecipe) => {
    if (err) return next(new Error(err.message || "Recipe not found."));

    if (resultRecipe.status === true) {
      return res.status(200).json({
        success: true,
        message: "Successfully get the free recipes",
        data: resultRecipe
      });
    }
  });
})