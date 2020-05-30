const User = require("../models/user");
const Recipe = require("../models/recipe");
const RecipeIngredient = require("../models/recipeIngredient");

exports.addRecipe = (request, response, next) => {
	User.findById(request.userData.userId)
		.then(user => {
			// console.log(user.recipes, request.body)
			let newRecipe = new Recipe({
				user: request.userData.userId,
				title: request.body.title,
				uuid: request.body.uuid,
				description: request.body.description,
				prepTime: request.body.prepTime,
				cookingTime: request.body.cookingTime,
				imageLink: request.body.imageLink,
				instructions: request.body.instructions,
				servingCount: request.body.servingCount
			})
			let ingData = request.body.recipeIngredients.map(item => {
				return {
					recipe: newRecipe._id,
					ingredient: item._id,
					weight: item.weight
				}
			})
			RecipeIngredient.create(ingData).then(ingredients => {
				newRecipe.recipeIngredients = ingredients;
				user.recipes.push(newRecipe)
				user.save()
				newRecipe.save()
					.then(recipe => {
						console.log(recipe)
						response.status(201).json({
							recipe
						})
					})
					.catch(error => {
						console.log(error)
						response.status(500).json({
							error
						})
					})
			})
		})
}

exports.searchRecipes = (request, response, next) => {

}

exports.getRecipe = (request, response, next) => {

}

exports.updateRecipe = (request, response, next) => {

}

exports.deleteRecipe = (request, response, next) => {

}

exports.starRecipe = (request, response, next) => {

}

exports.unstarRecipe = (request, response, next) => {

}