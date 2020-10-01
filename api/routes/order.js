const OrdersController = require("../Controllers/orders");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const Order = require("../models/order");
const Product = require("../models/product");

router.get("/", checkAuth, OrdersController.orders_get_all);
router.post("/", checkAuth, OrdersController.order_create_order);

router.get("/:orderId", checkAuth, OrdersController.order_get_order);
router.delete("/:orderId", checkAuth, OrdersController.order_delete_order);

module.exports = router;
