const express = require("express");
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    findOrdersByUserId,
} = require("../controllers/orderController");

router.post("/placeOrder", createOrder);
router.get("/allOrders", getAllOrders);
router.get("/findUserOrders", findOrdersByUserId);

module.exports = router;
