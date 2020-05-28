const mongoose = require("mongoose");

const userIngredientSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	item: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Ingredient",
		required: true
	},
	weight: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model("UserIngredient", userIngredientSchema);