// const path = require("path");
const express = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const usersRoutes = require("./routes/users")
const recipesRoutes = require("./routes/recipes")
const ingredientsRoutes = require("./routes/ingredients")
const userIngredientsRoutes = require("./routes/userIngredients")
const ordersRoutes = require("./routes/orders")
const recipeStarsRoutes = require("./routes/recipeStars")

mongoose.connect(`mongodb://heroku_8zf5qrjz:na9uhgqn6m1h6vh7ook4m0o58n@ds029106.mlab.com:29106/heroku_8zf5qrjz`, {
		useNewUrlParser: true
	})
	.then(() => console.log("Connected to DB"))
	.catch(() => console.log("Couldn't connect to DB"))
app.use(parser.json());
app.use(parser.urlencoded({
	extended: false
}))
// app.use("/images", express.static(path.join("images")))

app.use((request, response, next) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	response.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	next();
});

app.use("/api/users", usersRoutes)
app.use("/api/orders", ordersRoutes)
app.use("/api/recipes", recipesRoutes)
app.use("/api/ingredients", ingredientsRoutes)
app.use("/api/recipeStars", recipeStarsRoutes)
app.use("/api/userIngredients", userIngredientsRoutes)

module.exports = app;