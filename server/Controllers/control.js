const chief = require("../chief.js");

const recipes = async (req, res) => {
  const { devices, ingredients, allergies, issues } = req.body;
  const recipeData = await chief.cook(devices, ingredients, allergies, issues);
  if (recipeData) {
    res.status(200).json(recipeData);
  } else {
    res.status(500).json({ error: "Failed to generate recipes from the AI model." });
  }
};

module.exports = {
  recipes,
};