const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

const UsersController = require("../controllers/users")

router.post("/signup", UsersController.createUser);
router.get("/profile", checkAuth, UsersController.userProfile);
router.post("/login", UsersController.loginUser);

module.exports = router;