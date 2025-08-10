const { default: mongoose } = require("mongoose");

const recipeSchema = mongoose.Schema({
    name: String,
    description: String,
    ingredients: Array,
    instructions: Array,
    tip: String,
    type: String,
    generatedBy: String
})


const Recipe = mongoose.model("recipes", recipeSchema);

module.exports = {
    Recipe
}