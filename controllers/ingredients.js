const Ingredient = require("../models/ingredient");

exports.allIngredients = (request, response, next) => {
	let ingredients;
	Ingredient
		.find()
		.then(ingredients => {
			response.status(200).json({
				ingredients
			})
		})
		.catch(error => {
			response.status(404).json({
				message: "Couldn't find ingredients",
				error
			})
		})
}

exports.addIngredients = (request, response, next) => {
	// Ingredient
	// 	.find()
	// 	.then(ingredients => {
	// 		request.bod
	// 	})
	// FIND ALL INGREDIENTS
	// FILTER THE REQUEST TO ONLY HAVE INGREDIENTS THAT DON'T ALREADY EXIST
	// CREATE NEW INGREDIENTS
	// RETURN EITHER 
}