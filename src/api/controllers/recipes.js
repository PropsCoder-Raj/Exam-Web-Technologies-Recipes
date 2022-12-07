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

exports.updateRecipes = BigPromise((req, res, next) => {
  
  const { recipe_id } = req.params;
  const { name, category, ingredients, steps } = req.body;

  if (!recipe_id) {
    return next(new Error("Please provide the recipe id."));
  }

  if (ingredients && !isValidIngredients(ingredients)) {
    return next(new Error("invalid ingredients data."));
  }

  if (steps && !isValidSteps(steps)) {
    return next(new Error("invalid steps data."));
  }

  Recipes.findByIdAndUpdate(recipe_id, name, category, (err, result) => {
    if (err) return next(new Error(err.message || "Some error occurred while update the Recipes."));

    Ingredients.findByRecipesIdTypeAndUpdate(recipe_id, ingredients, (err, resultIngredients) => {
      if (err) return next(new Error(err.message || "Some error occurred while update the ingredients."));
      
      Steps.findByRecipesIdTypeAndUpdate(recipe_id, steps, (err, resultSteps) => {
        if (err) return next(new Error(err.message || "Some error occurred while update the steps."));
    
        res.status(200).send(result)
      })

    })
  })
});

exports.replaceRecipes = BigPromise((req, res, next) => {
  
  const { recipe_id } = req.params;
  const { name, category, ingredients, steps } = req.body;

  if (!name || !category || !ingredients || !steps) {
    return next(new Error("all fields are mendatory."));
  }

  if (!recipe_id) {
    return next(new Error("Please provide the recipe id."));
  }

  if (ingredients && !isValidIngredients(ingredients)) {
    return next(new Error("invalid ingredients data."));
  }

  if (steps && !isValidSteps(steps)) {
    return next(new Error("invalid steps data."));
  }

  Recipes.findByIdAndUpdate(recipe_id, name, category, (err, result) => {
    if (err) return next(new Error(err.message || "Some error occurred while update the Recipes."));

    Ingredients.findByRecipesIdTypeAndUpdate(recipe_id, ingredients, (err, resultIngredients) => {
      if (err) return next(new Error(err.message || "Some error occurred while update the ingredients."));
      
      Steps.findByRecipesIdTypeAndUpdate(recipe_id, steps, (err, resultSteps) => {
        if (err) return next(new Error(err.message || "Some error occurred while update the steps."));
    
        result.message = "Replace recipes with recipes id "+recipe_id;
        res.status(200).send(result)
      })

    })
  })
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
          if (err) return next(new Error(err.message || "Some error occurred while deleteing the Steps."));

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
        data: resultRecipe.data
      });
    }
  });
})

exports.getStepsOverview = BigPromise((req, res, next) => {
  const { recipe_id } = req.params;

  if (!recipe_id) {
    return next(new Error("Please provide the recipe id."));
  }

  Recipes.findById(recipe_id, (err, resultRecipe) => {
    if (err) return next(new Error(err.message || "Recipe not found."));

    Ingredients.findByRecipesId(recipe_id, (err, resultIngredients) => {
      if (err) return next(new Error(err.message || "Some error occurred while getting the Ingredients."));

      Steps.findByRecipesId(recipe_id, (err, resultSteps) => {
        if (err) return next(new Error(err.message || "Some error occurred while getting the Ingredients."));

        if (resultSteps.status === true) {
          return res.status(200).json({
            success: true,
            message: "Successfully Get steps overview the recipes with id " + recipe_id,
            data: {
              name: resultRecipe.data[0].Name,
              ingredients: resultIngredients.data,
              step_count: resultSteps.data.length
            }
          });
        }
      });
    });
  });
})

exports.getDetailsSteps = BigPromise((req, res, next) => {
  const { recipe_id } = req.params;

  if (!recipe_id) {
    return next(new Error("Please provide the recipe id."));
  }

  Recipes.findById(recipe_id, (err, resultRecipe) => {
    if (err) return next(new Error(err.message || "Recipe not found."));

    Ingredients.findByRecipesId(recipe_id, (err, resultIngredients) => {
      if (err) return next(new Error(err.message || "Some error occurred while getting the Ingredients."));

      Steps.findByRecipesId(recipe_id, (err, resultSteps) => {
        if (err) return next(new Error(err.message || "Some error occurred while getting the Ingredients."));

        if (resultSteps.status === true) {
          return res.status(200).json({
            success: true,
            message: "Successfully Get steps overview the recipes with id " + recipe_id,
            data: {
              name: resultRecipe.data[0].Name,
              ingredients: resultIngredients.data,
              steps: resultSteps.data
            }
          });
        }
      });
    });
  });
})

exports.getSingleSteps = BigPromise((req, res, next) => {
  const { recipe_id, step_id } = req.params;

  if (!recipe_id || !step_id) {
    return next(new Error("Please provide the recipe id OR step id."));
  }

  Recipes.findById(recipe_id, (err, resultRecipe) => {
    if (err) return next(new Error(err.message || "Recipe not found."));

      Steps.findByRecipesId(recipe_id, (err, resultSteps) => {
        if (err) return next(new Error(err.message || "Some error occurred while getting the Ingredients."));

        if (resultSteps.status === true) {
          var resultArr = resultSteps.data.filter((ele) => {
            return ele.Step_Id == step_id
          })
          return res.status(200).json({
            success: true,
            message: "Successfully Get single set the recipes with recipe id " + recipe_id + " and step id " + step_id,
            data: resultArr
          });
        }
      });
  });
})




exports.searchIngredient = BigPromise((req, res, next) => {
  const { ingredient } = req.params;

  if (!ingredient) {
    return next(new Error("Please provide the ingredient name."));
  }

  Ingredients.findByType( ingredient , (err, resultIngredient) => {
    if (err) return next(new Error(err.message || "Ingredient not found."));

    if (resultIngredient.status === true) {
      var resultArr = [];
      resultIngredient.data.forEach((ele) => {
        resultArr.push(`/recipe/${ele.RecipeId}`)
      })
      return res.status(200).json({
        success: true,
        message: "Successfully search by the ingredient name " + ingredient,
        search: ingredient,
        data: resultArr
      });
    }
  });
})

exports.searchIngredientsListAll = BigPromise((req, res, next) => {
  const { ingredient } = req.params;

  if (!ingredient) {
    return next(new Error("Please provide the ingredient name."));
  }

  Ingredients.findByType( ingredient , (err, resultIngredient) => {
    if (err) return next(new Error(err.message || "Ingredient not found."));

    if (resultIngredient.status === true) {
      return res.status(200).json({
        success: true,
        message: "Successfully search by the ingredient name " + ingredient,
        search: ingredient,
        data: resultIngredient.data
      });
    }
  });
})

exports.getAllRecipesForPremium = BigPromise((req, res, next) => {
  Recipes.getAllPremiumRecipes((err, resultRecipe) => {
    if (err) return next(new Error(err.message || "Recipe not found."));

    if (resultRecipe.status === true) {
      return res.status(200).json({
        success: true,
        message: "Successfully get the premium recipes",
        data: resultRecipe.data
      });
    }
  });
})