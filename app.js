const path = require("path");
const express = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
// const postsRoutes = require("./routes/posts")
const usersRoutes = require("./routes/users")
const recipesRoutes = require("./routes/recipes")
const ingredientsRoutes = require("./routes/ingredients")
const userIngredientsRoutes = require("./routes/userIngredients")
const recipeMealsRoutes = require("./routes/recipeMeals")
const recipeStarsRoutes = require("./routes/recipeStars")

// mongoose.connect(`mongodb+srv://niki:${process.env.MONGO_ATLAS_PW}@cluster0-mcu8b.mongodb.net/test?retryWrites=true&w=majority`, {
mongoose.connect(`mongodb://heroku_8zf5qrjz:na9uhgqn6m1h6vh7ook4m0o58n@ds029106.mlab.com:29106/heroku_8zf5qrjz`, {
		useNewUrlParser: true
	})
	.then(() => console.log("Connected to DB"))
	.catch(() => console.log("Couldn't connect to DB"))
//1k4Ie4aczcC7HZlC
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
app.use("/api/recipes", recipesRoutes)
app.use("/api/ingredients", ingredientsRoutes)
app.use("/api/recipeMeals", recipeMealsRoutes)
app.use("/api/recipeStars", recipeStarsRoutes)
app.use("/api/userIngredients", userIngredientsRoutes)

module.exports = app;