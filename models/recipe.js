const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
	uuid: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	cookingTime: {
		type: Number,
		required: true,
	},
	prepTime: {
		type: Number,
		required: true,
	},
	imageLink: {
		type: String,
		required: true,
	},
	instructions: {
		type: String,
		required: true,
	},
	servingCount: {
		type: Number,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	recipeIngredients: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "RecipeIngredient"
	}]
})

module.exports = mongoose.model("Recipe", recipeSchema)