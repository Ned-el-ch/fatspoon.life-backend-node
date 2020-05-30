const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

const RecipeMealsController = require("../controllers/recipeMeals")

router.post("/:id", checkAuth, RecipeMealsController.addMeal)
router.delete("/:id", checkAuth, RecipeMealsController.deleteMeal)

module.exports = router;