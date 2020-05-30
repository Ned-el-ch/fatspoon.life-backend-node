const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const UserIngredient = require("../models/userIngredient");
const Recipe = require("../models/recipe");
const RecipeIngredient = require("../models/recipeIngredient");
const RecipeMeal = require("../models/recipeMeal");
const RecipeStar = require("../models/recipeStar");

exports.createUser = (request, response, next) => {
	console.log(request.body)
	bcrypt.hash(request.body.password, 10).then((hash) => {
		const user = new User({
			username: request.body.username,
			password: hash,
		});
		console.log(user)
		user
			.save()
			.then((result) => {
				console.log(result)
				const token = jwt.sign({
						username: user.username,
						userId: user._id
					},
					process.env.JWT_KEY, {
						expiresIn: 86400
					})
				response.status(201).json({
					message: "User created successufully",
					userData: {
						username: result.username,
						userId: result._id,
						userIngredients: result.userIngredients,
						recipes: result.recipes,
						recipeMeals: result.recipeMeals,
						recipeStars: result.recipeStars
					},
					token
				});
			})
			.catch((error) => {
				console.log(error)
				response.status(500).json({
					message: "Invalid auth credentials."
				});
			});
	});
}

exports.userProfile = (request, response, next) => {
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
		// .populate({
		// 	path: "recipes",
		// 	populate: {
		// 		path: "recipeIngredients",
		// 		select: "weight",
		// 		populate: {
		// 			path: "ingredient",
		// 			select: "uuid"
		// 		}
		// 	},
		// 	model: Recipe
		// })
		.exec()
		.then(userData => {
			console.log(userData)
			response.status(200).json({
				userIngredients: userData.userIngredients,
				recipes: userData.recipes,
				recipeStars: userData.recipeStars,
				recipeMeals: userData.recipeMeals,
				username: userData.username,
				_id: userData._id
			})
		})
		.catch(error => {
			console.log(error)
			response.status(404).json({
				error,
				message: "Couldn't fetch profile"
			})
		})
}

exports.loginUser = (request, response, next) => {
	User.findOne({
			username: request.body.username,
		})
		.populate({
			path: "userIngredients",
			select: "weight",
			populate: {
				path: "ingredient",
				select: "uuid"
			},
			model: UserIngredient
		})
		.populate({
			path: "recipes",
			populate: {
				path: "recipeIngredients",
				select: "weight",
				populate: {
					path: "ingredient",
					select: "uuid"
				}
			},
			model: Recipe
		})
		// .populate("recipes", Recipe)
		// .populate("recipeMeals", "multiplier recipe", RecipeMeal)
		// .populate("recipeStars", "recipe", RecipeStar)
		.exec()
		.then(userData => {
			console.log(userData)
			bcrypt.compare(request.body.password, userData.password)
				.then(result => {
					if (result) {
						const token = jwt.sign({
								username: userData.username,
								userId: userData._id
							},
							process.env.JWT_KEY, {
								expiresIn: 86400
							}
						);
						response.status(200).json({
							token,
							userIngredients: userData.userIngredients,
							recipes: userData.recipes,
							recipeStars: userData.recipeStars,
							recipeMeals: userData.recipeMeals,
							username: userData.username,
							_id: userData._id
						})
					} else {
						response.status(404).json({
							message: "Auth failed"
						})
					}
				})
		})
		.catch(error => {
			console.log(error)
			response.status(404).json({
				error,
				message: "Something went wrong"
			})
		})
}

exports.allUsers = (request, response, next) => {
	response.status(200).json({
		message: "This route works"
	})
}



exports.addRecipe = (request, response, next) => {

}