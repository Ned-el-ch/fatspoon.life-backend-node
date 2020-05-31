const RecipeMeal = require("../models/recipeMeal")

exports.addMeal = (request, response, next) => {
	RecipeMeal
		.create({
			user: request.userData.userId,
			recipe: request.body.recipe,
			multiplier: request.body.multiplier,
			plannedDate: new Date(request.body.plannedDate),
			completed: false
		})
		.then(recipeMeal => {
			response.status(201).json({
				recipeMeal
			})
		})
		.catch(error => {
			response.status(500).json({
				error
			})
		})
}

exports.updateMeal = (request, response, next) => {
	let newRecipeMeal = new RecipeMeal({
		_id: request.params.id,
		recipe: request.body.recipe,
		user: request.userData.userId,
		multiplier: request.body.multiplier,
		plannedDate: request.body.plannedDate,
		completed: request.body.completed,
	})
	RecipeMeal
		.updateOne({
			_id: request.params.id
		}, newRecipeMeal)
		.then(result => {
			if (result.nModified > 0) {
				response.status(200).json({
					recipeMeal: newRecipeMeal
				})
			} else {
				response.status(500).json({
					error: "Not modified"
				})
			}
		})
		.catch(error => {
			response.status(500).json({
				error
			})
		})
}

exports.deleteMeal = (request, response, next) => {
	RecipeMeal
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
					error: "Not found/deleted."
				})
			}
		})
		.catch(error => {
			response.status(500).json({
				error
			})
		})
}