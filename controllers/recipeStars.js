const RecipeStar = require("../models/recipeStar")

exports.starRecipe = (request, response, next) => {
	RecipeStar
		.findOne({
			user: request.userData.userId,
			recipe: request.body.recipe
		}).then(result => {
			if (result) {
				response.status(500).json({
					error: "Already starred"
				})
			} else {
				RecipeStar
					.create({
						user: request.userData.userId,
						recipe: request.params.id
					})
					.then(recipeStar => {
						response.status(201).json({
							recipeStar
						})
					})
					.catch(error => {
						response.status(500).json({
							error
						})
					})
			}
		})
		.catch(error => {
			response.status(500).json({
				error,
				message: "Something went wrong"
			})
		})
}

exports.unstarRecipe = (request, response, next) => {
	RecipeStar
		.deleteOne({
			_id: request.params.id
		})
		.then(result => {
			if (result.deletedCount > 0) {
				response.status(200).json({
					success: "Found. Deleted successfully."
				})
			} else {
				response.status(500).json({
					error: "Not Found or Not Deleted."
				})
			}
		})
		.catch(error => {
			response.status(500).json({
				error
			})
		})
}