const express = require("express");
const {
    registerUser,
    getUsers,
    deleteAllUsers,
    loginUser,
    updateUserAddress,
    getCurrentUser,
} = require("../controllers/userController");
const router = express.Router();

const auth = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getCurrentUser", auth, getCurrentUser);
router.post("/updateAddress", auth, updateUserAddress);
router.get("/allUsers", getUsers);
router.delete("/delete", deleteAllUsers);

module.exports = router;
