const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

const RecipeMealsController = require("../controllers/recipeMeals")

router.post("/", checkAuth, RecipeMealsController.addMeal)
router.put("/:id", checkAuth, RecipeMealsController.updateMeal)
router.delete("/:id", checkAuth, RecipeMealsController.deleteMeal)

module.exports = router;