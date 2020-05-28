const mongoose = require("mongoose");

const recipeIngredientSchema = mongoose.Schema({
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Recipe",
		required: true
	},
	ingredient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Ingredient",
		required: true
	},
	weight: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model("RecipeIngredient", recipeIngredientSchema);