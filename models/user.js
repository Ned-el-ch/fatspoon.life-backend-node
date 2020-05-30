const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	userIngredients: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "UserIngredient"
	}],
	recipes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Recipe"
	}],
	recipeStars: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "RecipeStar"
	}],
	recipeMeals: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "RecipeMeal"
	}],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);