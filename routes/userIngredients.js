const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

const UserIngredientsController = require("../controllers/userIngredients")

router.post("/", checkAuth, UserIngredientsController.addIngredient);
router.put("/:id", checkAuth, UserIngredientsController.updateIngredient);
router.delete("/:id", checkAuth, UserIngredientsController.deleteIngredient);

module.exports = router;