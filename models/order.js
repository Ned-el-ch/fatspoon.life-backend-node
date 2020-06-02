const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
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
	address: {
		type: String,
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

module.exports = mongoose.model("Order", orderSchema);