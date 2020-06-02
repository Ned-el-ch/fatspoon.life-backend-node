const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth")

const OrdersController = require("../controllers/orders")

router.post("/", checkAuth, OrdersController.addOrder)
router.put("/:id", checkAuth, OrdersController.updateOrder)
router.delete("/:id", checkAuth, OrdersController.deleteOrder)

module.exports = router;