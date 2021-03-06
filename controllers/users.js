const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const UserIngredient = require("../models/userIngredient");
const Recipe = require("../models/recipe");
const Order = require("../models/order");
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
					success: "User created successufully",
					userData: {
						username: result.username,
						userId: result._id,
						userIngredients: result.userIngredients,
						recipes: result.recipes,
						orders: result.orders
					},
					token
				});
			})
			.catch((error) => {
				response.status(500).json({
					message: "Invalid auth credentials.",
					error
				});
			});
	});
}

exports.userProfile = (request, response, next) => {
  User
    .findOne({_id: request.userData.userId})
    .populate({
      path: "userIngredients",
      select: "weight",
      populate: {
        path: "ingredient",
        select: "name category _id"
      },
      model: UserIngredient
    })
    // .populate({
    //   path: "recipes",
    //   populate: {
    //     path: "recipeIngredients",
    //     select: "weight",
    //     populate: {
    //       path: "ingredient",
    //       select: "name category _id"
    //     }
    //   },
    //   model: Recipe
    // })
    // .populate('userIngredients')
    .exec()
		.then(user => {
			console.log(user)
			response.status(200).json({
				success: "Profile fetched successfully",
				userData: {
					userIngredients: user.userIngredients,
					recipes: user.recipes,
					orders: user.orders,
					username: user.username,
					_id: user._id
				}
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
				select: "name category _id"
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
					select: "name uuid _id"
				}
			},
			model: Recipe
		})
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
							success: "Logged in successfully",
							userData: {
								userIngredients: userData.userIngredients,
								recipes: userData.recipes,
								orders: userData.orders,
								username: userData.username,
								_id: userData._id
							}
						})
					} else {
						response.status(404).json({
							error: "Auth failed"
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