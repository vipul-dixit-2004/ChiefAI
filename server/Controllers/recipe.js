const { mongoose } = require("mongoose");
const chief = require("../chief.js");
const { Recipe } = require("../models/recipe.js");
const User = require("../models/user.js");

// Controller
const recipes = async (req, res) => {
  try {
    const { _id, devices = [], ingredients = [], allergies = [], issues = [] } = req.body;

    // Validate user
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      gender = "unisex",
      intolerances = [],
      dietary_preference = "vegetarian",
      allergies: storedAllergies = []
    } = user;

    // Merge stored allergies with user-provided allergies, avoiding duplicates
    const allAllergies = [...new Set([...storedAllergies, ...allergies])];

    // Call AI model
    const recipeData = await chief.cook(
      devices,
      ingredients,
      allAllergies,
      issues,
      gender,
      intolerances,
      dietary_preference
    );

    if (recipeData) {
      res.status(200).json(recipeData);
    } else {
      res.status(500).json({ error: "Failed to generate recipes from the AI model." });
    }
  } catch (error) {
    console.error("Error generating recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const saveRecipe = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { _id, recipe } = req.body;
    console.log(req.body);

    // Find the user first (inside the transaction)
    const user = await User.findById(_id).session(session);
    if (!user) throw new Error("User not found");

    // Create the recipe but don't save it yet
    const savedRecipe = await Recipe.create(
      [{
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        name: recipe.name,
        tip: recipe.tip,
        type: recipe.type,
        generatedBy: _id
      }],
      { session }
    );

    // Link recipe to user
    user.recipes.push(savedRecipe[0]._id);
    await user.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Recipe Saved" });

  } catch (e) {
    // Rollback on error
    await session.abortTransaction();
    session.endSession();
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
const myRecipes = async (req, res) => {
  const { _id } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the user
    const user = await User.findById(_id).session(session);
    if (!user) {
      throw new Error("User not found");
    }

    // Fetch recipes using IDs stored in user.recipes
    const myRecipes = await Recipe.find({
      _id: { $in: user.recipes },
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      recipes: myRecipes,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  recipes,
  saveRecipe,
  myRecipes
};