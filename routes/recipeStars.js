const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

const RecipeStarsController = require("../controllers/recipeStars")

router.post("/", checkAuth, RecipeStarsController.starRecipe)
router.delete("/:id", checkAuth, RecipeStarsController.unstarRecipe)

module.exports = router;