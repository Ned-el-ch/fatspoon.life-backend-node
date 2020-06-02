const Order = require("../models/order")

exports.addOrder = (request, response, next) => {
	Order
		.create({
			user: request.userData.userId,
			recipe: request.body.recipe,
			multiplier: request.body.multiplier,
			address: request.body.address,
			plannedDate: new Date(request.body.plannedDate),
			completed: false
		})
		.then(Order => {
			response.status(201).json({
				Order
			})
		})
		.catch(error => {
			response.status(500).json({
				error
			})
		})
}

exports.updateOrder = (request, response, next) => {
	let newOrder = new Order({
		_id: request.params.id,
		recipe: request.body.recipe,
		user: request.userData.userId,
		multiplier: request.body.multiplier,
		plannedDate: request.body.plannedDate,
		completed: request.body.completed,
		address: request.body.address
	})
	Order
		.updateOne({
			_id: request.params.id
		}, newOrder)
		.then(result => {
			if (result.nModified > 0) {
				response.status(200).json({
					Order: newOrder
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

exports.deleteOrder = (request, response, next) => {
	Order
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