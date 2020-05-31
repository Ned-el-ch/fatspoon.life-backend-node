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
	plannedDate: {
		type: Date,
		required: true,
	},
	multiplier: {
		type: Number,
		required: true,
	},
	completed: {
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model("RecipeMeal", recipeMealSchema);