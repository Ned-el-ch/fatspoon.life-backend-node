const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

const RecipesController = require("../controllers/recipes")

router.post("/", checkAuth, RecipesController.addRecipe);
router.get("/search", RecipesController.searchRecipes)
router.get("/:id", RecipesController.getRecipe)
router.put("/:id", checkAuth, RecipesController.updateRecipe);
router.delete("/:id", checkAuth, RecipesController.deleteRecipe);