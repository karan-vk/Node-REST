const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const OrdersController = require("../Controllers/orders");

router.get("/", checkAuth, OrdersController.orders_get_all);
router.post("/", checkAuth, OrdersController.order_create_order);

router.get("/:orderId", checkAuth, OrdersController.order_get_order);
router.delete("/:orderId", checkAuth, OrdersController.order_delete_order);

module.exports = router;
