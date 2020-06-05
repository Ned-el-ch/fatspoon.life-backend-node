const User = require("../models/user");
const UserIngredient = require("../models/userIngredient");

exports.addIngredient = (request, response, next) => {
	User.findById(request.userData.userId)
		.populate({
			path: "userIngredients",
			select: "weight",
			populate: {
				path: "ingredient",
				select: "uuid"
			},
			model: UserIngredient
		})
		.exec()
		.then(user => {
			console.log(user.userIngredients, request.body)
			let uiExists = user.userIngredients.find(e => e.ingredient._id == request.body.ingredientId)
			if (uiExists) {
				console.log("ui exists")
				response.status(500).json({
					error: "Not created. Already exists."
				})
			} else {
				console.log("create a new ui")
				let ui = new UserIngredient({
					user: request.userData.userId,
					ingredient: request.body.ingredientId,
					weight: request.body.weight
				})
				user.userIngredients.push(ui)
				user.save()
				ui.save()
					.then(userIngredient => {
						console.log(userIngredient)
						response.status(201).json({
							success: "Created.",
							userIngredient
						})
					})
					.catch(error => {
						response.status(500).json({
							message: "oof",
							error
						})
					})
			}
		})
}

exports.updateIngredient = (request, response, next) => {
	let ui = UserIngredient.findOne({
		_id: request.params.id,
		user: request.userData.userId
	})
	if (ui) {
		ui.then(userIngredient => {
			let newUserIngredient = new UserIngredient({
				_id: request.params.id,
				user: request.userData.userId,
				ingredient: request.body.ingredientId,
				weight: request.body.weight
			})

			UserIngredient.updateOne({
					_id: request.params.id
				}, newUserIngredient)
				.then(result => {
					if (result.nModified > 0) {
						response.status(200).json({
							success: "Found, modified",
							newUserIngredient
						})
					} else {
						response.status(500).json({
							error: "Found, Not modified",
							newUserIngredient
						})
					}
				})
				.catch(error => {
					response.status(500).json({
						error,
						message: "Not updated"
					})
				})
		})
	} else {
		response.status(500).json({
			error: "Not found."
		})
	}
}

exports.deleteIngredient = (request, response, next) => {
	UserIngredient
		.deleteOne({
			_id: request.params.id,
			user: request.userData.userId
		})
		.then(result => {
			console.log(result)
			if (result.deletedCount > 0) {
				response.status(200).json({
					success: "Found. Deleted successfully."
				})
			} else {
				response.status(202).json({
					error: "Found. Not Deleted."
				})
			}
		})
		.catch(error => {
			console.log(error)
			response.status(500).json({
				error: "Item not found/deleted"
			})
		})
}