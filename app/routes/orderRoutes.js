const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders } = require("../controllers/orderController");

router.post("/placeOrder", createOrder);
router.get("/allOrders", getAllOrders);

module.exports = router;
