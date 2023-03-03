const express = require("express");
const {
    registerUser,
    getUsers,
    deleteAllUsers,
    loginUser,
    sayHello,
} = require("../controllers/userController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/allUsers", getUsers);
router.delete("/delete", deleteAllUsers);
router.post("/welcome", auth, sayHello);

module.exports = router;
