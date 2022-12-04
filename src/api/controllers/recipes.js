const BigPromise = require("../middleware/BigPromise");
const { isValidSteps, isValidIngredients } = require("../services/validation")
const Recipes = require("../models/recipes");
const Ingredients = require("../models/ingredients");
const Steps = require("../models/steps");

exports.createRecipes = BigPromise((req, res, next) => {
    const { name, category, ingredients, steps } = req.body;

    if(!name || !category || !ingredients || !steps){
        return next(new Error("all fields are mendatory."));
    }

    if(!isValidIngredients(ingredients)){
        return next(new Error("invalid ingredients data."));
    }

    if(!isValidSteps(steps)){
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
            return next(new Error(err.message || "Some error occurred while creating the Recipes."));

            Ingredients.craeteMulti(ingredients, recipesData.data.Id, (err, ingredientsData) =>{
                if (err)
                    return next(new Error(err.message || "Some error occurred while creating the ingredients."));

                if(ingredientsData.status === true){
                    Steps.craeteMulti(steps, recipesData.data.Id, (err, stepsData) =>{
                        if (err)
                            return next(new Error(err.message || "Some error occurred while creating the steps."));
        
                        if(stepsData.status === true){
                            return res.status(200).json({
                                success: true,
                                message: "Successfully created the recipes"
                            });
                        }
                    });
                }
            });
    });
})