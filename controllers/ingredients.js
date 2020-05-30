const Ingredient = require("../models/ingredient");

exports.allIngredients = (request, response, next) => {
	let ingredients;
	Ingredient.find()
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