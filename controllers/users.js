const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (request, response, next) => {
	bcrypt.hash(request.body.password, 10).then((hash) => {
		const user = new User({
			username: request.body.username,
			password: hash,
		});
		user
			.save()
			.then((result) => {
				response.status(201).json({
					message: "User created",
					result,
				});
			})
			.catch(() => {
				response.status(500).json({
					message: "Invalid auth credentials."
				});
			});
	});
}

exports.loginUser = (request, response, next) => {
	let fetchedUser;
	User.findOne({
			username: request.body.username,
		})
		.then((user) => {
			if (!user) {
				return response.status(401).json({
					message: "Auth Failed",
				});
			}
			fetchedUser = user;
			return bcrypt.compare(request.body.password, user.password);
		})
		.then((res) => {
			if (!res) {
				return response.status(401).json({
					message: "Invalid auth credentials."
				});
			}
			const token = jwt.sign({
					username: fetchedUser.username,
					userId: fetchedUser._id
				},
				process.env.JWT_KEY, {
					expiresIn: 3600
				}
			);
			response.status(200).json({
				token,
				expiresIn: 3600,
				userId: fetchedUser._id
			});
		})
		.catch((error) => {
			response.status(401).json({
				message: "Invalid auth credentials.",
				error,
			});
		});
}

exports.allUsers = (request, response, next) => {
	response.status(200).json({message: "This route works"})
}