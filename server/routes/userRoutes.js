const express = require("express");
const {
    registerUser,
    getUsers,
    deleteAllUsers,
    loginUser,
    sayHello,
    updateUserAddress,
    getUserOrders,
    getCurrentUser,
    getUserAddress,
} = require("../controllers/userController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getCurrentUser", getCurrentUser);
router.get("/getUserAddress", getUserAddress);
router.get("/allUsers", getUsers);
router.delete("/delete", deleteAllUsers);
router.post("/updateAddress", updateUserAddress);
router.get("/getUserOrders", getUserOrders);

module.exports = router;
