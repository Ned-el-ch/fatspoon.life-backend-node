const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	userIngredients: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "UserIngredient"
	}],
	recipes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Recipe"
	}],
	orders: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Order"
	}],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);