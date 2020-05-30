const mongoose = require("mongoose");

const recipeMealSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Recipe",
		required: true
	},
	planned_date: {
		type: Date,
		required: true,
	},
	multiplier: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("RecipeMeal", recipeMealSchema);