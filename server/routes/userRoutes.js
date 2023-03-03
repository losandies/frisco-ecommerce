const express = require("express");
const {
    registerUser,
    getUsers,
    deleteAllUsers,
    loginUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/allUsers", getUsers);
router.delete("/delete", deleteAllUsers);

module.exports = router;
