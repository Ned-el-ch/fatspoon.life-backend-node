const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

const IngredientsController = require("../controllers/ingredients")

router.get("/", IngredientsController.allIngredients)

module.exports = router;