const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	category: {
		type: String,
		required: true,
	},
	uuid: {
		type: String,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Ingredient", ingredientSchema)