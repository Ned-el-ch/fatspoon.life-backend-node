const User = require("../models/user");
const Recipe = require("../models/recipe");
const RecipeIngredient = require("../models/recipeIngredient");

exports.addRecipe = (request, response, next) => {
	User.findById(request.userData.userId)
		.then(user => {
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
						// console.log(recipe)
						response.status(201).json({
							recipe
						})
					})
					.catch(error => {
						// console.log(error)
						response.status(500).json({
							error
						})
					})
			})
		})
}

exports.getRecipe = (request, response, next) => {
	Recipe
		.findById(request.params.id)
		.then(recipe => {
			if (recipe) {
				response.status(200).json({
					recipe
				})
			} else {
				response.status(404).json({
					error: "Recipe not found with that ID."
				})
			}
		})
		.catch(error => {
			response.status(500).json({
				error
			})
		})
}

exports.updateRecipe = (request, response, next) => {
	let newRecipe = new Recipe({
		_id: request.params.id,
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
}

exports.deleteRecipe = (request, response, next) => {
	Recipe
		.deleteOne({
			_id: request.params.id
		})
		.then(result => {
			if (result.deletedCount > 0) {
				response.status(200).json({
					success: "Deleted successfully."
				})
			} else {
				response.status(500).json({
					error: "Not deleted."
				})
			}
		})
		.catch(error => {
			response.status(500).json({
				error
			})
		})
}

exports.searchRecipes = (request, response, next) => {

}