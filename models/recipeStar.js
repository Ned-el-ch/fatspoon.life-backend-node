const mongoose = require("mongoose");

const recipeStarSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Recipe",
		required: true
	}
});

module.exports = mongoose.model("RecipeStar", recipeStarSchema);